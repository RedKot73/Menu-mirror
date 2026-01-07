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
        private readonly ILogger<SoldierController> _logger;

        public SoldierController(MainDbContext db, ILogger<SoldierController> logger)
        {
            _db = db;
            _set = db.Soldiers;
            _logger = logger;
        }

        private IQueryable<Soldier> Query() => SoldierService.GetQuery(_set);

        /// <summary>
        /// Список військовослужбовців з фільтрацією.
        /// </summary>
        /// <param name="search">Пошук по ПІБ / позивному / номеру частини підрозділу.</param>
        /// <param name="unitId">Фільтр по основному підрозділу.</param>
        /// <param name="limit">Обмеження кількості результатів.</param>
        /// <param name="ct">Токен відміни.</param>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetAll(
            [FromQuery] string? search,
            [FromQuery] string? unitId,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            try
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
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні списку Soldier");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Список військовослужбовців за приданим підрозділом.
        /// </summary>
        [HttpGet("by-assigned")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByAssigned(
            [FromQuery] string assignedUnitId,
            [FromQuery] string? search,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(assignedUnitId))
                return BadRequest("assignedUnitId обов'язковий");

            try
            {
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
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні Soldier за приданим підрозділом AssignedUnitId={AssignedUnitId}",
                        assignedUnitId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Список військовослужбовців за оперативним підрозділом.
        /// </summary>
        [HttpGet("by-operational")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<SoldierDto>>> GetByOperational(
            [FromQuery] string operationalUnitId,
            [FromQuery] string? search,
            [FromQuery] int? limit,
            CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(operationalUnitId))
                return BadRequest("operationalUnitId обов'язковий");

            try
            {
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
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні Soldier за оперативним підрозділом OperationalUnitId={OperationalUnitId}",
                        operationalUnitId);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Lookup (для автокомпліта по ПІБ / позивному).
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
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка в lookup Soldier");
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SoldierDto>> Get(string id, CancellationToken ct = default)
        {
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            try
            {
                var e = await Query().FirstOrDefaultAsync(s => s.Id == id, ct);
                if (e == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
                
                return Ok(SoldierDto.ToDto(e));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при отриманні Soldier Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status409Conflict)]
        public async Task<ActionResult<SoldierDto>> Create(
            [FromBody] SoldierCreateDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.FirstName))
                return BadRequest("FirstName не може бути порожнім");
            
            if (string.IsNullOrWhiteSpace(dto.UnitId))
                return BadRequest("UnitId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(dto.RankId))
                return BadRequest("RankId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(dto.PositionId))
                return BadRequest("PositionId обов'язковий");
            
            if (string.IsNullOrWhiteSpace(dto.StateId))
                return BadRequest("StateId обов'язковий");

            try
            {
                var entity = dto.ToEntity();

                _set.Add(entity);
                await _db.SaveChangesAsync(ct);

                entity = await Query().FirstAsync(s => s.Id == entity.Id, ct);
                return CreatedAtAction(nameof(Get), new { id = entity.Id }, SoldierDto.ToDto(entity));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
            {
                if (_logger.IsEnabled(LogLevel.Information))
                    _logger.LogInformation(ex, "Конфлікт унікальності для Soldier");
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: "Запис з такими даними вже існує");
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при створенні Soldier");
                return Problem(statusCode: 409, title: "Конкурентний конфлікт");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при створенні Soldier");
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
            [FromBody] SoldierDto dto,
            CancellationToken ct = default)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            if (string.IsNullOrWhiteSpace(dto.FirstName))
                return BadRequest("FirstName не може бути порожнім");

            try
            {
                var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
                if (e == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

                var original = (e.FirstName, e.MidleName, e.LastName, e.BirthDate, e.NickName,
                                e.UnitId, e.AssignedUnitId, e.InvolvedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

                SoldierDto.ApplyDto(e, dto);

                var changed = (e.FirstName, e.MidleName, e.LastName, e.BirthDate, e.NickName,
                               e.UnitId, e.AssignedUnitId, e.InvolvedUnitId, e.RankId, e.PositionId, e.StateId, e.Comment);

                if (original == changed)
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
                    _logger.LogInformation(ex, "Конфлікт унікальності при оновленні Soldier Id={Id}", id);
                return Problem(
                    statusCode: 409,
                    title: "Конфлікт унікальності",
                    detail: "Запис з такими даними вже існує",
                    extensions: new Dictionary<string, object?> { ["id"] = id });
            }
            catch (DbUpdateConcurrencyException ex)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                    _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні Soldier Id={Id}", id);
                return Problem(statusCode: 409, title: "Конкурентний конфлікт");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при оновленні Soldier Id={Id}", id);
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
                var e = await _set.FirstOrDefaultAsync(s => s.Id == id, ct);
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
                    _logger.LogError(ex, "Помилка при видаленні Soldier Id={Id}", id);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
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
            if (string.IsNullOrWhiteSpace(id))
                return BadRequest("id обов'язковий");

            // UnitId не может быть пустым (обязательное поле)
            if (string.IsNullOrWhiteSpace(unitId) && unitKind == UnitKind.UnitId)
                return BadRequest("UnitId обов'язковий для переведення бійця");

            try
            {
                var e = await _set.AsTracking().FirstOrDefaultAsync(s => s.Id == id, ct);
                if (e == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Боєць не знайдений");

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
                if (updated == null)
                    return Problem(statusCode: 404, title: "Не знайдено", detail: "Боєць не знайдений після збереження");

                return Ok(SoldierDto.ToDto(updated));
            }
            catch (OperationCanceledException)
            {
                return Problem(statusCode: 499, title: "Скасовано кліентом");
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Error))
                    _logger.LogError(ex, "Помилка при зміні підрозділу Soldier Id={Id} UnitKind={UnitKind}",
                        id, unitKind);
                return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
            }
        }

        /// <summary>
        /// Придати бійця до підрозділу (або відмінити придання якщо unitId не вказано).
        /// </summary>
        [HttpPost("{id}/assign-assigned/{unitId?}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<ActionResult<SoldierDto>> AssignAssigned(
            string id, 
            string? unitId, 
            CancellationToken ct = default)
            => SetUnit(id, unitId, UnitKind.AssignedUnitId, ct);

        /// <summary>
        /// Придати бійця до Оперативного підрозділу.
        /// </summary>
        [HttpPost("{id}/assign-involved/{unitId?}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<ActionResult<SoldierDto>> AssignInvolved(
            string id, 
            string? unitId, 
            CancellationToken ct = default)
            => SetUnit(id, unitId, UnitKind.InvolvedUnitId, ct);

        /// <summary>
        /// Перевести бійця до іншого основного підрозділу.
        /// </summary>
        [HttpPost("{id}/move/{newUnitId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public Task<ActionResult<SoldierDto>> Move(
            string id, 
            string newUnitId, 
            CancellationToken ct = default)
            => SetUnit(id, newUnitId, UnitKind.UnitId, ct);
    }
}