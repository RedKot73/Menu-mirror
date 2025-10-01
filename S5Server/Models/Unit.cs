using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    // DTO для передачи Unit
    public record UnitDto(
        string Id,
        string? ParentId,
        string? ParentShortName,
        string? AssignedUnitId,
        string Name,
        string ShortName,
        string? MilitaryNumber,
        string? ForceTypeId,
        string? ForceType,
        string? UnitTypeId,
        string? UnitType,
        int OrderVal,
        string? Comment
    );
    // DTO для создания Unit
    public record UnitCreateDto(
        string? ParentId,
        string? AssignedUnitId,
        string Name,
        string ShortName,
        string? MilitaryNumber,
        string? ForceTypeId,
        string? UnitTypeId,
        int OrderVal,
        string? Comment
    );


    /// <summary>
    /// Підрозділ
    /// </summary>
    [Table("units")]
    public class Unit
    {
        [Key]
        [StringLength(36)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        /// <summary>
        /// Основний підрозділ
        /// </summary>
        //[ForeignKey(nameof(Parent))]
        public string? ParentId { get; set; }

        public virtual Unit? Parent { get; set; }

        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        //[ForeignKey(nameof(AssignedUnit))]
        public string? AssignedUnitId { get; set; }
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ValidateNever]
        public Unit? AssignedUnit { get; set; }
        
        /// <summary>
        /// Назва підрозділу
        /// </summary>
        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// Скорочена назва підрозділу
        /// </summary>
        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string ShortName { get; set; } = string.Empty;

        /// <summary>
        /// Номер військової частини (В/Ч)
        /// </summary>
        [StringLength(100)]
        public string? MilitaryNumber { get; set; }

        /// <summary>
        /// Вид збройних сил Сухопутні, ДШВ, ВМС...
        /// </summary>
        //[ForeignKey(nameof(DictForcesType))]
        public string? ForceTypeId { get; set; }
        /// <summary>
        /// Вид збройних сил Сухопутні, ДШВ, ВМС...
        /// </summary>
        [ValidateNever]
        public DictForcesType? ForceType { get; set; } = default!;

        /// <summary>
        /// Тип підрозділу Бригада, Полк, Батальйон, Рота
        /// </summary>
        //[ForeignKey(nameof(DictUnitType))]
        public string? UnitTypeId { get; set; }
        /// <summary>
        /// Тип підрозділу Бригада, Полк, Батальйон, Рота
        /// </summary>
        [ValidateNever]
        public DictUnitType? UnitType { get; set; } = default!;
        public int OrderVal { get; set; } = 1;

        public string? Comment { get; set; }

        /// <summary>
        /// Підпорядковані підрозділи
        /// </summary>
        //[NotMapped]
        public virtual IEnumerable<Unit>? ChildUnits { get; set; }

        /// <summary>
        /// Придані підрозділи
        /// </summary>
        //[NotMapped]
        public List<Unit> AssignedUnits { get; set; } = default!;

        /// <summary>
        /// Суміжні підрозділи
        /// </summary>
        [NotMapped]
        public List<Unit> AdjacentUnits { get; set; } = default!;

        /// <summary>
        /// Особовий склад
        /// </summary>
        [NotMapped]
        public List<Soldier> Soldiers { get; set; } = default!;

        /// <summary>
        /// Приданий особовий склад
        /// </summary>
        [NotMapped]
        public List<Soldier> AssignedSoldiers { get; set; } = default!;

        public static UnitDto ToDto(Unit e) =>
            new(
                e.Id,
                e.ParentId,
                e.Parent?.ShortName,
                e.AssignedUnitId,
                e.Name,
                e.ShortName,
                e.MilitaryNumber,
                e.ForceTypeId,
                e.ForceType?.ShortValue,
                e.UnitTypeId,
                e.UnitType?.ShortValue,
                e.OrderVal,
                e.Comment
            );

        public static void ApplyDto(Unit e, UnitDto dto)
        {
            e.ParentId = dto.ParentId;
            e.AssignedUnitId = dto.AssignedUnitId;
            e.Name = dto.Name.Trim();
            e.ShortName = dto.ShortName.Trim();
            e.MilitaryNumber = dto.MilitaryNumber?.Trim();
            e.ForceTypeId = dto.ForceTypeId;
            e.UnitTypeId = dto.UnitTypeId;
            e.OrderVal = dto.OrderVal;
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        }
    }
}
