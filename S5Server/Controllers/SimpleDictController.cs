using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

// DTO для внешнего API
public record SimpleDictDto(string Id, string Value, string? Comment);

/// <summary>
/// Generic API контроллер для простых справочников (без пагинации, без Razor)
/// </summary>
[ApiController]
public abstract class SimpleDictApiController<TEntity> : ControllerBase
    where TEntity : SimpleDictBase, ISimpleDict, new()
{
    protected readonly MainDbContext Db;
    protected readonly DbSet<TEntity> Set;

    protected SimpleDictApiController(MainDbContext db, DbSet<TEntity> set)
    {
        Db = db;
        Set = set;
    }

    protected IQueryable<TEntity> Query() => Set.AsNoTracking();

    protected static SimpleDictDto ToDto(TEntity e) => new(e.Id, e.Value, e.Comment);
    protected static void ApplyDto(TEntity e, SimpleDictDto dto)
    {
        e.Value = dto.Value.Trim();
        e.Comment = dto.Comment?.Trim();
    }

    /// <summary>Полный список (опционально фильтр по подстроке)</summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SimpleDictDto>>> GetAll([FromQuery] string? search)
    {
        var q = Query();
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(x => x.Value.Contains(search));

        var list = await q
            .OrderBy(x => x.Value)
            .Select(x => ToDto(x))
            .ToListAsync();

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SimpleDictDto>> Get(string id)
    {
        var e = await Query().FirstOrDefaultAsync(x => x.Id == id);
        return e == null ? NotFound() : Ok(ToDto(e));
    }

    [HttpPost]
    public async Task<ActionResult<SimpleDictDto>> Create([FromBody] SimpleDictDto dto,
        CancellationToken ct = default)
    {
        var entity = new TEntity
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value,
            Comment = dto.Comment
        };
        Set.Add(entity);
        try
        {
            await Db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            return Conflict($"Значение \"{entity.Value}\" уже существует.");
        }
        return CreatedAtAction(nameof(Get), new { id = entity.Id }, ToDto(entity));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id,
        [FromBody] SimpleDictDto dto,
        CancellationToken ct = default)
    {
        if (dto is null)
            return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не может быть пустым.");
        var e = await Set.AsTracking()
            .FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e == null)
            return NotFound();

        var oldValue = e.Value;
        var oldComment = e.Comment;

        ApplyDto(e, dto);

        if (e.Value == oldValue && e.Comment == oldComment)
            return NoContent();
        try
        {
            await Db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (IsUniqueViolation(ex))
        {
            return Conflict($"Значение \"{e.Value}\" уже существует.");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id,
        CancellationToken ct = default)
    {
        var e = await Set.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e == null) return NotFound();
        Set.Remove(e);
        await Db.SaveChangesAsync(ct);
        return NoContent();
    }

    /// <summary>Укороченный список для автокомплита</summary>
    [HttpGet("lookup")]
    public async Task<ActionResult<IEnumerable<object>>> Lookup(
        [FromQuery] string term,
        [FromQuery] int limit = 10)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());

        if (limit is < 1 or > 100) limit = 10;

        var data = await Query()
            .Where(x => x.Value.Contains(term))
            .OrderBy(x => x.Value)
            .Take(limit)
            .Select(x => new { x.Id, Name = x.Value })
            .ToListAsync();

        return Ok(data);
    }

    private static bool IsUniqueViolation(DbUpdateException ex)
    {
        if (ex.InnerException is Microsoft.Data.Sqlite.SqliteException sqliteEx)
            return sqliteEx.SqliteErrorCode == 19 && sqliteEx.SqliteExtendedErrorCode == 2067;
        return ex.InnerException?.Message.Contains("UNIQUE", StringComparison.OrdinalIgnoreCase) == true;
    }
}