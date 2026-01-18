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
    protected readonly MainDbContext _db;
    protected readonly DbSet<TEntity> _set;
    protected readonly ILogger _logger;

    protected ShortDictApiController(MainDbContext db, DbSet<TEntity> set, ILogger logger)
    {
        _db = db;
        _set = set;
        _logger = logger;
    }

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

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ShortDictDto>> Get(string id, CancellationToken ct = default)
    {
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

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<ShortDictDto>> Update(
        string id,
        [FromBody] ShortDictDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);
        if (dto is null)
            return Problem(statusCode: 400, title: "Некоректне тіло запиту");

        var entity = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (entity == null)
            return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

        // Перевіряємо чи змінились дані
        if (entity.EqualsDto(dto))
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

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
    {
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