using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<Unit> _set;

        public UnitController(MainDbContext db)
        {
            _db = db;
            _set = db.Units;
        }

        private IQueryable<Unit> Query() => _set.AsNoTracking();

        // DTO для передачи Unit (можно расширить по необходимости)
        public record UnitDto(
            string Id,
            string? ParentId,
            string? AssignedUnitId,
            string Name,
            string? ShortName,
            string? MilitaryNumber,
            string? ForceTypeId,
            string? UnitTypeId,
            int OrderVal,
            string? Comment
        );
        // DTO для создания Unit (аналогично DictRankCreateDto)
        public record UnitCreateDto(
            string? ParentId,
            string? AssignedUnitId,
            string Name,
            string ShortName,
            string? MilitaryNumber,
            string? ForceTypeId,
            string? UnitTypeId,
            int OrderVal,
            string? Comment
        );

        private static UnitDto ToDto(Unit e) =>
            new(
                e.Id,
                e.ParentId,
                e.AssignedUnitId,
                e.Name,
                e.ShortName,
                e.MilitaryNumber,
                e.ForceTypeId,
                e.UnitTypeId,
                e.OrderVal,
                e.Comment
            );

        private static void ApplyDto(Unit e, UnitDto dto)
        {
            e.ParentId = dto.ParentId;
            e.AssignedUnitId = dto.AssignedUnitId;
            e.Name = dto.Name.Trim();
            e.ShortName = dto.ShortName?.Trim();
            e.MilitaryNumber = dto.MilitaryNumber?.Trim();
            e.ForceTypeId = dto.ForceTypeId;
            e.UnitTypeId = dto.UnitTypeId;
            e.OrderVal = dto.OrderVal;
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetAll(
            [FromQuery] string? search,
            [FromQuery] string? parentId,
            CancellationToken ct = default)
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(search))
            {
                q = q.Where(x =>
                    x.Name.Contains(search) ||
                    (x.ShortName != null && x.ShortName.Contains(search)));
            }
            if (!string.IsNullOrWhiteSpace(parentId))
                q = q.Where(x => x.ParentId == parentId);

            var list = await q
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.Name)
                .Select(x => ToDto(x))
                .ToListAsync(ct);

            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UnitDto>> Get(string id, CancellationToken ct = default)
        {
            var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
            return e is null ? NotFound() : Ok(ToDto(e));
        }

        [HttpPost]
        public async Task<ActionResult<UnitDto>> Create([FromBody] UnitCreateDto dto,
            CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело запроса.");
            if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name не может быть пустым.");
            if (string.IsNullOrWhiteSpace(dto.ShortName)) return BadRequest("ShortName не может быть пустым.");

            var entity = new Unit
            {
                Id = Guid.NewGuid().ToString("D"),
                Name = dto.Name.Trim(),
                ShortName = dto.ShortName.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                MilitaryNumber = string.IsNullOrWhiteSpace(dto.MilitaryNumber) ? null : dto.MilitaryNumber.Trim(),
                ForceTypeId = dto.ForceTypeId,
                UnitTypeId = dto.UnitTypeId,
                ParentId = dto.ParentId,
                AssignedUnitId = dto.AssignedUnitId,
                OrderVal = dto.OrderVal == 0 ? 1 : dto.OrderVal
            };

            _set.Add(entity);
            try
            {
                await _db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                return Conflict($"Підрозділ \"{entity.Name}\" вже існує.");
            }

            return CreatedAtAction(nameof(Get), new { id = entity.Id }, ToDto(entity));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id,
            [FromBody] UnitDto dto, CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело запроса.");
            if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name не может быть пустым.");

            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e is null) return NotFound();

            var snapshot = ToDto(e);
            ApplyDto(e, dto);
            if (snapshot == ToDto(e))
                return NoContent();

            try
            {
                await _db.SaveChangesAsync(ct);
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                return Conflict($"Підрозділ \"{e.Name}\" вже існує.");
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id, CancellationToken ct = default)
        {
            var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e is null) return NotFound();

            _set.Remove(e);
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Проверка наличия дочерних подразделений
        /// </summary>
        [HttpGet("{id}/has-children")]
        public async Task<ActionResult<bool>> HasChildren(string id, CancellationToken ct = default)
        {
            var has = await _set.AnyAsync(x => x.ParentId == id, ct);
            return Ok(has);
        }

        /// <summary>
        /// Получить дочерние подразделения
        /// </summary>
        [HttpGet("{id}/children")]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetChildren(string id,
            CancellationToken ct = default)
        {
            var children = await Query()
                .Where(x => x.ParentId == id)
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.Name)
                .Select(x => ToDto(x))
                .ToListAsync(ct);

            return Ok(children);
        }

        /// <summary>
        /// Проверка наличия приданных подразделений
        /// </summary>
        [HttpGet("{id}/has-assigned")]
        public async Task<ActionResult<bool>> HasAssignedUnits(string id, CancellationToken ct = default)
        {
            var has = await _set.AnyAsync(x => x.AssignedUnitId == id, ct);
            return Ok(has);
        }

        /// <summary>
        /// Получить приданные подразделения
        /// </summary>
        [HttpGet("{id}/assigned")]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetAssignedUnits(string id,
            CancellationToken ct = default)
        {
            var assigned = await Query()
                .Where(x => x.AssignedUnitId == id)
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.Name)
                .Select(x => ToDto(x))
                .ToListAsync(ct);

            return Ok(assigned);
        }

        /// <summary>
        /// Добавить существующее дочернее подразделение
        /// </summary>
        [HttpPost("{parentId}/add-exists-child/{childId}")]
        public async Task<IActionResult> AddExistsChild(string parentId, string childId, CancellationToken ct = default)
        {
            if (parentId == childId)
                return BadRequest("Підрозділ не може бути дочірнім сам до себе.");

            var child = await _set.FirstOrDefaultAsync(x => x.Id == childId, ct);
            if (child == null) return NotFound("Дочірній підозділ не знайдено.");

            child.ParentId = parentId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Удалить дочерний дочернее подразделение
        /// </summary>
        [HttpPost("{parentId}/remove-child/{childId}")]
        public async Task<IActionResult> RemoveChild(string parentId, string childId, CancellationToken ct = default)
        {
            var child = await _set.FirstOrDefaultAsync(x => x.Id == childId &&
                x.ParentId == parentId, ct);
            if (child == null) return NotFound("Дочірній підозділ не знайдено.");

            child.ParentId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Добавить приданный подраздел
        /// </summary>
        [HttpPost("{unitId}/add-assigned/{assignedId}")]
        public async Task<IActionResult> AddAssignedUnit(string unitId, string assignedId, CancellationToken ct = default)
        {
            if (unitId == assignedId)
                return BadRequest("Підрозділ не може бути приданим сам до себе.");

            var assigned = await _set.FirstOrDefaultAsync(x => x.Id == assignedId, ct);
            if (assigned == null) return NotFound("Приданий підрозділ не знайдено.");

            assigned.AssignedUnitId = unitId;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Удалить приданный подраздел (отвязать)
        /// </summary>
        [HttpPost("{unitId}/remove-assigned/{assignedId}")]
        public async Task<IActionResult> RemoveAssignedUnit(string unitId, string assignedId, CancellationToken ct = default)
        {
            var assigned = await _set.FirstOrDefaultAsync(x => x.Id == assignedId && x.AssignedUnitId == unitId, ct);
            if (assigned == null) return NotFound("Приданный підрозділ не знайдено.");

            assigned.AssignedUnitId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

    }
}