using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Предоставляет API-контроллер для управления элементами завдань підрозділів (DictUnitTaskItem), включая операции
/// получения, создания, обновления, удаления и поиска элементов. Доступ к методам контроллера ограничен авторизацией.
/// </summary>
/// <remarks>Контроллер реализует стандартные CRUD-операции и дополнительные методы для поиска и фильтрации
/// элементов по различным параметрам, таким как UnitTaskId и TemplateCategoryId. Все методы поддерживают отмену через
/// CancellationToken и возвращают стандартные HTTP-ответы с кодами состояния. Для корректной работы требуется наличие
/// связанных сущностей (категорий шаблонов и завдань підрозділів). Контроллер логирует ошибки и конфликтные ситуации
/// для упрощения диагностики.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-unit-task-items")]
public class DictUnitTaskItemsController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictUnitTaskItem> _set;
    private readonly ILogger<DictUnitTaskItemsController> _logger;

    /// <summary>
    /// Предоставляет API-контроллер для управления элементами завдань підрозділів (DictUnitTaskItem), включая операции
    /// получения, создания, обновления, удаления и поиска элементов. Доступ к методам контроллера ограничен авторизацией.
    /// </summary>
    /// <remarks>Контроллер реализует стандартные CRUD-операции и дополнительные методы для поиска и фильтрации
    /// элементов по различным параметрам, таким как UnitTaskId и TemplateCategoryId. Все методы поддерживают отмену через
    /// CancellationToken и возвращают стандартные HTTP-ответы с кодами состояния. Для корректной работы требуется наличие
    /// связанных сущностей (категорий шаблонов и завдань підрозділів). Контроллер логирует ошибки и конфликтные ситуации
    /// для упрощения диагностики.</remarks>

    public DictUnitTaskItemsController(
        MainDbContext db,
        ILogger<DictUnitTaskItemsController> logger)
    {
        _db = db;
        _set = _db.DictUnitTaskItems;
        _logger = logger;
    }

    private IQueryable<DictUnitTaskItem> Query() => DictUnitTaskItemsService.Query(_set);

    /// <summary>
    /// Отримати список елементів завдань підрозділів
    /// </summary>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<DictUnitTaskItemDto>>> GetAll(
        [FromQuery] string? search,
        [FromQuery] Guid? unitTaskId,
        [FromQuery] Guid? templateCategoryId,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();

            if (!string.IsNullOrWhiteSpace(search))
            {
                search = search.Trim();
                q = q.Where(x => x.Value.Contains(search));
            }

            if (unitTaskId.HasValueGuid())
                q = q.Where(x => x.UnitTaskId == unitTaskId);

            if (templateCategoryId.HasValueGuid())
                q = q.Where(x => x.TemplateCategoryId == templateCategoryId);

            var list = await q
                .OrderBy(x => x.Value)
                .Select(x => x.ToDto())
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
                _logger.LogError(ex, "Помилка при отриманні списку DictUnitTaskItem");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати елемент завдання підрозділу за ID
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DictUnitTaskItemDto>> Get(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        try
        {
            var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");
            
            return Ok(e.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні DictUnitTaskItem Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Створити новий елемент завдання підрозділу
    /// </summary>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<ActionResult<DictUnitTaskItemDto>> Create(
        [FromBody] DictUnitTaskItemCreateDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (dto.TemplateCategoryId == Guid.Empty)
            return BadRequest("TemplateCategoryId обов'язковий");

        if (dto.UnitTaskId == Guid.Empty)
            return BadRequest("UnitTaskId обов'язковий");

        try
        {
            // Перевіряємо існування зв'язаних сутностей
            var templateCategoryExists = await _db.DictTemplateCategories
                .AnyAsync(t => t.Id == dto.TemplateCategoryId, ct);
            if (!templateCategoryExists)
                return BadRequest($"Категорія шаблону з ID '{dto.TemplateCategoryId}' не знайдена");

            var unitTaskExists = await _db.DictUnitTasks
                .AnyAsync(t => t.Id == dto.UnitTaskId, ct);
            if (!unitTaskExists)
                return BadRequest($"Завдання підрозділу з ID '{dto.UnitTaskId}' не знайдено");

            var entity = dto.ToEntity();

            _set.Add(entity);
            await _db.SaveChangesAsync(ct);

            var created = await Query().FirstAsync(x => x.Id == entity.Id, ct);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (DbUpdateException ex) when (ControllerFunctions.IsUniqueViolation(ex))
        {
            if (_logger.IsEnabled(LogLevel.Information))
                _logger.LogInformation(ex, "Конфлікт унікальності для DictUnitTaskItem");
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: "Елемент з такими даними вже існує");
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при створенні DictUnitTaskItem");
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при створенні DictUnitTaskItem");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Оновити елемент завдання підрозділу
    /// </summary>
    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status409Conflict)]
    public async Task<IActionResult> Update(
        Guid id,
        [FromBody] DictUnitTaskItemDto dto,
        CancellationToken ct = default)
    {
        if (!ModelState.IsValid)
            return ValidationProblem(ModelState);

        if(id == Guid.Empty)
            return BadRequest("id обов'язковий");

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не може бути порожнім");

        if (dto.TemplateCategoryId == Guid.Empty)
            return BadRequest("TemplateCategoryId обов'язковий");

        if (dto.UnitTaskId == Guid.Empty)
            return BadRequest("UnitTaskId обов'язковий");

        try
        {
            var e = await _set.AsTracking().FirstOrDefaultAsync(x => x.Id == id, ct);
            if (e == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Перевіряємо чи змінились дані
            if (e.IsEqualTo(dto))
                return NoContent();

            // Перевіряємо існування зв'язаних сутностей при зміні
            if (e.TemplateCategoryId != dto.TemplateCategoryId)
            {
                var templateCategoryExists = await _db.DictTemplateCategories
                    .AnyAsync(t => t.Id == dto.TemplateCategoryId, ct);
                if (!templateCategoryExists)
                    return BadRequest($"Категорія шаблону з ID '{dto.TemplateCategoryId}' не знайдена");
            }

            if (e.UnitTaskId != dto.UnitTaskId)
            {
                var unitTaskExists = await _db.DictUnitTasks
                    .AnyAsync(t => t.Id == dto.UnitTaskId, ct);
                if (!unitTaskExists)
                    return BadRequest($"Завдання підрозділу з ID '{dto.UnitTaskId}' не знайдено");
            }

            e.ApplyDto(dto);
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
                _logger.LogInformation(ex, "Конфлікт унікальності при оновленні DictUnitTaskItem Id={Id}", id);
            return Problem(
                statusCode: 409,
                title: "Конфлікт унікальності",
                detail: "Елемент з такими даними вже існує",
                extensions: new Dictionary<string, object?> { ["id"] = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            if (_logger.IsEnabled(LogLevel.Warning))
                _logger.LogWarning(ex, "Конкурентний конфлікт при оновленні DictUnitTaskItem Id={Id}", id);
            return Problem(statusCode: 409, title: "Конкурентний конфлікт");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при оновленні DictUnitTaskItem Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Видалити елемент завдання підрозділу
    /// </summary>
    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        if (id == Guid.Empty)
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
                _logger.LogError(ex, "Помилка при видаленні DictUnitTaskItem Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати елементи завдання за UnitTaskId
    /// </summary>
    [HttpGet("by-unit-task/{unitTaskId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<DictUnitTaskItemDto>>> GetByUnitTask(
        Guid unitTaskId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest("unitTaskId обов'язковий");

        try
        {
            var items = await Query()
                .Where(x => x.UnitTaskId == unitTaskId)
                .OrderBy(x => x.Value)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(items);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні елементів за UnitTaskId={UnitTaskId}\n{Msg}",
                    unitTaskId, ex.Message);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати елементи завдання за TemplateCategoryId
    /// </summary>
    [HttpGet("by-template-category/{templateCategoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<DictUnitTaskItemDto>>> GetByTemplateCategory(
        Guid templateCategoryId,
        CancellationToken ct = default)
    {
        if (templateCategoryId == Guid.Empty)
            return BadRequest("templateCategoryId обов'язковий");

        try
        {
            var items = await Query()
                .Where(x => x.TemplateCategoryId == templateCategoryId)
                .OrderBy(x => x.Value)
                .Select(x => x.ToDto())
                .ToListAsync(ct);

            return Ok(items);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні елементів за TemplateCategoryId={TemplateCategoryId}", 
                    templateCategoryId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати елемент завдання за UnitTaskId та TemplateCategoryId
    /// </summary>
    [HttpGet("by-task-and-template/{unitTaskId}/{templateCategoryId}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DictUnitTaskItemDto>> GetTaskByTemplate(
        Guid unitTaskId,
        Guid templateCategoryId,
        CancellationToken ct = default)
    {
        if (unitTaskId == Guid.Empty)
            return BadRequest("unitTaskId обов'язковий");
        
        if (templateCategoryId == Guid.Empty)
            return BadRequest("templateCategoryId обов'язковий");

        try
        {
            var item = await Query()
                .Where(x => x.UnitTaskId == unitTaskId && x.TemplateCategoryId == templateCategoryId)
                .FirstOrDefaultAsync(ct);

            if (item == null)
                return Problem(
                    statusCode: 404, 
                    title: "Не знайдено", 
                    detail: $"UnitTaskId={unitTaskId}, TemplateCategoryId={templateCategoryId}");

            return Ok(item.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, 
                    "Помилка при отриманні елемента за UnitTaskId={UnitTaskId} та TemplateCategoryId={TemplateCategoryId}", 
                    unitTaskId, templateCategoryId);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Автокомпліт для пошуку елементів завдань
    /// </summary>
    [HttpGet("lookup")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> Lookup(
        [FromQuery] string? term,
        [FromQuery] Guid? unitTaskId,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(term))
            return Ok(Array.Empty<object>());
        
        if (limit is < 1 or > 100) limit = 10;

        try
        {
            term = term.Trim();
            
            var q = Query();
            
            if (unitTaskId.HasValueGuid())
                q = q.Where(x => x.UnitTaskId == unitTaskId);

            var data = await q
                .Where(x => x.Value.Contains(term))
                .OrderBy(x => x.Value)
                .Take(limit)
                .Select(x => new LookupDto(x.Id, x.Value))
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
                _logger.LogError(ex, "Помилка в lookup DictUnitTaskItem");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Список для випадаючого списку (select)
    /// </summary>
    [HttpGet("sel_list")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<LookupDto>>> GetSelectList(
        [FromQuery] Guid? unitTaskId,
        [FromQuery] Guid? templateCategoryId,
        CancellationToken ct = default)
    {
        try
        {
            var q = Query();

            if (unitTaskId.HasValueGuid())
                q = q.Where(x => x.UnitTaskId == unitTaskId);

            if (templateCategoryId.HasValueGuid())
                q = q.Where(x => x.TemplateCategoryId == templateCategoryId);

            var data = await q
                .OrderBy(x => x.Value)
                .Select(x => new LookupDto(x.Id, x.Value))
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
                _logger.LogError(ex, "Помилка при отриманні sel_list DictUnitTaskItem");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}