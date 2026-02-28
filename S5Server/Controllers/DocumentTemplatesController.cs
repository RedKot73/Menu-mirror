using System.Text;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/templates")]
public class DocumentTemplatesController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DocumentTemplate> _set;
    private readonly ILogger<DocumentTemplatesController> _logger;

    public DocumentTemplatesController(MainDbContext db,
        ILogger<DocumentTemplatesController> logger)
    {
        _db = db;
        _set = _db.DocumentTemplates;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<TemplateDto>>> GetList(CancellationToken ct = default)
    {
        try
        {
            var list = await _set.AsNoTracking()
                .Include(t => t.TemplateCategory)
                .OrderByDescending(t => t.ValidFrom)
                .Select(t => TemplateDto.ToDto(t))
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
                _logger.LogError(ex, "Ошибка при получении списка шаблонов");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<TemplateDto>> GetById(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);

            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            return Ok(TemplateDto.ToDto(t));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при получении шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
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

        try
        {
            string content = "<i>No Content</i>";
            if (dto.File != null && dto.File.Length > 0)
            {
                using var ms = new MemoryStream();
                await dto.File.CopyToAsync(ms, ct);
                content = ms.ToString() ?? string.Empty;
            }

            var entity = new DocumentTemplate
            {
                Name = dto.Name.Trim(),
                Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                Content = content,
                TemplateCategoryId = dto.TemplateCategoryId,
                IsPublished = dto.IsPublished,
                CreatedAtUtc = DateTime.UtcNow,
                ValidFrom = DateTime.UtcNow,
                ChangedBy = User.Identity?.Name ?? "System"
            };

            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            return CreatedAtAction(nameof(GetById),
                new { id = entity.Id }, TemplateDto.ToDto(entity));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности при создании шаблона Name={Name}", dto.Name);
            return Problem(statusCode: 409, title: "Конфликт уникальности", detail: $"Шаблон с именем \"{dto.Name}\" уже существует.");
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при создании шаблона Name={Name}", dto.Name);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Неизвестная ошибка при создании шаблона Name={Name}", dto.Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
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
        Guid id,
        [FromForm] CreateTemplateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var t = await _set
            .AsTracking()
            .FirstOrDefaultAsync(x => x.Id == id, ct);
        if (t == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        if (dto.File != null && dto.File.Length > 0)
        {
            using var ms = new MemoryStream();
            await dto.File.CopyToAsync(ms, ct);
            t.Content = ms.ToString() ?? string.Empty;
        }

        t.Name = dto.Name.Trim();
        t.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
        t.IsPublished = dto.IsPublished;
        t.ValidFrom = DateTime.UtcNow;
        t.ChangedBy = User.Identity?.Name ?? "System";

        try
        {
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности при обновлении шаблона Id={Id} Name={Name}", id, dto.Name);
            return Problem(statusCode: 409, title: "Конфликт уникальности", detail: $"Шаблон с именем \"{dto.Name}\" уже существует.");
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при обновлении шаблона Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при обновлении шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpPatch("{id}/category")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SetCategory(Guid id,
        [FromBody] SetCategoryDto dto,
        CancellationToken ct = default)
    {
        try
        {
            var t = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            var newCatId = dto.TemplateCategoryId.IsNullOrEmptyGuid()
                ? ControllerFunctions.NullGuid
                : dto.TemplateCategoryId!.Value;

            if (newCatId != ControllerFunctions.NullGuid)
            {
                var exists = await _db.DictTemplateCategories.AsNoTracking()
                    .AnyAsync(c => c.Id == newCatId, ct);
                if (!exists)
                    return Problem(statusCode: 404, title: "Категория не найдена",
                        detail: $"TemplateCategoryId={newCatId}");
            }

            t.TemplateCategoryId = newCatId;
            t.ValidFrom = DateTime.UtcNow;
            t.ChangedBy = User.Identity?.Name ?? "System";

            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка установки категории шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpPost("{id}/publish")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Publish(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            t.IsPublished = true;
            t.PublishedAtUtc = DateTime.UtcNow;
            t.ValidFrom = DateTime.UtcNow;
            t.ChangedBy = User.Identity?.Name ?? "System";

            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка публикации шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpPost("{id}/unpublish")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Unpublish(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            t.IsPublished = false;
            t.PublishedAtUtc = null;
            t.ValidFrom = DateTime.UtcNow;
            t.ChangedBy = User.Identity?.Name ?? "System";

            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка снятия с публикации шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            _set.Remove(t);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при удалении шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpGet("{id}/download")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Download(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
            return File(t.Content, "text/html; charset=utf-8"/*t.ContentType*/);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при выдаче файла шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [HttpGet("{id}/content")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [Produces("text/plain")]
    public async Task<IActionResult> GetTemplateContent(Guid id, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            return Content(t.Content, "text/plain; charset=utf-8");
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка выдачи содержимого шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
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
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> SaveTemplateContent(Guid id,
        [FromBody] SaveTemplateContentRequest req, CancellationToken ct = default)
    {
        try
        {
            var t = await _set
                .AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (t == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            t.Content = req.Content;
            t.ValidFrom = DateTime.UtcNow;
            t.ChangedBy = User.Identity?.Name ?? "System";

            await _db.SaveChangesAsync(ct);

            return Ok(t);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка выдачи содержимого шаблона Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

}