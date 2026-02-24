using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачи Soldier
    /// </summary>
    public record SoldierDto(
        Guid Id,
        string FirstName,
        string? MidleName,
        string? LastName,
        string Fio,
        DateOnly? BirthDate,
        string? NickName,
        Guid UnitId,
        string UnitShortName,
        DateOnly? ArrivedAt,
        DateOnly? DepartedAt,
        Guid? AssignedUnitId,
        string? AssignedUnitShortName,
        Guid? InvolvedUnitId,
        string? InvolvedUnitShortName,
        Guid RankId,
        string RankShortValue,
        Guid PositionId,
        string PositionValue,
        Guid StateId,
        string StateValue,
        string? Comment,
        /// <summary>
        /// Кто внёс изменение (UserId или "ImportSystem")
        /// </summary>
        string ChangedBy,
        /// <summary>
        /// Дата начала действия записи
        /// </summary>
        DateTime ValidFrom
    );

    /// <summary>
    /// DTO для создания Soldier
    /// </summary>
    public record SoldierCreateDto(
        string FirstName,
        string? MidleName,
        string? LastName,
        DateOnly? BirthDate,
        string? NickName,
        Guid UnitId,
        Guid? AssignedUnitId,
        Guid? InvolvedUnitId,
        DateOnly ArrivedAt,
        DateOnly? DepartedAt,
        Guid RankId,
        Guid PositionId,
        Guid StateId,
        string? Comment
    );

    /// <summary>
    /// Особовий склад
    /// </summary>
    [Table("soldiers")]
    public class Soldier
    {
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();
        /// <summary>
        /// Id з Імпульса, Армія- и тд.
        /// </summary>
        public int? ExternId { get; set; }

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

        public DateOnly? BirthDate { get; set; }

        /// <summary>
        /// Позивний
        /// </summary>
        [StringLength(50), Display(Name = "Позивний")]
        public string? NickName { get; set; }

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ForeignKey(nameof(Unit)),
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public Guid UnitId { get; set; } = default!;

        /// <summary>
        /// Підрозділ
        /// </summary>
        [ValidateNever,
            Required(ErrorMessage = UIConstant.RequiredMsg)]
        public Unit Unit { get; set; } = default!;

        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ForeignKey(nameof(AssignedUnit))]
        public Guid? AssignedUnitId { get; set; }
        /// <summary>
        /// Приданий до підрозділу
        /// </summary>
        [ValidateNever]
        public Unit? AssignedUnit { get; set; }

        /// <summary>
        /// Задіяний в підрозділі/екіпажі
        /// </summary>
        public Guid? InvolvedUnitId { get; set; }
        /// <summary>
        /// Задіяний в підрозділі/екіпажі
        /// </summary>
        public Unit? InvolvedUnit { get; set; }

        /// <summary>
        /// Звання
        /// </summary>
        [ForeignKey(nameof(DictRank))]
        public Guid RankId { get; set; } = default!;

        /// <summary>
        /// Звання
        /// </summary>
        [ValidateNever]
        public DictRank Rank { get; set; } = default!;

        /// <summary>
        /// Посада
        /// </summary>
        [ForeignKey(nameof(DictPosition))]
        public Guid PositionId { get; set; } = default!;

        /// <summary>
        /// Посада
        /// </summary>
        [ValidateNever]
        public DictPosition Position { get; set; } = default!;

        /// <summary>
        /// Статус: Звичайний, 200,300,500,Поранено,СЗЧ...
        /// </summary>
        [ForeignKey(nameof(DictSoldierState)), Display(Name = "Статус")]
        public Guid StateId { get; set; } = default!;
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
        public TVezhaUser? VezhaUser { get; set; }

        /// <summary>
        /// Коментар
        /// </summary>
        [Display(Name = UIConstant.CommentCaption)]
        public string? Comment { get; set; }

        /// <summary>
        /// Прибув до підрозділу
        /// </summary>
        [Display(Name = "Прибув до підрозділу")]
        public DateOnly? ArrivedAt { get; set; }

        /// <summary>
        /// Вибув з підрозділу
        /// </summary>
        [Display(Name = "Вибув з підрозділу")]
        public DateOnly? DepartedAt { get; set; }

        /// <summary>
        /// Кто внёс изменение (UserId или "ImportSystem")
        /// </summary>
        [StringLength(100), Required]
        public string ChangedBy { get; set; } = string.Empty;

        /// <summary>
        /// Дата начала действия записи
        /// </summary>
        [Required]
        public DateTime ValidFrom { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// Extension-методи для Soldier
    /// </summary>
    public static class SoldierExtensions
    {
        /// <summary>
        /// Конвертує Soldier у SoldierDto
        /// </summary>
        public static SoldierDto ToSoldierDto(this Soldier e) =>
            new(
                e.Id,
                e.FirstName,
                e.MidleName,
                e.LastName,
                e.FIO,
                e.BirthDate,
                e.NickName,
                e.UnitId,
                e.Unit?.ShortName ?? e.Unit?.Name ?? string.Empty,
                e.ArrivedAt,
                e.DepartedAt,
                e.AssignedUnitId,
                e.AssignedUnit?.ShortName ?? e.AssignedUnit?.Name,
                e.InvolvedUnitId,
                e.InvolvedUnit?.ShortName ?? e.InvolvedUnit?.Name,
                e.RankId,
                e.Rank?.ShortValue ?? e.Rank?.Value ?? string.Empty,
                e.PositionId,
                e.Position?.Value ?? string.Empty,
                e.StateId,
                e.State?.Value ?? string.Empty,
                e.Comment,
                e.ChangedBy,
                e.ValidFrom
            );

        /// <summary>
        /// Converts a SoldierDto instance to a Soldier entity, mapping relevant properties and applying basic
        /// normalization.
        /// </summary>
        /// <remarks>Use this method to transform DTOs received from external sources into domain entities
        /// for further processing or persistence. Properties with only whitespace are converted to null to ensure data
        /// consistency.</remarks>
        /// <param name="soldierDto">The source SoldierDto object containing soldier data to be converted. Cannot be null.</param>
        /// <returns>A Soldier entity populated with values from the specified SoldierDto. String properties are trimmed and
        /// empty values are set to null.</returns>
        public static Soldier ToEntity(this SoldierCreateDto soldierDto, string changedBy) 
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(changedBy);

            return new()
            {
                FirstName = soldierDto.FirstName.Trim(),
                MidleName = string.IsNullOrWhiteSpace(soldierDto.MidleName) ? null : soldierDto.MidleName.Trim(),
                LastName = string.IsNullOrWhiteSpace(soldierDto.LastName) ? null : soldierDto.LastName.Trim(),
                BirthDate = soldierDto.BirthDate,
                NickName = string.IsNullOrWhiteSpace(soldierDto.NickName) ? null : soldierDto.NickName.Trim(),
                UnitId = soldierDto.UnitId,
                ArrivedAt = soldierDto.ArrivedAt,
                DepartedAt = soldierDto.DepartedAt,
                AssignedUnitId = soldierDto.AssignedUnitId,
                InvolvedUnitId = soldierDto.InvolvedUnitId,
                RankId = soldierDto.RankId,
                PositionId = soldierDto.PositionId,
                StateId = soldierDto.StateId,
                Comment = string.IsNullOrWhiteSpace(soldierDto.Comment) ? null : soldierDto.Comment?.Trim(),
                ChangedBy = changedBy,
                ValidFrom = DateTime.UtcNow
            };
        }

        /// <summary>
        /// Перевіряє чи рівні дані Soldier з SoldierDto
        /// </summary>
        public static bool IsEqualTo(this Soldier e, SoldierDto dto) =>
            e.FirstName == dto.FirstName &&
            e.MidleName == (string.IsNullOrWhiteSpace(dto.MidleName) ? null : dto.MidleName) &&
            e.LastName == (string.IsNullOrWhiteSpace(dto.LastName) ? null : dto.LastName) &&
            e.BirthDate == dto.BirthDate &&
            e.NickName == (string.IsNullOrWhiteSpace(dto.NickName) ? null : dto.NickName) &&
            e.UnitId == dto.UnitId &&
            e.ArrivedAt == dto.ArrivedAt &&
            e.DepartedAt == dto.DepartedAt &&
            e.AssignedUnitId == dto.AssignedUnitId &&
            e.InvolvedUnitId == dto.InvolvedUnitId &&
            e.RankId == dto.RankId &&
            e.PositionId == dto.PositionId &&
            e.StateId == dto.StateId &&
            e.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment);

        /// <summary>
        /// Оновлює Soldier даними з SoldierDto
        /// </summary>
        public static void UpdateFromDto(this Soldier e, SoldierDto dto, string changedBy)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(changedBy);

            e.FirstName = dto.FirstName;
            e.MidleName = string.IsNullOrWhiteSpace(dto.MidleName) ? null : dto.MidleName;
            e.LastName = string.IsNullOrWhiteSpace(dto.LastName) ? null : dto.LastName;
            e.BirthDate = dto.BirthDate;
            e.NickName = string.IsNullOrWhiteSpace(dto.NickName) ? null : dto.NickName;
            e.UnitId = dto.UnitId;
            e.ArrivedAt = dto.ArrivedAt;
            e.DepartedAt = dto.DepartedAt;
            e.AssignedUnitId = dto.AssignedUnitId;
            e.InvolvedUnitId = dto.InvolvedUnitId;
            e.RankId = dto.RankId;
            e.PositionId = dto.PositionId;
            e.StateId = dto.StateId;
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment;
            e.ChangedBy = changedBy;
            e.ValidFrom = DateTime.UtcNow;
        }
    }
}
