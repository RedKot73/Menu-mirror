namespace S5Server.Models;

public record PagedResult<T>(
    /// <summary>
    /// Список елементів поточної сторінки
    /// </summary>
    IReadOnlyList<T> Items,
    /// <summary>
    /// Загальна кількість записів (після фільтрації)
    /// </summary>
    int TotalCount,
    /// <summary>
    /// Поточна сторінка (починається з 1)
    /// </summary>
    int Page,
    /// <summary>
    /// Кількість записів на сторінці
    /// </summary>
    int PageSize,
    /// <summary>
    /// Загальна кількість сторінок
    /// </summary>
    int TotalPages)
{
    public bool HasPreviousPage => Page > 1;
    public bool HasNextPage => Page < TotalPages;
}