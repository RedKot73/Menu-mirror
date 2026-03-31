namespace S5Server.Models;

/// <summary>
/// Представляє сторінковий результат запиту.
/// </summary>
/// <typeparam name="T">Тип елементів у результаті.</typeparam>
/// <param name="Items">Список елементів поточної сторінки.</param>
/// <param name="TotalCount">Загальна кількість записів (після фільтрації).</param>
/// <param name="Page">Поточна сторінка (починається з 1).</param>
/// <param name="PageSize">Кількість записів на сторінці.</param>
/// <param name="TotalPages">Загальна кількість сторінок.</param>
public record PagedResult<T>(
    IReadOnlyList<T> Items,
    int TotalCount,
    int Page,
    int PageSize,
    int TotalPages)
{
    /// <summary>
    /// Ознака наявності попередньої сторінки.
    /// </summary>
    public bool HasPreviousPage => Page > 1;
    
    /// <summary>
    /// Ознака наявності наступної сторінки.
    /// </summary>
    public bool HasNextPage => Page < TotalPages;
}