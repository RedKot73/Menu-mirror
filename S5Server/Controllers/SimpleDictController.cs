using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Generic API контроллер для простых справочников (без пагинации, без Razor)
/// </summary>
/// ВНИМАНИЕ: [ApiController] не наследуется — добавлять в дочерние контроллеры!
public abstract class SimpleDictApiController<TEntity> : ControllerBase
    where TEntity : SimpleDictBase, ISimpleDict, new()
{
    protected readonly MainDbContext _db;
    protected readonly DbSet<TEntity> _set;
    protected readonly ILogger _logger;

    protected SimpleDictApiController(MainDbContext db, DbSet<TEntity> set, ILogger logger)
    {
        _db = db;
        _set = set;
        _logger = logger;
    }

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
                .Select(t => SimpleDictBase.ToDto(t))
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
                _logger.LogError(ex, "Ошибка при получении списка {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<SimpleDictDto>> Get(string id, CancellationToken ct = default)
    {
        try
        {
            var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");
            return Ok(SimpleDictBase.ToDto(e));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при получении {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<SimpleDictDto>> Create([FromBody] SimpleDictCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var entity = new TEntity
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value.Trim(),
            Comment = dto.Comment?.Trim()
        };
        _set.Add(entity);

        try
        {
            await _db.SaveChangesAsync(ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, SimpleDictBase.ToDto(entity));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности Value={Value} для {Entity}", entity.Value, typeof(TEntity).Name);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Значение \"{entity.Value}\" уже существует.",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = entity.Value });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при создании {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Неизвестная ошибка при создании {Entity}", typeof(TEntity).Name);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(string id,
        [FromBody] SimpleDictDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        var e = await _set.AsTracking()
            .FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e == null)
            return Problem(statusCode: 404, title: "Не найдено", detail: $"Id={id}");

        var snapshot = SimpleDictBase.ToDto(e);
        SimpleDictBase.ApplyDto(e, dto);
        if (snapshot == SimpleDictBase.ToDto(e))
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
                _logger.LogInformation(ex, "Конфликт уникальности при обновлении {Entity} Id={Id} Value={Value}",
                typeof(TEntity).Name, id, e.Value);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Значение \"{e.Value}\" уже существует.",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = e.Value, ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при обновлении {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при обновлении {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id,
        CancellationToken ct = default)
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
                _logger.LogError(ex, "Ошибка при удалении {Entity} Id={Id}", typeof(TEntity).Name, id);
            return Problem(statusCode: 500, title: "Внутренняя ошибка сервера");
        }
    }

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
            return Problem(statusCode: 499, title: "Отмена клиентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка в lookup {Entity}", typeof(TEntity).Name);
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
                .Select(t => new LookupDto(t.Id, t.Value))
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