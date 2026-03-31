namespace S5Server.Models
{
    // DTO для передачи в списки выбора
    // Можно использовать record, т.к. это только для чтения
    /// <summary>
    /// DTO для передачі базових даних «ID-Назва» (наприклад, для випадаючих списків).
    /// </summary>
    /// <param name="Id">Унікальний ідентифікатор.</param>
    /// <param name="Value">Текстове значення.</param>
    public record LookupDto(
        Guid Id,
        string Value
    );

    /// <summary>
    /// Базова модель для пошуку.
    /// </summary>
    public class Lookup
    {
        /// <summary>
        /// Унікальний ідентифікатор.
        /// </summary>
        public Guid Id { get; set; } = default!;
        
        /// <summary>
        /// Текстове значення.
        /// </summary>
        public string Value { get; set; } = string.Empty;
    }
}
