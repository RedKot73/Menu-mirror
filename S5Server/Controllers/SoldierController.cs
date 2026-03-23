using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// API контролер для управління особовим складом (військовослужбовцями), включаючи операції отримання, створення, оновлення, видалення та призначення до підрозділів.
/// </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class SoldierController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<Soldier> _set;
    private readonly ILogger<SoldierController> _logger;

    public SoldierController(MainDbContext db, ILogger<SoldierController> logger)
    {
        _db = db;
        _set = db.Soldiers;
        _logger = logger;
    }

    //private IQueryable<Soldier> Query() => SoldierService.GetQuery(_set);

    /// <summary>
    /// Список військовослужбовців з фільтрацією.
    /// </summary>
    /// <param name="search">Пошук по ПІБ / позивному / номеру частини підрозділу.</param>
    /// <param name="unitId">Фільтр по основному підрозділу.</param>
    /// <param name="limit">Обмеження кількості результатів.</param>
    /// <param name="ct">Токен відміни.</param>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<SoldierDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] Guid? unitId,
        [FromQuery] int? limit,
        CancellationToken ct = default)
    {
        try
        {
            var q = _set.GetQuery();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }

            if (unitId.HasValueGuid())
                q = q.Where(s => s.UnitId == unitId);
            
            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => s.ToSoldierDto())
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
                _logger.LogError(ex, "Помилка при отриманні списку Soldier");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Об'єднаний перелік військовослужбовців за підрозділом.
    /// </summary>
    [HttpGet("by-unit")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByUnit(
        [FromQuery] Guid unitId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        try
        {
            var result = await _set.GetUnionQuery(unitId)
                .Select(s => s.ToSoldierDto())
                .ToListAsync(ct);
            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, @"Помилка при отриманні
Об'єднаний перелік військовослужбовців за підрозділом UnitId={unitId}",
                    unitId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список військовослужбовців за приданим підрозділом.
    /// </summary>
    [HttpGet("by-assigned")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByAssigned(
        [FromQuery] Guid assignedUnitId,
        [FromQuery] string? search,
        [FromQuery] int? limit,
        CancellationToken ct = default)
    {
        if (assignedUnitId == Guid.Empty)
            return BadRequest("assignedUnitId обов'язковий");

        try
        {
            var q = _set.GetQuery().Where(s => s.AssignedUnitId == assignedUnitId);

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }
            
            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => s.ToSoldierDto())
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
                _logger.LogError(ex, "Помилка при отриманні Soldier за приданим підрозділом AssignedUnitId={AssignedUnitId}",
                    assignedUnitId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список військовослужбовців за оперативним підрозділом.
    /// </summary>
    [HttpGet("by-involved")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByInvolved(
        [FromQuery] Guid involvedUnitId,
        [FromQuery] string? search,
        [FromQuery] int? limit,
        CancellationToken ct = default)
    {
        if (involvedUnitId == Guid.Empty)
            return BadRequest("involvedUnitId обов'язковий");

        try
        {
            var q = _set.GetQuery().Where(s => s.InvolvedUnitId == involvedUnitId);

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }

            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => s.ToSoldierDto())
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
                _logger.LogError(ex, "Помилка при отриманні Soldier за оперативним підрозділом OperationalUnitId={OperationalUnitId}",
                    involvedUnitId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Lookup (для автокомпліта по ПІБ / позивному).
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

            var data = await _set.GetQuery()
                .Where(s => s.FirstName.Contains(term))
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Take(limit)
                .Select(s => new LookupDto(s.Id, s.FIO))
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
                _logger.LogError(ex, "Помилка в lookup Soldier");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SoldierDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var s = await _set.GetQuery().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (s == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
            
            return Ok(s.ToSoldierDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні Soldier Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<SoldierDto>> Create(
        [FromBody] SoldierCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.FirstName))
            return BadRequest("FirstName не може бути порожнім");
        
        if (dto.UnitId == Guid.Empty)
            return BadRequest("UnitId обов'язковий");
        
        if (dto.RankId == Guid.Empty)
            return BadRequest("RankId обов'язковий");
        
        if (dto.PositionId == Guid.Empty)
            return BadRequest("PositionId обов'язковий");
        
        if (dto.StateId == Guid.Empty)
            return BadRequest("StateId обов'язковий");

        try
        {
            var entity = dto.ToEntity(User.Identity?.Name ?? "System");

            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            entity = await _set.GetQuery().FirstAsync(s => s.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity.ToSoldierDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності для Soldier");
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: "Запис з такими даними вже існує");
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні Soldier");
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні Soldier");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Updates the details of an existing soldier with the specified identifier.
    /// </summary>
    /// <remarks>Returns appropriate HTTP status codes based on the outcome of the operation, including
    /// validation errors, not found, uniqueness conflicts, and concurrency conflicts.</remarks>
    /// <param name="id">The unique identifier of the soldier to update. Cannot be empty.</param>
    /// <param name="dto">The data transfer object containing the updated soldier information. The FirstName property cannot be null or
    /// whitespace.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An IActionResult indicating the result of the update operation. Returns 204 No Content if the update is
    /// successful, 400 Bad Request if the input is invalid, 404 Not Found if the soldier does not exist, or 409
    /// Conflict if a uniqueness or concurrency conflict occurs.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] SoldierCreateDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.FirstName))
            return BadRequest("FirstName не може бути порожнім");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            if (e.IsEqualTo(dto))
                return NoContent();

            e.UpdateFromDto(dto, User.Identity?.Name ?? "System");

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
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні Soldier Id={Id}", id);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: "Запис з такими даними вже існує",
                extensions: new Dictionary<string, object?> { ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні Soldier Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні Soldier Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var e = await _set.FirstOrDefaultAsync(s => s.Id == id, ct);
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
                _logger.LogError(ex, "Помилка при видаленні Soldier Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    enum UnitKind 
    {
        UnitId, 
        AssignedUnitId, 
        InvolvedUnitId
    }

    private async Task<ActionResult<SoldierDto>> SetUnit(
        Guid id,
        Guid? unitId, 
        UnitKind unitKind, 
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        // UnitId не может быть пустым (обязательное поле)
        if (unitId.IsNullOrEmptyGuid() && unitKind == UnitKind.UnitId)
            return BadRequest("UnitId обов'язковий для переведення бійця");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Боєць не знайдений");

            // Нормализация: пустая строка -> null
            var newUnitId = unitId.IsNullOrEmptyGuid() ? null : unitId;
            switch (unitKind)
            {
                case UnitKind.UnitId:
                    e.UnitId = newUnitId!.Value; // ! т.к. проверили выше
                    break;
                case UnitKind.AssignedUnitId:
                    e.AssignedUnitId = newUnitId;
                    break;
                case UnitKind.InvolvedUnitId:
                    e.InvolvedUnitId = newUnitId;
                    break;
            }
            e.ChangedBy = User.Identity?.Name ?? "System";

            await _db.SaveChangesAsync(ct);

            // Перезагружаем с навигационными свойствами
            var updated = await _set.GetQuery().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (updated == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Боєць не знайдений після збереження");

            return Ok(updated.ToSoldierDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
            {
                _logger.LogError(ex, "Помилка при зміні підрозділу Soldier Id={Id} UnitKind={UnitKind}",
                    id, unitKind);
                if (ex.InnerException != null)
                    _logger.LogError("Inner exception {Msg}", ex.InnerException.Message);
            }
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Придати бійця до підрозділу (або відмінити придання якщо unitId не вказано).
    /// </summary>
    [HttpPost("{id}/assign-assigned/{unitId?}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<ActionResult<SoldierDto>> AssignAssigned(
        Guid id,
        Guid? unitId, 
        CancellationToken ct = default)
        => SetUnit(id, unitId, UnitKind.AssignedUnitId, ct);

    /// <summary>
    /// Придати бійця до Оперативного підрозділу.
    /// </summary>
    [HttpPost("{id}/assign-involved/{unitId?}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<ActionResult<SoldierDto>> AssignInvolved(
        Guid id,
        Guid? unitId, 
        CancellationToken ct = default)
        => SetUnit(id, unitId, UnitKind.InvolvedUnitId, ct);

    /// <summary>
    /// Перевести бійця до іншого основного підрозділу.
    /// </summary>
    [HttpPost("{id}/move/{newUnitId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public Task<ActionResult<SoldierDto>> Move(
        Guid id,
        Guid newUnitId, 
        CancellationToken ct = default)
        => SetUnit(id, newUnitId, UnitKind.UnitId, ct);
}