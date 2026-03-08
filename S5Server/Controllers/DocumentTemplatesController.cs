using System.Text;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Предоставляет API-контроллер для управления шаблонами документов, включая создание, обновление, удаление,
/// публикацию, скачивание и получение содержимого шаблонов.
/// </summary>
/// <remarks>Этот контроллер требует аутентификации и реализует стандартные операции CRUD для шаблонов документов.
/// Методы контроллера поддерживают работу с категориями шаблонов, публикацию и снятие с публикации, а также загрузку и
/// сохранение содержимого шаблона. Все действия логируются, а ошибки и конфликтные ситуации возвращают информативные
/// HTTP-ответы. Контроллер предназначен для использования во внутренних и внешних API-сценариях, связанных с
/// управлением шаблонами документов.</remarks>
[Authorize]
[ApiController]
[Route("api/templates")]
public class DocumentTemplatesController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DocumentTemplate> _set;
    private readonly ILogger<DocumentTemplatesController> _logger;

    /// <summary>
    /// Предоставляет API-контроллер для управления шаблонами документов, включая создание, обновление, удаление,
    /// публикацию, скачивание и получение содержимого шаблонов.
    /// </summary>
    /// <remarks>Этот контроллер требует аутентификации и реализует стандартные операции CRUD для шаблонов документов.
    /// Методы контроллера поддерживают работу с категориями шаблонов, публикацию и снятие с публикации, а также загрузку и
    /// сохранение содержимого шаблона. Все действия логируются, а ошибки и конфликтные ситуации возвращают информативные
    /// HTTP-ответы. Контроллер предназначен для использования во внутренних и внешних API-сценариях, связанных с
    /// управлением шаблонами документов.</remarks>
    public DocumentTemplatesController(MainDbContext db,
        ILogger<DocumentTemplatesController> logger)
    {
        _db = db;
        _set = _db.DocumentTemplates;
        _logger = logger;
    }

    /// <summary>
    /// Retrieves a list of template data transfer objects, ordered by the validity start date in descending order.
    /// </summary>
    /// <remarks>Returns HTTP 499 if the request is canceled by the client, or HTTP 500 if an internal server
    /// error occurs.</remarks>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An action result containing a collection of template data transfer objects with HTTP 200 (OK) on success, or an
    /// appropriate error response if the operation is canceled or fails.</returns>
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

    /// <summary>
    /// Retrieves a template by its unique identifier.
    /// </summary>
    /// <remarks>Returns a 200 OK response with the template data if the template exists. Returns a 404 Not
    /// Found response if no template with the specified identifier is found. Returns a 499 status code if the request
    /// is canceled by the client, or a 500 status code for other server errors.</remarks>
    /// <param name="id">The unique identifier of the template to retrieve.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the template data if found; otherwise, a problem response with the appropriate status
    /// code.</returns>
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

    /// <summary>
    /// Creates a new document template using the provided data and returns the created template.
    /// </summary>
    /// <remarks>The request must use 'multipart/form-data' encoding and may include a file. The maximum
    /// allowed request size is 50 MB. Returns HTTP 409 if a template with the same name already exists or if a
    /// concurrency conflict occurs.</remarks>
    /// <param name="dto">The data transfer object containing the information required to create a new template, including file content,
    /// name, description, category, and publication status. Must not be null.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the created template as a TemplateDto with HTTP 201 status if successful; returns
    /// HTTP 400 if the input is invalid, or appropriate error responses for other failure conditions.</returns>
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

    /// <summary>
    /// Обновляет существующий шаблон с указанным идентификатором, используя предоставленные данные формы.
    /// </summary>
    /// <remarks>Максимальный размер запроса ограничен 50 МБ. Метод ожидает данные в формате
    /// multipart/form-data. В случае ошибок возвращаются соответствующие коды состояния HTTP и подробности
    /// проблемы.</remarks>
    /// <param name="id">Уникальный идентификатор шаблона, который требуется обновить.</param>
    /// <param name="dto">Данные формы, содержащие обновлённые значения для шаблона, включая имя, описание, статус публикации и файл
    /// содержимого.</param>
    /// <param name="ct">Токен отмены, который может быть использован для отмены операции.</param>
    /// <returns>Результат выполнения операции обновления. Возвращает статус 204 (No Content) при успешном обновлении, 400 (Bad
    /// Request) при ошибке валидации, 404 (Not Found) если шаблон не найден, или 409 (Conflict) при конфликте
    /// уникальности или конкурентном конфликте.</returns>
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

    /// <summary>
    /// Updates the category of the specified template entity.
    /// </summary>
    /// <remarks>If the specified category does not exist, the method returns a 404 Not Found response. The
    /// operation is idempotent and does not return content on success.</remarks>
    /// <param name="id">The unique identifier of the template entity whose category is to be updated.</param>
    /// <param name="dto">An object containing the new category identifier to assign to the template entity.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A result indicating the outcome of the operation. Returns 204 No Content if the update is successful; 400 Bad
    /// Request if the input is invalid; or 404 Not Found if the template or category does not exist.</returns>
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

    /// <summary>
    /// Publishes the entity with the specified identifier by marking it as published and updating its publication
    /// metadata.
    /// </summary>
    /// <remarks>The method updates the publication status and metadata of the entity. If the entity is not
    /// found, a 404 response is returned. If the operation is canceled, a 499 response is returned. For other errors, a
    /// 500 response is returned.</remarks>
    /// <param name="id">The unique identifier of the entity to publish.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A 204 No Content response if the entity is successfully published; a 404 Not Found response if the entity does
    /// not exist; or an appropriate error response if the operation fails.</returns>
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

    /// <summary>
    /// Unpublishes the specified entity by its unique identifier.
    /// </summary>
    /// <remarks>This action sets the entity's published state to unpublished and updates relevant metadata.
    /// Only accessible to authorized users. The operation is idempotent; calling it on an already unpublished entity
    /// has no additional effect.</remarks>
    /// <param name="id">The unique identifier of the entity to unpublish.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A 204 No Content response if the entity is successfully unpublished; a 404 Not Found response if the entity does
    /// not exist; or an appropriate error response if the operation fails.</returns>
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

    /// <summary>
    /// Deletes the entity with the specified identifier.
    /// </summary>
    /// <remarks>If the entity with the specified identifier is not found, the method returns a 404 Not Found
    /// response. If the operation is canceled, a 499 response is returned. For other errors, a 500 Internal Server
    /// Error response is provided.</remarks>
    /// <param name="id">The unique identifier of the entity to delete.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A 204 No Content response if the entity was successfully deleted; a 404 Not Found response if the entity does
    /// not exist; or an appropriate error response if the operation fails.</returns>
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

    /// <summary>
    /// Retrieves the content of the template with the specified identifier as a downloadable file.
    /// </summary>
    /// <remarks>Returns a file with a content type of "text/html; charset=utf-8" if the template is found. If
    /// the template does not exist, returns a 404 Not Found response. If the operation is canceled, returns a 499
    /// response. For other errors, returns a 500 Internal Server Error response.</remarks>
    /// <param name="id">The unique identifier of the template to download.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An <see cref="IActionResult"/> that contains the file content if found; otherwise, a problem response indicating
    /// the error.</returns>
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

    /// <summary>
    /// Retrieves the plain text content of the template with the specified identifier.
    /// </summary>
    /// <remarks>Returns a 499 status code if the request is canceled by the client. Returns a 500 status code
    /// if an internal server error occurs.</remarks>
    /// <param name="id">The unique identifier of the template whose content is to be retrieved.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An HTTP 200 response containing the template content as plain text if found; otherwise, an HTTP 404 response if
    /// the template does not exist.</returns>
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