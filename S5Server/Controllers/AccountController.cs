using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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

    /// <summary>
    /// Отримати всіх користувачів
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? includeInactive,
        CancellationToken ct = default)
    {
        try
        {
            var query = _users
                .AsNoTracking()
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Rank)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Position)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Unit)
                .AsQueryable();

            if (includeInactive != true)
            {
                query = query.Where(u => u.LockoutEnd == null || u.LockoutEnd <= DateTimeOffset.UtcNow);
            }

            var users = await query
                .OrderBy(u => u.Soldier.LastName)
                .ThenBy(u => u.Soldier.FirstName)
                .ToListAsync(ct);

            var result = users.Select(u => new
            {
                u.Id,
                u.UserName,
                u.Email,
                u.EmailConfirmed,
                u.PhoneNumber,
                u.LastLoginDate,
                u.RegistrationDate,
                u.LockoutEnd,
                IsLocked = u.LockoutEnd.HasValue && u.LockoutEnd > DateTimeOffset.UtcNow,
                u.AccessFailedCount,
                Soldier = new
                {
                    u.Soldier.Id,
                    u.Soldier.FirstName,
                    u.Soldier.MidleName,
                    u.Soldier.LastName,
                    Rank = u.Soldier.Rank?.ShortValue,
                    Position = u.Soldier.Position?.Value,
                    Unit = u.Soldier.Unit?.ShortName
                }
            }).ToList();

            return Ok(result);
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var user = await _users
                .AsNoTracking()
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Rank)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Position)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Unit)
                        .ThenInclude(u => u.Parent)
                .FirstOrDefaultAsync(u => u.Id == id, ct);

            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача з ID '{id}' не знайдено");

            var result = new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.EmailConfirmed,
                user.PhoneNumber,
                user.PhoneNumberConfirmed,
                user.TwoFactorEnabled,
                user.LastLoginDate,
                user.RegistrationDate,
                user.LockoutEnd,
                user.LockoutEnabled,
                IsLocked = user.LockoutEnd.HasValue && user.LockoutEnd > DateTimeOffset.UtcNow,
                user.AccessFailedCount,
                Soldier = new
                {
                    user.Soldier.Id,
                    user.Soldier.FirstName,
                    user.Soldier.MidleName,
                    user.Soldier.LastName,
                    user.Soldier.BirthDate,
                    user.Soldier.NickName,
                    Rank = user.Soldier.Rank?.ShortValue,
                    Position = user.Soldier.Position?.Value,
                    Unit = user.Soldier.Unit?.ShortName,
                    ParentUnit = user.Soldier.Unit?.Parent?.ShortName
                }
            };

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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetBySoldier(Guid soldierId, CancellationToken ct = default)
    {
        if (soldierId == Guid.Empty)
            return BadRequest("SoldierId обов'язковий");

        try
        {
            var user = await _users
                .AsNoTracking()
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Rank)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Position)
                .Include(u => u.Soldier)
                    .ThenInclude(s => s.Unit)
                .FirstOrDefaultAsync(u => u.SoldierId == soldierId, ct);

            if (user == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Користувача для військовослужбовця '{soldierId}' не знайдено");

            return Ok(new { user.Id, user.UserName, user.Email });
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
                .AsNoTracking()
                .FirstOrDefaultAsync(s => s.Id == dto.SoldierId, ct);

            if (soldier == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Військовослужбовець з ID '{dto.SoldierId}' не знайдено");

            // 2. Перевірка чи у Soldier вже є користувач
            var existingUser = await _users
                .FirstOrDefaultAsync(u => u.SoldierId == dto.SoldierId, ct);

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
            var emailExists = await _userManager.FindByEmailAsync(dto.Email);
            if (emailExists != null)
            {
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Email '{dto.Email}' вже використовується");
            }

            // 4. Створення нового користувача
            var user = new TVezhaUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                SoldierId = dto.SoldierId,
                RegistrationDate = DateTime.UtcNow,
                EmailConfirmed = dto.EmailConfirmed ?? false
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
                    "Створено користувача UserId={UserId}, Email={Email}, SoldierId={SoldierId}",
                    user.Id, user.Email, user.SoldierId);

            // 5. Додати до ролей (якщо вказані)
            if (dto.Roles?.Length > 0)
            {
                await _userManager.AddToRolesAsync(user, dto.Roles);
            }

            return CreatedAtAction(
                nameof(Get),
                new { id = user.Id },
                new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.SoldierId,
                    user.RegistrationDate
                });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex,
                    "Помилка створення користувача Email={Email}, SoldierId={SoldierId}",
                    dto.Email, dto.SoldierId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Вхід в систему
    /// </summary>
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status423Locked)]
    public async Task<IActionResult> Login(
        [FromBody] LoginDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning("Спроба входу з невідомим email: {Email}", dto.Email);

                return Problem(
                    statusCode: 401,
                    title: "Неправильний email або пароль");
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
                    title: "Неправильний email або пароль");
            }

            await _userManager.ResetAccessFailedCountAsync(user);

            user.LastLoginDate = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);

            await _signInManager.SignInAsync(user, dto.RememberMe);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Успішний вхід UserId={UserId}, Email={Email}",
                    user.Id, user.Email);

            return Ok(new
            {
                user.Id,
                user.UserName,
                user.Email,
                user.SoldierId,
                user.LastLoginDate,
                Roles = await _userManager.GetRolesAsync(user)
            });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка входу Email={Email}", dto.Email);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Вихід з системи
    /// </summary>
    [HttpPost("logout")]
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
    /// Заблокувати/розблокувати користувача
    /// </summary>
    [HttpPost("{id}/lockout")]
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
                    "Видалено користувача UserId={UserId}, Email={Email}, SoldierId={SoldierId}",
                    id, user.Email, user.SoldierId);

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
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllRoles(CancellationToken ct = default)
    {
        try
        {
            var roles = await _db.Set<IdentityRole<Guid>>()
                .AsNoTracking()
                .OrderBy(r => r.Name)
                .Select(r => new
                {
                    r.Id,
                    r.Name,
                    r.NormalizedName
                })
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
    /// Створити роль
    /// </summary>
    [HttpPost("roles")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateRole(
        [FromBody] CreateRoleDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            var role = new IdentityRole<Guid>
            {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                NormalizedName = dto.Name.ToUpperInvariant()
            };

            var result = await _roleManager.CreateAsync(role);

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

            return CreatedAtAction(nameof(GetAllRoles), new { id = role.Id }, role);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка створення ролі Name={Name}", dto.Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Призначити роль користувачу
    /// </summary>
    [HttpPost("{userId}/roles/{roleName}")]
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
}