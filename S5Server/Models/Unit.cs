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
        string? AssignedShortName,
        string Name,
        string ShortName,
        string? MilitaryNumber,
        string? ForceTypeId,
        string? ForceType,
        string? UnitTypeId,
        string? UnitType,
        int OrderVal,
        string? Comment
    )
    {
        public static UnitDto ToDto(Unit e) =>
            new(
                e.Id,
                e.ParentId,
                e.Parent?.ShortName,
                e.AssignedUnitId,
                e.AssignedUnit?.ShortName,
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

    /// <summary>
    /// Расширенный DTO для дерева: добавляет признак наличия дочірніх підрозділів.
    /// </summary>
    public record UnitTreeItemDto(
        string Id,
        string? ParentId,
        string? ParentShortName,
        string? AssignedUnitId,
        string? AssignedShortName,
        string Name,
        string ShortName,
        string? MilitaryNumber,
        string? ForceTypeId,
        string? ForceType,
        string? UnitTypeId,
        string? UnitType,
        int OrderVal,
        string? Comment,
        bool HasChildren = false
    ) : UnitDto(
        Id,
        ParentId,
        ParentShortName,
        AssignedUnitId,
        AssignedShortName,
        Name,
        ShortName,
        MilitaryNumber,
        ForceTypeId,
        ForceType,
        UnitTypeId,
        UnitType,
        OrderVal,
        Comment
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
    /// DTO для набора данных підрозділу для Angular (формування документу)
    /// Soldiers включает список особового складу підрозділу (основних бійців UnitId == Id).
    /// </summary>
    public record UnitDataSetDto(
        string Id,
        string? ParentId,
        string? ParentShortName,
        string? AssignedShortName,
        string ShortName,
        string? UnitTypeId,
        string? UnitType,
        string? Comment,
        SoldierDto[] Soldiers
    )
    {
        public static UnitDataSetDto From(Unit u, IEnumerable<SoldierDto> soldiers) => new(
            u.Id,
            u.ParentId,
            u.Parent?.ShortName,
            u.AssignedUnit?.ShortName ?? u.AssignedUnit?.Name,
            u.ShortName,
            u.UnitTypeId,
            u.UnitType?.ShortValue,
            u.Comment,
            [.. soldiers]
        );
    }

    /// <summary>
    /// Підрозділ (організаційно-штатна бойова одиниця).
    /// Ієрархія: Parent / ChildUnits.
    /// Придання: AssignedUnit / AssignedUnits.
    /// Довідники: ForceType (вид ЗС), UnitType (тип підрозділу).
    /// Додаткові звʼязки: AdjacentUnits (суміжні), 
    /// Soldiers (особовий склад),
    /// AssignedSoldiers (приданий особовий склад).
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
        /// <summary>
        /// True - Оперативний/Тимчасовий підрозділ
        /// </summary>
        public bool IsOperational { get; set; } = false;

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

        /// <summary>
        /// Особовий склад оперативного підрозділу
        /// </summary>
        [NotMapped]
        public List<Soldier> OperationalSoldiers { get; set; } = default!;
    }
}
