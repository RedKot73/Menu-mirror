using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Generic API контроллер для справочников с ShortValue (без пагинации, без Razor)
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

    /// <summary>Полный список (опционально фильтр по подстроке)</summary>
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
                .Select(t => ShortDictBase.ToDto(t))
                .ToListAsync(ct);

            return Ok(list);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка GetAll {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
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
                return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");
            return Ok(ShortDictBase.ToDto(e));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка Get {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
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
            return Problem(statusCode: 400, title: "Некорректное тело запроса");

        var entity = new TEntity
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value.Trim(),
            ShortValue = dto.ShortValue.Trim(),
            Comment = dto.Comment?.Trim()
        };
        _set.Add(entity);

        try
        {
            await _db.SaveChangesAsync(ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, ShortDictBase.ToDto(entity));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности Value={Value} ShortValue={ShortValue} {Entity}",
                entity.Value, entity.ShortValue, typeof(TEntity).Name);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Значение \"{entity.Value}\" уже существует.",
                extensions: new Dictionary<string, object?>
                {
                    ["field"] = "Value",
                    ["value"] = entity.Value
                });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт Create {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Неизвестная ошибка Create {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        string id,
        [FromBody] ShortDictDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);
        if (dto is null)
            return Problem(statusCode: 400, title: "Некорректное тело запроса");

        var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e == null)
            return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

        var snapshot = ShortDictBase.ToDto(e);
        ShortDictBase.ApplyDto(e, dto);

        if (snapshot == ShortDictBase.ToDto(e))
            return NoContent();

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
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности Update {Entity} Id={Id} Value={Value}",
                typeof(TEntity).Name, id, e.Value);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Значение \"{e.Value}\" уже существует.",
                extensions: new Dictionary<string, object?>
                {
                    ["field"] = "Value",
                    ["value"] = e.Value,
                    ["id"] = id
                });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт Update {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка Update {Entity} Id={Id}", typeof(TEntity).Name, id);
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
            var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

            _set.Remove(e);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка Delete {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    /// <summary>Укороченный список для автокомплита</summary>
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
                //.Where(t => t.Value.Contains(term))
                .Where(t => t.ShortValue.Contains(term))
                .OrderBy(t => t.ShortValue)
                .Take(limit)
                .Select(t => new LookupDto(t.Id, t.ShortValue))
                .ToListAsync(ct);

            return Ok(data);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка Lookup {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
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
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при получении sel_list {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }
}