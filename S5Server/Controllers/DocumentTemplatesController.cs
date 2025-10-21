using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

using DocumentFormat.OpenXml.Office2010.Excel;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

using static S5Server.Models.DocumentTemplate;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/templates")]
    public class DocumentTemplatesController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<DocumentTemplate> _set;
        private readonly TemplateRenderer _renderer;
        private readonly ILogger<DocumentTemplatesController> _logger;

        public DocumentTemplatesController(MainDbContext db, TemplateRenderer renderer, ILogger<DocumentTemplatesController> logger)
        {
            _db = db;
            _set = _db.DocumentTemplates;
            //_templDataSets = _db.TemplateDataSets;
            _renderer = renderer;
            _logger = logger;
        }

        public record RenderRequest(string? DataJson, string Export /* html|txt|docx|pdf */);
        public record ClientHtmlExportRequest(string Name, string Html, string Export /* html|txt|pdf|docx*/);

        private static string ComputeSha256(byte[] data)
        {
            var hash = SHA256.HashData(data);
            return Convert.ToHexString(hash).ToLowerInvariant();
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<TemplateDto>>> GetList(CancellationToken ct = default)
        {
            try
            {
                var list = await _set.AsNoTracking()
                    .OrderByDescending(t => t.UpdatedAtUtc)
                    .Select(t => TemplateDto.ToDto(t))
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
        public async Task<ActionResult<TemplateDto>> GetById(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);

                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                return Ok(TemplateDto.ToDto(t));
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
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TemplateDto>> Create(
            [FromForm] CreateTemplateDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (dto.File is null)//Проверить DefaultDataSetId
                return Problem(statusCode: 400, title: "Файл шаблона не передано");
            if (dto.File.Length == 0)//Проверить DefaultDataSetId
                return Problem(statusCode: 400, title: "Файл шаблона порожній");

            if (!DocumentTemplate.TryParseFormat(dto.Format, out var format))
                return Problem(statusCode: 400, title: "Поддерживаемые форматы: html, txt, docx, pdf");

            try
            {
                using var ms = new MemoryStream();
                await dto.File.CopyToAsync(ms, ct);
                var content = ms.ToArray();

                var entity = new DocumentTemplate
                {
                    Name = dto.Name.Trim(),
                    Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                    Format = format,
                    Content = content,
                    ContentHash = ComputeSha256(content),
                    TemplateCategoryId = dto.TemplateCategoryId,
                    IsPublished = dto.IsPublished,
                    DefaultDataSetId = string.IsNullOrWhiteSpace(dto.DefaultDataSetId) ? null : dto.DefaultDataSetId.Trim(),
                    CreatedAtUtc = DateTime.UtcNow,
                    UpdatedAtUtc = DateTime.UtcNow
                };

                _set.Add(entity);
                await _db.SaveChangesAsync(ct);

                return CreatedAtAction(nameof(GetById),
                    new { id = entity.Id }, TemplateDto.ToDto(entity));
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
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Update(
            string id,
            [FromForm] CreateTemplateDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var t = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

            // Формат — если не пришёл, используем текущий
            if (!string.IsNullOrWhiteSpace(dto.Format))
            {
                if (!DocumentTemplate.TryParseFormat(dto.Format, out var newFormat))
                    return Problem(statusCode: 400, title: "Поддерживаемые форматы: html, txt, docx, pdf");
                t.Format = newFormat;
            }

            if (dto.File != null && dto.File.Length > 0)
            {
                using var ms = new MemoryStream();
                await dto.File.CopyToAsync(ms, ct);
                var content = ms.ToArray();
                t.Content = content;
                t.ContentHash = ComputeSha256(content);
            }

            t.Name = dto.Name.Trim();
            t.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            t.IsPublished = dto.IsPublished;
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

        [HttpPatch("{id}/category")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SetCategory(string id, [FromBody] SetCategoryDto dto, CancellationToken ct = default)
        {
            try
            {
                var t = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var newCatId = string.IsNullOrWhiteSpace(dto.TemplateCategoryId)
                    ? ControllerFunctions.NullGuid
                    : dto.TemplateCategoryId!.Trim();

                if (newCatId != ControllerFunctions.NullGuid)
                {
                    var exists = await _db.DictTemplateCategories.AsNoTracking()
                        .AnyAsync(c => c.Id == newCatId, ct);
                    if (!exists)
                        return Problem(statusCode: 404, title: "Категория не найдена", detail: $"TemplateCategoryId={newCatId}");
                }

                t.TemplateCategoryId = newCatId;
                t.UpdatedAtUtc = DateTime.UtcNow;
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка установки категории шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("{id}/publish")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Publish(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                t.IsPublished = true;
                t.PublishedAtUtc = DateTime.UtcNow;
                t.UpdatedAtUtc = DateTime.UtcNow;
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка публикации шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPost("{id}/unpublish")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Unpublish(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                t.IsPublished = false;
                t.PublishedAtUtc = null;
                t.UpdatedAtUtc = DateTime.UtcNow;
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка снятия с публикации шаблона Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
            }
        }

        [HttpPatch("{id}/default-data-set")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SetDefaultDataSet(string id, [FromBody] SetDefaultDataSetDto dto, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                if (string.IsNullOrWhiteSpace(dto.DefaultDataSetId))
                {
                    t.DefaultDataSetId = null;
                }
                else
                {
                    var dsId = dto.DefaultDataSetId.Trim();
                    // Валидацию принадлежности набора данных шаблону можно вернуть при необходимости
                    t.DefaultDataSetId = dsId;
                }

                t.UpdatedAtUtc = DateTime.UtcNow;
                await _db.SaveChangesAsync(ct);
                return NoContent();
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка установки дефолтного набора данных Id={Id}", id);
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
                var t = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                _set.Remove(t);
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
                var t = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
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

        [HttpGet("{id}/content")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("text/plain")]
        public async Task<IActionResult> GetTemplateContent(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                // Поддерживаем клиентский рендер только для html/txt
                if (t.Format is DocumentTemplate.TemplateFormat.Html or DocumentTemplate.TemplateFormat.Txt)
                {
                    var text = Encoding.UTF8.GetString(t.Content);
                    return Content(text, "text/plain; charset=utf-8");
                }

                return Problem(statusCode: 415, title: "Неподдерживаемый формат",
                               detail: $"Для формата '{DocumentTemplate.FormatToString(t.Format)}' контент как текст недоступен.");
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

        /// <summary>
        /// Represents a request to save template content.
        /// </summary>
        /// <param name="Content">The template content to be saved. Cannot be null.</param>
        public record SaveTemplateContentRequest(string Content);
        /**
         * Сохраняет отредактированное содержимое шаблона
         */
        [HttpPut("{id}/content")]
        //[Consumes("text/plain")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> SaveTemplateContent(string id,
            [FromBody] SaveTemplateContentRequest req, CancellationToken ct = default)
        {
            try
            {
                var t = await _set
                    .AsTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                t.Content = Encoding.UTF8.GetBytes(req.Content);
                t.ContentHash = ComputeSha256(t.Content);
                t.UpdatedAtUtc = DateTime.UtcNow;
                await _db.SaveChangesAsync(ct);

                return Ok(t);
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

        [HttpGet("{id}/details")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TemplateDetailsDto>> GetDetails(string id, CancellationToken ct = default)
        {
            try
            {
                var t = await _set.AsNoTracking()
                    .Include(x => x.TemplateCategory)
                    .Include(x => x.DefaultDataSet)
                    .FirstOrDefaultAsync(x => x.Id == id, ct);

                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var dto = new TemplateDetailsDto(
                    t.Id,
                    t.Name,
                    t.Description,
                    DocumentTemplate.FormatToString(t.Format),
                    t.TemplateCategoryId,
                    t.TemplateCategory?.Value,
                    t.IsPublished,
                    t.PublishedAtUtc,
                    t.DefaultDataSetId,
                    t.DefaultDataSet?.Name,
                    t.CreatedAtUtc,
                    t.UpdatedAtUtc);

                return Ok(dto);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка получения деталей шаблона Id={Id}", id);
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
                var t = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var dataJson = request?.DataJson ?? "{}";

                if (t.Format == TemplateFormat.Docx)
                {
                    var merged = _renderer.RenderDocx(t.Content, _renderer.ParseJsonToDict(dataJson));
                    var html = _renderer.DocxToHtml(merged);
                    return Content(html, "text/html; charset=utf-8");
                }

                if (t.Format == TemplateFormat.Txt)
                {
                    var txt = _renderer.RenderTxt(t.Content, _renderer.ParseJsonToDict(dataJson));
                    var html = $"<pre>{System.Net.WebUtility.HtmlEncode(Encoding.UTF8.GetString(txt))}</pre>";
                    return Content(html, "text/html; charset=utf-8");
                }

                var bytes = _renderer.RenderHtml(t.Content, _renderer.ParseJsonToDict(dataJson));
                return Content(Encoding.UTF8.GetString(bytes), "text/html; charset=utf-8");
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
                var t = await _set
                    .AsNoTracking()
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                if (t == null)
                    return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

                var export = (request?.Export ?? "html").ToLowerInvariant();
                var dataJson = request?.DataJson ?? "{}";

                var result = await _renderer.RenderAsync(t.Name, t.Format, t.Content, dataJson, export);
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

        [HttpPost("export-from-html")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> ExportFromClientHtml([FromBody] ClientHtmlExportRequest req,
            CancellationToken ct = default)
        {
            if (req is null || string.IsNullOrWhiteSpace(req.Html) || string.IsNullOrWhiteSpace(req.Export))
                return Problem(statusCode: 400, title: "Некорректные данные запроса");

            try
            {
                var result = await _renderer
                    .RenderFromClientHtmlAsync(req.Name ?? "Document", req.Html, req.Export, ct);
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