using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Generic API контроллер для простих довідників (без пагинації, без Razor)
/// </summary>
/// ВНИМАНИЕ: [ApiController] не наследуется — добавлять в дочерние контроллеры!
public abstract class SimpleDictApiController<TEntity> : ControllerBase
    where TEntity : SimpleDictBase, ISimpleDict, new()
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
    protected readonly DbSet<TEntity> _set;
    /// <summary>
    /// Provides access to the logger instance used for recording diagnostic and operational messages within the class.
    /// </summary>
    /// <remarks>Intended for use by derived classes to facilitate consistent logging. The logger instance
    /// should be configured appropriately to capture relevant log output.</remarks>
    protected readonly ILogger _logger;

    /// <summary>
    /// Generic API контроллер для простих довідників (без пагинації, без Razor)
    /// </summary>
    /// ВНИМАНИЕ: [ApiController] не наследуется — добавлять в дочерние контроллеры!
    protected SimpleDictApiController(MainDbContext db, DbSet<TEntity> set, ILogger logger)
    {
        _db = db;
        _set = set;
        _logger = logger;
    }

    /// <summary>
    /// Создает запрос, возвращающий все сущности типа TEntity без отслеживания изменений контекста.
    /// </summary>
    /// <remarks>Возвращаемый запрос не отслеживает изменения сущностей в контексте данных. Это повышает
    /// производительность при операциях только для чтения, но любые изменения возвращаемых объектов не будут
    /// автоматически сохранены в базе данных.</remarks>
    protected virtual IQueryable<TEntity> Query() => _set.AsNoTracking();

    /// <summary>Полный список (опционально фильтр по подстроке)</summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<SimpleDictDto>>> GetAll([FromQuery] string? search,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();
            if (!string.IsNullOrWhiteSpace(search))
                q = q.Where(x => x.Value.Contains(search));

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
                _logger.LogError(ex, "Помилка при отриманні списку {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Retrieves a simple dictionary entry by its unique identifier.
    /// </summary>
    /// <remarks>Returns a 200 OK response with the entry if found. Returns 404 Not Found if the entry does
    /// not exist, 400 Bad Request if the identifier is empty, or 499 if the request is canceled by the client. Returns
    /// 500 Internal Server Error for unexpected errors.</remarks>
    /// <param name="id">The unique identifier of the dictionary entry to retrieve. Cannot be an empty GUID.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the requested SimpleDictDto if found; otherwise, a result indicating the error
    /// condition, such as NotFound or BadRequest.</returns>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SimpleDictDto>> Get(Guid id, CancellationToken ct = default)
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
                _logger.LogError(ex, "Помилка при отриманні {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Создаёт новую запись справочника на основе предоставлённой модели.
    /// </summary>
    /// <remarks>Если значение поля, требующего уникальности, уже существует, возвращается статус 409
    /// (Conflict) с подробностями о конфликте. В случае отмены операции клиентом возвращается статус 499. При других
    /// ошибках возвращается статус 500 (Internal Server Error).</remarks>
    /// <param name="dto">Данные для создания новой записи справочника. Не может быть равен null.</param>
    /// <param name="ct">Токен отмены, который может быть использован для прерывания операции.</param>
    /// <returns>Результат операции создания. Возвращает статус 201 (Created) с созданной записью в случае успеха, статус 400
    /// (Bad Request) при ошибке валидации или статус 409 (Conflict) при конфликте уникальности или конкурентном
    /// конфликте.</returns>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<SimpleDictDto>> Create([FromBody] SimpleDictCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

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
                _logger.LogInformation(ex, "Конфлікт унікальності Value={Value} для {Entity}", entity.Value, typeof(TEntity).Name);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Значення \"{entity.Value}\" вже існує.",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = entity.Value });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Невідома помилка при створенні {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Updates an existing simple dictionary entry with the specified identifier.
    /// </summary>
    /// <remarks>If the provided data does not change the existing entry, the method returns the current entry
    /// without performing an update. Handles uniqueness and concurrency conflicts according to standard HTTP response
    /// codes.</remarks>
    /// <param name="id">The unique identifier of the dictionary entry to update. Cannot be an empty GUID.</param>
    /// <param name="dto">The data transfer object containing the updated values for the dictionary entry. Must not be null and must
    /// satisfy model validation requirements.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the update operation.</param>
    /// <returns>An ActionResult containing the updated dictionary entry if the update is successful; a 400 Bad Request if the
    /// input is invalid; a 404 Not Found if the entry does not exist; or a 409 Conflict if a uniqueness or concurrency
    /// conflict occurs.</returns>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<SimpleDictDto>> Update(Guid id,
        [FromBody] SimpleDictDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var e = await _set.AsTracking()
            .FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        // Перевіряємо чи змінились дані
        if (e.IsEqualTo(dto))
            return Ok(e.ToDto());

        e.ApplyDto(dto);

        try
        {
            await _db.SaveChangesAsync(ct);
            return Ok(e.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні {Entity} Id={Id} Value={Value}",
                typeof(TEntity).Name, id, e.Value);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Значення \"{e.Value}\" вже існує.",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = e.Value, ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Deletes the entity with the specified identifier.
    /// </summary>
    /// <remarks>If the operation is canceled, a 499 response is returned. If an unexpected error occurs, a
    /// 500 Internal Server Error response is returned.</remarks>
    /// <param name="id">The unique identifier of the entity to delete. Cannot be an empty GUID.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>A 204 No Content response if the entity was successfully deleted; a 400 Bad Request if the identifier is empty;
    /// or a 404 Not Found if the entity does not exist.</returns>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id,
        CancellationToken ct = default)
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
                _logger.LogError(ex, "Помилка при видаленні {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Возвращает коллекцию элементов справочника, значения которых содержат указанный поисковый термин.
    /// </summary>
    /// <remarks>Если значение параметра limit выходит за пределы допустимого диапазона, используется значение
    /// по умолчанию. В случае отмены операции возвращается статус 499. При внутренней ошибке сервера возвращается
    /// статус 500 и сообщение об ошибке.</remarks>
    /// <param name="term">Поисковый термин, используемый для фильтрации значений справочника. Не может быть пустой или состоять только из
    /// пробелов.</param>
    /// <param name="limit">Максимальное количество элементов в возвращаемой коллекции. Должно быть от 1 до 100. Значение по умолчанию — 10.</param>
    /// <param name="ct">Токен отмены, который может быть использован для отмены асинхронной операции.</param>
    /// <returns>Результат действия, содержащий коллекцию объектов LookupDto, значения которых соответствуют поисковому термину.
    /// Если совпадений не найдено, возвращается пустая коллекция.</returns>
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
                .Where(t => t.Value.Contains(term))
                .OrderBy(t => t.Value)
                .Take(limit)
                .Select(t => new LookupDto(t.Id, t.Value))
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
                _logger.LogError(ex, "Помилка в lookup {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Retrieves a list of selectable items for use in dropdowns or selection controls.
    /// </summary>
    /// <remarks>The returned list is ordered by value. If the operation is canceled via the provided
    /// cancellation token, a 499 status code is returned. In case of an internal server error, a 500 status code is
    /// returned.</remarks>
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
                .Select(t => new LookupDto(t.Id, t.Value))
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