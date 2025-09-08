using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Підрозділ
    /// </summary>
    [Table("units"), Display(Name = Caption)]
    public class Unit
    {
        public const string Caption = "Підрозділ";
        public readonly string cnstCaption = Caption;

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        /// <summary>
        /// Основний підрозділ
        /// </summary>
        public const string ParentCaption = "Основний підрозділ";
        [ForeignKey(nameof(Parent)), Display(Name = ParentCaption)]
        public Guid? ParentId { get; set; }

        [Display(Name = ParentCaption)]
        public virtual Unit? Parent { get; set; }

        public const string AssignedUnitCaption = "Приданий до";
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ForeignKey(nameof(AssignedUnit)), Display(Name = AssignedUnitCaption)]
        public Guid? AssignedUnitId { get; set; }
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ValidateNever, Display(Name = AssignedUnitCaption)]
        public Unit? AssignedUnit { get; set; }
        
        /// <summary>
        /// Назва підрозділу
        /// </summary>
        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg), 
            Display(Name = Caption)]
        public string UnitName { get; set; } = string.Empty;

        /// <summary>
        /// Скорочена назва підрозділу
        /// </summary>
        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg),
            Display(Name = $"{Caption} скороч.")]
        public string? UnitShortName { get; set; }

        /// <summary>
        /// Номер військової частини (В/Ч)
        /// </summary>
        [StringLength(100), Display(Name = "Номер В/Ч")]
        public string? MilitaryNumber { get; set; }

        /// <summary>
        /// Вид збройних сил Сухопутні, ДШВ, ВМС...
        /// </summary>
        [ForeignKey(nameof(DictForcesType)), Display(Name = DictForcesType.Caption)]
        public Guid? ForceTypeId { get; set; }
        /// <summary>
        /// Вид збройних сил Сухопутні, ДШВ, ВМС...
        /// </summary>
        [ValidateNever, Display(Name = DictForcesType.Caption)]
        public DictForcesType? ForceType { get; set; } = default!;

        /// <summary>
        /// Тип підрозділу Бригада, Полк, Батальйон, Рота
        /// </summary>
        [ForeignKey(nameof(DictUnitType)), Display(Name = DictUnitType.Caption)]
        public Guid? UnitTypeId { get; set; }
        /// <summary>
        /// Тип підрозділу Бригада, Полк, Батальйон, Рота
        /// </summary>
        [ValidateNever, Display(Name = DictUnitType.Caption)]
        public DictUnitType? UnitType { get; set; } = default!;

        [Display(Name = UIConstant.CommentCaption)]
        public string? Comment { get; set; }

        public const string ChildUnitsCaption = "Підпорядковані підрозділи";
        /// <summary>
        /// Підпорядковані підрозділи
        /// </summary>
        [NotMapped, Display(Name = ChildUnitsCaption)]
        public virtual IEnumerable<Unit>? ChildUnits { get; set; }

        public const string AssignedUnitsCaption = "Придані підрозділи";
        /// <summary>
        /// Придані підрозділи
        /// </summary>
        [NotMapped, Display(Name = AssignedUnitsCaption)]
        public List<Unit> AssignedUnits { get; set; } = default!;

        /// <summary>
        /// Суміжні підрозділи
        /// </summary>
        [NotMapped, Display(Name = Models.AdjacentUnits.AdjacentUnitsCaption)]
        public List<Unit> AdjacentUnits { get; set; } = default!;

        public const string SoldiersCaption = "Особовий склад";
        /// <summary>
        /// Особовий склад
        /// </summary>
        [NotMapped, InverseProperty(nameof(Soldier.Unit)), Display(Name = SoldiersCaption)]
        public List<Soldier> Soldiers { get; set; } = default!;

        public const string AssignedSoldiersCaption = "Приданий особовий склад";
        /// <summary>
        /// Приданий особовий склад
        /// </summary>
        [NotMapped, InverseProperty(nameof(Soldier.AssignedUnit)), Display(Name = AssignedSoldiersCaption)]
        public List<Soldier> AssignedSoldiers { get; set; } = default!;
        /*
        /// <summary>
        /// Бойова робота
        /// </summary>
        [NotMapped, Display(Name = CombatEvent.Caption)]
        public IEnumerable<CombatEvent> CombatEvents { get; set; } = default!;
        /// <summary>
        /// Бойові розпорядження
        /// </summary>
        [NotMapped, ValidateNever, Display(Name = CombatOrder.Caption)]
        public IEnumerable<CombatOrder> CombatOrders { get; set; } = default!;
        */
    }
}
