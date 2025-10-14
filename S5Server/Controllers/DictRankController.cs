using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

public record DictRankDto(
    string Id,
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);
public record DictRankCreateDto(
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);

[ApiController]
[Route("api/[controller]")]
public class DictRankController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictRank> _set;

    public DictRankController(MainDbContext db)
    {
        _db = db;
        _set = db.DictRanks;
    }

    private IQueryable<DictRank> Query() => _set.AsNoTracking();

    private static DictRankDto ToDto(DictRank e) =>
        new(e.Id, e.Value, e.ShortValue, e.Comment, e.NATOCode, e.Category, e.SubCategory, e.OrderVal);

    private static void ApplyDto(DictRank e, DictRankDto dto)
    {
        e.Value = dto.Value.Trim();
        e.ShortValue = dto.ShortValue.Trim();
        e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        e.NATOCode = string.IsNullOrWhiteSpace(dto.NatoCode) ? null : dto.NatoCode.Trim();
        e.Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim();
        e.SubCategory = string.IsNullOrWhiteSpace(dto.SubCategory) ? null : dto.SubCategory.Trim();
        e.OrderVal = dto.OrderVal;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DictRankDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] string? category,
        [FromQuery] string? subCategory,
        CancellationToken ct = default)
    {
        var q = Query();

        if (!string.IsNullOrWhiteSpace(search))
        {
            q = q.Where(x => x.ShortValue.Contains(search));
        }
        if (!string.IsNullOrWhiteSpace(category))
            q = q.Where(x => x.Category == category);
        if (!string.IsNullOrWhiteSpace(subCategory))
            q = q.Where(x => x.SubCategory == subCategory);

        var list = await q
            .OrderBy(x => x.OrderVal)
            .ThenBy(x => x.Value)
            .Select(x => ToDto(x))
            .ToListAsync(ct);

        return Ok(list);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DictRankDto>> Get(string id, CancellationToken ct = default)
    {
        var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
        return e is null ? NotFound() : Ok(ToDto(e));
    }

    [HttpPost]
    public async Task<ActionResult<DictRankDto>> Create([FromBody] DictRankCreateDto dto,
        CancellationToken ct = default)
    {
        if (dto is null) return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value)) return BadRequest("Value не может быть пустым.");
        if (string.IsNullOrWhiteSpace(dto.ShortValue)) return BadRequest("ShortValue не может быть пустым.");

        var entity = new DictRank
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value.Trim(),
            ShortValue = dto.ShortValue.Trim(),
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
            NATOCode = string.IsNullOrWhiteSpace(dto.NatoCode) ? null : dto.NatoCode.Trim(),
            Category = string.IsNullOrWhiteSpace(dto.Category) ? null : dto.Category.Trim(),
            SubCategory = string.IsNullOrWhiteSpace(dto.SubCategory) ? null : dto.SubCategory.Trim(),
            OrderVal = dto.OrderVal == 0 ? 1 : dto.OrderVal,
        };

        _set.Add(entity);
        try
        {
            await _db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            return Conflict($"Значение \"{entity.Value}\" уже существует.");
        }

        return CreatedAtAction(nameof(Get), new { id = entity.Id }, ToDto(entity));
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(string id, [FromBody] DictRankDto dto,
        CancellationToken ct = default)
    {
        if (dto is null) return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value)) return BadRequest("Value не может быть пустым.");
        if (string.IsNullOrWhiteSpace(dto.ShortValue)) return BadRequest("ShortValue не может быть пустым.");

        var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e is null) return NotFound();

        var snapshot = ToDto(e);
        ApplyDto(e, dto);
        // Ничего не изменилось
        if (snapshot == ToDto(e))
            return NoContent();

        try
        {
            await _db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            return Conflict($"Значение \"{e.Value}\" уже существует.");
        }

        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
    {
        var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e is null) return NotFound();

        _set.Remove(e);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    // Укороченный список для автокомплита
    [HttpGet("lookup")]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string term,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());

        if (limit is < 1 or > 100) limit = 10;

        var data = await Query()
            .Where(t => t.Value.Contains(term))
            .OrderBy(t => t.OrderVal)
            .ThenBy(t => t.Value)
            .Take(limit)
            .Select(t => new LookupDto(t.Id, t.ShortValue))
            .ToListAsync(ct);

        return Ok(data);
    }

    /// <summary>Укороченный список для списков выбора</summary>
    [HttpGet("sel_list")]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetSelectList()
    {
        var data = await Query()
            .OrderBy(t => t.ShortValue)
            .Select(t => new LookupDto(t.Id, t.ShortValue))
            .ToListAsync();

        return Ok(data);
    }
}