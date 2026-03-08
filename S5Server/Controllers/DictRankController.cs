using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Предоставляет API-контроллер для управления справочником воинских званий, включая операции получения, создания,
/// обновления и удаления записей рангов.
/// </summary>
/// <remarks>Контроллер требует аутентификации и реализует стандартные CRUD-операции для сущности DictRank.
/// Поддерживает фильтрацию, поиск и получение укороченных списков для автодополнения и выпадающих списков. Все методы
/// используют асинхронные операции и возвращают стандартные коды HTTP-ответов для REST API. Контроллер не является
/// потокобезопасным и предназначен для использования в рамках стандартного жизненного цикла ASP.NET Core.</remarks>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DictRankController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictRank> _set;

    /// <summary>
    /// Предоставляет API-контроллер для управления справочником воинских званий, включая операции получения, создания,
    /// обновления и удаления записей рангов.
    /// </summary>
    /// <remarks>Контроллер требует аутентификации и реализует стандартные CRUD-операции для сущности DictRank.
    /// Поддерживает фильтрацию, поиск и получение укороченных списков для автодополнения и выпадающих списков. Все методы
    /// используют асинхронные операции и возвращают стандартные коды HTTP-ответов для REST API. Контроллер не является
    /// потокобезопасным и предназначен для использования в рамках стандартного жизненного цикла ASP.NET Core.</remarks>
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

    /// <summary>
    /// Retrieves all dictionary rank entries that match the specified search and filter criteria.
    /// </summary>
    /// <param name="search">An optional search term to filter results by the short value. If null or empty, no search filtering is applied.</param>
    /// <param name="category">An optional category to filter the results. If null or empty, results are not filtered by category.</param>
    /// <param name="subCategory">An optional subcategory to further filter the results. If null or empty, results are not filtered by
    /// subcategory.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the asynchronous operation.</param>
    /// <returns>An asynchronous operation that returns an action result containing a collection of dictionary rank data transfer
    /// objects that match the specified criteria.</returns>
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

    /// <summary>
    /// Возвращает объект звания словаря с указанным идентификатором, если он существует.
    /// </summary>
    /// <param name="id">Уникальный идентификатор ранга словаря, который требуется получить.</param>
    /// <param name="ct">Токен отмены, который может быть использован для отмены асинхронной операции.</param>
    /// <returns>Результат действия, содержащий объект ранга словаря, если найден; в противном случае — результат NotFound.</returns>
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<DictRankDto>> Get(Guid id, CancellationToken ct = default)
    {
        var e = await Query().FirstOrDefaultAsync(x => x.Id == id, ct);
        return e is null ? NotFound() : Ok(ToDto(e));
    }

    /// <summary>
    /// Creates a new rank entry using the specified data.
    /// </summary>
    /// <remarks>Returns a 400 Bad Request if the input data is invalid or required fields are missing.
    /// Returns a 409 Conflict if a rank with the same value already exists.</remarks>
    /// <param name="dto">The data transfer object containing the information required to create a new rank. Cannot be null. The 'Value'
    /// and 'ShortValue' properties must not be empty or whitespace.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An ActionResult containing the created rank data if successful; otherwise, a result indicating the reason for
    /// failure, such as a bad request or conflict.</returns>
    [HttpPost]
    public async Task<ActionResult<DictRankDto>> Create([FromBody] DictRankCreateDto dto,
        CancellationToken ct = default)
    {
        if (dto is null) return BadRequest("Пустое тело запроса.");
        if (string.IsNullOrWhiteSpace(dto.Value)) return BadRequest("Value не может быть пустым.");
        if (string.IsNullOrWhiteSpace(dto.ShortValue)) return BadRequest("ShortValue не может быть пустым.");

        var entity = new DictRank
        {
            Id = Guid.CreateVersion7(),
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

    /// <summary>
    /// Updates an existing dictionary rank entry with the specified identifier using the provided data.
    /// </summary>
    /// <remarks>The method validates the input and ensures that required fields are provided. If the update
    /// does not result in any changes, a 204 No Content response is returned. If a uniqueness constraint is violated, a
    /// 409 Conflict response is returned.</remarks>
    /// <param name="id">The unique identifier of the dictionary rank entry to update. Must not be <see cref="Guid.Empty"/>.</param>
    /// <param name="dto">The data transfer object containing the updated values for the dictionary rank entry. Cannot be null.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the operation.</param>
    /// <returns>An <see cref="IActionResult"/> indicating the result of the update operation. Returns <see
    /// cref="BadRequestResult"/> if the input is invalid, <see cref="NotFoundResult"/> if the entry does not exist,
    /// <see cref="ConflictResult"/> if a uniqueness constraint is violated, or <see cref="NoContentResult"/> if the
    /// update is successful or no changes are detected.</returns>
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] DictRankDto dto,
        CancellationToken ct = default)
    {
        if (id == Guid.Empty)
            return BadRequest("id обов'язковий");

        if (dto is null)
            return BadRequest("Пустое тело запроса.");

        if (string.IsNullOrWhiteSpace(dto.Value))
            return BadRequest("Value не может быть пустым.");

        if (string.IsNullOrWhiteSpace(dto.ShortValue))
            return BadRequest("ShortValue не может быть пустым.");

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

    /// <summary>
    /// Удаляет сущность с указанным идентификатором.
    /// </summary>
    /// <param name="id">Уникальный идентификатор сущности, которую требуется удалить.</param>
    /// <param name="ct">Токен отмены, который может быть использован для отмены асинхронной операции.</param>
    /// <returns>Результат действия, указывающий на успешное удаление (NoContent) или отсутствие сущности (NotFound).</returns>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id, CancellationToken ct = default)
    {
        var e = await _set.FirstOrDefaultAsync(x => x.Id == id, ct);
        if (e is null) return NotFound();

        _set.Remove(e);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    // Укороченный список для автокомплита
    /// <summary>
    /// Возвращает список элементов для автодополнения, соответствующих заданному поисковому термину.
    /// </summary>
    /// <remarks>Если значение параметра limit выходит за пределы допустимого диапазона, используется значение
    /// по умолчанию 10.</remarks>
    /// <param name="term">Поисковый термин, используемый для фильтрации элементов. Не может быть пустым или состоять только из пробелов.</param>
    /// <param name="limit">Максимальное количество возвращаемых элементов. Должно быть от 1 до 100; по умолчанию 10.</param>
    /// <param name="ct">Токен отмены для прерывания асинхронной операции.</param>
    /// <returns>Результат действия, содержащий коллекцию объектов LookupDto, соответствующих поисковому термину. Если совпадений
    /// не найдено, возвращается пустой список.</returns>
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