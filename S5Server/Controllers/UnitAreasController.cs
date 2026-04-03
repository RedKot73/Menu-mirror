using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Контролер для управління зв'язком підрозділів та районів виконання завдань (РВЗ)
/// </summary>
[Authorize]
[ApiController]
[Route("api/unit-areas")]
public class UnitAreasController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<UnitAreas> _set;
    private readonly ILogger<UnitAreasController> _logger;

    /// <summary>
    /// Контролер для управління зв'язком підрозділів та районів виконання завдань (РВЗ)
    /// </summary>
    public UnitAreasController(MainDbContext db, ILogger<UnitAreasController> logger)
    {
        _db = db;
        _set = db.UnitAreas;
        _logger = logger;
    }

    private IQueryable<UnitAreas> Query() =>
        _set.AsNoTracking()
            .Include(x => x.Unit)
            .Include(x => x.Area);

    /// <summary>
    /// Отримати всі зв'язки підрозділів та РВЗ з можливістю фільтрації
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitAreasDto>>> GetAll(
        [FromQuery] Guid? unitId,
        [FromQuery] Guid? areaId,
        CancellationToken ct = default)
    {
        var query = Query();

        if (unitId.HasValueGuid())
            query = query.Where(x => x.UnitId == unitId);
        if (areaId.HasValueGuid())
            query = query.Where(x => x.AreaId == areaId);

        var list = await query
            .OrderBy(x => x.Unit.ShortName)
            .ThenBy(x => x.Area.Value)
            .Select(x => x.ToDto())
            .ToListAsync(ct);

        return Ok(list);
    }

    /// <summary>
    /// Отримати зв'язок за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UnitAreasDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        var entity = await Query()
            .FirstOrDefaultAsync(x => x.Id == id, ct);

        if (entity == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        return Ok(entity.ToDto());
    }

    /// <summary>
    /// Отримати всі РВЗ для конкретного підрозділу
    /// </summary>
    [HttpGet("by-unit/{unitId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitAreasDto>>> GetByUnit(
        Guid unitId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        var list = await _set.AsNoTracking()
            .Include(x => x.Area)
            .ThenInclude(t => t.AreaType)
            .Where(x => x.UnitId == unitId)
            .OrderBy(x => x.Area.Value)
            .ThenBy(x => x.Area.AreaType.ShortValue)
            .Select(x => x.ToDto())
            .ToListAsync(ct);

        return Ok(list);
    }

    /// <summary>
    /// Отримати всі підрозділи для конкретного РВЗ
    /// </summary>
    [HttpGet("by-area/{areaId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<UnitAreasDto>>> GetByArea(
        Guid areaId,
        [FromQuery] Guid? unitId,
        CancellationToken ct = default)
    {
        if (areaId == Guid.Empty)
            return BadRequest("areaId обов'язковий");

        var query = Query();
        if (unitId.HasValueGuid())
            query = query.Where(x => x.UnitId != unitId);

        var list = await query
            .Where(x => x.AreaId == areaId)
            .OrderBy(x => x.Unit.ShortName)
            .Select(x => x.ToDto())
            .ToListAsync(ct);

        return Ok(list);
    }
    /// <summary>
    /// Отримати суміжні підрозділи — ті, що мають хоча б один спільний РВЗ з вказаним підрозділом
    /// </summary>
    [HttpGet("adjacent/{unitId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<UnitAreasDto>>> GetAdjactedUnits(Guid unitId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        var sharedAreaIds = _set.AsNoTracking()
            .Where(t => t.UnitId == unitId)
            .Select(t => t.AreaId);

        var list = await Query()
            .Include(t => t.Area.AreaType)
            .Where(t => sharedAreaIds.Contains(t.AreaId) && t.UnitId != unitId)
            .OrderBy(x => x.Unit.ShortName)
            .Select(x => x.ToDto())
            //.Distinct()
            .ToListAsync(ct);

        return Ok(list);
    }

    /// <summary>
    /// Створити зв'язок підрозділ — РВЗ
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UnitAreasDto>> Create(
        [FromBody] UnitAreasUpsertDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (dto.UnitId == Guid.Empty)
            return BadRequest("UnitId обов'язковий");
        if (dto.AreaId == Guid.Empty)
            return BadRequest("AreaId обов'язковий");

        var unitExists = await _db.Units.AnyAsync(u => u.Id == dto.UnitId, ct);
        if (!unitExists)
            return Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Підрозділ з ID '{dto.UnitId}' не знайдено");

        var areaExists = await _db.DictAreas.AnyAsync(a => a.Id == dto.AreaId, ct);
        if (!areaExists)
            return Problem(statusCode: 404, title: "Не знайдено",
                detail: $"РВЗ з ID '{dto.AreaId}' не знайдено");

        var changedBy = User.Identity?.Name ?? "Unknown";
        var entity = dto.FromDto(changedBy);
        _set.Add(entity);

        try
        {
            await _db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex,
                    "Конфлікт унікальності UnitAreas UnitId={UnitId} AreaId={AreaId}",
                    dto.UnitId, dto.AreaId);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: "Цей підрозділ вже пов'язаний з цим РВЗ",
                extensions: new Dictionary<string, object?>
                {
                    ["unitId"] = dto.UnitId,
                    ["areaId"] = dto.AreaId
                });
        }

        if (_logger.IsEnabled(LogLevel.Information))
            _logger.LogInformation(
                "Створено UnitAreas Id={Id}, UnitId={UnitId}, AreaId={AreaId}",
                entity.Id, dto.UnitId, dto.AreaId);

        var created = await Query().FirstAsync(x => x.Id == entity.Id, ct);
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created.ToDto());
    }

    /// <summary>
    /// Видалити зв'язок підрозділ — РВЗ
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        var entity = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);

        if (entity == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        _set.Remove(entity);
        await _db.SaveChangesAsync(ct);

        if (_logger.IsEnabled(LogLevel.Information))
            _logger.LogInformation(
                "Видалено UnitAreas Id={Id}, UnitId={UnitId}, AreaId={AreaId}",
                id, entity.UnitId, entity.AreaId);

        return NoContent();
    }
}
