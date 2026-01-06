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
                q = q.Where(x => x.Value.Contains(search));
            }

            var list = await q
                .OrderBy(x => x.Value)
                .Select(x => DictUnitTaskDto.ToDto(x))
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
                _logger.LogError(ex, "Ошибка при получении списка DictUnitTask");
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
            return Ok(DictUnitTaskDto.ToDto(e));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при получении DictUnitTask Id={Id}", id);
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

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (dto.Amount < 0)
            return BadRequest("Amount не може бути від'ємним");

        try
        {
            var entity = new DictUnitTask
            {
                Id = Guid.NewGuid().ToString("D"),
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                Amount = dto.Amount,
                WithMeans = dto.WithMeans,
                AtPermanentPoint = dto.AtPermanentPoint
            };

            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            var created = await Query().FirstAsync(x => x.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, DictUnitTaskDto.ToDto(created));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфликт уникальности Value={Value} для DictUnitTask", dto.Value);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Завдання \"{dto.Value}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = dto.Value });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при создании DictUnitTask");
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Неизвестная ошибка при создании DictUnitTask");
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

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (dto.Amount < 0)
            return BadRequest("Amount не може бути від'ємним");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            var snapshot = (e.Value, e.Comment, e.Amount, e.WithMeans, e.AtPermanentPoint);
            DictUnitTaskDto.ApplyDto(e, dto);

            // Ничего не изменилось
            if (snapshot == (e.Value, e.Comment, e.Amount, e.WithMeans, e.AtPermanentPoint))
                return NoContent();

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
                _logger.LogInformation(ex, "Конфликт уникальности при обновлении DictUnitTask Id={Id} Value={Value}",
                    id, dto.Value);
            return Problem(
                statusCode: 409,
                title: "Конфликт уникальности",
                detail: $"Завдання \"{dto.Value}\" вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = dto.Value, ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентный конфликт при обновлении DictUnitTask Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентный конфликт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Ошибка при обновлении DictUnitTask Id={Id}", id);
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
                _logger.LogError(ex, "Ошибка при удалении DictUnitTask Id={Id}", id);
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
            var q = Query();

            if (!string.IsNullOrWhiteSpace(term))
            {
                term = term.Trim();
                q = q.Where(t => t.Value.Contains(term));
            }

            var data = await q
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
                _logger.LogError(ex, "Ошибка в lookup DictUnitTask");
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
                _logger.LogError(ex, "Ошибка при получении sel_list DictUnitTask");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}