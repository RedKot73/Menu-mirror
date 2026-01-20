using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;
using System.Threading.Channels;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UnitController : ControllerBase
    {
        private readonly MainDbContext _db;
        private readonly DbSet<Unit> _set;
        private readonly ILogger<UnitController> _logger;
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
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UnitTreeItemDto>>> GetAll(
            [FromQuery] string? search,
            [FromQuery] string? parentId,
            CancellationToken ct = default)
        {
            try
            {
                var q = Query()
                    .Include(t => t.Parent)
                    .Include(t => t.AssignedUnit)
                    .Include(t => t.ForceType)
                    .Include(t => t.UnitType)
                    .Where(t => t.Id != ControllerFunctions.NullGuid);

                if (!string.IsNullOrWhiteSpace(search))
                {
                    q = q.Where(x => x.ShortName.Contains(search));
                }

                if (!string.IsNullOrWhiteSpace(parentId))
                    q = q.Where(x => x.ParentId == parentId);

                var list = await q
                    .OrderBy(x => x.OrderVal)
                    .ThenBy(x => x.ShortName)
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
                        u.IsInvolved,
                        u.OrderVal,
                        u.Comment,
                        _set.Any(c => c.ParentId == u.Id)
                    ))
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
                    _logger.LogError(ex, "Помилка при отриманні списку підрозділів");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Укороченный список для автокомплита
        /// </summary>
        [HttpGet("lookup")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
            [FromQuery] string? term,
            [FromQuery] int limit = 10,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(term))
                return Ok(Array.Empty<LookupDto>());

            if (limit is < 1 or > 100) limit = 10;

            try
            {
                var data = await Query()
                    .Where(x => x.ShortName.Contains(term))
                    .OrderBy(x => x.OrderVal)
                    .ThenBy(x => x.ShortName)
                    .Take(limit)
                    .Select(x => new LookupDto(x.Id, x.ShortName))
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
                    _logger.LogError(ex, "Помилка в lookup Unit");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UnitDto>> Get(string id, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var e = await Query()
                    .Include(t => t.Parent)
                    .Include(t => t.AssignedUnit)
                    .Include(t => t.ForceType)
                    .Include(t => t.UnitType)
                    .FirstOrDefaultAsync(x => x.Id == id, ct);
                
                if (e == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
                
                return Ok(UnitDto.ToDto(e));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<UnitDto>> Create(
            [FromBody] UnitCreateDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name не може бути порожнім");
            
            if (string.IsNullOrWhiteSpace(dto.ShortName))
                return BadRequest("ShortName не може бути порожнім");

            try
            {
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
                    IsInvolved = dto.IsInvolved,
                    OrderVal = dto.OrderVal == 0 ? 1 : dto.OrderVal
                };

                _set.Add(entity);
                await _db.SaveChangesAsync(ct);

                var created = await Query()
                    .Include(t => t.Parent)
                    .Include(t => t.AssignedUnit)
                    .Include(t => t.ForceType)
                    .Include(t => t.UnitType)
                    .FirstAsync(x => x.Id == entity.Id, ct);
                
                return CreatedAtAction(nameof(Get), new { id = created.Id }, UnitDto.ToDto(created));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, "Конфлікт унікальності Name={Name} для Unit", dto.Name);
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: $"Підрозділ \"{dto.Name}\" вже існує",
                    extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = dto.Name });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при створенні Unit");
                return Problem(statusCode: 409, title: "Конкурентний конфлікт");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при створенні Unit");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<IActionResult> Update(
            string id,
            [FromBody] UnitDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.Name))
                return BadRequest("Name не може бути порожнім");

            try
            {
                var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (e == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

                var snapshot = UnitDto.ToDto(e);
                UnitDto.ApplyDto(e, dto);
                
                if (snapshot == UnitDto.ToDto(e))
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
                    _logger.LogInformation(ex, "Конфлікт унікальності при оновленні Unit Id={Id} Name={Name}",
                        id, dto.Name);
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: $"Підрозділ \"{dto.Name}\" вже існує",
                    extensions: new Dictionary<string, object?> { ["field"] = "Name", ["value"] = dto.Name, ["id"] = id });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні Unit Id={Id}", id);
                return Problem(statusCode: 409, title: "Конкурентний конфлікт");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при оновленні Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

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
                    _logger.LogError(ex, "Помилка при видаленні Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Проверка наличия дочерних подразделений
        /// </summary>
        [HttpGet("{id}/has-children")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> HasChildren(string id, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var has = await _set.AnyAsync(x => x.ParentId == id, ct);
                return Ok(has);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при перевірці дочірніх Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Получить дочерние подразделения
        /// </summary>
        [HttpGet("{id}/children")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetChildren(
            string id,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var children = await Query()
                    .Where(x => x.ParentId == id)
                    .OrderBy(x => x.OrderVal)
                    .ThenBy(x => x.Name)
                    .Select(x => UnitDto.ToDto(x))
                    .ToListAsync(ct);

                return Ok(children);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні дочірніх Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Проверка наличия приданных подразделений
        /// </summary>
        [HttpGet("{id}/has-assigned")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<bool>> HasAssignedUnits(string id, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var has = await _set.AnyAsync(x => x.AssignedUnitId == id, ct);
                return Ok(has);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при перевірці приданих Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Получить приданные подразделения
        /// </summary>
        [HttpGet("{id}/assigned")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<UnitDto>>> GetAssignedUnits(
            string id,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var assigned = await Query()
                    .Where(x => x.AssignedUnitId == id)
                    .OrderBy(x => x.OrderVal)
                    .ThenBy(x => x.Name)
                    .Select(x => UnitDto.ToDto(x))
                    .ToListAsync(ct);

                return Ok(assigned);
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні приданих Unit Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Добавить существующее дочернее подразделение
        /// </summary>
        [HttpPost("{parentId}/add-exists-child/{childId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AddExistsChild(
            string parentId,
            string childId,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(parentId))
                return BadRequest("parentId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(childId))
                return BadRequest("childId обов'язковий");

            if (parentId == childId)
                return BadRequest("Підрозділ не може бути дочірнім сам до себе");

            try
            {
                var child = await _set.FirstOrDefaultAsync(x => x.Id == childId, ct);
                if (child == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Дочірній підрозділ не знайдено");

                child.ParentId = parentId;
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
                    _logger.LogError(ex, "Помилка при додаванні дочірнього Unit ParentId={ParentId} ChildId={ChildId}",
                        parentId, childId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Удалить дочернее подразделение
        /// </summary>
        [HttpPost("{parentId}/remove-child/{childId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RemoveChild(
            string parentId,
            string childId,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(parentId))
                return BadRequest("parentId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(childId))
                return BadRequest("childId обов'язковий");

            try
            {
                var child = await _set.FirstOrDefaultAsync(x => x.Id == childId && x.ParentId == parentId, ct);
                if (child == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Дочірній підрозділ не знайдено");

                child.ParentId = null;
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
                    _logger.LogError(ex, "Помилка при видаленні дочірнього Unit ParentId={ParentId} ChildId={ChildId}",
                        parentId, childId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Додати приданный підрозділ
        /// </summary>
        [HttpPost("{unitId}/add-assigned/{assignedId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> AddAssignedUnit(
            string unitId,
            string assignedId,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(unitId))
                return BadRequest("unitId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(assignedId))
                return BadRequest("assignedId обов'язковий");

            if (unitId == assignedId)
                return BadRequest("Підрозділ не може бути приданим сам до себе");

            try
            {
                var assigned = await _set.FirstOrDefaultAsync(x => x.Id == assignedId, ct);
                if (assigned == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Приданий підрозділ не знайдено");

                assigned.AssignedUnitId = unitId;
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
                    _logger.LogError(ex, "Помилка при додаванні приданого Unit UnitId={UnitId} AssignedId={AssignedId}",
                        unitId, assignedId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Видалити приданный підрозділ (отвязати)
        /// </summary>
        [HttpPost("{unitId}/remove-assigned/{assignedId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> RemoveAssignedUnit(
            string unitId,
            string assignedId,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(unitId))
                return BadRequest("unitId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(assignedId))
                return BadRequest("assignedId обов'язковий");

            try
            {
                var assigned = await _set.FirstOrDefaultAsync(
                    x => x.Id == assignedId && x.AssignedUnitId == unitId, ct);
                if (assigned == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Приданий підрозділ не знайдено");

                assigned.AssignedUnitId = null;
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
                    _logger.LogError(ex, "Помилка при видаленні приданого Unit UnitId={UnitId} AssignedId={AssignedId}",
                        unitId, assignedId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Змінити порядковий номер сортування
        /// </summary>
        [HttpPost("{unitId}/moveUpDown/{toUp}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> MoveUpDown(
            string unitId,
            bool toUp,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(unitId))
                return BadRequest("unitId обов'язковий");

            try
            {
                var unit = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == unitId, ct);
                if (unit == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Підрозділ не знайдено");

                unit.OrderVal = toUp ? unit.OrderVal - 1 : unit.OrderVal + 1;
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
                    _logger.LogError(ex, "Помилка при зміні порядку Unit Id={Id}", unitId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Імпортувати особовий склад з зовнішнього файлу
        /// </summary>
        [Consumes("multipart/form-data")]
        [RequestSizeLimit(50_000_000)]
        [HttpPost("{unitId}/importSoldiers")]
        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status423Locked)]
        public async Task<IActionResult> ImportSoldiers(
            string unitId,
            [FromForm] IFormFile soldiers,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(unitId))
                return BadRequest("unitId обов'язковий");

            try
            {
                var unit = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == unitId, ct);
                if (unit == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Підрозділ не знайдено");

                if (soldiers == null || soldiers.Length == 0)
                    return BadRequest("Файл відсутній або порожній");

                var ext = Path.GetExtension(soldiers.FileName);
                if (!string.Equals(ext, ".xlsx", StringComparison.OrdinalIgnoreCase))
                    return BadRequest("Підтримується тільки формат .xlsx");

                (bool started, ImportJob job, string? error) = Services.ImportSoldiers.TryStartBackground(unit, soldiers, ct);
                if (!started)
                    return Problem(statusCode: 423, title: error ?? "Імпорт заблоковано");
                
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
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при імпорті солдат для Unit Id={Id}\n{Msg}", unitId, ex.Message);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера", detail: ex.Message);
            }
        }

        /// <summary>
        /// Вже оброблені підрозділи
        /// </summary>
        [HttpGet("get-last-units")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetLastUnits()
        {
            try
            {
                var result = Services.ImportSoldiers.GetLastUnits();
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні останніх Unit");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Вже оброблені підрозділи
        /// </summary>
        [HttpPost("get-units")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult GetUnits(string[] units)
        {
            try
            {
                var result = Services.ImportSoldiers.GetUnits(units);
                return Ok(result);
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні Unit за списком");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
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