using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Threading.Channels; // добавлено для SSE Channel

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;
using S5Server.Services;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<Unit> _set;
        protected readonly ILogger _logger;
        private readonly System.Text.Json.JsonSerializerOptions JSONOpt = new()
        {
            PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase
        };


        public UnitController(MainDbContext db, ILogger<UnitController> logger)
        {
            _db = db;
            _set = db.Units;
            _logger = logger;
        }

        private IQueryable<Unit> Query() => _set.AsNoTracking();

        /// <summary>
        /// Получить список всех подразделений с возможностью фильтрации по названию и родителю.
        /// </summary>
        /// <param name="search">Строка поиска по названию или короткому названию подразделения.</param>
        /// <param name="parentId">Идентификатор родительского подразделения для фильтрации.
        /// if null - подразделения верхнего уровня (без родительского)</param>
        /// if EmptyString - все подразделения, без учета parentId
        /// else - подразделения с заданным parentId
        /// <param name="ct">Токен отмены операции.</param>
        /// <returns>Список DTO подразделений, отсортированный по порядку и названию.</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitTreeItemDto>>> GetAll(
            [FromQuery] string? search,
            [FromQuery] string? parentId,
            CancellationToken ct = default)
        {
            var q = Query()
                .Include(t => t.Parent)
                .Include(t => t.AssignedUnit)
                .Include(t => t.ForceType)
                .Include(t => t.UnitType)
                .Where(t => t.Id != ControllerFunctions.NullGuid);//Кореневий псевдо-підрозділ не показуємо
                                                                  //as IQueryable<Unit>
            ;

            if (!string.IsNullOrWhiteSpace(search))
            {
                q = q.Where(x => x.ShortName.Contains(search));
            }

            if (!string.IsNullOrWhiteSpace(parentId))
                q = q.Where(x => x.ParentId == parentId);

            var list = await q
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.ShortName)
                //.Select(x => UnitDto.ToDto(x))
                .Select(u => new UnitTreeItemDto(
                    u.Id,
                    u.ParentId,
                    u.Parent != null ? u.Parent.ShortName : null,
                    u.AssignedUnitId,
                    u.AssignedUnit != null ? u.AssignedUnit.ShortName : null,
                    u.Name,
                    u.ShortName,
                    u.MilitaryNumber,
                    u.ForceTypeId,
                    u.ForceType != null ? u.ForceType.ShortValue : null,
                    u.UnitTypeId,
                    u.UnitType != null ? u.UnitType.ShortValue : null,
                    u.IsOperational,
                    u.OrderVal,
                    u.Comment,
                    _set.Any(c => c.ParentId == u.Id)//поле HasChildren
                ))
                .ToListAsync(ct);
            return Ok(list);
        }

        // Укороченный список для автокомплита
        [HttpGet("lookup")]
        public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
            [FromQuery] string term,
            [FromQuery] int limit = 10,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(term))
                return Ok(Array.Empty<LookupDto>());

            if (limit is < 1 or > 100) limit = 10;
            //term = term.ToLowerInvariant();

            var pattern = $"%{term.ToLowerInvariant()}%";
            var data = await Query()
                //.Where(x => x.ShortName.ToLower().Contains(term))
                .Where(x => x.ShortName.Contains(term))
                //.Where(x => EF.Functions.Like(x.ShortName.ToLower(), pattern))
                //.Where(x => EF.Functions.Like(EF.Functions.Collate(x.ShortName, "UNICODE_NOCASE"), pattern))
                .OrderBy(x => x.OrderVal)
                .ThenBy(x => x.ShortName)
                .Take(limit)
                .Select(x => new LookupDto(x.Id, x.ShortName))
                .ToListAsync(ct);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UnitDto>> Get(string id, CancellationToken ct = default)
        {
            var e = await Query()
                .Include(t => t.Parent)
                .Include(t => t.AssignedUnit)
                .Include(t => t.ForceType)
                .Include(t => t.UnitType)
                .FirstOrDefaultAsync(x => x.Id == id, ct);
            return e is null ? NotFound() : Ok(UnitDto.ToDto(e));
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
                IsOperational = dto.IsOperational,
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

            return CreatedAtAction(nameof(Get), new { id = entity.Id }, UnitDto.ToDto(entity));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(string id,
            [FromBody] UnitDto dto, CancellationToken ct = default)
        {
            if (dto is null) return BadRequest("Пустое тело запроса.");
            if (string.IsNullOrWhiteSpace(dto.Name)) return BadRequest("Name не может быть пустым.");

            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e is null) return NotFound();

            var snapshot = UnitDto.ToDto(e);
            UnitDto.ApplyDto(e, dto);
            if (snapshot == UnitDto.ToDto(e))
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
                .Select(x => UnitDto.ToDto(x))
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
                .Select(x => UnitDto.ToDto(x))
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
        /// Удалить дочернее подразделение
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
        /// Додати приданный підрозділ
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
        /// Видалити приданный підрозділ (отвязать)
        /// </summary>
        [HttpPost("{unitId}/remove-assigned/{assignedId}")]
        public async Task<IActionResult> RemoveAssignedUnit(string unitId,
            string assignedId, CancellationToken ct = default)
        {
            var assigned = await _set
                .FirstOrDefaultAsync(x => x.Id == assignedId &&
                    x.AssignedUnitId == unitId, ct);
            if (assigned == null) return NotFound("Приданий підрозділ не знайдено.");

            assigned.AssignedUnitId = null;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Змінити порядковий номер сортування
        /// </summary>
        [HttpPost("{unitId}/moveUpDown/{toUp}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> MoveUpDown(string unitId, bool toUp, CancellationToken ct = default)
        {
            var unit = await _set.AsTracking()
                .FirstOrDefaultAsync(x => x.Id == unitId, ct);
            if (unit == null) return NotFound("Підрозділ не знайдено.");

            unit.OrderVal = toUp ? unit.OrderVal - 1 : unit.OrderVal + 1;
            await _db.SaveChangesAsync(ct);
            return NoContent();
        }

        /// <summary>
        /// Імпортувати особовий склад з зовнішнього файлу
        /// </summary>
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)]
        [HttpPost("{unitId}/importSoldiers")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status423Locked)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> ImportSoldiers(string unitId, [FromForm] IFormFile soldiers, CancellationToken ct = default)
        {
            var unit = await _set.AsTracking()
                .FirstOrDefaultAsync(x => x.Id == unitId, ct);
            if (unit == null) return NotFound("Підрозділ не знайдено.");

            if (soldiers == null || soldiers.Length == 0)
                return BadRequest("Файл відсутній або порожній.");

            var ext = Path.GetExtension(soldiers.FileName);
            if (!string.Equals(ext, ".xlsx", StringComparison.OrdinalIgnoreCase))
                return BadRequest("Підтримується тільки формат .xlsx.");

            try
            {
                (bool started, ImportJob job, string? error) = Services.ImportSoldiers.TryStartBackground(unit, soldiers, ct);
                if (!started) return Problem(statusCode: 423, title: error ?? "Імпорт заблоковано");
                //if (job is null) return BadRequest("Помилка запуску фонової задачі імпорту ОС");
                return Accepted(new
                {
                    job.Status,
                    job.StartedAtUtc,
                    job.FinishedAtUtc,
                    job.Error,
                });
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Отмена клиентом");
            }
            catch (Exception ex)
            {
                return Problem(statusCode: 500, title: "Помилка читання файлу xlsx", detail: ex.Message);
            }
        }

        /// <summary>
        /// Вже оброблені підрозділи
        /// </summary>
        [HttpGet("get-last-units")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetLastUnits()
        {
            var result = Services.ImportSoldiers.GetLastUnits();
            return Ok(result);
        }

        /// <summary>
        /// Вже оброблені підрозділи
        /// </summary>
        [HttpPost("get-units")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetUnits(string[] units)
        {
            var result = Services.ImportSoldiers.GetUnits(units);
            return Ok(result);
        }

        /// <summary>
        /// Прогресс импорта (SSE)
        /// </summary>
        [HttpGet("imports/stream")]
        public async Task GetImportStream(CancellationToken ct)
        {
            Response.Headers.CacheControl = "no-cache";
            Response.Headers.ContentType = "text/event-stream";
            Response.Headers["X-Accel-Buffering"] = "no";

            var channel = Channel.CreateUnbounded<string>();
            void Handler(ImportProgress p)
            {
                var json = System.Text.Json.JsonSerializer.Serialize(p, JSONOpt);
                channel.Writer.TryWrite($"data: {json}\n\n");
            }
            Services.ImportSoldiers.Progress += Handler;
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
                Services.ImportSoldiers.Progress -= Handler;
            }
        }
    }
}