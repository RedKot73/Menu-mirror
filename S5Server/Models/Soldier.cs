using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачи Soldier
    /// </summary>
    public record SoldierDto(
        string Id,
        string FirstName,
        string? MidleName,
        string? LastName,
        string Fio,
        string? NickName,
        string UnitId,
        string UnitShortName,
        string? AssignedUnitId,
        string? AssignedUnitShortName,
        string RankId,
        string RankShortValue,
        string PositionId,
        string PositionValue,
        string StateId,
        string StateValue,
        string? Comment
    )
    {
        public static SoldierDto ToDto(Soldier e) =>
            new(
                e.Id,
                e.FirstName,
                e.MidleName,
                e.LastName,
                e.FIO,
                e.NickName,
                e.UnitId,
                e.Unit?.ShortName ?? e.Unit?.Name ?? string.Empty,
                e.AssignedUnitId,
                e.AssignedUnit?.ShortName ?? e.AssignedUnit?.Name,
                e.RankId,
                e.Rank?.ShortValue ?? e.Rank?.Value ?? string.Empty,
                e.PositionId,
                e.Position?.Value ?? string.Empty,
                e.StateId,
                e.State?.Value ?? string.Empty,
                e.Comment
            );

        public static void ApplyDto(Soldier e, SoldierDto dto)
        {
            e.FirstName = dto.FirstName.Trim();
            e.MidleName = string.IsNullOrWhiteSpace(dto.MidleName) ? null : dto.MidleName.Trim();
            e.LastName = string.IsNullOrWhiteSpace(dto.LastName) ? null : dto.LastName.Trim();
            e.NickName = string.IsNullOrWhiteSpace(dto.NickName) ? null : dto.NickName.Trim();
            e.UnitId = dto.UnitId;
            e.AssignedUnitId = dto.AssignedUnitId;
            e.RankId = dto.RankId;
            e.PositionId = dto.PositionId;
            e.StateId = dto.StateId;
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        }
    }

    /// <summary>
    /// DTO для создания Soldier
    /// </summary>
    public record SoldierCreateDto(
        string FirstName,
        string? MidleName,
        string? LastName,
        string? NickName,
        string UnitId,
        string? AssignedUnitId,
        string RankId,
        string PositionId,
        string StateId,
        string? Comment
    )
    {
        public Soldier ToEntity() => new Soldier
        {
            FirstName = FirstName.Trim(),
            MidleName = string.IsNullOrWhiteSpace(MidleName) ? null : MidleName.Trim(),
            LastName = string.IsNullOrWhiteSpace(LastName) ? null : LastName.Trim(),
            NickName = string.IsNullOrWhiteSpace(NickName) ? null : NickName.Trim(),
            UnitId = UnitId,
            AssignedUnitId = AssignedUnitId,
            RankId = RankId,
            PositionId = PositionId,
            StateId = StateId,
            Comment = string.IsNullOrWhiteSpace(Comment) ? null : Comment?.Trim()
        };
    }

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
        [StringLength(50), Display(Name = "Позивний")]
        public string? NickName { get; set; }// = string.Empty;

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ForeignKey(nameof(Unit)),
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string UnitId { get; set; } = string.Empty;

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ValidateNever, 
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public virtual Unit Unit { get; set; } = default!;

        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ForeignKey(nameof(AssignedUnit))]
        public string? AssignedUnitId { get; set; }
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ValidateNever]
        public Unit? AssignedUnit { get; set; }

        /// <summary>
        /// Звання
        /// </summary>
        [ForeignKey(nameof(DictRank))]
        public string RankId { get; set; } = string.Empty;

        /// <summary>
        /// Звання
        /// </summary>
        [ValidateNever]
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
        /*
        [ForeignKey(nameof(VezhaUser)), Display(Name = DictPosition.Caption)]
        public string VezhaUserId { get; set; } = string.Empty;
        */
        //[ValidateNever, InverseProperty("Soldier"), Display(Name = "Мережевий аккаунт")]
        public TVezhaUser<string>? VezhaUser { get; set; }

        /// <summary>
        /// Коментар
        /// </summary>
        [Display(Name = UIConstant.CommentCaption)]
        public string? Comment { get; set; }
    }
}
