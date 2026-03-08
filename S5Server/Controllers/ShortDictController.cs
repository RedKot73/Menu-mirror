using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Generic API контроллер для довідників з ShortValue (без пагінації, без Razor)
/// </summary>
/// ВНИМАНИЕ: [ApiController] на абстрактном классе не применяется к наследникам, им нужен свой атрибут.
[ApiController]
public abstract class ShortDictApiController<TEntity> : ControllerBase
    where TEntity : ShortDictBase, IShortDictBase, new()
{
    /// <summary>
    /// Represents the primary database context used for data access operations.
    /// </summary>
    /// <remarks>Intended for use by derived classes to interact with the application's main database. The
    /// context should be properly initialized before use.</remarks>
    protected readonly MainDbContext _db;
    /// <summary>
    /// Represents the underlying set of entities in the database context for the specified entity type.
    /// </summary>
    /// <remarks>This field provides direct access to the Entity Framework Core `DbSet TEntity ` used for
    /// querying and saving instances of the entity type. It is intended for use within derived repository or data
    /// access classes.</remarks>
    protected readonly DbSet<TEntity> _set;
    /// <summary>
    /// Provides access to the logger instance used for logging diagnostic or operational information within the class.
    /// </summary>
    /// <remarks>Intended for use by derived classes to write log messages. The logger instance should be
    /// configured appropriately to capture relevant log output.</remarks>
    protected readonly ILogger _logger;

    /// <summary>
    /// Generic API контроллер для довідників з ShortValue (без пагінації, без Razor)
    /// </summary>
    /// ВНИМАНИЕ: [ApiController] на абстрактном классе не применяется к наследникам, им нужен свой атрибут.
    protected ShortDictApiController(MainDbContext db, DbSet<TEntity> set, ILogger logger)
    {
        _db = db;
        _set = set;
        _logger = logger;
    }

    /// <summary>
    /// Returns a queryable collection of entities that are not tracked by the context.
    /// </summary>
    /// <remarks>Use this method when read-only access to entities is required and changes to the returned
    /// objects should not be tracked by the context. This can improve performance for queries where tracking is
    /// unnecessary.</remarks>
    /// <returns>An <see cref="IQueryable{TEntity}"/> representing the entities in the set, configured for no tracking.</returns>
    protected IQueryable<TEntity> Query() => _set.AsNoTracking();

    /// <summary>Повний перелік (опціонально фільтр по підстроці)</summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<ShortDictDto>>> GetAll(
        [FromQuery] string? search,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();
            if (!string.IsNullOrWhiteSpace(search))
                q = q.Where(x => x.ShortValue.Contains(search));

            var list = await q
                .OrderBy(x => x.Value)
                .Select(t => t.ToDto())
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
                _logger.LogError(ex, "Помилка GetAll {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Retrieves a dictionary entry by its unique identifier.
    /// </summary>
    /// <remarks>Returns a 499 status code if the request is cancelled by the client. Returns a 500 status
    /// code if an unexpected server error occurs.</remarks>
    /// <param name="id">The unique identifier of the dictionary entry to retrieve. Cannot be an empty GUID.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the dictionary entry as a ShortDictDto if found; returns a 404 Not Found response if
    /// the entry does not exist, or a 400 Bad Request response if the identifier is invalid.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ShortDictDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
            return Ok(e.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка Get {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Creates a new short dictionary entry using the specified data transfer object.
    /// </summary>
    /// <remarks>Returns detailed problem responses for invalid input, uniqueness conflicts, concurrency
    /// conflicts, or unexpected errors. The created entry is returned in the response body if creation
    /// succeeds.</remarks>
    /// <param name="dto">The data transfer object containing the information required to create a new short dictionary entry. Cannot be
    /// null.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A result containing the created short dictionary entry if successful; returns a 201 Created response on success,
    /// 400 Bad Request if the input is invalid, or 409 Conflict if a uniqueness or concurrency conflict occurs.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<ShortDictDto>> Create(
        [FromBody] ShortDictCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);
        if (dto is null)
            return Problem(statusCode: 400, title: "Некоректне тіло запиту");

        var entity = dto.ToEntity<TEntity>();
        _set.Add(entity);

        try
        {
            await _db.SaveChangesAsync(ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, entity.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності Value={Value} ShortValue={ShortValue} {Entity}",
                entity.Value, entity.ShortValue, typeof(TEntity).Name);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Значення \"{entity.Value}\" вже існує.",
                extensions: new Dictionary<string, object?>
                {
                    ["field"] = "Value",
                    ["value"] = entity.Value
                });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт Create {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Невідома помилка Create {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Updates an existing entity with the specified identifier using the provided data transfer object.
    /// </summary>
    /// <remarks>Returns 200 OK with the updated entity if the update is successful. Returns 400 Bad Request
    /// if the identifier is empty, the model state is invalid, or the request body is null. Returns 404 Not Found if
    /// the entity with the specified identifier does not exist. Returns 409 Conflict if a uniqueness or concurrency
    /// conflict is detected during the update. Returns 499 if the operation is canceled by the client, or 500 for an
    /// unexpected server error.</remarks>
    /// <param name="id">The unique identifier of the entity to update. Cannot be empty.</param>
    /// <param name="dto">The data transfer object containing the updated values for the entity. Cannot be null.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the updated entity as a ShortDictDto if the update is successful; returns 400 Bad
    /// Request if the input is invalid, 404 Not Found if the entity does not exist, or 409 Conflict if a uniqueness or
    /// concurrency conflict occurs.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<ShortDictDto>> Update(
        Guid id,
        [FromBody] ShortDictDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);
        if (dto is null)
            return Problem(statusCode: 400, title: "Некоректне тіло запиту");

        var entity = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        // Перевіряємо чи змінились дані
        if (entity.IsEqualTo(dto))
            return Ok(entity.ToDto());

        entity.ApplyDto(dto);

        try
        {
            await _db.SaveChangesAsync(ct);
            return Ok(entity.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності Update {Entity} Id={Id} Value={Value}",
                typeof(TEntity).Name, id, entity.Value);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Значення \"{entity.Value}\" вже існує.",
                extensions: new Dictionary<string, object?>
                {
                    ["field"] = "Value",
                    ["value"] = entity.Value,
                    ["id"] = id
                });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт Update {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка Update {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Deletes the entity with the specified identifier.
    /// </summary>
    /// <remarks>Returns a 499 status code if the operation is canceled by the client. Returns a 500 Internal
    /// Server Error if an unexpected error occurs.</remarks>
    /// <param name="id">The unique identifier of the entity to delete. Cannot be an empty GUID.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A 204 No Content response if the entity was successfully deleted; a 404 Not Found response if the entity does
    /// not exist; or a 400 Bad Request response if the identifier is invalid.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            _set.Remove(e);
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
                _logger.LogError(ex, "Помилка Delete {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>Скорочений список для автокомпліту</summary>
    [HttpGet("lookup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string term,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
       if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());
        if (limit is < 1 or > 100) limit = 10;

        try
        {
            var data = await Query()
                .Where(t => t.ShortValue.Contains(term))
                .OrderBy(t => t.ShortValue)
                .Take(limit)
                .Select(t => new LookupDto(t.Id, t.ShortValue))
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
                _logger.LogError(ex, "Помилка Lookup {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Retrieves a list of selectable items for use in dropdowns or selection controls.
    /// </summary>
    /// <remarks>The returned list is ordered by value and contains lightweight representations of the
    /// entities for efficient selection scenarios.</remarks>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An HTTP 200 response containing a collection of lookup items if successful; returns an appropriate error
    /// response if the operation is canceled or fails.</returns>
    [HttpGet("sel_list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetSelectList(CancellationToken ct = default)
    {
        try
        {
            var data = await Query()
                .OrderBy(t => t.Value)
                .Select(t => new LookupDto(t.Id, t.ShortValue))
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
                _logger.LogError(ex, "Помилка при отриманні sel_list {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}