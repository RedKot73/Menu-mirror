using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

/// <summary>
/// Контролер для роботи з деревом кодифікатора адміністративно-територіальних одиниць
/// </summary>
[ApiController]
[Route("api/dict-city-code-tree")]
public class DictCityCodeTreeController : ControllerBase
{
    private readonly MainDbContext _db;
    private readonly DbSet<DictCityCode> _set;
    private readonly ILogger<DictCityCodeTreeController> _logger;

    public DictCityCodeTreeController(MainDbContext db, ILogger<DictCityCodeTreeController> logger)
    {
        _db = db;
        _set = _db.DictCityCodes;
        _logger = logger;
    }

    /// <summary>
    /// Отримати повне дерево кодифікатора або піддерево з вказаного вузла
    /// </summary>
    /// <param name="parentId">ID батьківського вузла (null = з кореня)</param>
    /// <param name="maxDepth">Максимальна глибина дерева (0 = без обмежень)</param>
    /// <param name="ct">Токен скасування</param>
    /// <returns>Дерево кодифікатора</returns>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeTreeNodeDto>>> GetTree(
        [FromQuery] string? parentId = DictCityCode.RootCityCode,
        [FromQuery] int maxDepth = 1,
        CancellationToken ct = default)
    {
        try
        {
            // Завантажуємо всі записи з категоріями
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо дерево
            var tree = maxDepth > 0
                ? cityCodes.BuildTree(parentId, maxDepth)
                : cityCodes.BuildTree(parentId);

            // Конвертуємо в DTO
            var treeDto = tree.Select(n => n.ToDto()).ToList();

            return Ok(treeDto);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні дерева кодифікатора");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати піддерево для конкретного вузла
    /// </summary>
    /// <param name="id">ID вузла</param>
    /// <param name="maxDepth">Максимальна глибина (0 = без обмежень)</param>
    /// <param name="ct">Токен скасування</param>
    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CityCodeTreeNodeDto>> GetSubtree(
        string id,
        [FromQuery] int maxDepth = 1,
        CancellationToken ct = default)
    {
        // Тут саме string оскільки формат UA01020000000022387
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest("id обов'язковий");

        try
        {
            // Перевіряємо існування вузла
            var exists = await _set.AnyAsync(x => x.Id == id, ct);
            if (!exists)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Завантажуємо всі записи
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо дерево з вказаного вузла
            var tree = maxDepth > 0
                ? cityCodes.BuildTree(id, maxDepth)
                : cityCodes.BuildTree(id);

            if (tree.Count == 0)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Піддерево порожнє");

            // Повертаємо перший вузол (корінь піддерева)
            var rootNode = tree.First();
            return Ok(rootNode.ToDto());
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні піддерева Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати шлях (breadcrumb) до вузла від кореня
    /// </summary>
    /// <param name="id">ID вузла</param>
    /// <param name="ct">Токен скасування</param>
    /// <returns>Масив вузлів від кореня до шуканого</returns>
    [HttpGet("{id}/path")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<CityCodeTreeNodeDto>>> GetPath(
        string id,
        CancellationToken ct = default)
    {
        // Тут саме string оскільки формат UA01020000000022387
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest("id обов'язковий");

        try
        {
            // Перевіряємо існування
            var exists = await _set.AnyAsync(x => x.Id == id, ct);
            if (!exists)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Завантажуємо всі записи
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо повне дерево
            var tree = cityCodes.BuildTree(maxDepth: 0);

            // Знаходимо шлях
            var path = tree.GetPath(id);

            if (path.Count == 0)
                return Problem(statusCode: 404, title: "Не знайдено", detail: "Шлях не знайдено");

            return Ok(path.Select(n => n.ToDto()));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні шляху до вузла Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Пошук у дереві за текстом
    /// </summary>
    /// <param name="search">Текст для пошуку</param>
    /// <param name="categoryId">Фільтр за категорією (опціонально)</param>
    /// <param name="ct">Токен скасування</param>
    /// <returns>Відфільтроване дерево</returns>
    [HttpGet("search")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeTreeNodeDto>>> Search(
        [FromQuery] string search,
        [FromQuery] Guid? categoryId,
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(search))
            return BadRequest("search не може бути порожнім");

        try
        {
            // Завантажуємо всі записи
            var query = _set
                .AsNoTracking()
                .Include(x => x.Category)
                .AsQueryable();

            // Застосовуємо фільтр категорії якщо є
            if (categoryId.HasValueGuid())
                query = query.Where(x => x.CategoryId == categoryId);

            var cityCodes = await query.ToListAsync(ct);

            // Будуємо повне дерево
            var tree = cityCodes.BuildTree(maxDepth: 0);

            // Фільтруємо дерево
            var searchLower = search.ToLower();
            var filtered = tree.Filter(n => 
                n.Value.ToLower().Contains(searchLower));

            return Ok(filtered.Select(n => n.ToDto()));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при пошуку в дереві Search={Search}", search);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати плоский список всіх вузлів дерева
    /// </summary>
    /// <param name="parentId">ID батьківського вузла (null = з кореня)</param>
    /// <param name="ct">Токен скасування</param>
    /// <returns>Плоский список вузлів</returns>
    [HttpGet("flat")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<CityCodeTreeNodeDto>>> GetFlat(
        [FromQuery] string? parentId = DictCityCode.RootCityCode,
        CancellationToken ct = default)
    {
        try
        {
            // Завантажуємо всі записи
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо дерево
            var tree = cityCodes.BuildTree(parentId, maxDepth: 0);

            // Перетворюємо в плоский список
            var flat = tree.Flatten();

            return Ok(flat.Select(n => n.ToDto()));
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні плоского списку");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Отримати статистику дерева
    /// </summary>
    /// <param name="parentId">ID батьківського вузла (null = з кореня)</param>
    /// <param name="ct">Токен скасування</param>
    /// <returns>Статистика: кількість вузлів, максимальна глибина</returns>
    [HttpGet("stats")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<object>> GetStats(
        [FromQuery] string? parentId = DictCityCode.RootCityCode,
        CancellationToken ct = default)
    {
        try
        {
            // Завантажуємо всі записи
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо дерево
            var tree = cityCodes.BuildTree(parentId, maxDepth: 0);

            // Підраховуємо статистику
            var totalNodes = tree.CountNodes();
            var maxDepth = tree.GetMaxDepth();
            var rootNodes = tree.Count;

            var stats = new
            {
                TotalNodes = totalNodes,
                MaxDepth = maxDepth,
                RootNodes = rootNodes,
                ByCategory = cityCodes
                    .GroupBy(c => c.CategoryId)
                    .Select(g => new
                    {
                        CategoryId = g.Key,
                        Category = g.First().Category?.ShortValue ?? g.First().Category?.Value,
                        Count = g.Count()
                    })
                    .OrderByDescending(x => x.Count)
                    .ToList()
            };

            return Ok(stats);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні статистики дерева");
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }

    /// <summary>
    /// Знайти вузол за ID і повернути його з контекстом (батьки + діти)
    /// </summary>
    /// <param name="id">ID вузла</param>
    /// <param name="includeParents">Включити батьківські вузли (шлях)</param>
    /// <param name="includeChildren">Включити дочірні вузли</param>
    /// <param name="childrenDepth">Глибина дочірніх вузлів (0 = всі)</param>
    /// <param name="ct">Токен скасування</param>
    [HttpGet("{id}/context")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<object>> GetNodeContext(
        string id,
        [FromQuery] bool includeParents = true,
        [FromQuery] bool includeChildren = true,
        [FromQuery] int childrenDepth = 1,
        CancellationToken ct = default)
    {
        // Тут саме string оскільки формат UA01020000000022387
        if (string.IsNullOrWhiteSpace(id))
            return BadRequest("id обов'язковий");

        try
        {
            // Перевіряємо існування
            var exists = await _set.AnyAsync(x => x.Id == id, ct);
            if (!exists)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Id={id}");

            // Завантажуємо всі записи
            var cityCodes = await _set
                .AsNoTracking()
                .Include(x => x.Category)
                .ToListAsync(ct);

            // Будуємо дерево
            var fullTree = cityCodes.BuildTree(maxDepth: 0);

            // Знаходимо вузол
            var node = fullTree.FindNode(id);
            if (node == null)
                return Problem(statusCode: 404, title: "Не знайдено", detail: $"Вузол Id={id} не знайдено в дереві");

            // Збираємо контекст
            var result = new
            {
                Node = node.ToDto(),
                Parents = includeParents 
                    ? fullTree.GetPath(id).Select(n => n.ToDto()).ToList() 
                    : null,
                Children = includeChildren
                    ? (childrenDepth > 0 
                        ? cityCodes.BuildTree(id, childrenDepth).Select(n => n.ToDto()).ToList()
                        : [.. cityCodes.BuildTree(id, maxDepth: 0).Select(n => n.ToDto())])
                    : null
            };

            return Ok(result);
        }
        catch (OperationCanceledException)
        {
            return Problem(statusCode: 499, title: "Скасовано кліентом");
        }
        catch (Exception ex)
        {
            if (_logger.IsEnabled(LogLevel.Error))
                _logger.LogError(ex, "Помилка при отриманні контексту вузла Id={Id}", id);
            return Problem(statusCode: 500, title: "Внутрішня помилка сервера");
        }
    }
}