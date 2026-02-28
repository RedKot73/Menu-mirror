using System.Threading.Channels;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UnitController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<Unit> _set;
    private readonly ILogger<UnitController> _logger;
    private readonly System.Text.Json.JsonSerializerOptions JSONOpt = new()
    {
        PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
    };

    public UnitController(MainDbContext db, ILogger<UnitController> logger)
    {
        _db = db;
        _set = db.Units;
        _logger = logger;
    }

    private IQueryable<Unit> Query() => _set.AsNoTracking();

    /// <summary>
    /// Завантажує повну інформацію про підрозділ (Include всіх навігаційних властивостей)
    /// </summary>
    private static IQueryable<Unit> QueryWithIncludes(IQueryable<Unit> query)
    {
        return query
            .Include(t => t.Parent)
            .Include(t => t.AssignedUnit)
            .Include(t => t.ForceType)
            .Include(t => t.UnitType)
            .Include(t => t.PersistentLocation);
    }

    /// <summary>
    /// Отримати список всіх підрозділів з можливістю фільтрації
    /// </summary>
    /// <param name="search">Рядок пошуку по назві або короткій назві</param>
    /// <param name="parentId">ID батьківського підрозділу (null = верхній рівень, "" = всі)</param>
    /// <param name="ct">Токен скасування</param>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitTreeItemDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] Guid? parentId,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query()
                .Where(t => t.Id != ControllerFunctions.NullGuid);

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(x => x.ShortName.Contains(search) || x.Name.Contains(search));
            }

            if (parentId.HasValueGuid())
                q = q.Where(x => x.ParentId == parentId);

            q = QueryWithIncludes(q);

            var list = await q
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.ShortName)
                .Select(u => u.ToTreeItemDto(_set.Any(c => c.ParentId == u.Id)))
                .ToListAsync(ct);
            
            return Ok(list);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні списку підрозділів");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Автокомпліт для пошуку підрозділів
    /// </summary>
    [HttpGet("lookup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string? term,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<LookupDto>());

        if (limit is < 1 or > 100) limit = 10;

        try
        {
            term = term.Trim();

            var data = await Query()
                .Where(x => x.ShortName.Contains(term) || x.Name.Contains(term))
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.ShortName)
                .Take(limit)
                .Select(x => x.ToLookupDto())
                .ToListAsync(ct);

            return Ok(data);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка в lookup Unit");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати підрозділ за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UnitDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var q = Query().Where(x => x.Id == id);
            q = QueryWithIncludes(q);

            var e = await q.FirstOrDefaultAsync(ct);
            
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
            
            return Ok(e.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити новий підрозділ
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UnitDto>> Create(
        [FromBody] UnitCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest("Name не може бути порожнім");
        
        if (string.IsNullOrWhiteSpace(dto.ShortName))
            return BadRequest("ShortName не може бути порожнім");

        try
        {
            var entity = dto.ToEntity();
            
            // ✅ Встановлюємо ChangedBy з поточного користувача
            entity.ChangedBy = User.Identity?.Name ?? "System";
            entity.ValidFrom = DateTime.UtcNow;

            // Встановлюємо OrderVal, якщо не вказано
            /*
            if (entity.OrderVal == 0)
                entity.OrderVal = 1;
            */
            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            // Завантажуємо створений запис з навігаційними властивостями
            var q = Query().Where(x => x.Id == entity.Id);
            q = QueryWithIncludes(q);
            var created = await q.FirstAsync(ct);
            
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності Name={Name} для Unit", dto.Name);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Підрозділ \"{dto.Name}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = dto.Name });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні Unit");
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні Unit");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити підрозділ
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UnitDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        if (string.IsNullOrWhiteSpace(dto.Name))
            return BadRequest("Name не може бути порожнім");

        if (string.IsNullOrWhiteSpace(dto.ShortName))
            return BadRequest("ShortName не може бути порожнім");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // ✅ Використовуємо Extension-метод для перевірки змін
            if (e.IsEqualTo(dto))
                return NoContent();

            // ✅ Оновлюємо ChangedBy при кожній зміні
            e.ChangedBy = User.Identity?.Name ?? "System";
            // ValidFrom НЕ змінюємо!

            // ✅ Застосовуємо зміни через Extension-метод
            e.ApplyDto(dto);

            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні Unit Id={Id} Name={Name}",
                    id, dto.Name);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Підрозділ \"{dto.Name}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = dto.Name, ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні Unit Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні Unit Id={Id}\n{Msg}\n{ExMsg}",
                    id, ex.Message, ex.InnerException?.Message);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити підрозділ
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            _set.Remove(e);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при видаленні Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Перевірка наявності дочірніх підрозділів
    /// </summary>
    [HttpGet("{id}/has-children")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<bool>> HasChildren(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var has = await _set.AnyAsync(x => x.ParentId == id, ct);
            return Ok(has);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при перевірці дочірніх Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати дочірні підрозділи
    /// </summary>
    [HttpGet("{id}/children")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitDto>>> GetChildren(
        Guid id,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var q = Query()
                .Where(x => x.ParentId == id);
            
            q = QueryWithIncludes(q);

            var children = await q
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.Name)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(children);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні дочірніх Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Перевірка наявності приданих підрозділів
    /// </summary>
    [HttpGet("{id}/has-assigned")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<bool>> HasAssignedUnits(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var has = await _set.AnyAsync(x => x.AssignedUnitId == id, ct);
            return Ok(has);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при перевірці приданих Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати придані підрозділи
    /// </summary>
    [HttpGet("{id}/assigned")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitDto>>> GetAssignedUnits(
        Guid id,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var q = Query()
                .Where(x => x.AssignedUnitId == id);
            
            q = QueryWithIncludes(q);

            var assigned = await q
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.Name)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(assigned);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні приданих Unit Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Додати існуючий дочірній підрозділ
    /// </summary>
    [HttpPost("{parentId}/add-exists-child/{childId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddExistsChild(
        Guid parentId,
        Guid childId,
        CancellationToken ct = default)
    {
        if (parentId == Guid.Empty)
            return BadRequest("parentId обов'язковий");
        
        if (childId == Guid.Empty)
            return BadRequest("childId обов'язковий");

        if (parentId == childId)
            return BadRequest("Підрозділ не може бути дочірнім сам до себе");

        try
        {
            var child = await _set.FirstOrDefaultAsync(x => x.Id == childId, ct);
            if (child == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Дочірній підрозділ не знайдено");

            child.ParentId = parentId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при додаванні дочірнього Unit ParentId={ParentId} ChildId={ChildId}",
                    parentId, childId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити дочірній підрозділ
    /// </summary>
    [HttpPost("{parentId}/remove-child/{childId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveChild(
        Guid parentId,
        Guid childId,
        CancellationToken ct = default)
    {
        if (parentId == Guid.Empty)
            return BadRequest("parentId обов'язковий");
        
        if (childId == Guid.Empty)
            return BadRequest("childId обов'язковий");

        try
        {
            var child = await _set.FirstOrDefaultAsync(x => x.Id == childId && x.ParentId == parentId, ct);
            if (child == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Дочірній підрозділ не знайдено");

            child.ParentId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при видаленні дочірнього Unit ParentId={ParentId} ChildId={ChildId}",
                    parentId, childId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Додати приданий підрозділ
    /// </summary>
    [HttpPost("{unitId}/add-assigned/{assignedId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> AddAssignedUnit(
        Guid unitId,
        Guid assignedId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");
        
        if (assignedId == Guid.Empty)
            return BadRequest("assignedId обов'язковий");

        if (unitId == assignedId)
            return BadRequest("Підрозділ не може бути приданим сам до себе");

        try
        {
            var assigned = await _set.FirstOrDefaultAsync(x => x.Id == assignedId, ct);
            if (assigned == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Приданий підрозділ не знайдено");

            assigned.AssignedUnitId = unitId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при додаванні приданого Unit UnitId={UnitId} AssignedId={AssignedId}",
                    unitId, assignedId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити приданий підрозділ (від'язати)
    /// </summary>
    [HttpPost("{unitId}/remove-assigned/{assignedId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RemoveAssignedUnit(
        Guid unitId,
        Guid assignedId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");
        
        if (assignedId == Guid.Empty)
            return BadRequest("assignedId обов'язковий");

        try
        {
            var assigned = await _set.FirstOrDefaultAsync(
                x => x.Id == assignedId && x.AssignedUnitId == unitId, ct);
            if (assigned == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Приданий підрозділ не знайдено");

            assigned.AssignedUnitId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при видаленні приданого Unit UnitId={UnitId} AssignedId={AssignedId}",
                    unitId, assignedId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Змінити порядковий номер сортування
    /// </summary>
    [HttpPost("{unitId}/moveUpDown/{toUp}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> MoveUpDown(
        Guid unitId,
        bool toUp,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        try
        {
            var unit = await _set.AsTracking()
                .FirstOrDefaultAsync(x => x.Id == unitId, ct);
            if (unit == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Підрозділ не знайдено");

            unit.OrderVal = toUp ? unit.OrderVal - 1 : unit.OrderVal + 1;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при зміні порядку Unit Id={Id}", unitId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Імпортувати особовий склад з зовнішнього файлу
    /// </summary>
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(50_000_000)]
    [HttpPost("{unitId}/importSoldiers")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status423Locked)]
    public async Task<IActionResult> ImportSoldiers(
        Guid unitId,
        [FromForm] IFormFile soldiers,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        try
        {
            var unit = await _set.AsTracking()
                .FirstOrDefaultAsync(x => x.Id == unitId, ct);
            if (unit == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Підрозділ не знайдено");

            if (soldiers == null || soldiers.Length == 0)
                return BadRequest("Файл відсутній або порожній");

            var ext = Path.GetExtension(soldiers.FileName);
            if (!string.Equals(ext, ".xlsx", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Підтримується тільки формат .xlsx");

            (bool started,
             ImportJob job,
             string? error) = Services.ImportSoldiers.TryStartBackground(unit, soldiers, ct);
            if (!started)
                return Problem(statusCode: 423, title: error ?? "Імпорт заблоковано");
            
            return Accepted(new
            {
                job.Status,
                job.StartedAtUtc,
                job.FinishedAtUtc,
                job.Error,
            });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при імпорті солдат для Unit Id={Id}\n{Msg}", unitId, ex.Message);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера", detail: ex.Message);
        }
    }

    /// <summary>
    /// Вже оброблені підрозділи
    /// </summary>
    [HttpGet("get-last-units")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult GetLastUnits()
    {
        try
        {
            var result = Services.ImportSoldiers.GetLastUnits();
            return Ok(result);
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні останніх Unit");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Вже оброблені підрозділи
    /// </summary>
    [HttpPost("get-units")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult GetUnits(string[] units)
    {
        try
        {
            var result = Services.ImportSoldiers.GetUnits(units);
            return Ok(result);
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні Unit за списком");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Прогрес імпорту (SSE)
    /// </summary>
    [HttpGet("imports/stream")]
    public async Task GetImportStream(CancellationToken ct)
    {
        Response.Headers.CacheControl = "no-cache";
        Response.Headers.ContentType = "text/event-stream";
        Response.Headers["X-Accel-Buffering"] = "no";

        var channel = Channel.CreateUnbounded<string>();
        void Handler(ImportProgress p)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(p, JSONOpt);
            channel.Writer.TryWrite($"data: {json}\n\n");
        }

        Services.ImportSoldiers.Progress += Handler;
        try
        {
            await foreach (var msg in channel.Reader.ReadAllAsync(ct))
            {
                await Response.WriteAsync(msg, ct);
                await Response.Body.FlushAsync(ct);
            }
        }
        catch (OperationCanceledException)
        {
            // client disconnected
        }
        finally
        {
            Services.ImportSoldiers.Progress -= Handler;
        }
    }
}