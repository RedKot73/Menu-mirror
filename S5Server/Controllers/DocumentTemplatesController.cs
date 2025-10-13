using System.Text;
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
    [Route("api/templates")]
    public class DocumentTemplatesController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<DocumentTemplate> _docTempl;
        private readonly DbSet<TemplateDataSet> _templDataSets;
        private readonly TemplateRenderer _renderer;
        private readonly ILogger<DocumentTemplatesController> _logger;

        public DocumentTemplatesController(MainDbContext db, TemplateRenderer renderer, ILogger<DocumentTemplatesController> logger)
        {
            _db = db;
            _docTempl = _db.DocumentTemplates;
            _templDataSets = _db.TemplateDataSets;
            _renderer = renderer;
            _logger = logger;
        }

        public record TemplateListItem(string Id, string Name, string? Description, string Format, DateTime CreatedAtUtc, DateTime UpdatedAtUtc);
        public record CreateTemplateDto(string Name, string? Description, string Format);
        public record DataSetCreateDto(string Name, string DataJson);
        public record RenderRequest(string? DataJson, string Export /* html|txt|docx|pdf */);

        // Новый: запрос экспорта уже готового HTML от клиента
        public record ClientHtmlExportRequest(string Name, string Html, string Export /* html|txt|pdf|docx*/);

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TemplateListItem>>> GetList(CancellationToken ct = default)
        {
            try
            {
                var list = await _docTempl.AsNoTracking()
                    .OrderByDescending(t => t.UpdatedAtUtc)
                    .Select(t => new TemplateListItem(
                        t.Id, t.Name, t.Description, t.Format, t.CreatedAtUtc, t.UpdatedAtUtc))
                    .ToListAsync(ct);

                return Ok(list);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении списка шаблонов");
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TemplateListItem>> GetById(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);

                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                return Ok(new TemplateListItem(
                    t.Id, t.Name, t.Description, t.Format, t.CreatedAtUtc, t.UpdatedAtUtc));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost]
        [RequestSizeLimit(50_000_000)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TemplateListItem>> Create(
            [FromForm] CreateTemplateDto dto,
            [FromForm] IFormFile file,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (file is null || file.Length == 0)
                return Problem(statusCode: 400, title: "Файл шаблона не передан");

            var format = dto.Format?.Trim().ToLowerInvariant();
            if (format is not ("html" or "txt" or "docx"))
                return Problem(statusCode: 400, title: "Поддерживаемые форматы: html, txt, docx");

            try
            {
                using var ms = new MemoryStream();
                await file.CopyToAsync(ms, ct);

                var entity = new DocumentTemplate
                {
                    Name = dto.Name.Trim(),
                    Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                    ContentType = file.ContentType ?? DocumentTemplate.GetContentTypeByFormat(format),
                    Format = format!,
                    Content = ms.ToArray(),
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow
                };

                _docTempl.Add(entity);
                await _db.SaveChangesAsync(ct);

                return CreatedAtAction(nameof(GetById), new { id = entity.Id },
                    new TemplateListItem(entity.Id, entity.Name, entity.Description, entity.Format, entity.CreatedAtUtc, entity.UpdatedAtUtc));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                _logger.LogInformation(ex, "Конфликт уникальности при создании шаблона Name={Name}", dto.Name);
                return Problem(statusCode: 409, title: "Конфликт уникальности", detail: $"Шаблон с именем \"{dto.Name}\" уже существует.");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogWarning(ex, "Конкурентный конфликт при создании шаблона Name={Name}", dto.Name);
                return Problem(statusCode: 409, title: "Конкурентный конфликт");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Неизвестная ошибка при создании шаблона Name={Name}", dto.Name);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPut("{id}")]
        [RequestSizeLimit(50_000_000)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Update(
            string id,
            [FromForm] CreateTemplateDto dto,
            [FromForm] IFormFile? file,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var t = await _docTempl.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

            t.Name = dto.Name.Trim();
            t.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();

            if (!string.IsNullOrWhiteSpace(dto.Format))
            {
                var format = dto.Format.Trim().ToLowerInvariant();
                if (format is not ("html" or "txt" or "docx"))
                    return Problem(statusCode: 400, title: "Поддерживаемые форматы: html, txt, docx");
                t.Format = format;
                // При смене формата корректируем content-type
                if (file == null)
                    t.ContentType = DocumentTemplate.GetContentTypeByFormat(t.Format);
            }

            if (file != null && file.Length > 0)
            {
                using var ms = new MemoryStream();
                await file.CopyToAsync(ms, ct);
                t.ContentType = file.ContentType ?? DocumentTemplate.GetContentTypeByFormat(t.Format);
                t.Content = ms.ToArray();
            }

            t.UpdatedAtUtc = DateTime.UtcNow;

            try
            {
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                _logger.LogInformation(ex, "Конфликт уникальности при обновлении шаблона Id={Id} Name={Name}", id, dto.Name);
                return Problem(statusCode: 409, title: "Конфликт уникальности", detail: $"Шаблон с именем \"{dto.Name}\" уже существует.");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                _logger.LogWarning(ex, "Конкурентный конфликт при обновлении шаблона Id={Id}", id);
                return Problem(statusCode: 409, title: "Конкурентный конфликт");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при обновлении шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                _docTempl.Remove(t);
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при удалении шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpGet("{id}/download")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Download(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");
                return File(t.Content, t.ContentType);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при выдаче файла шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("{id}/preview/html")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces("text/html")]
        public async Task<IActionResult> PreviewHtml(string id,
            [FromBody] RenderRequest request, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var format = TemplateRenderer.ParseFormat(t.Format);
                var dataJson = request?.DataJson ?? "{}";

                if (format == TemplateRenderer.TemplateFormat.Docx)
                {
                    var merged = _renderer.RenderDocx(t.Content, _renderer.ParseJsonToDict(dataJson));
                    var html = _renderer.DocxToHtml(merged);
                    return Content(html, "text/html; charset=utf-8");
                }

                if (format == TemplateRenderer.TemplateFormat.Txt)
                {
                    var txt = _renderer.RenderTxt(t.Content, _renderer.ParseJsonToDict(dataJson));
                    var html = $"<pre>{System.Net.WebUtility.HtmlEncode(System.Text.Encoding.UTF8.GetString(txt))}</pre>";
                    return Content(html, "text/html; charset=utf-8");
                }

                var bytes = _renderer.RenderHtml(t.Content, _renderer.ParseJsonToDict(dataJson));
                return Content(System.Text.Encoding.UTF8.GetString(bytes), "text/html; charset=utf-8");
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка предпросмотра шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("{id}/export")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Export(string id,
            [FromBody] RenderRequest request, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var format = TemplateRenderer.ParseFormat(t.Format);
                var export = (request?.Export ?? "html").ToLowerInvariant();
                var dataJson = request?.DataJson ?? "{}";

                // Сохраняю текущий вызов, чтобы не ломать совместимость с вашим TemplateRenderer.
                var result = await _renderer.RenderAsync(t.Name, format, t.Content, dataJson, export);
                return File(result.Bytes, result.ContentType, result.FileName);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (NotImplementedException ex)
            {
                _logger.LogWarning(ex, "Запрошен не реализованный экспорт Id={Id}", id);
                return Problem(statusCode: 501, title: "Не реализовано");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка экспорта документа по шаблону Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpGet("{id}/data-sets")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetDataSets(string id, CancellationToken ct = default)
        {
            try
            {
                var exists = await _docTempl.AsNoTracking().AnyAsync(x => x.Id == id, ct);
                if (!exists)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"TemplateId={id}");

                var items = await _templDataSets.AsNoTracking()
                    .Where(d => d.TemplateId == id)
                    .OrderByDescending(d => d.CreatedAtUtc)
                    .Select(d => new { d.Id, d.Name, d.CreatedAtUtc })
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
        public async Task<IActionResult> CreateDataSet(string id, [FromBody] DataSetCreateDto dto, CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            try
            {
                var t = await _docTempl.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"TemplateId={id}");

                // Валидация JSON
                try { JsonDocument.Parse(dto.DataJson); }
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
                _templDataSets.Add(ds);

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
                var ds = await _templDataSets.AsNoTracking().FirstOrDefaultAsync(x => x.Id == dataSetId, ct);
                if (ds == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"DataSetId={dataSetId}");

                return Ok(new { ds.Id, ds.TemplateId, ds.Name, ds.DataJson, ds.CreatedAtUtc });
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

        [HttpDelete("data-sets/{dataSetId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDataSet(string dataSetId, CancellationToken ct = default)
        {
            try
            {
                var ds = await _templDataSets.FirstOrDefaultAsync(x => x.Id == dataSetId, ct);
                if (ds == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"DataSetId={dataSetId}");

                _templDataSets.Remove(ds);
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

        [HttpGet("{id}/content")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("text/plain")]
        public async Task<IActionResult> GetTemplateContent(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _docTempl.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                // Поддерживаем клиентский рендер только для html/txt
                var fmt = t.Format.ToLowerInvariant();
                if (fmt is "html" or "txt")
                {
                    var text = Encoding.UTF8.GetString(t.Content);
                    return Content(text, "text/plain; charset=utf-8");
                }

                return Problem(statusCode: 415, title: "Неподдерживаемый формат",
                               detail: $"Для формата '{t.Format}' контент как текст недоступен.");
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка выдачи содержимого шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("export-from-html")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ExportFromClientHtml([FromBody] ClientHtmlExportRequest req, CancellationToken ct = default)
        {
            if (req is null || string.IsNullOrWhiteSpace(req.Html) || string.IsNullOrWhiteSpace(req.Export))
                return Problem(statusCode: 400, title: "Некорректные данные запроса");

            try
            {
                var result = await _renderer.RenderFromClientHtmlAsync(req.Name ?? "Document", req.Html, req.Export);
                return File(result.Bytes, result.ContentType, result.FileName);
            }
            catch (NotImplementedException ex)
            {
                _logger.LogWarning(ex, "Экспорт HTML -> {Export} не реализован", req.Export);
                return Problem(statusCode: 501, title: "Не реализовано", detail: $"Экспорт в {req.Export} пока не поддерживается.");
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка экспорта из HTML: Name={Name}, Export={Export}", req.Name, req.Export);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }
    }
}