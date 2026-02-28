using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/templ_data")]
public class TemplateDataSetController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<TemplateDataSet> _set;
    private readonly ILogger<TemplateDataSetController> _logger;

    public TemplateDataSetController(MainDbContext db, 
        ILogger<TemplateDataSetController> logger)
    {
        _db = db;
        _set = _db.TemplateDataSets;
        _logger = logger;
    }

    /// <summary>
    /// Отримати всі набори даних (БЕЗ деталей)
    /// </summary>
    [HttpGet("data-sets")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll(
        [FromQuery] bool? isPublished,
        CancellationToken ct = default)
    {
        try
        {
            var query = _set.AsNoTracking();

            if (isPublished.HasValue)
                query = query.Where(ds => ds.IsPublished == isPublished.Value);

            var items = await query
                .OrderByDescending(t => t.DocDate)
                .ThenByDescending(t => t.CreatedAtUtc)
                .Select(ds => ds.ToDto())
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
                _logger.LogError(ex, "Помилка отримання наборів даних\n{Err}", ex.Message);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити новий набір даних
    /// </summary>
    [HttpPost("data-sets")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> CreateDataSet(
        [FromBody] TemplateDataSetUpSertDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        // ✅ Валідація через extension-метод
        var (isValid, errorMessage) = dto.ValidateParentDoc();
        if (!isValid)
            return BadRequest(errorMessage);

        try
        {
            // ✅ Створення через extension-метод
            var ds = dto.FromCreateDto(User.Identity?.Name ?? "System");
            _set.Add(ds);

            try
            {
                await _db.SaveChangesAsync(ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Створено набір даних DataSetId={Id}, Name={Name}, DocNumber={DocNumber}",
                        ds.Id, ds.Name, ds.DocNumber);

                return CreatedAtAction(
                    nameof(GetDataSet), 
                    new { dataSetId = ds.Id }, 
                    ds.ToDto());
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, "Конфлікт унікальності набору даних Name={Name}", ds.Name);
                
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: $"Набір даних з іменем \"{ds.Name}\" вже існує.",
                    extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = ds.Name });
            }
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка створення набору даних");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати набір даних за ID (БЕЗ деталей)
    /// </summary>
    [HttpGet("data-sets/{dataSetId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetDataSet(Guid dataSetId, CancellationToken ct = default)
    {
        try
        {
            var ds = await _set
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == dataSetId, ct);

            if (ds == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"DataSetId={dataSetId}");

            return Ok(ds.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка отримання набору даних DataSetId={DataSetId}", dataSetId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити набір даних
    /// </summary>
    [HttpPut("data-sets/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> UpdateDataSet(
        Guid id,
        [FromBody] TemplateDataSetUpSertDto dto, 
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("ID обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var (isValid, errorMessage) = dto.ValidateParentDoc();
        if (!isValid)
            return BadRequest(errorMessage);

        try
        {
            var ds = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (ds == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"DataSetId={id}");

            // ✅ ПЕРЕВІРКА ЧИ ЗМІНИЛИСЬ ДАНІ
            if (ds.IsEqualTo(dto))
            {
                /*
                if (_logger.IsEnabled(LogLevel.Debug))
                    _logger.LogDebug("Дані не змінились DataSetId={DataSetId}, пропускаємо оновлення", dataSetId);
                */
                return Ok(ds.ToDto());  // ✅ Повертаємо існуючі дані БЕЗ UPDATE
            }

            ds.UpdateFrom(dto, User.Identity?.Name ?? "System");

            try
            {
                await _db.SaveChangesAsync(ct);

                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(
                        "Оновлено набір даних DataSetId={Id}, IsPublished={IsPublished}",
                        id, dto.IsPublished);

                return Ok(ds.ToDto());
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, 
                        "Конфлікт унікальності набору даних при оновленні Name={Name} DataSetId={DataSetId}", 
                        ds.Name, id);
                
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: $"Набір даних з іменем \"{ds.Name}\" вже існує.",
                    extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = ds.Name });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні набору даних DataSetId={DataSetId}", id);
                
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
                _logger.LogError(ex, "Помилка при оновленні набору даних DataSetId={DataSetId}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити набір даних
    /// </summary>
    [HttpDelete("data-sets/{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteDataSet(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("ID обов'язковий");
        try
        {
            var ds = await _set
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            
            if (ds == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"DataSetId={id}");

            _set.Remove(ds);
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation("Видалено набір даних DataSetId={DataSetId}", id);

            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка видалення набору даних DataSetId={DataSetId}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Змінити статус публікації
    /// </summary>
    [HttpPost("data-sets/{id}/publish/{set_publish}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Publish(Guid id, bool set_publish, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("ID обов'язковий");
        try
        {
            var ds = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            
            if (ds == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // ✅ Публікація через extension-метод
            ds.Publish(set_publish, User.Identity?.Name ?? "System");
            await _db.SaveChangesAsync(ct);

            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(
                    "Змінено статус публікації набору даних Id={Id}, IsPublished={IsPublished}",
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
                _logger.LogError(ex, "Помилка публікації даних документа Id={Id}", id);
            return Problem(statusCode: 500, title: "Помилка публікації даних документа");
        }
    }

    /// <summary>
    /// Отримати список з кількістю завдань
    /// </summary>
    [HttpGet("data-sets/with-counts")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllWithCounts(
        [FromQuery] bool? isPublished,
        CancellationToken ct = default)
    {
        try
        {
            var query = _set.AsNoTracking();

            if (isPublished.HasValue)
                query = query.Where(ds => ds.IsPublished == isPublished.Value);

            var items = await query
                .Select(ds => new 
                {
                    ds.Id,
                    ds.Name,
                    ds.DocNumber,
                    ds.DocDate,
                    ds.IsPublished,
                    ds.PublishedAtUtc,
                    ds.CreatedAtUtc,
                    ds.ValidFrom,
                    UnitTasksCount = _db.UnitTasks.Count(ut => ut.DataSetId == ds.Id)
                })
                .OrderByDescending(t => t.DocDate)
                .ThenByDescending(t => t.CreatedAtUtc)
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
                _logger.LogError(ex, "Помилка отримання наборів даних з лічильниками");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}
