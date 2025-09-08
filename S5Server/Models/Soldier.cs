using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Боєць
    /// </summary>
    [Table("soldiers"), Display(Name = Caption)]
    public class Soldier
    {
        public const string Caption = "Боєць";
        public readonly string cnstCaption = Caption;

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = Guid.NewGuid().ToString();

        [StringLength(50), Display(Name = "Прізвище"), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50), Display(Name = "Ім'я")]
        public string? MidleName { get; set; }

        [StringLength(50), Display(Name = "По батькові")]
        public string? LastName { get; set; }

        private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
        private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];

        [Display(Name = "ПІБ")]
        public string FIO => string.IsNullOrEmpty(MidleName + LastName) ? FirstName : $"{FirstName} {MName}.{LName}.";

        /// <summary>
        /// Позивний
        /// </summary>
        [StringLength(50), Display(Name = "Позивний")
            /*, Required(ErrorMessage = UIConstant.RequiredMsg)*/]
        public string? NickName { get; set; }// = string.Empty;

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ForeignKey(nameof(Unit)), Display(Name = Unit.Caption),
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string UnitId { get; set; } = string.Empty;

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ValidateNever, Display(Name = Unit.Caption),
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public virtual Unit Unit { get; set; } = default!;

        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ForeignKey(nameof(AssignedUnit)), Display(Name = Unit.AssignedUnitCaption)]
        public string? AssignedUnitId { get; set; }
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ValidateNever, Display(Name = Unit.AssignedUnitCaption)]
        public Unit? AssignedUnit { get; set; }

        /// <summary>
        /// Звання
        /// </summary>
        [ForeignKey(nameof(DictRank)), Display(Name = DictRank.Caption)]
        public string RankId { get; set; } = string.Empty;

        /// <summary>
        /// Звання
        /// </summary>
        [ValidateNever, Display(Name = DictRank.Caption)]
        public DictRank Rank { get; set; } = default!;

        /// <summary>
        /// Посада
        /// </summary>
        [ForeignKey(nameof(DictPosition)), Display(Name = DictPosition.Caption)]
        public string PositionId { get; set; } = string.Empty;

        /// <summary>
        /// Посада
        /// </summary>
        [ValidateNever, Display(Name = DictPosition.Caption)]
        public DictPosition Position { get; set; } = default!;

        /// <summary>
        /// Статус: Звичайний, 200, 300, 500....
        /// </summary>
        [ForeignKey(nameof(DictSoldierState)), Display(Name = "Статус")]
        public string StateId { get; set; } = string.Empty;
        /// <summary>
        /// Статус: Звичайний, 200, 300, 500....
        /// </summary>
        [ValidateNever, Display(Name = "Статус")]
        public DictSoldierState State { get; set; } = default!;

        /// <summary>
        /// Мережевий аккаунт
        /// </summary>
        [ForeignKey(nameof(VezhaUser)), Display(Name = DictPosition.Caption)]
        public string VezhaUserId { get; set; } = string.Empty;
        [ValidateNever, InverseProperty("Soldier"), Display(Name = "Мережевий аккаунт")]
        public TVezhaUser<string>? VezhaUser { get; set; }

        /// <summary>
        /// Коментар
        /// </summary>
        [Display(Name = UIConstant.CommentCaption)]
        public string? Comment { get; set; }
    }
}
