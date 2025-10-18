using System.Text.Json;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/templ_data")]
    public class TemplateDataSetController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<TemplateDataSet> _set;
        private readonly ILogger<DocumentTemplatesController> _logger;

        public TemplateDataSetController(MainDbContext db, TemplateRenderer renderer, ILogger<DocumentTemplatesController> logger)
        {
            _db = db;
            _set = _db.TemplateDataSets;
            _logger = logger;
        }

        [HttpGet("{id}/data-sets")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDataSets(string id, CancellationToken ct = default)
        {
            try
            {
                var items = await _set.AsNoTracking()
                    .Where(t => t.TemplateId == id)
                    .OrderBy(t => t.Name)
                    .ThenByDescending(t => t.CreatedAtUtc)
                    .Select(t => TemplateDataSetDto.ToDto(t))
                    .ToListAsync(ct);

                return Ok(items);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка получения наборов данных TemplateId={TemplateId}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("{id}/data-sets")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> CreateDataSet(string id, [FromBody] TemplateDataSetCreateDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            try
            {
                // Валидация JSON
                try 
                { JsonDocument.Parse(dto.DataJson); }
                catch
                {
                    return Problem(statusCode: 400, title: "Некорректный JSON");
                }

                var ds = new TemplateDataSet
                {
                    TemplateId = id,
                    Name = dto.Name.Trim(),
                    DataJson = dto.DataJson,
                    CreatedAtUtc = DateTime.UtcNow
                };
                _set.Add(ds);
                try
                {
                    await _db.SaveChangesAsync(ct);
                    return Ok(new { ds.Id, ds.Name, ds.CreatedAtUtc });
                }
                catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
                {
                    _logger.LogInformation(ex, "Конфликт уникальности набора данных Name={Name} TemplateId={TemplateId}", ds.Name, id);
                    return Problem(
                        statusCode: 409,
                        title: "Конфликт уникальности",
                        detail: $"Набор данных с именем \"{ds.Name}\" уже существует.",
                        extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = ds.Name });
                }
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка создания набора данных TemplateId={TemplateId}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpGet("data-sets/{dataSetId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDataSet(string dataSetId, CancellationToken ct = default)
        {
            try
            {
                var ds = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == dataSetId, ct);
                if (ds == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"DataSetId={dataSetId}");

                return Ok(TemplateDataSetDto.ToDto(ds));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка получения набора данных DataSetId={DataSetId}", dataSetId);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPut("data-sets/{dataSetId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> UpdateDataSet(string dataSetId,
            [FromBody] TemplateDataSetCreateDto dto, CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            try
            {
                var ds = await _db.TemplateDataSets
                    .AsTracking()
                    .FirstOrDefaultAsync(x => x.Id == dataSetId, ct);

                if (ds == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"DataSetId={dataSetId}");

                // (Опционально) не позволяем менять TemplateId набора
                if (!string.IsNullOrWhiteSpace(dto.TemplateId) && !string.Equals(dto.TemplateId, ds.TemplateId, StringComparison.Ordinal))
                    return Problem(statusCode: 400, title: "Некорректные данные", detail: "TemplateId не совпадает с набором данных.");

                // Валидация JSON
                try { JsonDocument.Parse(dto.DataJson); }
                catch
                {
                    return Problem(statusCode: 400, title: "Некорректный JSON");
                }

                var publishStateChanged = ds.IsPublished != dto.IsPublished;

                ds.Name = dto.Name.Trim();
                ds.DataJson = dto.DataJson.Trim();
                ds.IsPublished = dto.IsPublished;

                if (publishStateChanged)
                    ds.PublishedAtUtc = dto.IsPublished ? DateTime.UtcNow : null;

                ds.UpdatedAtUtc = DateTime.UtcNow;

                try
                {
                    await _db.SaveChangesAsync(ct);
                    return Ok(TemplateDataSetDto.ToDto(ds));
                }
                catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
                {
                    _logger.LogInformation(ex, "Конфликт уникальности набора данных при обновлении Name={Name} DataSetId={DataSetId}", ds.Name, dataSetId);
                    return Problem(
                        statusCode: 409,
                        title: "Конфликт уникальности",
                        detail: $"Набор данных с именем \"{ds.Name}\" уже существует.",
                        extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = ds.Name });
                }
                catch (DbUpdateConcurrencyException ex)
                {
                    _logger.LogWarning(ex, "Конкурентный конфликт при обновлении набора данных DataSetId={DataSetId}", dataSetId);
                    return Problem(statusCode: 409, title: "Конкурентный конфликт");
                }
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении набора данных DataSetId={DataSetId}", dataSetId);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpDelete("data-sets/{dataSetId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDataSet(string dataSetId, CancellationToken ct = default)
        {
            try
            {
                var ds = await _set
                    .FirstOrDefaultAsync(x => x.Id == dataSetId, ct);
                if (ds == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"DataSetId={dataSetId}");

                _set.Remove(ds);
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка удаления набора данных DataSetId={DataSetId}", dataSetId);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

    }
}
