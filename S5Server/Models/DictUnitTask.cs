using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models
{
    public record DictUnitTaskDto(
        string Id,
        string Value,
        string? Comment,
        decimal Amount,
        bool WithMeans,
        bool AtPermanentPoint)
    {
        public static DictUnitTaskDto ToDto(DictUnitTask e) =>
            new(
                e.Id,
                e.Value,
                e.Comment,
                e.Amount,
                e.WithMeans,
                e.AtPermanentPoint);

        public static void ApplyDto(DictUnitTask e, DictUnitTaskDto dto)
        {
            e.Value = dto.Value.Trim();
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
            e.Amount = dto.Amount;
            e.WithMeans = dto.WithMeans;
            e.AtPermanentPoint = dto.AtPermanentPoint;
        }
    }

    public record DictUnitTaskCreateDto(
        string Value,
        string? Comment,
        decimal Amount,
        bool WithMeans = false,
        bool AtPermanentPoint = true);

    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    /// <remarks>This class maps to the 'dict_unit_task' database table and provides properties for
    /// identifying, describing, and configuring unit tasks. It is typically used in scenarios where tasks are assigned
    /// to units and may include financial amounts, comments, and configuration flags. All properties are required
    /// unless otherwise specified. Thread safety is not guaranteed; instances should be managed appropriately in
    /// concurrent environments.</remarks>
    [Table("dict_unit_task")]
    public class DictUnitTask
    {
        [Key]
        [StringLength(36)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Comment { get; set; }

        /// <summary>
        /// Сума (грн)
        /// </summary>
        [Required]
        public decimal Amount { get; set; }

        /// <summary>
        /// Чи використовуються в завданні засоби ураження
        /// </summary>
        public bool WithMeans { get; set; } = false;

        /// <summary>
        /// Завдання на ППД
        /// </summary>
        public bool AtPermanentPoint { get; set; } = true;
    }
}