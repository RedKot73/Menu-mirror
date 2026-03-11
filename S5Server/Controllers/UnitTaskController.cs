using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Предоставляет API-контроллер для управления задачами подразделений, включая получение, создание, обновление,
/// удаление и публикацию задач. Доступ к методам контроллера ограничен авторизацией.
/// </summary>
/// <remarks>Контроллер реализует RESTful интерфейс для работы с задачами подразделений. Все методы требуют
/// авторизации пользователя. Для получения и управления задачами используются стандартные HTTP методы. Контроллер
/// поддерживает фильтрацию, обработку ошибок и логирование. Используйте методы контроллера для интеграции с внешними
/// системами или пользовательскими интерфейсами, где требуется управление задачами подразделений.</remarks>
[Authorize]
[ApiController]
[Route("api/unit-tasks")]
public class UnitTaskController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<UnitTask> _set;
    private readonly ILogger<UnitTaskController> _logger;

    /// <summary>
    /// Предоставляет API-контроллер для управления задачами подразделений, включая получение, создание, обновление,
    /// удаление и публикацию задач. Доступ к методам контроллера ограничен авторизацией.
    /// </summary>
    /// <remarks>Контроллер реализует RESTful интерфейс для работы с задачами подразделений. Все методы требуют
    /// авторизации пользователя. Для получения и управления задачами используются стандартные HTTP методы. Контроллер
    /// поддерживает фильтрацию, обработку ошибок и логирование. Используйте методы контроллера для интеграции с внешними
    /// системами или пользовательскими интерфейсами, где требуется управление задачами подразделений.</remarks>
    public UnitTaskController(MainDbContext db, ILogger<UnitTaskController> logger)
    {
        _db = db;
        _set = _db.UnitTasks;
        _logger = logger;
    }

    /// <summary>
    /// Отримати всі завдання підрозділів
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] Guid? dataSetId,
        //[FromQuery] Guid? unitId,
        //[FromQuery] Guid? taskId,
        CancellationToken ct = default)
    {
        try
        {
            var baseQuery = _set.AsNoTracking()
                .Include(t => t.Task)
                .Include(t => t.Area)
                .AsQueryable();
            if (dataSetId.HasValueGuid())
                baseQuery = baseQuery.Where(t => t.DataSetId == dataSetId);

            var qry1 = await baseQuery
                .Where(t => t.IsPublished)
                .Select(t => t.ToDto())
                .ToListAsync(ct)
                ;
            var qry2 = await baseQuery
                .Where(t => !t.IsPublished)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.Parent)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.AssignedUnit)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.UnitType)
                .Include(t => t.Unit)
                    .ThenInclude(u => u.PersistentLocation)
                .Select(t => t.ToDto())
                .ToListAsync(ct)
                ;

            var result = qry1.Union(qry2)
                .OrderByDescending(t => t.PublishedAtUtc)
                .ThenByDescending(t => t.ValidFrom)
                ;
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
    /// Отримати завдання підрозділу за ID
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
                .ThenInclude(t => t.WithMeans)
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
    /// Створити завдання - знімок підрозділу
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<UnitTaskDto>> Create(
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
            var task = await _db.DictUnitTasks.AsNoTracking()
                .Where(t => t.Id == dto.TaskId)
                .FirstOrDefaultAsync(t => t.Id == dto.TaskId, ct);
            if (task == null)
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

            var changedBy = User.Identity?.Name ?? "Unknown";
            // 6. Створити знімок підрозділу
            var unitTask = unit.Create(
                task,
                dto.DataSetId,
                dto.AreaId,
                changedBy);
            _set.Add(unitTask);
            /*
            // 7. Завантажити бійців підрозділу
            var soldiers = await _db.Soldiers.GetUnionQuery(dto.UnitId)
                .ToListAsync(ct);

            // 8. Створити знімки бійців
            var soldierTasks = soldiers
                .Select(s => s.CreateSnapshot(unitTask.Id, changedBy))
                .ToList();

            _db.SoldierTasks.AddRange(soldierTasks);
            */
            // 9. Зберегти все разом
            try
            {
                await _db.SaveChangesAsync(ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Створено знімок підрозділу UnitId={UnitId}, TaskId={TaskId}, UnitTaskId={UnitTaskId}",
                        dto.UnitId, dto.TaskId, unitTask.Id);

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
                return NoContent();

            // Оновити тільки статус публікації
            /*
            task.Publish(dto.IsPublished);
            */
            task.UpdateFromDto(dto, User.Identity?.Name ?? "System");

            try
            {
                await _db.SaveChangesAsync(ct);

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

            var changedBy = User.Identity?.Name ?? "Unknown";
            await task.DeleteSoldierSnapshot(_db, changedBy, ct);

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

            var changedBy = User.Identity?.Name ?? "Unknown";
            task.Publish(set_publish, changedBy);
            if (task.IsPublished)
            {
                await task.CreateSoldierSnapshot(_db, changedBy, ct);
            }
            else
            {
                await task.DeleteSoldierSnapshot(_db, changedBy, ct);
            }
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