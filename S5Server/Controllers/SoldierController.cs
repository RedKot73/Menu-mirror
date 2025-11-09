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
            [FromQuery] string? assignedUnitId,
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

            if (!string.IsNullOrWhiteSpace(assignedUnitId))
                q = q.Where(s => s.AssignedUnitId == assignedUnitId);

            var list = await q
                .AsNoTracking()
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
                .AsNoTracking()
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
            var e = await Query().FirstOrDefaultAsync(s => s.Id == id, ct);
            return e is null ? NotFound() : Ok(SoldierDto.ToDto(e));
        }

        [HttpPost]
        public async Task<ActionResult<SoldierDto>> Create([FromBody] SoldierCreateDto dto,
            CancellationToken ct = default)
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

            // Подгружаем навигации для корректного DTO
            entity = await Query().FirstAsync(s => s.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = entity.Id }, SoldierDto.ToDto(entity));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id,
            [FromBody] SoldierDto dto,
            CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело.");
            if (string.IsNullOrWhiteSpace(dto.FirstName)) return BadRequest("FirstName не может быть пустым.");

            var e = await _set.AsTracking()
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e is null) return NotFound();

            // Снимок только полей, которые реально обновляем
            var original = (e.FirstName, e.MidleName, e.LastName, e.NickName,
                            e.UnitId, e.AssignedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

            SoldierDto.ApplyDto(e, dto);

            var changed = (e.FirstName, e.MidleName, e.LastName, e.NickName,
                           e.UnitId, e.AssignedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

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
        /// Призначити (придати) бійця до підрозділу.
        /// </summary>
        [HttpPost("{id}/assign/{unitId}")]
        public async Task<IActionResult> Assign(string id, string unitId, CancellationToken ct = default)
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
        [HttpPost("{id}/unassign")]
        public async Task<IActionResult> Unassign(string id, CancellationToken ct = default)
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");
            e.AssignedUnitId = null;
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