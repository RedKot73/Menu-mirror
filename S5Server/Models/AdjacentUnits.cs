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
        /// <summary>
        /// Множинна назва сутності.
        /// </summary>
        public const string AdjacentUnitsCaption = "Суміжні підрозділи";
        
        /// <summary>
        /// Одиночна назва сутності.
        /// </summary>
        public const string Caption = "Суміжний підрозділ";
        
        /// <summary>
        /// Константа назви.
        /// </summary>
        public readonly string cnstCaption = Caption;

        /// <summary>
        /// Унікальний ідентифікатор запису.
        /// </summary>
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        /// <summary>
        /// ID першого підрозділу.
        /// </summary>
        [ForeignKey(nameof(Unit))]
        public string FirstUnitId { get; set; } = string.Empty;

        /// <summary>
        /// Перший підрозділ.
        /// </summary>
        public Unit FirstUnit { get; set; } = default!;

        /// <summary>
        /// ID другого підрозділу.
        /// </summary>
        [ForeignKey(nameof(Unit))]
        public string SecondUnitId { get; set; } = string.Empty;

        /// <summary>
        /// Другий підрозділ.
        /// </summary>
        public Unit SecondUnit { get; set; } = default!;
    }
}
