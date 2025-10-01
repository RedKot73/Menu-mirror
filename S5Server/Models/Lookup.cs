namespace S5Server.Models
{
    // DTO для передачи в списки выбора
    // Можно использовать record, т.к. это только для чтения
    public record LookupDto(
        string Id,
        string Value
    );

    public class Lookup
    {
        public string Id { get; set; } = default!;
        string Value { get; set; } = string.Empty;
    }
}
