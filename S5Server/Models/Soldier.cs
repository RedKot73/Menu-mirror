using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

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
    DateOnly? ArrivedAt,
    DateOnly? DepartedAt,
    Guid RankId,
    Guid PositionId,
    Guid StateId,
    int? ExternId,
    string? Comment
);

/// <summary>
/// DTO для передачи Soldier
/// </summary>
public record SoldierDto(
//Базові поля
    string FirstName,
    string? MidleName,
    string? LastName,
    DateOnly? BirthDate,
    string? NickName,
    Guid UnitId,
    Guid? AssignedUnitId,
    Guid? InvolvedUnitId,
    DateOnly? ArrivedAt,
    DateOnly? DepartedAt,
    Guid RankId,
    Guid PositionId,
    Guid StateId,
    int? ExternId,
    string? Comment,
//Нові поля
    Guid Id,
    string UnitShortName,
    string? AssignedUnitShortName,
    string? InvolvedUnitShortName,
    string RankShortValue,
    string PositionValue,
    string StateValue,
    /// <summary>
    /// User, що вніс зміни
    /// </summary>
    string ChangedBy,
    /// <summary>
    /// Дата начала действия записи
    /// </summary>
    DateTime ValidFrom
) : SoldierCreateDto(
    FirstName,
    MidleName,
    LastName,
    BirthDate,
    NickName,
    UnitId,
    AssignedUnitId,
    InvolvedUnitId,
    ArrivedAt,
    DepartedAt,
    RankId,
    PositionId,
    StateId,
    ExternId,
    Comment
);

/// <summary>
/// Особовий склад
/// </summary>
[Table("soldiers")]
public class Soldier
{
    /// <summary>
    /// Gets or sets the unique identifier for the entity.
    /// </summary>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();
    /// <summary>
    /// Id з Імпульса, Армія- и тд.
    /// </summary>
    public int? ExternId { get; set; }
    /// <summary>
    /// Gets or sets the first name of the person.
    /// </summary>

    [StringLength(50), Display(Name = "Прізвище"), Required]
    public string FirstName { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the middle name of the person.
    /// </summary>

    [StringLength(50), Display(Name = "Ім'я")]
    public string? MidleName { get; set; }
    /// <summary>
    /// Gets or sets the last name of the person.
    /// </summary>

    [StringLength(50), Display(Name = "По батькові")]
    public string? LastName { get; set; }

    private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
    private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];
    /// <summary>
    /// Gets the full name of the person, formatted as a single string.
    /// </summary>

    [Display(Name = "ПІБ")]
    public string FIO => string.IsNullOrEmpty(MidleName + LastName) ? FirstName : $"{FirstName} {MName}.{LName}.";
    /// <summary>
    /// Gets or sets the date of birth.
    /// </summary>

    public DateOnly? BirthDate { get; set; }

    /// <summary>
    /// Позивний
    /// </summary>
    [StringLength(50), Display(Name = "Позивний")]
    public string? NickName { get; set; }

    /// <summary>
    /// Підрозділ
    /// </summary>
    [ForeignKey(nameof(Unit)), Required]
    public Guid UnitId { get; set; } = default!;

    /// <summary>
    /// Підрозділ
    /// </summary>
    [ValidateNever, Required]
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
    public string? Comment { get; set; }

    /// <summary>
    /// Прибув до підрозділу
    /// </summary>
    public DateOnly? ArrivedAt { get; set; }

    /// <summary>
    /// Вибув з підрозділу
    /// </summary>
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
            // Базові параметри з SoldierCreateDto (в правильному порядку)
            FirstName: e.FirstName,
            MidleName: e.MidleName,
            LastName: e.LastName,
            BirthDate: e.BirthDate,
            NickName: e.NickName,
            UnitId: e.UnitId,
            AssignedUnitId: e.AssignedUnitId,
            InvolvedUnitId: e.InvolvedUnitId,
            ArrivedAt: e.ArrivedAt,
            DepartedAt: e.DepartedAt,
            RankId: e.RankId,
            PositionId: e.PositionId,
            StateId: e.StateId,
            ExternId: e.ExternId,
            Comment: e.Comment,
            // Додаткові параметри SoldierDto
            Id: e.Id,
            UnitShortName: e.Unit?.ShortName ?? e.Unit?.Name ?? string.Empty,
            AssignedUnitShortName: e.AssignedUnit?.ShortName ?? e.AssignedUnit?.Name,
            InvolvedUnitShortName: e.InvolvedUnit?.ShortName ?? e.InvolvedUnit?.Name,
            RankShortValue: e.Rank?.ShortValue ?? e.Rank?.Value ?? string.Empty,
            PositionValue: e.Position?.Value ?? string.Empty,
            StateValue: e.State?.Value ?? string.Empty,
            ChangedBy: e.ChangedBy,
            ValidFrom: e.ValidFrom
        );

    /// <summary>
    /// Converts a SoldierDto instance to a Soldier entity, mapping relevant properties and applying basic
    /// normalization.
    /// </summary>
    /// <remarks>Use this method to transform DTOs received from external sources into domain entities
    /// for further processing or persistence. Properties with only whitespace are converted to null to ensure data
    /// consistency.</remarks>
    /// <param name="soldierDto">The source SoldierDto object containing soldier data to be converted. Cannot be null.</param>
    /// <param name="changedBy">UserName</param>
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
            ExternId = soldierDto.ExternId,
            Comment = string.IsNullOrWhiteSpace(soldierDto.Comment) ? null : soldierDto.Comment?.Trim(),
            ChangedBy = changedBy,
            ValidFrom = DateTime.UtcNow
        };
    }

    /// <summary>
    /// Оновлює Soldier даними з SoldierDto
    /// </summary>
    public static void UpdateFromDto(this Soldier e, SoldierCreateDto dto, string changedBy)
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
        e.ExternId = dto.ExternId;
        e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment;
        e.ChangedBy = changedBy;
        e.ValidFrom = DateTime.UtcNow;
    }


    /// <summary>
    /// Перевіряє чи рівні дані Soldier з SoldierDto
    /// </summary>
    public static bool IsEqualTo(this Soldier e, SoldierCreateDto dto) =>
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
        e.ExternId == dto.ExternId &&
        e.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment);

    /// <summary>
    /// Перевіряє чи рівні дані Soldier з SoldierDto
    /// (використовує базову реалізацію для SoldierCreateDto, оскільки SoldierDto є його наследником)
    /// </summary>
    public static bool IsEqualTo(this Soldier e, SoldierDto dto) => e.IsEqualTo(dto as SoldierCreateDto);
}
