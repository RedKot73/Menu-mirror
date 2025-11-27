using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoldierController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<Soldier> _set;

        public SoldierController(MainDbContext db)
        {
            _db = db;
            _set = db.Soldiers;
        }

        private IQueryable<Soldier> Query() => _set
            .AsNoTracking()
            .Include(s => s.Unit)
            .Include(s => s.AssignedUnit)
            .Include(s => s.OperationalUnit)
            .Include(s => s.Rank)
            .Include(s => s.Position)
            .Include(s => s.State);

        /// <summary>
        /// Список військовослужбовців з фільтрацією.
        /// </summary>
        /// <param name="search">Пошук по ПІБ / позивному / номеру частини підрозділу.</param>
        /// <param name="unitId">Фільтр по основному підрозділу.</param>
        /// <param name="assignedUnitId">Фільтр по приданому підрозділу.</param>
        /// <param name="rankId">Фільтр по званню.</param>
        /// <param name="stateId">Фільтр по статусу.</param>
        /// <param name="ct">Токен відміни.</param>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetAll(
            [FromQuery] string? search,
            [FromQuery] string? unitId,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(unitId))
                q = q.Where(s => s.UnitId == unitId);
            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => SoldierDto.ToDto(s))
                .ToListAsync(ct);

            return Ok(list);
        }

        /// <summary>
        /// Список військовослужбовців за приданим підрозділом.
        /// </summary>
        [HttpGet("by-assigned")]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByAssigned(
            [FromQuery] string assignedUnitId,
            [FromQuery] string? search,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(assignedUnitId))
                return BadRequest("assignedUnitId обязателен.");

            var q = Query().Where(s => s.AssignedUnitId == assignedUnitId);

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }
            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => SoldierDto.ToDto(s))
                .ToListAsync(ct);

            return Ok(list);
        }

        /// <summary>
        /// Список військовослужбовців за оперативним підрозділом.
        /// </summary>
        [HttpGet("by-operational")]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByOperational(
            [FromQuery] string operationalUnitId,
            [FromQuery] string? search,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(operationalUnitId))
                return BadRequest("operationalUnitId обязателен.");

            var q = Query().Where(s => s.OperationalUnitId == operationalUnitId);

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(s => s.FirstName.Contains(search));
            }

            if (limit is > 0 and <= 100)
                q = q.Take(limit.Value);

            var list = await q
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Select(s => SoldierDto.ToDto(s))
                .ToListAsync(ct);

            return Ok(list);
        }

        /// <summary>
        /// Lookup (для автокомпліта по ПІБ / позивному).
        /// </summary>
        [HttpGet("lookup")]
        public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
            [FromQuery] string term,
            [FromQuery] int limit = 10,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(term))
                return Ok(Array.Empty<LookupDto>());

            if (limit is < 1 or > 100) limit = 10;
            term = term.Trim();

            var data = await Query()
                .Where(s => s.FirstName.Contains(term))
                .OrderBy(s => s.FirstName)
                .ThenBy(s => s.MidleName)
                .ThenBy(s => s.LastName)
                .Take(limit)
                .Select(s => new LookupDto(s.Id, s.FIO))
                .ToListAsync(ct);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SoldierDto>> Get(string id, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обязателен.");

            var e = await Query().FirstOrDefaultAsync(s => s.Id == id, ct);
            return e is null ? NotFound() : Ok(SoldierDto.ToDto(e));
        }

        [HttpPost]
        public async Task<ActionResult<SoldierDto>> Create([FromBody] SoldierCreateDto dto, CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело.");
            if (string.IsNullOrWhiteSpace(dto.FirstName)) return BadRequest("FirstName не может быть пустым.");
            if (string.IsNullOrWhiteSpace(dto.UnitId)) return BadRequest("UnitId обязателен.");
            if (string.IsNullOrWhiteSpace(dto.RankId)) return BadRequest("RankId обязателен.");
            if (string.IsNullOrWhiteSpace(dto.PositionId)) return BadRequest("PositionId обязателен.");
            if (string.IsNullOrWhiteSpace(dto.StateId)) return BadRequest("StateId обязателен.");

            var entity = dto.ToEntity();

            _set.Add(entity);
            try
            {
                await _db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                return Conflict("Запись с такими данными уже существует.");
            }

            entity = await Query().FirstAsync(s => s.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, SoldierDto.ToDto(entity));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id, [FromBody] SoldierDto dto, CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело.");
            if (string.IsNullOrWhiteSpace(dto.FirstName)) return BadRequest("FirstName не может быть пустым.");

            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e is null) return NotFound();

            var original = (e.FirstName, e.MidleName, e.LastName, e.NickName,
                            e.UnitId, e.AssignedUnitId, e.OperationalUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

            SoldierDto.ApplyDto(e, dto);

            var changed = (e.FirstName, e.MidleName, e.LastName, e.NickName,
                           e.UnitId, e.AssignedUnitId, e.OperationalUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

            if (original == changed)
                return NoContent();

            try
            {
                await _db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                return Conflict("Запись уже существует.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
        {
            var e = await _set.FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound();

            _set.Remove(e);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Пидати бійця до підрозділу.
        /// </summary>
        [HttpPost("{id}/assign-assigned/{unitId}")]
        public async Task<IActionResult> AssignAssigned(string id, string unitId, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.AssignedUnitId = unitId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Відмінити придання (unassign).
        /// </summary>
        [HttpPost("{id}/unassign-assigned")]
        public async Task<IActionResult> UnassignAssigned(string id, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.AssignedUnitId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        
            
        /// <summary>
        /// Пидати бійця до Оперативного підрозділу.
        /// </summary>
        [HttpPost("{id}/assign-operational/{unitId}")]
        public async Task<IActionResult> AssignOperational(string id, string unitId, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.OperationalUnitId = unitId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Відмінити придання до Оперативного підрозділу.
        /// </summary>
        [HttpPost("{id}/unassign-operational")]
        public async Task<IActionResult> UnassignOperational(string id, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.OperationalUnitId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Перевести бійця до іншого основного підрозділу.
        /// </summary>
        [HttpPost("{id}/move/{newUnitId}")]
        public async Task<IActionResult> Move(string id, string newUnitId, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.UnitId = newUnitId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }
    }
}