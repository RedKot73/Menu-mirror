using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/unit-tasks")]
public class UnitTaskController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<UnitTask> _set;
    private readonly ILogger<UnitTaskController> _logger;

    public UnitTaskController(MainDbContext db, ILogger<UnitTaskController> logger)
    {
        _db = db;
        _set = _db.UnitTasks;
        _logger = logger;
    }

    /// <summary>
    /// Отримати всі завдання підрозділів (БЕЗ деталей - Master-Detail)
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] Guid? dataSetId,
        [FromQuery] Guid? unitId,
        [FromQuery] Guid? taskId,
        CancellationToken ct = default)
    {
        try
        {
            // Базовий запит
            var baseQuery = _set.AsNoTracking()
                .Include(t => t.Task)
                .Include(t => t.Area)
                .AsQueryable();

            // Фільтри
            if (dataSetId.HasValueGuid())
                baseQuery = baseQuery.Where(t => t.DataSetId == dataSetId);

            if (unitId.HasValueGuid())
                baseQuery = baseQuery.Where(t => t.UnitId == unitId);

            if (taskId.HasValueGuid())
                baseQuery = baseQuery.Where(t => t.TaskId == taskId);

            // ✅ 1️⃣ Published: БЕЗ Unit (snapshot)
            var publishedQuery = baseQuery
                .Where(t => t.IsPublished)
                .OrderByDescending(t => t.PublishedAtUtc)
                .ThenByDescending(t => t.ValidFrom);

            // ✅ 2️⃣ Unpublished: З актуальними даними Unit
            var unpublishedQuery = baseQuery
                .Where(t => !t.IsPublished)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.Parent)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.AssignedUnit)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.UnitType)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.PersistentLocation)
                .OrderByDescending(t => t.ValidFrom);

            // ✅ Виконати запити + MeansCount одразу
            var published = await publishedQuery
                .Select(t => new
                {
                    Task = t,
                    MeansCount = _db.DroneModelTasks.Count(m => m.UnitTaskId == t.Id)
                })
                .ToListAsync(ct);

            var unpublished = await unpublishedQuery
                .Select(t => new
                {
                    Task = t,
                    MeansCount = _db.DroneModelTasks.Count(m => m.UnitTaskId == t.Id)
                })
                .ToListAsync(ct);

            // ✅ 3️⃣ Об'єднати (БЕЗ дублікатів, бо published != unpublished)
            var allTasks = published
                .Concat(unpublished)
                .OrderByDescending(x => x.Task.PublishedAtUtc ?? x.Task.ValidFrom)
                .ToList();

            // ✅ 4️⃣ ToDto з Smart Logic (автоматично вибирає snapshot/actual)
            var result = allTasks
                .Select(x => x.Task.ToDto(x.MeansCount))
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
                _logger.LogError(ex, "Помилка отримання списку завдань підрозділів");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати завдання підрозділу за ID (БЕЗ деталей)
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UnitTaskDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var task = await _set
                .AsNoTracking()
                .Include(t => t.Task)
                .Include(t => t.Area)
                .FirstOrDefaultAsync(t => t.Id == id, ct);

            if (task == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Завдання з ID '{id}' не знайдено");

            return Ok(task.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання завдання підрозділу Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити знімок підрозділу для завдання (опублікувати)
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UnitTaskDto>> CreateSnapshot(
        [FromBody] UnitTaskCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            // 1. Перевірка існування DataSet
            var dataSetExists = await _db.TemplateDataSets
                .AnyAsync(ds => ds.Id == dto.DataSetId, ct);
            if (!dataSetExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Набір даних з ID '{dto.DataSetId}' не знайдено");

            // 2. Перевірка існування Task
            var taskExists = await _db.DictUnitTasks
                .AnyAsync(t => t.Id == dto.TaskId, ct);
            if (!taskExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Завдання з ID '{dto.TaskId}' не знайдено");

            // 3. Перевірка існування Area
            var areaExists = await _db.DictAreas
                .AnyAsync(a => a.Id == dto.AreaId, ct);
            if (!areaExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Район виконання завдань з ID '{dto.AreaId}' не знайдено");

            // 4. Завантажити Unit зі всіма даними
            var unit = await _db.Units
                .AsNoTracking()
                .Include(u => u.Parent)
                .Include(u => u.AssignedUnit)
                .Include(u => u.UnitType)
                .Include(u => u.PersistentLocation)
                .FirstOrDefaultAsync(u => u.Id == dto.UnitId, ct);

            if (unit == null)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"Підрозділ з ID '{dto.UnitId}' не знайдено");

            // 5. Перевірити, чи немає вже активного завдання для цього підрозділу
            /*
            var existingTask = await _set
                .FirstOrDefaultAsync(t => t.UnitId == dto.UnitId && t.IsPublished, ct);

            if (existingTask != null)
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Спроба створити завдання для підрозділу, який вже має активне завдання. UnitId={UnitId}, ExistingTaskId={TaskId}",
                        dto.UnitId, existingTask.Id);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт",
                    detail: $"Підрозділ '{unit.ShortName}' вже має активне завдання (ID: {existingTask.Id})",
                    extensions: new Dictionary<string, object?>
                    {
                        ["unitId"] = dto.UnitId,
                        ["existingTaskId"] = existingTask.Id
                    });
            }
            */

            // 6. Створити знімок підрозділу
            var changedBy = User.Identity?.Name ?? "System";
            var unitTask = unit.CreateSnapshot(
                dto.DataSetId,
                dto.TaskId,
                dto.AreaId,
                changedBy);
            _set.Add(unitTask);

            // 7. Завантажити бійців підрозділу
            var soldiers = await _db.Soldiers
                .AsNoTracking()
                .Include(s => s.Unit)
                .Include(s => s.AssignedUnit)
                .Include(s => s.InvolvedUnit)
                .Include(s => s.Rank)
                .Include(s => s.Position)
                .Include(s => s.State)
                .Where(s => s.UnitId == dto.UnitId)
                .ToListAsync(ct);

            // 8. Створити знімки бійців
            var soldierTasks = soldiers
                .Select(s => s.CreateSnapshot(unitTask.Id, changedBy))
                .ToList();

            _db.SoldierTasks.AddRange(soldierTasks);

            // 9. Зберегти все разом
            try
            {
                await _db.SaveChangesAsync(ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Створено знімок підрозділу UnitId={UnitId}, TaskId={TaskId}, UnitTaskId={UnitTaskId}, Soldiers={SoldiersCount}",
                        dto.UnitId, dto.TaskId, unitTask.Id, soldiers.Count);

                // 10. Завантажити створений знімок з Task та Area
                var created = await _set
                    .AsNoTracking()
                    .Include(t => t.Task)
                    .Include(t => t.Area)
                    .FirstAsync(t => t.Id == unitTask.Id, ct);

                return CreatedAtAction(nameof(Get), new { id = created.Id }, created.ToDto());
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex,
                        "Конфлікт унікальності при створенні завдання UnitId={UnitId} TaskId={TaskId}",
                        dto.UnitId, dto.TaskId);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: "Завдання з такими параметрами вже існує",
                    extensions: new Dictionary<string, object?>
                    {
                        ["unitId"] = dto.UnitId,
                        ["taskId"] = dto.TaskId
                    });
            }
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні знімку підрозділу UnitId={UnitId} TaskId={TaskId}",
                    dto.UnitId, dto.TaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити завдання підрозділу (тільки статус публікації)
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] UnitTaskDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (id != dto.Id)
            return BadRequest("ID в URL не співпадає з ID в тілі запиту");

        try
        {
            var task = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (task == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Завдання з ID '{id}' не знайдено");

            if (task.IsEqualTo(dto))
                return Ok(task.ToDto());  // ✅ Повертаємо існуючі дані БЕЗ UPDATE

            // Оновити тільки статус публікації
            /*
            task.Publish(dto.IsPublished);
            */
            task.UpdateFromDto(dto, User.Identity?.Name ?? "System");

            try
            {
                await _db.SaveChangesAsync(ct);
                /*
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation("Оновлено завдання UnitTaskId={Id}, IsPublished={IsPublished}",
                        id, dto.IsPublished);
                */
                // Завантажити оновлений знімок
                var updated = await _set
                    .AsNoTracking()
                    .Include(t => t.Task)
                    .Include(t => t.Area)
                    .FirstAsync(x => x.Id == id, ct);

                return Ok(updated.ToDto());
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні завдання UnitTaskId={Id}", id);

                return Problem(statusCode: 409, title: "Конкурентний конфлікт");
            }
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні завдання UnitTaskId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити завдання підрозділу
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
            var task = await _set
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (task == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Завдання з ID '{id}' не знайдено");

            _set.Remove(task);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Видалено завдання UnitTaskId={Id}, UnitId={UnitId}", id, task.UnitId);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка видалення завдання UnitTaskId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Змінити статус публікації завдання
    /// </summary>
    [HttpPost("{id}/publish/{set_publish}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Publish(Guid id, bool set_publish, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("Id обов'язковий");

        try
        {
            var task = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (task == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Завдання з ID '{id}' не знайдено");

            task.Publish(set_publish);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Змінено статус публікації завдання UnitTaskId={Id}, IsPublished={IsPublished}",
                    id, set_publish);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка зміни статусу публікації завдання UnitTaskId={Id}", id);
            return Problem(statusCode: 500, title: "Помилка публікації завдання");
        }
    }
}