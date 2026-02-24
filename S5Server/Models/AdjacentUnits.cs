using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models
{
    /// <summary>
    /// Суміжні підрозділи
    /// </summary>
    [Table("adjacent_units"), Display(Name = Caption)]
    public class AdjacentUnits
    {
        public const string AdjacentUnitsCaption = "Суміжні підрозділи";
        public const string Caption = "Суміжний підрозділ";
        public readonly string cnstCaption = Caption;

        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        [ForeignKey(nameof(Unit))]
        public string FirstUnitId { get; set; } = string.Empty;

        public Unit FirstUnit { get; set; } = default!;

        [ForeignKey(nameof(Unit))]
        public string SecondUnitId { get; set; } = string.Empty;

        public Unit SecondUnit { get; set; } = default!;
    }
}
