using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;
using System.Data;

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

    private IQueryable<UnitTask> BaseQuery()
        => _set.AsNoTracking()
            .Include(t => t.Task)
            .Include(t => t.Area)
            .AsQueryable();

    /// <summary>
    /// Отримати всі завдання підрозділів
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] Guid? dataSetId,
        CancellationToken ct = default)
    {
        try
        {
            var baseQuery = BaseQuery();
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
            var task = await BaseQuery()
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
    /// Отримати чернову версію завдання підрозділу для дозаповнення користувачем
    /// </summary>
    /// <param name="dataSetId">ID набору даних</param>
    /// <param name="unitId">ID підрозділу</param>
    /// <param name="ct">Токен скасування</param>
    [HttpGet("add-unit-task")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<UnitTaskDto>> AddUnitTask(
        [FromQuery] Guid dataSetId,
        [FromQuery] Guid unitId,
        CancellationToken ct = default)
    {
        if (dataSetId == Guid.Empty)
            return BadRequest("dataSetId обов'язковий");
        if (unitId == Guid.Empty)
            return BadRequest("unitId обов'язковий");

        try
        {
            var changedBy = User.Identity?.Name ?? "Unknown";
            var (error, unitTask) = await BuildUnitTaskAsync(
                dataSetId, unitId,
                ControllerFunctions.NotSetGuid,
                ControllerFunctions.NotSetGuid,
                changedBy, ct);
            if (error != null) return error;

            return Ok(unitTask!.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання чернетки завдання UnitId={UnitId}", unitId);
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

        var dataSetExists = await _db.TemplateDataSets
            .AnyAsync(ds => ds.Id == dto.DataSetId, ct);
        if (!dataSetExists)
            return Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Набір даних з ID '{dto.DataSetId}' не знайдено");

        try
        {
            var changedBy = User.Identity?.Name ?? "Unknown";
            var (error, unitTask) = await BuildUnitTaskAsync(
                dto.DataSetId, dto.UnitId, dto.TaskId, dto.AreaId, changedBy, ct);
            if (error != null) return error;

            _set.Add(unitTask!);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Створено знімок підрозділу UnitId={UnitId}, TaskId={TaskId}, UnitTaskId={UnitTaskId}",
                    dto.UnitId, dto.TaskId, unitTask!.Id);

            var created = (await BaseQuery()
                .FirstAsync(t => t.Id == unitTask!.Id, ct)).ToDto();

            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
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
    /// Upsert завдання підрозділу: оновлює якщо існує, створює якщо ні
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status201Created)]
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

        var dataSetExists = await _db.TemplateDataSets
            .AnyAsync(ds => ds.Id == dto.DataSetId, ct);
        if (!dataSetExists)
            return (Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Набір даних з ID '{dto.DataSetId}' не знайдено"));

        var changedBy = User.Identity?.Name ?? "Unknown";

        try
        {
            var ds = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            var isNew = ds == null;
            if (isNew)
            {
                // CREATE path (upsert)
                var (error, newTask) = await BuildUnitTaskAsync(
                    dto.DataSetId, dto.UnitId, dto.TaskId, dto.AreaId, changedBy, ct);
                if (error != null) return error;

                newTask!.Id = id;
                _set.Add(newTask);
            }
            else
            {
                // UPDATE path
                if (ds!.IsEqualTo(dto))
                    return NoContent();

                ds!.UpdateFromDto(dto, changedBy);
            }
            await _db.SaveChangesAsync(ct);
            if (_logger.IsEnabled(LogLevel.Information))
                if (isNew)
                {
                    _logger.LogInformation(
                        "Upsert (CREATE) знімок підрозділу UnitId={UnitId}, TaskId={TaskId}, UnitTaskId={UnitTaskId}",
                        dto.UnitId, dto.TaskId, id);
                }
                else
                {
                    _logger.LogInformation(
                        "Upsert (UPDATE) знімок підрозділу UnitId={UnitId}, TaskId={TaskId}, UnitTaskId={UnitTaskId}",
                        dto.UnitId, dto.TaskId, id);
                }

            var result = (await BaseQuery().FirstAsync(x => x.Id == id, ct)).ToDto();
            return isNew ? CreatedAtAction(nameof(Get), new { id }, result) : Ok(result);
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex,
                    "Конфлікт унікальності при upsert завдання UnitId={UnitId} TaskId={TaskId}",
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
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні завдання UnitTaskId={Id}", id);

            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при upsert завдання UnitTaskId={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Validates related entities and builds a <see cref="UnitTask"/> snapshot from a <see cref="Unit"/>.
    /// Returns an error result if any referenced entity is not found.
    /// </summary>
    private async Task<(ActionResult? Error, UnitTask? Entity)> BuildUnitTaskAsync(
        Guid dataSetId, Guid unitId, Guid taskId, Guid areaId,
        string changedBy, CancellationToken ct)
    {
        /*
        var dataSetExists = await _db.TemplateDataSets
            .AnyAsync(ds => ds.Id == dataSetId, ct);
        if (!dataSetExists)
            return (Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Набір даних з ID '{dataSetId}' не знайдено"), null);
        */
        //DataSet не проверяем, он может быть еще не сохранен

        var task = await _db.DictUnitTasks
            .AsTracking()
            .FirstOrDefaultAsync(t => t.Id == taskId, ct);
        if (task == null)
            return (Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Завдання з ID '{taskId}' не знайдено"), null);

        var area = await _db.DictAreas
            .AsTracking()
            .FirstOrDefaultAsync(a => a.Id == areaId, ct);
        if (area == null)
            return (Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Район виконання завдань з ID '{areaId}' не знайдено"), null);

        var unit = await _db.Units
            .AsTracking()
            .QueryWithIncludes()
            .FirstOrDefaultAsync(u => u.Id == unitId, ct);
        if (unit == null)
            return (Problem(statusCode: 404, title: "Не знайдено",
                detail: $"Підрозділ з ID '{unitId}' не знайдено"), null);

        var entity = unit.Create(dataSetId, task, area, changedBy);
        return (null, entity);
    }

    /// <summary>
    /// Видалити завдання підрозділу
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
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
            if(task.IsPublished)
                return Problem(statusCode: 400, title: "Неможливо видалити опубліковане завдання");

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