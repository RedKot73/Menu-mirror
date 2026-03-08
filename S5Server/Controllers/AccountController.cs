using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// API для управління користувачами системи
/// </summary>
[ApiController]
[Route("api/account")]
public class AccountController : ControllerBase
{
    private readonly UserManager<TVezhaUser> _userManager;
    private readonly SignInManager<TVezhaUser> _signInManager;
    private readonly RoleManager<IdentityRole<Guid>> _roleManager;
    private readonly MainDbContext _db;
    private readonly DbSet<TVezhaUser> _users;
    private readonly DbSet<Soldier> _soldiers;
    private readonly ILogger<AccountController> _logger;

    /// <summary>
    /// API для управління користувачами системи
    /// </summary>
    public AccountController(
        UserManager<TVezhaUser> userManager,
        SignInManager<TVezhaUser> signInManager,
        RoleManager<IdentityRole<Guid>> roleManager,
        MainDbContext db,
        ILogger<AccountController> logger)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _db = db;
        _users = _db.Set<TVezhaUser>();
        _soldiers = _db.Soldiers;
        _logger = logger;
    }

    private IQueryable<TVezhaUser> UsersQuery() => _users
        .AsNoTracking()
        .Include(u => u.Soldier)
            .ThenInclude(s => s.Rank)
        .Include(u => u.Soldier)
            .ThenInclude(s => s.Position)
        .Include(u => u.Soldier)
            .ThenInclude(s => s.Unit)
        .Include(u => u.Soldier)
            .ThenInclude(s => s.State)
        .Include(u => u.Soldier)
            .ThenInclude(s => s.AssignedUnit)
        .Include(u => u.Soldier)
            .ThenInclude(s => s.InvolvedUnit);

    /// <summary>
    /// Отримати всіх користувачів
    /// </summary>
    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? includeInactive,
        CancellationToken ct = default)
    {
        try
        {
            var query = UsersQuery();

            if (includeInactive != true)
            {
                query = query.Where(u => u.LockoutEnd == null || u.LockoutEnd <= DateTimeOffset.UtcNow);
            }

            var users = await query
                .OrderBy(u => u.Soldier.LastName)
                .ThenBy(u => u.Soldier.FirstName)
                .Select(u => u.ToDto())
                .ToListAsync(ct);
            
            return Ok(users);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання списку користувачів");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати користувача за ID
    /// </summary>
    [HttpGet("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var user = await UsersQuery()
                .FirstOrDefaultAsync(u => u.Id == id, ct);

            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            var roles = await _userManager.GetRolesAsync(user);
            var result = user.ToDto(roles);

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання користувача Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати користувача за Soldier ID
    /// </summary>
    [HttpGet("by-soldier/{soldierId}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetBySoldier(Guid soldierId, CancellationToken ct = default)
    {
        if (soldierId == Guid.Empty)
            return BadRequest("SoldierId обов'язковий");

        try
        {
            var user = await UsersQuery()
                .FirstOrDefaultAsync(u => u.SoldierId == soldierId, ct);

            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача для військовослужбовця '{soldierId}' не знайдено");

            var roles = await _userManager.GetRolesAsync(user);
            var result = user.ToDto(roles);

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання користувача по SoldierId={SoldierId}", soldierId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити нового користувача
    /// </summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> CreateUser(
        [FromBody] CreateUserDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (dto.SoldierId == Guid.Empty)
            return BadRequest("SoldierId обов'язковий");

        try
        {
            // 1. Перевірка чи Soldier існує
            var soldier = await _soldiers
                .AsTracking()//иначе EF думает что это новая сущность и пытается ее вставить в БД
                .FirstOrDefaultAsync(s => s.Id == dto.SoldierId, ct);

            if (soldier == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Військовослужбовець з ID '{dto.SoldierId}' не знайдено");

            // 2. Перевірка чи у Soldier вже є користувач
            var existingUser = await _users
                .FirstOrDefaultAsync(u => u.SoldierId == dto.SoldierId, ct);

            ct.ThrowIfCancellationRequested();

            if (existingUser != null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Спроба створити дублікат користувача SoldierId={SoldierId}, ExistingUserId={UserId}",
                        dto.SoldierId, existingUser.Id);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Військовослужбовець '{soldier.FirstName} {soldier.LastName}' вже має обліковий запис",
                    extensions: new Dictionary<string, object?>
                    {
                        ["soldierId"] = dto.SoldierId,
                        ["existingUserId"] = existingUser.Id,
                        ["existingUserName"] = existingUser.UserName
                    });
            }

            // 3. Перевірка чи Email вже використовується
            var email = dto.Email?.Trim();
            var emailExists = string.IsNullOrEmpty(email) ? null : await _userManager.FindByEmailAsync(email);

            ct.ThrowIfCancellationRequested();

            if (emailExists != null)
            {
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Email '{email}' вже використовується");
            }

            // 4. Створення нового користувача
            var user = new TVezhaUser
            {
                UserName = dto.UserName,
                Email = dto.Email,
                SoldierId = dto.SoldierId,
                Soldier = soldier,
                RegistrationDate = DateTime.UtcNow,
                EmailConfirmed = dto.EmailConfirmed ?? false,
                RequirePasswordChange = true // Змінити пароль при першому вході
                //LastPasswordChangeDate = DateTime.UtcNow
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Помилка створення користувача SoldierId={SoldierId}: {Errors}",
                        dto.SoldierId,
                        string.Join(", ", result.Errors.Select(e => e.Description)));

                return Problem(
                    statusCode: 400,
                    title: "Помилка створення користувача",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Створено користувача UserId={UserId}, UserName={UserName}, SoldierId={SoldierId}",
                    user.Id, user.UserName, user.SoldierId);

            // 5. Додати до ролей (якщо вказані)
            if (dto.Roles?.Length > 0)
            {
                await _userManager.AddToRolesAsync(user, dto.Roles);
            }

            return CreatedAtAction(
                nameof(Get),
                new { id = user.Id },
                user.ToDto(dto.Roles));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex,
                    "Помилка створення користувача UserName={UserName}, SoldierId={SoldierId}",
                    dto.UserName, dto.SoldierId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Вхід в систему
    /// </summary>
    [HttpPost("login")]
    [EnableRateLimiting("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status423Locked)]
    public async Task<IActionResult> Login(
        [FromBody] LoginDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);
        /*Принудительное создание первого пользователя когда в системе нет никого
        // 4. Створення нового користувача
        var sldrId = Guid.Parse("06501ce2-3c5a-4732-9a1b-b7b780269682");
        var usr = new TVezhaUser
        {
            UserName = dto.UserName,
            Email = string.Empty,
            SoldierId = sldrId,
            RegistrationDate = DateTime.UtcNow,
            EmailConfirmed = true
        };

        var result = await _userManager.CreateAsync(usr, dto.Password);

        if (!result.Succeeded)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(
                    "Помилка створення користувача SoldierId={SoldierId}: {Errors}",
                    sldrId,
                    string.Join(", ", result.Errors.Select(e => e.Description)));

            return Problem(
                statusCode: 400,
                title: "Помилка створення користувача",
                detail: string.Join("; ", result.Errors.Select(e => e.Description)));
        }
        */
        try
        {
            ct.ThrowIfCancellationRequested();

            var user = await _userManager.FindByNameAsync(dto.UserName);
            if (user == null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning("Спроба входу з невідомим UserName: {UserName}", dto.UserName);

                return Problem(
                    statusCode: 401,
                    title: "Неправильний Login або пароль");
            }

            // Перевірка на блокування
            if (await _userManager.IsLockedOutAsync(user))
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Спроба входу заблокованого користувача UserId={UserId}, LockoutEnd={LockoutEnd}",
                        user.Id, user.LockoutEnd);

                return Problem(
                    statusCode: 423,
                    title: "Обліковий запис заблокований",
                    detail: $"Обліковий запис заблокований до {user.LockoutEnd?.LocalDateTime:dd.MM.yyyy HH:mm}",
                    extensions: new Dictionary<string, object?>
                    {
                        ["lockoutEnd"] = user.LockoutEnd
                    });
            }

            ct.ThrowIfCancellationRequested();

            var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
            if (!passwordValid)
            {
                await _userManager.AccessFailedAsync(user);

                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Невдала спроба входу UserId={UserId}, FailedCount={FailedCount}",
                        user.Id, user.AccessFailedCount + 1);

                return Problem(
                    statusCode: 401,
                    title: "Неправильний Login або пароль");
            }

            await _userManager.ResetAccessFailedCountAsync(user);

            user.LastLoginDate = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            // ✅ Спочатку авторизуємо користувача
            await _signInManager.SignInAsync(user, dto.RememberMe);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Успішний вхід UserId={UserId}, UserName={UserName}",
                    user.Id, user.UserName);

            // ✅ Потім перевіряємо чи потрібна зміна пароля
            if (user.RequirePasswordChange)
            {                
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Користувач UserId={UserId} потребує зміни пароля",
                        user.Id);

                return Problem(
                    statusCode: 403,
                    title: "Потрібна зміна пароля",
                    detail: "Для продовження роботи необхідно змінити пароль",
                    extensions: new Dictionary<string, object?>
                    {
                        ["requirePasswordChange"] = true,
                        ["userId"] = user.Id
                    });
            }

            var roles = await _userManager.GetRolesAsync(user);
            var result = user.ToInfoDto(roles, includeSoldier: false);

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка входу UserName={UserName}", dto.UserName);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Вихід з системи
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> Logout()
    {
        try
        {
            await _signInManager.SignOutAsync();

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Користувач вийшов з системи");

            return NoContent();
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка виходу з системи");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Змінити пароль
    /// </summary>
    [HttpPost("{id}/change-password")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ChangePassword(
        Guid id,
        [FromBody] ChangePasswordDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            var result = await _userManager.ChangePasswordAsync(
                user, dto.CurrentPassword, dto.NewPassword);

            if (!result.Succeeded)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Помилка зміни пароля UserId={UserId}: {Errors}",
                        id, string.Join(", ", result.Errors.Select(e => e.Description)));

                return Problem(
                    statusCode: 400,
                    title: "Помилка зміни пароля",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }
            ct.ThrowIfCancellationRequested();

            // Оновлюємо дату зміни пароля та скидаємо прапорець RequirePasswordChange
            user.LastPasswordChangeDate = DateTime.UtcNow;
            user.RequirePasswordChange = false;
            await _userManager.UpdateAsync(user);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Змінено пароль UserId={UserId}", id);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка зміни пароля UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Змінити ім'я користувача
    /// </summary>
    [HttpPost("{id}/change-username")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> ChangeUsername(
        Guid id,
        [FromBody] ChangeUsernameDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            // Перевірка поточного пароля для безпеки
            var passwordValid = await _userManager.CheckPasswordAsync(user, dto.CurrentPassword);
            if (!passwordValid)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Невдала спроба зміни імені користувача UserId={UserId}: неправильний пароль",
                        id);

                return Problem(
                    statusCode: 400,
                    title: "Неправильний пароль",
                    detail: "Для зміни імені користувача потрібно ввести правильний поточний пароль");
            }

            var newUserName = dto.NewUserName.Trim();

            // Перевірка чи нове ім'я відрізняється від поточного
            if (string.Equals(user.UserName, newUserName, StringComparison.Ordinal))
            {
                return Problem(
                    statusCode: 400,
                    title: "Некоректні дані",
                    detail: "Нове ім'я користувача співпадає з поточним");
            }

            ct.ThrowIfCancellationRequested();

            // Перевірка доступності нового імені
            var existingUser = await _userManager.FindByNameAsync(newUserName);
            if (existingUser != null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Спроба змінити ім'я користувача UserId={UserId} на вже зайняте '{NewUserName}'",
                        id, newUserName);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Ім'я користувача '{newUserName}' вже використовується");
            }

            // Зміна імені користувача
            var oldUserName = user.UserName;
            var result = await _userManager.SetUserNameAsync(user, newUserName);

            if (!result.Succeeded)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Помилка зміни імені користувача UserId={UserId}: {Errors}",
                        id, string.Join(", ", result.Errors.Select(e => e.Description)));

                return Problem(
                    statusCode: 400,
                    title: "Помилка зміни імені користувача",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Змінено ім'я користувача UserId={UserId}: '{OldUserName}' -> '{NewUserName}'",
                    id, oldUserName, newUserName);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка зміни імені користувача UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Заблокувати/розблокувати користувача
    /// </summary>
    [HttpPost("{id}/lockout")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SetLockout(
        Guid id,
        [FromBody] SetLockoutDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            DateTimeOffset? lockoutEnd = dto.Lock
                ? (dto.LockoutEnd ?? DateTimeOffset.UtcNow.AddYears(100))
                : null;

            var result = await _userManager.SetLockoutEndDateAsync(user, lockoutEnd);

            if (!result.Succeeded)
            {
                return Problem(
                    statusCode: 400,
                    title: "Помилка зміни статусу блокування",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Змінено статус блокування UserId={UserId}, Locked={Locked}, LockoutEnd={LockoutEnd}",
                    id, dto.Lock, lockoutEnd);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка зміни статусу блокування UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити користувача
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return Problem(
                    statusCode: 400,
                    title: "Помилка видалення користувача",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Видалено користувача UserId={UserId}, UserName={UserName}, SoldierId={SoldierId}",
                    id, user.UserName, user.SoldierId);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка видалення користувача UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати всі ролі
    /// </summary>
    [HttpGet("roles")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllRoles(CancellationToken ct = default)
    {
        try
        {
            var roles = await _db.Set<IdentityRole<Guid>>()
                .AsNoTracking()
                .OrderBy(r => r.Name)
                .Select(r => new LookupDto(r.Id, r.Name ?? string.Empty))
                .ToListAsync(ct);

            return Ok(roles);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання списку ролей");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати роль за ID
    /// </summary>
    [HttpGet("roles/{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetRole(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var role = await _db.Set<IdentityRole<Guid>>()
                .AsNoTracking()
                .FirstOrDefaultAsync(r => r.Id == id, ct);

            if (role == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Роль з ID '{id}' не знайдено");

            return Ok(new LookupDto(role.Id, role.Name ?? string.Empty));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання ролі Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити роль
    /// </summary>
    [HttpPost("roles")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateRole(
        [FromBody] LookupDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var role = new IdentityRole<Guid>
            {
                Id = Guid.NewGuid(),
                Name = dto.Value.Trim(),
                NormalizedName = dto.Value.ToUpperInvariant()
            };

            var result = await _roleManager.CreateAsync(role);

            ct.ThrowIfCancellationRequested();

            if (!result.Succeeded)
            {
                return Problem(
                    statusCode: 400,
                    title: "Помилка створення ролі",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Створено роль RoleId={RoleId}, Name={Name}",
                    role.Id, role.Name);

            return CreatedAtAction(
                nameof(GetRole),
                new { id = role.Id },
                new LookupDto(role.Id, role.Name ?? string.Empty));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка створення ролі Name={Name}", dto.Value);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Призначити роль користувачу
    /// </summary>
    [HttpPost("{userId}/roles/{roleName}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddUserToRole(
        Guid userId,
        string roleName,
        CancellationToken ct = default)
    {
        if (userId == Guid.Empty)
            return BadRequest("UserId обов'язковий");

        try
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача '{userId}' не знайдено");

            ct.ThrowIfCancellationRequested();

            if (!await _roleManager.RoleExistsAsync(roleName))
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Роль '{roleName}' не існує");

            var result = await _userManager.AddToRoleAsync(user, roleName);

            if (!result.Succeeded)
            {
                return Problem(
                    statusCode: 400,
                    title: "Помилка призначення ролі",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Призначено роль UserId={UserId}, RoleName={RoleName}",
                    userId, roleName);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex,
                    "Помилка призначення ролі UserId={UserId}, RoleName={RoleName}",
                    userId, roleName);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити роль у користувача
    /// </summary>
    [HttpDelete("{userId}/roles/{roleName}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveUserFromRole(
        Guid userId,
        string roleName,
        CancellationToken ct = default)
    {
        if (userId == Guid.Empty)
            return BadRequest("UserId обов'язковий");

        try
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача '{userId}' не знайдено");

            ct.ThrowIfCancellationRequested();

            var result = await _userManager.RemoveFromRoleAsync(user, roleName);

            if (!result.Succeeded)
            {
                return Problem(
                    statusCode: 400,
                    title: "Помилка видалення ролі",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Видалено роль UserId={UserId}, RoleName={RoleName}",
                    userId, roleName);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex,
                    "Помилка видалення ролі UserId={UserId}, RoleName={RoleName}",
                    userId, roleName);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати інформацію про поточного авторизованого користувача
    /// </summary>
    [HttpGet("me")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<IActionResult> GetCurrentUser(CancellationToken ct = default)
    {
        try
        {
            var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
                return Unauthorized();

            var user = await UsersQuery()
                .FirstOrDefaultAsync(u => u.Id == Guid.Parse(userId), ct);

            if (user == null)
                return Unauthorized();

            var roles = await _userManager.GetRolesAsync(user);
            var result = user.ToInfoDto(roles, includeSoldier: true);

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання поточного користувача");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати вимоги до пароля
    /// </summary>
    [HttpGet("password-requirements")]
    [AllowAnonymous]
    [ProducesResponseType<PasswordRequirementsDto>(StatusCodes.Status200OK)]
    public IActionResult GetPasswordRequirements()
    {
        try
        {
            var options = _userManager.Options.Password;
            var result = new PasswordRequirementsDto(
                options.RequiredLength,
                options.RequireDigit,
                options.RequireLowercase,
                options.RequireUppercase,
                options.RequireNonAlphanumeric,
                options.RequiredUniqueChars
            );

            return Ok(result);
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання вимог до пароля");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    private readonly string[] error = ["Пароль обов'язковий"];
    /// <summary>
    /// Перевірити валідність пароля
    /// </summary>
    [HttpPost("validate-password")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ValidatePassword(
        [FromBody] ValidatePasswordDto dto)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Password))
            return BadRequest(new { IsValid = false, Errors = error });

        try
        {
            // Створюємо тимчасового користувача для валідації
            var tempUser = new TVezhaUser
            {
                UserName = dto.UserName ?? "temp_user",
                Email = dto.Email ?? "temp@validation.local"
            };

            var errors = new List<string>();

            // Перевіряємо пароль через всі налаштовані валідатори
            foreach (var validator in _userManager.PasswordValidators)
            {
                var result = await validator.ValidateAsync(_userManager, tempUser, dto.Password);
                if (!result.Succeeded)
                {
                    errors.AddRange(result.Errors.Select(e => e.Description));
                }
            }

            return Ok(new
            {
                IsValid = errors.Count == 0,
                Errors = errors
            });
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка валідації пароля");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Перевірити доступність імені користувача
    /// </summary>
    [HttpPost("check-username")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CheckUsername(
        [FromBody] CheckUsernameDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.UserName))
            return BadRequest(new { IsAvailable = false, Message = "UserName обов'язковий" });

        try
        {
            var userName = dto.UserName.Trim();

            // Перевіряємо чи існує користувач з таким іменем
            var existingUser = await _userManager.FindByNameAsync(userName);

            ct.ThrowIfCancellationRequested();

            // Якщо користувач не знайдений - ім'я вільне
            if (existingUser == null)
            {
                return Ok(new
                {
                    IsAvailable = true,
                    Message = $"Ім'я '{userName}' доступне"
                });
            }

            // Якщо це перевірка при оновленні - виключаємо поточного користувача
            if (dto.ExcludeUserId.HasValue && existingUser.Id == dto.ExcludeUserId.Value)
            {
                return Ok(new
                {
                    IsAvailable = true,
                    Message = "Це ваше поточне ім'я"
                });
            }

            // Ім'я зайняте
            return Ok(new
            {
                IsAvailable = false,
                Message = $"Ім'я '{userName}' вже використовується"
            });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка перевірки доступності UserName");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Перевірити доступність email
    /// </summary>
    [HttpPost("check-email")]
    [AllowAnonymous]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CheckEmail(
        [FromBody] CheckEmailDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Email))
            return BadRequest(new { IsAvailable = false, Message = "Email обов'язковий" });

        try
        {
            var email = dto.Email.Trim();

            // Перевіряємо чи існує користувач з таким email
            var existingUser = await _userManager.FindByEmailAsync(email);

            ct.ThrowIfCancellationRequested();

            // Якщо користувач не знайдений - email вільний
            if (existingUser == null)
            {
                return Ok(new
                {
                    IsAvailable = true,
                    Message = $"Email '{email}' доступний"
                });
            }

            // Якщо це перевірка при оновленні - виключаємо поточного користувача
            if (dto.ExcludeUserId.HasValue && existingUser.Id == dto.ExcludeUserId.Value)
            {
                return Ok(new
                {
                    IsAvailable = true,
                    Message = "Це ваш поточний email"
                });
            }

            return Ok(new
            {
                IsAvailable = false,
                Message = $"Email '{email}' вже використовується"
            });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка перевірки доступності Email");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// [АДМІН] Скинути пароль користувача без знання поточного
    /// </summary>
    [HttpPost("{id}/admin-reset-password")]
    //[Authorize(Roles = "Admin")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> AdminResetPassword(
        Guid id,
        [FromBody] AdminResetPasswordDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            // Отримуємо ім'я адміністратора
            var adminName = User.Identity?.Name ?? "Unknown Admin";

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            // Видаляємо старий пароль і встановлюємо новий
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, dto.NewPassword);

            if (!result.Succeeded)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Помилка адміністративного скидання пароля UserId={UserId}, Admin={AdminName}: {Errors}",
                        id, adminName, string.Join(", ", result.Errors.Select(e => e.Description)));

                return Problem(
                    statusCode: 400,
                    title: "Помилка скидання пароля",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            // Встановлюємо прапорець RequirePasswordChange згідно з DTO
            user.RequirePasswordChange = dto.RequirePasswordChange;
            user.LastPasswordChangeDate = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(
                    "Адміністративне скидання пароля: UserId={UserId}, UserName={UserName}, Admin={AdminName}, RequireChange={RequireChange}",
                    id, user.UserName, adminName, dto.RequirePasswordChange);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка адміністративного скидання пароля UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// [АДМІН] Змінити ім'я користувача без знання пароля
    /// </summary>
    [HttpPost("{id}/admin-change-username")]
    //[Authorize(Roles = "Admin")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> AdminChangeUsername(
        Guid id,
        [FromBody] AdminChangeUsernameDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var adminName = User.Identity?.Name ?? "Unknown Admin";

            var user = await _userManager.FindByIdAsync(id.ToString());
            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            ct.ThrowIfCancellationRequested();

            var newUserName = dto.NewUserName.Trim();
            var oldUserName = user.UserName;

            // Перевірка чи нове ім'я відрізняється від поточного
            if (string.Equals(oldUserName, newUserName, StringComparison.Ordinal))
            {
                return Problem(
                    statusCode: 400,
                    title: "Некоректні дані",
                    detail: "Нове ім'я користувача співпадає з поточним");
            }

            // Перевірка доступності нового імені
            var existingUser = await _userManager.FindByNameAsync(newUserName);
            if (existingUser != null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Адмін {AdminName} спробував змінити ім'я користувача UserId={UserId} на вже зайняте '{NewUserName}'",
                        adminName, id, newUserName);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Ім'я користувача '{newUserName}' вже використовується");
            }

            // Зміна імені користувача
            var result = await _userManager.SetUserNameAsync(user, newUserName);

            if (!result.Succeeded)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Помилка адміністративної зміни імені користувача UserId={UserId}: {Errors}",
                        id, string.Join(", ", result.Errors.Select(e => e.Description)));

                return Problem(
                    statusCode: 400,
                    title: "Помилка зміни імені користувача",
                    detail: string.Join("; ", result.Errors.Select(e => e.Description)));
            }

            var admin = User.Identity?.Name ?? "Unknown Admin";
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(
                    "Адміністративна зміна імені: UserId={UserId}, '{OldUserName}' -> '{NewUserName}', Admin={AdminName}",
                    id, oldUserName, newUserName, admin);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка адміністративної зміни імені користувача UserId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}