using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Threading.Channels;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Кодифікатор адміністративно-територіальних одиниць та територій територіальних громад
/// </summary>
[ApiController]
[Route("api/dict-city-codes")]
public class DictCityCodesController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictCityCode> _set;
    private readonly ILogger<DictCityCodesController> _logger;
    private readonly System.Text.Json.JsonSerializerOptions JSONOpt = new()
    {
        PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
    };

    public DictCityCodesController(MainDbContext db, ILogger<DictCityCodesController> logger)
    {
        _db = db;
        _set = db.Set<DictCityCode>();
        _logger = logger;
    }

    private IQueryable<DictCityCode> Query() => _set.AsNoTracking().Include(x => x.Category);

    /// <summary>
    /// Отримати список записів кодифікатора з можливістю фільтрації
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? cityCategoryId,
        [FromQuery] string? level1,
        [FromQuery] string? level2,
        [FromQuery] string? level3,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(search))
                q = q.Where(x => x.Value.Contains(search));

            if (!string.IsNullOrWhiteSpace(cityCategoryId))
                q = q.Where(x => x.CategoryId == cityCategoryId);

            if (!string.IsNullOrWhiteSpace(level1))
                q = q.Where(x => x.Level1 == level1);

            if (!string.IsNullOrWhiteSpace(level2))
                q = q.Where(x => x.Level2 == level2);

            if (!string.IsNullOrWhiteSpace(level3))
                q = q.Where(x => x.Level3 == level3);

            var list = await q
                .OrderBy(x => x.Level1)
                .ThenBy(x => x.Level2)
                .ThenBy(x => x.Level3)
                .ThenBy(x => x.Level4)
                .ThenBy(x => x.Value)
                .Take(100)
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
                _logger.LogError(ex, "Помилка при отриманні списку DictCityCode");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати запис кодифікатора за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CityCodeDto>> Get(string id, CancellationToken ct = default)
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
                _logger.LogError(ex, "Помилка при отриманні DictCityCode Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити новий запис кодифікатора
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CityCodeCreateDto>> Create(
        [FromBody] CityCodeCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (string.IsNullOrWhiteSpace(dto.CategoryId))
            return BadRequest("CityCategoryId обов'язковий");

        try
        {
            /*
            // Перевіряємо існування категорії
            var category = await _db.Set<DictCityCategory>()
                .FirstOrDefaultAsync(t => t.ShortValue == dto.Category, ct);
            if (category is null)
                return BadRequest($"Категорія з ID '{dto.Category}' не знайдена");
            */

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
                _logger.LogInformation(ex, "Конфлікт унікальності для DictCityCode Value={Value}", dto.Value);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Запис з такими даними вже існує",
                extensions: new Dictionary<string, object?> { ["field"] = "Value", ["value"] = dto.Value });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні DictCityCode");
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні DictCityCode");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити запис кодифікатора
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<CityCodeDto>> Update(
        string id,
        [FromBody] CityCodeDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (string.IsNullOrWhiteSpace(dto.CategoryId))
            return BadRequest("Category обов'язковий");

        try
        {
            var entity = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (entity == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Перевіряємо чи змінились дані
            if (entity.EqualsDto(dto))
                return Ok(entity.ToDto());
            /*
            // Перевіряємо існування категорії при зміні
            if (entity.CategoryId != dto.Id)
            {
                var categoryExists = await _db.Set<DictCityCategory>()
                    .AnyAsync(c => c.Id == dto.Category, ct);
                if (!categoryExists)
                    return BadRequest($"Категорія з ID '{dto.Category}' не знайдена");
            }
            */

            entity.ApplyDto(dto);
            await _db.SaveChangesAsync(ct);

            var updated = await Query().FirstAsync(x => x.Id == id, ct);
            return Ok(updated.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні DictCityCode Id={Id}", id);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: $"Запис з такими даними вже існує",
                extensions: new Dictionary<string, object?> { ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні DictCityCode Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні DictCityCode Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити запис кодифікатора
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
                _logger.LogError(ex, "Помилка при видаленні DictCityCode Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Автокомпліт для пошуку записів кодифікатора
    /// </summary>
    [HttpGet("lookup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string? term,
        [FromQuery] string? cityCategoryId,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<LookupDto>());

        if (limit is < 1 or > 100) limit = 10;

        try
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(cityCategoryId))
                q = q.Where(x => x.CategoryId == cityCategoryId);

            var data = await q
                .Where(x => x.Value.Contains(term))
                .OrderBy(x => x.Value)
                .Take(limit)
                .Select(x => new LookupDto(x.Id, x.Value))
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
                _logger.LogError(ex, "Помилка в lookup DictCityCode");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список для випадаючого списку (select)
    /// </summary>
    [HttpGet("sel_list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetSelectList(
        [FromQuery] string? cityCategoryId,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(cityCategoryId))
                q = q.Where(x => x.CategoryId == cityCategoryId);

            var data = await q
                .OrderBy(x => x.Value)
                .Select(x => new LookupDto(x.Id, x.Value))
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
                _logger.LogError(ex, "Помилка при отриманні sel_list DictCityCode");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати записи за категорією
    /// </summary>
    [HttpGet("by-category/{cityCategoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeDto>>> GetByCategory(
        string cityCategoryId,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(cityCategoryId))
            return BadRequest("cityCategoryId обов'язковий");

        try
        {
            var items = await Query()
                .Where(x => x.CategoryId == cityCategoryId)
                .OrderBy(x => x.Value)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(items);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні записів за категорією CityCategoryId={CityCategoryId}",
                    cityCategoryId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати записи за Level1 (області)
    /// </summary>
    [HttpGet("by-level1/{level1}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeDto>>> GetByLevel1(
        string level1,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(level1))
            return BadRequest("level1 обов'язковий");

        try
        {
            var items = await Query()
                .Where(x => x.Level1 == level1)
                .OrderBy(x => x.Level2)
                .ThenBy(x => x.Value)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(items);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні записів за Level1={Level1}", level1);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    [Consumes("multipart/form-data")]
    [RequestSizeLimit(50_000_000)]
    [HttpPost("importCityCodes")]
    [ProducesResponseType(StatusCodes.Status202Accepted)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status423Locked)]
    public async Task<IActionResult> ImportCityCodes(
        [FromForm] IFormFile file,
        CancellationToken ct = default)
    {
        if (file == null || file.Length == 0)
            return BadRequest("Файл відсутній або порожній");

        var ext = Path.GetExtension(file.FileName);
        if (!string.Equals(ext, ".xlsx", StringComparison.OrdinalIgnoreCase))
            return BadRequest("Підтримується тільки формат .xlsx");

        try
        {
            (bool started, CityCodesProgressStatus status, string? error) = Services.ImportCityCodes.TryStartBackground(file, ct);
            if (!started)
                return Problem(statusCode: 423, title: error ?? "Імпорт заблоковано");

            return Accepted(new
            {
                started,
                status,
                error,
            });
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при імпорті\n{Msg}", ex.Message);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера", detail: ex.Message);
        }
    }

    /// <summary>
    /// Прогрес імпорту кодів міст (SSE)
    /// </summary>
    [HttpGet("imports/stream")]
    public async Task GetImportStream(CancellationToken ct)
    {
        Response.Headers.CacheControl = "no-cache";
        Response.Headers.ContentType = "text/event-stream";
        Response.Headers["X-Accel-Buffering"] = "no";

        var channel = Channel.CreateUnbounded<string>();
        void Handler(ImportCityCodesProgress p)
        {
            var json = System.Text.Json.JsonSerializer.Serialize(p, JSONOpt);
            channel.Writer.TryWrite($"data: {json}\n\n");
        }
        
        Services.ImportCityCodes.Progress += Handler;
        try
        {
            await foreach (var msg in channel.Reader.ReadAllAsync(ct))
            {
                await Response.WriteAsync(msg, ct);
                await Response.Body.FlushAsync(ct);
            }
        }
        catch (OperationCanceledException)
        {
            // client disconnected
        }
        finally
        {
            Services.ImportCityCodes.Progress -= Handler;
        }
    }

}