using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[ApiController]
[Route("api/dict-unit-types")]
public class DictUnitTypesController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictUnitType> _set;
    public DictUnitTypesController(MainDbContext db)
    {
        _db = db;
        _set = db.DictUnitTypes;
    }

    private IQueryable<DictUnitType> Query() => _set.AsNoTracking();

    /// <summary>Полный список (опционально фильтр по подстроке)</summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SimpleDictDto>>> GetAll([FromQuery] string? search,
        CancellationToken ct = default)
    {
        var q = Query();
        if (!string.IsNullOrWhiteSpace(search))
            q = q.Where(x =>
                x.Value.Contains(search) ||
                x.ShortValue.Contains(search));

        var list = await q
            .OrderBy(x => x.Value)
            .Select(x => DictUnitType.ToDto(x))
            .ToListAsync(ct);

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<SimpleDictDto>> Get(string id, CancellationToken ct = default)
    {
        var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
        return e == null ? NotFound() : Ok(DictUnitType.ToDto(e));
    }
    [HttpPost]
    public async Task<ActionResult<DictRankDto>> Create([FromBody] DictUnitTypeCreateDto dto,
        CancellationToken ct = default)
    {
        if (dto is null) return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value)) return BadRequest("Value не может быть пустым.");
        if (string.IsNullOrWhiteSpace(dto.ShortValue)) return BadRequest("ShortValue не может быть пустым.");

        var entity = new DictUnitType
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value.Trim(),
            ShortValue = dto.ShortValue.Trim(),
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
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

        return CreatedAtAction(nameof(Get), new { id = entity.Id }, DictUnitType.ToDto(entity));
    }
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(string id, [FromBody] DictUnitTypeDto dto,
        CancellationToken ct = default)
    {
        if (dto is null) return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value)) return BadRequest("Value не может быть пустым.");
        if (string.IsNullOrWhiteSpace(dto.ShortValue)) return BadRequest("ShortValue не может быть пустым.");

        var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e is null) return NotFound();

        var snapshot = DictUnitType.ToDto(e);
        DictUnitType.ApplyDto(e, dto);
        // Ничего не изменилось
        if (snapshot == DictUnitType.ToDto(e))
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
    public async Task<ActionResult<IEnumerable<object>>> Lookup(
        [FromQuery] string term,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());

        if (limit is < 1 or > 100) limit = 10;

        var data = await Query()
            .Where(x => x.Value.Contains(term) || x.ShortValue.Contains(term))
            .OrderBy(x => x.Value)
            .Take(limit)
            .Select(x => new { x.Id, Name = x.ShortValue })
            .ToListAsync(ct);

        return Ok(data);
    }
}