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

    /// <summary>
    /// Контролер для управління знімками бійців у завданнях підрозділів
    /// </summary>
    public SoldierTaskController(
        MainDbContext db,
        ILogger<SoldierTaskController> logger)
    {
        _db = db;
        _set = _db.SoldierTasks;
        _logger = logger;
    }

    /// <summary>
    /// Отримати перелік бійців з:
    /// Підрозділу, якщо завдання не опубліковане (з актуальними даними Soldier)
    /// Snapshot, якщо завдання опубліковане (збережені дані Soldier на момент публікації)
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
                .Select(t => new { t.Id, t.IsPublished, t.UnitId })
                .FirstOrDefaultAsync(t => t.Id == unitTaskId, ct);
            if (unitTask is null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Завдання підрозділу з ID '{unitTaskId}' не знайдено");

            List<SoldierTaskDto> result = [];
            if (!unitTask.IsPublished)
            {
                result = await _db.Soldiers.GetUnionQuery(unitTask.UnitId)
                    .Select(s => s.ToSoldierTaskDto())
                    .ToListAsync(ct);
                return Ok(result);
            }

            result = await _set.AsNoTracking()
                .Where(s => s.UnitTaskId == unitTaskId)
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .ThenBy(s => s.RankShortValue)
                .Select(s => s.ToDto())
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
                _logger.LogError(ex, "Помилка при отриманні списку SoldierTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати перелік бійців підрозділу
    /// (для створення нового UnitTask)
    /// </summary>
    [HttpGet("by-unit/{unitId}")]
    [ProducesResponseType<IEnumerable<SoldierTaskDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<SoldierTaskDto>>> GetAllByUnitId(
        [FromRoute] Guid unitId,
        CancellationToken ct = default)
    {
        if (unitId == Guid.Empty)
            return BadRequest(new { Error = "unitId обов'язковий" });

        try
        {
            // ✅ Оптимізація: перевірка після запиту солдат
            var result = await _db.Soldiers.GetUnionQuery(unitId)
                .Select(s => s.ToSoldierTaskDto())
                .ToListAsync(ct);

            // ✅ Перевірка існування Unit тільки якщо нема солдат
            if (result.Count == 0)
            {
                var unitExists = await _db.Units
                    .AsNoTracking()
                    .AnyAsync(u => u.Id == unitId, ct);

                if (!unitExists)
                    return Problem(
                        statusCode: 404,
                        title: "Не знайдено",
                        detail: $"Підрозділ з ID '{unitId}' не знайдено");
            }

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні переліку SoldierTask для UnitId={UnitId}", unitId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати опубліковані завдання бійця за ID
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
            // Шукаємо тільки в опублікованих завданнях,
            // щоб не тягнути зайві дані Soldier для неопублікованих
            var result = await _set
                .AsNoTracking()
                .Include(s => s.UnitTask)
                .Where(s => s.SoldierId == id && s.UnitTask.IsPublished)
                .OrderByDescending(s => s.UnitTask.PublishedAtUtc)
                .ThenBy(s => s.ValidFrom)
                .Select(s => s.ToDto())
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
                _logger.LogError(ex, "Помилка при отриманні SoldierTask для SoldierId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити всіх бійців для конкретного завдання
    /// (тільки для неопублікованих завдань)
    /// </summary>
    [HttpDelete("by-unit-task/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> DeleteByUnitTask(
        [FromRoute] Guid unitTaskId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest(new { Error = "unitTaskId обов'язковий" });

        try
        {
            // ✅ Валідація бізнес-логіки: НЕ можна видаляти snapshot'и опублікованих завдань
            var unitTask = await _db.UnitTasks
                .AsNoTracking()
                .Select(t => new { t.Id, t.IsPublished })
                .FirstOrDefaultAsync(t => t.Id == unitTaskId, ct);

            if (unitTask is null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Завдання підрозділу з ID '{unitTaskId}' не знайдено");

            if (unitTask.IsPublished)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(
                        "Спроба видалення snapshot'ів для опублікованого завдання UnitTaskId={UnitTaskId}",
                        unitTaskId);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: "Не можна видаляти snapshot'и опублікованих завдань",
                    extensions: new Dictionary<string, object?>
                    {
                        ["unitTaskId"] = unitTaskId,
                        ["isPublished"] = true
                    });
            }

            var entities = await _set
                .Where(s => s.UnitTaskId == unitTaskId)
                .ToListAsync(ct);

            if (entities.Count == 0)
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Немає SoldierTask для видалення UnitTaskId={UnitTaskId}",
                        unitTaskId);
                return NoContent();
            }

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


