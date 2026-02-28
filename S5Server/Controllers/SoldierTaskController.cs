using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;

namespace S5Server.Controllers;

/// <summary>
/// Контролер для управління знімками бійців у завданнях підрозділів
/// </summary>
[Authorize]
[ApiController]
[Route("api/soldier-tasks")]
public class SoldierTaskController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<SoldierTask> _set;
    private readonly ILogger<SoldierTaskController> _logger;

    public SoldierTaskController(
        MainDbContext db,
        ILogger<SoldierTaskController> logger)
    {
        _db = db;
        _set = _db.SoldierTasks;
        _logger = logger;
    }

    /// <summary>
    /// Отримати список бійців з можливістю фільтрації
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<SoldierTaskDto>>> GetAll(
        [FromQuery] Guid unitTaskId,
        //[FromQuery] string? unitId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var unitTask = await _db.UnitTasks
                .AsNoTracking()
                .Select(t => new { t.Id, t.IsPublished })
                .FirstOrDefaultAsync(t => t.Id == unitTaskId, ct);
            if (unitTask is null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Завдання підрозділу з ID '{unitTaskId}' не знайдено");

            var query = _set.AsNoTracking();//.AsQueryable();
            if (!unitTask.IsPublished)
            {
                // ✅ Unpublished: завантажити актуальні дані Soldier
                query = query
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.Unit)
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.AssignedUnit)
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.InvolvedUnit)
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.Rank)
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.Position)
                    .Include(s => s.Soldier)
                        .ThenInclude(soldier => soldier.State);
            }

            var items = await query
                .Where(s => s.UnitTaskId == unitTaskId)
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .ThenBy(s => s.RankShortValue)
                .ToListAsync(ct);

            // 4️⃣ ToDto з Smart Logic
            var result = items
                .Select(s => s.ToDto(unitTask.IsPublished))  // ✅ Передаємо IsPublished
                .ToList();

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні списку SoldierTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати список бійців з можливістю фільтрації
    /// для не збереженого UnitTask по unitId
    /// </summary>
    [HttpGet("by-unit/{unitId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<SoldierTaskDto>>> GetAllByUnitId(
        Guid unitId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        try
        {
            // ✅ Перевірка існування Unit
            var unitExists = await _db.Units
                .AsNoTracking()
                .AnyAsync(u => u.Id == unitId, ct);

            if (!unitExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Підрозділ з ID '{unitId}' не знайдено");

            var query = SoldierService.GetQuery(_db.Soldiers);

            var items = await query
                .Where(s => s.UnitId == unitId)
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .ThenBy(s => s.Rank.ShortValue)
                .ToListAsync(ct);

            // 4️⃣ ToDto з Smart Logic
            var result = items
                .Select(s => s.ToDto())
                .ToList();

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні списку SoldierTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати бійця за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<List<SoldierTaskDto>>> Get(
        Guid id,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            // ✅ 1️⃣ Published: БЕЗ Soldier (snapshot)
            var publishedQuery = _set
                .AsNoTracking()
                .Include(s => s.UnitTask)
                .Where(s => s.SoldierId == id && s.UnitTask.IsPublished)
                .OrderByDescending(s => s.UnitTask.PublishedAtUtc)
                .ThenBy(s => s.ValidFrom);

            // ✅ 2️⃣ Unpublished: З актуальними даними Soldier
            var unpublishedQuery = _set
                .AsNoTracking()
                .Include(s => s.UnitTask)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.Unit)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.AssignedUnit)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.InvolvedUnit)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.Rank)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.Position)
                .Include(s => s.Soldier)
                    .ThenInclude(soldier => soldier!.State)
                .Where(s => s.SoldierId == id && !s.UnitTask.IsPublished)
                .OrderByDescending(s => s.ValidFrom);

            // ✅ Виконати запити
            var published = await publishedQuery.ToListAsync(ct);
            var unpublished = await unpublishedQuery.ToListAsync(ct);

            if (published.Count == 0 && unpublished.Count == 0)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Не знайдено завдань для бійця з SoldierId='{id}'");

            // ✅ 3️⃣ Об'єднати з Smart Logic
            var result = published
                .Select(s => s.ToDto(isPublished: true))
                .Concat(unpublished.Select(s => s.ToDto(isPublished: false)))
                .OrderByDescending(dto => dto.ValidFrom)
                .ToList();

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні SoldierTask для SoldierId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити всіх бійців для конкретного завдання
    /// </summary>
    [HttpDelete("by-unit-task/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteByUnitTask(
        Guid unitTaskId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var entities = await _set
                .Where(s => s.UnitTaskId == unitTaskId)
                .ToListAsync(ct);

            if (entities.Count == 0)
                return NoContent();

            _set.RemoveRange(entities);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Видалено {Count} SoldierTask для UnitTaskId={UnitTaskId}",
                    entities.Count, unitTaskId);

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
                    "Помилка при видаленні SoldierTask для UnitTaskId={UnitTaskId}",
                    unitTaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати кількість бійців для завдання
    /// </summary>
    [HttpGet("count/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<SoldierCountDto>> GetCount(
        Guid unitTaskId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var count = await _set
                .CountAsync(s => s.UnitTaskId == unitTaskId, ct);

            return Ok(new SoldierCountDto(unitTaskId, count));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex,
                    "Помилка при підрахунку SoldierTask для UnitTaskId={UnitTaskId}",
                    unitTaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}


