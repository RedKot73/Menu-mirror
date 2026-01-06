using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
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

        private IQueryable<Soldier> Query() => SoldierService.GetQuery(_set);

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

            var q = Query().Where(s => s.InvolvedUnitId == operationalUnitId);

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

            var original = (e.FirstName, e.MidleName, e.LastName, e.BirthDate, e.NickName,
                            e.UnitId, e.AssignedUnitId, e.InvolvedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

            SoldierDto.ApplyDto(e, dto);

            var changed = (e.FirstName, e.MidleName, e.LastName, e.BirthDate, e.NickName,
                           e.UnitId, e.AssignedUnitId, e.InvolvedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

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

        enum UnitKind 
        {
            UnitId, 
            AssignedUnitId, 
            InvolvedUnitId
        }

        private async Task<ActionResult<SoldierDto>> SetUnit(
            string id,
            string? unitId, 
            UnitKind unitKind, 
            CancellationToken ct = default)
        {
            // UnitId не может быть пустым (обязательное поле)
            if (string.IsNullOrWhiteSpace(unitId) && unitKind == UnitKind.UnitId)
                return BadRequest("UnitId обов'язковий для переведення бійця.");

            var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (e is null) return NotFound("Боєць не знайдений.");

            // Нормализация: пустая строка -> null
            var newUnitId = string.IsNullOrWhiteSpace(unitId) ? null : unitId;
            switch (unitKind)
            {
                case UnitKind.UnitId:
                    e.UnitId = newUnitId!; // ! т.к. проверили выше
                    break;
                case UnitKind.AssignedUnitId:
                    e.AssignedUnitId = newUnitId;
                    break;
                case UnitKind.InvolvedUnitId:
                    e.InvolvedUnitId = newUnitId;
                    break;
            }

            await _db.SaveChangesAsync(ct);

            // Перезагружаем с навигационными свойствами
            var updated = await Query().FirstOrDefaultAsync(s => s.Id == id, ct);
            if (updated is null)
                return NotFound("Боєць не знайдений після збереження.");

            return Ok(SoldierDto.ToDto(updated));
        }

        /// <summary>
        /// Придати бійця до підрозділу (або відмінити придання якщо unitId не вказано).
        /// </summary>
        [HttpPost("{id}/assign-assigned/{unitId?}")]
        public Task<ActionResult<SoldierDto>> AssignAssigned(
            string id, 
            string? unitId, 
            CancellationToken ct = default)
            => SetUnit(id, unitId, UnitKind.AssignedUnitId, ct);

        /// <summary>
        /// Придати бійця до Оперативного підрозділу.
        /// </summary>
        [HttpPost("{id}/assign-involved/{unitId?}")]
        public Task<ActionResult<SoldierDto>> AssignInvolved(
            string id, 
            string? unitId, 
            CancellationToken ct = default)
            => SetUnit(id, unitId, UnitKind.InvolvedUnitId, ct);

        /// <summary>
        /// Перевести бійця до іншого основного підрозділу.
        /// </summary>
        [HttpPost("{id}/move/{newUnitId}")]
        public Task<ActionResult<SoldierDto>> Move(
            string id, 
            string newUnitId, 
            CancellationToken ct = default)
            => SetUnit(id, newUnitId, UnitKind.UnitId, ct);
    }
}