using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[ApiController]
[Route("api/dict-unit-tasks")]
public class DictUnitTasksController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictUnitTask> _set;
    private readonly ILogger<DictUnitTasksController> _logger;

    public DictUnitTasksController(
        MainDbContext db,
        ILogger<DictUnitTasksController> logger)
    {
        _db = db;
        _set = _db.DictUnitTasks;
        _logger = logger;
    }

    private IQueryable<DictUnitTask> Query() => _set.AsNoTracking();

    /// <summary>
    /// Отримати список завдань підрозділів
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<DictUnitTaskDto>>> GetAll(
        [FromQuery] string? search,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(x => x.Caption.Contains(search) || x.Caption.Contains(search));
            }

            var list = await q
                .OrderBy(x => x.Caption)
                .Select(x => x.ToDto())
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
                _logger.LogError(ex, "Помилка при отриманні списку DictUnitTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати завдання підрозділу за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DictUnitTaskDto>> Get(string id, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(id))
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
                _logger.LogError(ex, "Помилка при отриманні DictUnitTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити нове завдання підрозділу
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<DictUnitTaskDto>> Create(
        [FromBody] DictUnitTaskCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Caption))
            return BadRequest("Caption не може бути порожнім");

        if (string.IsNullOrWhiteSpace(dto.Caption))
            return BadRequest("Value не може бути порожнім");

        if (dto.Amount < 0)
            return BadRequest("Amount не може бути від'ємним");

        try
        {
            var entity = dto.ToEntity();

            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            var created = await Query().FirstAsync(x => x.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності Caption={Caption} для DictUnitTask", dto.Caption);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Завдання \"{dto.Caption}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Caption", ["value"] = dto.Caption });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні DictUnitTask");
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні DictUnitTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити завдання підрозділу
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        string id,
        [FromBody] DictUnitTaskDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Caption))
            return BadRequest("Caption не може бути порожнім");

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (dto.Amount < 0)
            return BadRequest("Amount не може бути від'ємним");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Перевіряємо чи змінились дані
            if (e.EqualsDto(dto))
                return NoContent();

            e.ApplyDto(dto);
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
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні DictUnitTask Id={Id} Caption={Caption}",
                    id, dto.Caption);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Завдання \"{dto.Caption}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Caption", ["value"] = dto.Caption, ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні DictUnitTask Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні DictUnitTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити завдання підрозділу
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(id))
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
                _logger.LogError(ex, "Помилка при видаленні DictUnitTask Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Автокомпліт для пошуку завдань підрозділів
    /// </summary>
    [HttpGet("lookup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string? term,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());
        
        if (limit is < 1 or > 100) limit = 10;

        try
        {
            term = term.Trim();
            
            var data = await Query()
                .Where(t => t.Caption.Contains(term))
                .OrderBy(t => t.Caption)
                .Take(limit)
                .Select(t => new LookupDto(t.Id, t.Caption))
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
                _logger.LogError(ex, "Помилка в lookup DictUnitTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список для випадаючого списку (select)
    /// </summary>
    [HttpGet("sel_list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetSelectList(
        CancellationToken ct = default)
    {
        try
        {
            var data = await Query()
                .OrderBy(t => t.Caption)
                .Select(t => new LookupDto(t.Id, t.Caption))
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
                _logger.LogError(ex, "Помилка при отриманні sel_list DictUnitTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}