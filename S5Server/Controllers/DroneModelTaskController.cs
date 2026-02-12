using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Контролер для управління моделями БПЛА в завданнях підрозділів
/// </summary>
[ApiController]
[Route("api/drone-model-tasks")]
public class DroneModelTaskController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DroneModelTask> _set;
    private readonly ILogger<DroneModelTaskController> _logger;

    public DroneModelTaskController(
        MainDbContext db, 
        ILogger<DroneModelTaskController> logger)
    {
        _db = db;
        _set = db.Set<DroneModelTask>();
        _logger = logger;
    }

    private IQueryable<DroneModelTask> Query() =>
        _set.AsNoTracking()
            .Include(x => x.DroneModel);
        //.ThenInclude(t => t.DroneType);

    /// <summary>
    /// Отримати список моделей БПЛА з можливістю фільтрації
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<DroneModelTaskDto>>> GetAll(
        [FromQuery] string? unitTaskId,
        //[FromQuery] string? droneModelId,
        CancellationToken ct = default)
    {
        try
        {
            var query = Query()
                .Include(t => t.DroneModel.DroneType).AsQueryable();

            if (!string.IsNullOrWhiteSpace(unitTaskId))
                query = query.Where(x => x.UnitTaskId == unitTaskId);
            /*
            if (!string.IsNullOrWhiteSpace(droneModelId))
                query = query.Where(x => x.DroneModelId == droneModelId);
            */
            var list = await query
                .OrderBy(x => x.DroneModel.Value)
                .Select(x => x.ToDto())  // ✅ Extension-метод
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
                _logger.LogError(ex, "Помилка при отриманні списку DroneModelTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати модель БПЛА за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DroneModelTaskDto>> Get(
        string id, 
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest("id обов'язковий");

        try
        {
            //var entity = await Query()
            var entity = await Query()
                .Include(t => t.DroneModel.DroneType)
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (entity == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            return Ok(entity.ToDto());  // ✅ Extension-метод
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні DroneModelTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати всі моделі БПЛА для конкретного завдання підрозділу
    /// </summary>
    [HttpGet("by-unit-task/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<DroneModelTaskDto>>> GetByUnitTask(
        string unitTaskId,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(unitTaskId))
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var items = await Query()
                .Include(t => t.DroneModel.DroneType)
                .Where(x => x.UnitTaskId == unitTaskId)
                .OrderBy(x => x.DroneModel.Value)
                .Select(x => x.ToDto())  // ✅ Extension-метод
                .ToListAsync(ct);

            return Ok(items);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, 
                    "Помилка при отриманні DroneModelTask для UnitTaskId={UnitTaskId}", 
                    unitTaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити нову модель БПЛА для завдання
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<DroneModelTaskDto>> Create(
        [FromBody] DroneModelTaskUpSertDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.UnitTaskId))
            return BadRequest("UnitTaskId обов'язковий");

        if (string.IsNullOrWhiteSpace(dto.DroneModelId))
            return BadRequest("DroneModelId обов'язковий");

        if (dto.Quantity < 1)
            return BadRequest("Quantity має бути більше 0");

        try
        {
            // Перевірка існування UnitTask
            var unitTaskExists = await _db.UnitTasks
                .AnyAsync(ut => ut.Id == dto.UnitTaskId, ct);
            if (!unitTaskExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"UnitTask з ID '{dto.UnitTaskId}' не знайдено");

            // Перевірка існування DroneModel
            var droneModelExists = await _db.DictDroneModels
                .AnyAsync(dm => dm.Id == dto.DroneModelId, ct);
            if (!droneModelExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"DroneModel з ID '{dto.DroneModelId}' не знайдено");

            var entity = dto.FromCreateDto();  // ✅ Extension-метод
            _set.Add(entity);

            try
            {
                await _db.SaveChangesAsync(ct);

                var created = await Query()
                    .FirstAsync(x => x.Id == entity.Id, ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Створено DroneModelTask Id={Id}, UnitTaskId={UnitTaskId}, DroneModelId={DroneModelId}",
                        entity.Id, dto.UnitTaskId, dto.DroneModelId);

                return CreatedAtAction(
                    nameof(Get), 
                    new { id = created.Id }, 
                    created.ToDto());  // ✅ Extension-метод
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, 
                        "Конфлікт унікальності для DroneModelTask UnitTaskId={UnitTaskId} DroneModelId={DroneModelId}",
                        dto.UnitTaskId, dto.DroneModelId);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: "Ця модель БПЛА вже додана до завдання",
                    extensions: new Dictionary<string, object?> 
                    { 
                        ["unitTaskId"] = dto.UnitTaskId,
                        ["droneModelId"] = dto.DroneModelId
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
                _logger.LogError(ex, "Помилка при створенні DroneModelTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити модель БПЛА
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<DroneModelTaskDto>> Update(
        string id,
        [FromBody] DroneModelTaskUpSertDto dto,  // ✅ Використовуємо UpdateDto
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.DroneModelId))
            return BadRequest("DroneModelId обов'язковий");

        if (dto.Quantity < 1)
            return BadRequest("Quantity має бути більше 0");

        try
        {
            var entity = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (entity == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // ✅ Перевірка чи змінились дані
            if (entity.EqualsDto(dto))
                return Ok(entity.ToDto());

            entity.UpdateFrom(dto);  // ✅ Extension-метод

            try
            {
                await _db.SaveChangesAsync(ct);

                var updated = await Query()
                    .FirstAsync(x => x.Id == id, ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Оновлено DroneModelTask Id={Id}, Quantity={Quantity}",
                        id, dto.Quantity);

                return Ok(updated.ToDto());  // ✅ Extension-метод
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, 
                        "Конфлікт унікальності при оновленні DroneModelTask Id={Id}", id);

                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: "Ця модель БПЛА вже додана до завдання",
                    extensions: new Dictionary<string, object?> { ["id"] = id });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, 
                        "Конкурентний конфлікт при оновленні DroneModelTask Id={Id}", id);

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
                _logger.LogError(ex, "Помилка при оновленні DroneModelTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити модель БПЛА
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest("id обов'язковий");

        try
        {
            var entity = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            _set.Remove(entity);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Видалено DroneModelTask Id={Id}", id);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при видаленні DroneModelTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити всі моделі БПЛА для конкретного завдання
    /// </summary>
    [HttpDelete("by-unit-task/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<IActionResult> DeleteByUnitTask(
        string unitTaskId, 
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(unitTaskId))
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var entities = await _set
                .Where(x => x.UnitTaskId == unitTaskId)
                .ToListAsync(ct);

            if (entities.Count == 0)
                return NoContent();

            _set.RemoveRange(entities);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Видалено {Count} DroneModelTask для UnitTaskId={UnitTaskId}",
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
                    "Помилка при видаленні DroneModelTask для UnitTaskId={UnitTaskId}", 
                    unitTaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список моделей БПЛА для випадаючого списку
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
            var data = await _db.DictDroneModels
                .AsNoTracking()
                .Where(x => x.Value.Contains(term))
                .OrderBy(x => x.Value)
                .Take(limit)
                .Select(x => new LookupDto(x.Id, x.Value))
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
                _logger.LogError(ex, "Помилка в lookup DroneModel");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Масове збереження засобів ураження для завдання (Create/Update/Delete)
    /// </summary>
    [HttpPost("bulk-save/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<BulkSaveResult>> BulkSave(
        string unitTaskId,
        [FromBody] List<DroneModelTaskUpSertDto> dtos,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(unitTaskId))
            return BadRequest("unitTaskId обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        try
        {
            // 1. Перевірка існування UnitTask
            var unitTaskExists = await _db.UnitTasks
                .AnyAsync(ut => ut.Id == unitTaskId, ct);
            if (!unitTaskExists)
                return Problem(
                    statusCode: 404,
                    title: "Не знайдено",
                    detail: $"UnitTask з ID '{unitTaskId}' не знайдено");

            using var transaction = await _db.Database.BeginTransactionAsync(ct);
            try
            {
                // 2. Завантажити існуючі Means
                var existingMeans = await _set
                    .Where(m => m.UnitTaskId == unitTaskId)
                    .ToListAsync(ct);

                var incomingModelIds = dtos
                    .Select(d => d.DroneModelId)
                    .ToHashSet();

                // 3. DELETE: Видалити ті, яких немає у новому списку
                var toDelete = existingMeans
                    .Where(existing => !incomingModelIds.Contains(existing.DroneModelId))
                    .ToList();
                _set.RemoveRange(toDelete);

                var created = 0;
                var updated = 0;
                var deleted = toDelete.Count;

                // 4. CREATE/UPDATE: Додати нові або оновити існуючі
                foreach (var dto in dtos)
                {
                    // Перевірка існування DroneModel
                    var droneModelExists = await _db.DictDroneModels
                        .AnyAsync(dm => dm.Id == dto.DroneModelId, ct);
                    if (!droneModelExists)
                    {
                        await transaction.RollbackAsync(ct);
                        return Problem(
                            statusCode: 400,
                            title: "Невалідні дані",
                            detail: $"DroneModel з ID '{dto.DroneModelId}' не знайдено");
                    }

                    var existing = existingMeans
                        .FirstOrDefault(m => m.DroneModelId == dto.DroneModelId);

                    if (existing != null)
                    {
                        // UPDATE
                        if (existing.Quantity != dto.Quantity)
                        {
                            existing.Quantity = dto.Quantity;
                            updated++;
                        }
                    }
                    else
                    {
                        // CREATE
                        var newMean = new DroneModelTask
                        {
                            Id = Guid.NewGuid().ToString("D"),
                            UnitTaskId = unitTaskId,
                            DroneModelId = dto.DroneModelId,
                            Quantity = dto.Quantity
                        };
                        _set.Add(newMean);
                        created++;
                    }
                }

                await _db.SaveChangesAsync(ct);
                await transaction.CommitAsync(ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "BulkSave для UnitTaskId={UnitTaskId}: створено={Created}, оновлено={Updated}, видалено={Deleted}",
                        unitTaskId, created, updated, deleted);

                return Ok(new BulkSaveResult(
                    Success: true,
                    Created: created,
                    Updated: updated,
                    Deleted: deleted,
                    Total: created + updated));
            }
            catch (DbUpdateException ex)
            {
                await transaction.RollbackAsync(ct);

                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка БД при BulkSave UnitTaskId={UnitTaskId}", unitTaskId);

                return Problem(
                    statusCode: 500,
                    title: "Помилка збереження",
                    detail: "Не вдалося зберегти зміни");
            }
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при BulkSave UnitTaskId={UnitTaskId}", unitTaskId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}