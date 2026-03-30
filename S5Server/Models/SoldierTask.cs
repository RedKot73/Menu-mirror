using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для передачі даних про солдата в конкретному завданні (знімок стану).
/// </summary>
/// <param name="Id">ID запису завдання солдата.</param>
/// <param name="UnitTaskId">ID завдання підрозділу.</param>
/// <param name="SoldierId">ID оригінального солдата.</param>
/// <param name="ExternId">Зовнішній ідентифікатор.</param>
/// <param name="FirstName">Ім'я.</param>
/// <param name="MidleName">По батькові.</param>
/// <param name="LastName">Прізвище.</param>
/// <param name="NickName">Позивний.</param>
/// <param name="UnitId">ID підрозділу.</param>
/// <param name="UnitShortName">Коротка назва підрозділу.</param>
/// <param name="ArrivedAt">Дата прибуття.</param>
/// <param name="DepartedAt">Дата вибуття.</param>
/// <param name="AssignedUnitId">ID приданого підрозділу.</param>
/// <param name="AssignedUnitShortName">Коротка назва приданого підрозділу.</param>
/// <param name="InvolvedUnitId">ID задіяного підрозділу.</param>
/// <param name="InvolvedUnitShortName">Коротка назва задіяного підрозділу.</param>
/// <param name="RankId">ID звання.</param>
/// <param name="RankShortValue">Коротка назва звання.</param>
/// <param name="PositionId">ID посади.</param>
/// <param name="PositionValue">Назва посади.</param>
/// <param name="StateId">ID статусу.</param>
/// <param name="StateValue">Назва статусу.</param>
/// <param name="Comment">Коментар.</param>
/// <param name="ChangedBy">Хто вніс зміни.</param>
/// <param name="ValidFrom">Дата створення знімку.</param>
public record SoldierTaskDto(
    Guid Id,
    Guid UnitTaskId,
    Guid SoldierId,
    int? ExternId,
    string FirstName,
    string? MidleName,
    string? LastName,
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
    string ChangedBy,
    DateTime ValidFrom);

/// <summary>
/// DTO для кількості бійців
/// </summary>
public record SoldierCountDto(
    Guid UnitTaskId,
    int Count);

/// <summary>
/// Снимок состояния бойца на момент назначения задачи подразделению
/// </summary>
[Table("soldiers_task")]
public class SoldierTask
{
    /// <summary>
    /// Унікальний ідентифікатор запису (snapshot-ID).
    /// </summary>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// Ссылка на UnitTask (задание подразделения)
    /// </summary>
    [Required]
    public Guid UnitTaskId { get; set; } = default!;

    /// <summary>
    /// Ссылка на UnitTask
    /// </summary>
    [ValidateNever]
    public UnitTask UnitTask { get; set; } = default!;

    /// <summary>
    /// ID оригинального бойца
    /// </summary>
    [Required]
    public Guid SoldierId { get; set; } = default!;

    /// <summary>
    /// Ссылка на оригинального бойца
    /// </summary>
    [ValidateNever]
    public Soldier Soldier { get; set; } = default!;

    /// <summary>
    /// Внешний ID (из Импульса, Армия+ и т.д.)
    /// </summary>
    public int? ExternId { get; set; }

    /// <summary>
    /// Ім'я.
    /// </summary>
    [StringLength(50), Required]
    public string FirstName { get; set; } = string.Empty;

    /// <summary>
    /// По батькові.
    /// </summary>
    [StringLength(50)]
    public string? MidleName { get; set; }

    /// <summary>
    /// Прізвище.
    /// </summary>
    [StringLength(50)]
    public string? LastName { get; set; }

    private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
    private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];

    /// <summary>
    /// Прізвище та ініціали (ПІБ скорочено).
    /// </summary>
    [NotMapped]
    public string FIO => string.IsNullOrEmpty(MidleName + LastName) 
        ? FirstName 
        : $"{FirstName} {MName}.{LName}.";

    //public DateOnly? BirthDate { get; set; }
    /// <summary>
    /// Позивний
    /// </summary>
    [StringLength(50)]
    public string? NickName { get; set; }

    // ========================================
    // ДЕНОРМАЛИЗОВАННЫЕ ПОЛЯ (гибридный подход: ID + значение)
    // ========================================

    /// <summary>
    /// Підрозділ (ID)
    /// </summary>
    [Required]
    public Guid UnitId { get; set; } = default!;

    /// <summary>
    /// Підрозділ (назва) - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string UnitShortName { get; set; } = string.Empty;

    /// <summary>
    /// Приданий до підрозділу (ID)
    /// </summary>
    public Guid? AssignedUnitId { get; set; }

    /// <summary>
    /// Приданий до підрозділу (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? AssignedUnitShortName { get; set; }

    /// <summary>
    /// Задіяний в підрозділі/екіпажі (ID)
    /// </summary>
    public Guid? InvolvedUnitId { get; set; }

    /// <summary>
    /// Задіяний в підрозділі/екіпажі (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? InvolvedUnitShortName { get; set; }

    /// <summary>
    /// Звання (ID)
    /// </summary>
    [Required]
    public Guid RankId { get; set; } = default!;

    /// <summary>
    /// Звання (назва) - денормалізація
    /// </summary>
    [StringLength(50), Required]
    public string RankShortValue { get; set; } = string.Empty;

    /// <summary>
    /// Посада (ID)
    /// </summary>
    [Required]
    public Guid PositionId { get; set; } = default!;

    /// <summary>
    /// Посада (назва) - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string PositionValue { get; set; } = string.Empty;

    /// <summary>
    /// Статус (ID)
    /// </summary>
    [Required]
    public Guid StateId { get; set; } = default!;

    /// <summary>
    /// Статус (назва) - денормалізація
    /// </summary>
    [StringLength(50), Required]
    public string StateValue { get; set; } = string.Empty;

    /// <summary>
    /// Довільний коментар.
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
    /// Хто вніс зміну (UserId або "System")
    /// </summary>
    [StringLength(100), Required]
    public string ChangedBy { get; set; } = string.Empty;

    /// <summary>
    /// Дата створення снимка
    /// </summary>
    [Required]
    public DateTime ValidFrom { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// Extension-методи для SoldierTask
/// </summary>
public static class SoldierTaskExtensions
{
    /// <summary>
    /// Конвертує SoldierTask у DTO
    /// Smart: Published = snapshot, Unpublished = actual from Soldier
    /// </summary>
    public static SoldierTaskDto ToDto(this SoldierTask soldierTask)
    {
        return new SoldierTaskDto(
            soldierTask.Id,
            soldierTask.UnitTaskId,
            soldierTask.SoldierId,
            soldierTask.ExternId,
            soldierTask.FirstName,
            soldierTask.MidleName,
            soldierTask.LastName,
            soldierTask.NickName,
            // Unit
            soldierTask.UnitId,
            soldierTask.UnitShortName,
            //
            soldierTask.ArrivedAt,
            soldierTask.DepartedAt,
            // AssignedUnit
            soldierTask.AssignedUnitId,
            soldierTask.AssignedUnitShortName,
            // InvolvedUnit
            soldierTask.InvolvedUnitId,
            soldierTask.InvolvedUnitShortName,
            // Rank
            soldierTask.RankId,
            soldierTask.RankShortValue,
            // Position
            soldierTask.PositionId,
            soldierTask.PositionValue,
            // State
            soldierTask.StateId,
            soldierTask.StateValue,
            soldierTask.Comment,
            soldierTask.ChangedBy,
            soldierTask.ValidFrom);
    }

    /// <summary>
    /// Конвертує Soldier у DTO
    /// для випадку коли UnitTask ще не опубліковано
    /// і потрібно показати актуальні дані бійця
    /// </summary>
    public static SoldierTaskDto ToSoldierTaskDto(this Soldier soldier)
    {
        return new SoldierTaskDto(
            Guid.Empty,
            Guid.Empty,
            soldier.Id,
            soldier.ExternId,
            soldier.FirstName,
            soldier.MidleName,
            soldier.LastName,
            soldier.NickName,
            // Unit
            soldier.UnitId,
            soldier.Unit.ShortName,
            //
            soldier.ArrivedAt,
            soldier.DepartedAt,
            // AssignedUnit
            soldier.AssignedUnitId,
            soldier.AssignedUnit?.ShortName,
            // InvolvedUnit
            soldier.InvolvedUnitId,
            soldier.InvolvedUnit?.ShortName,
            // Rank
            soldier.RankId,
            soldier.Rank.ShortValue,
            // Position
            soldier.PositionId,
            soldier.Position.Value,
            // State
            soldier.StateId,
            soldier.State.Value,
            soldier.Comment,
            soldier.ChangedBy,
            soldier.ValidFrom);
    }

    /// <summary>
    /// Створити snapshot з Soldier
    /// </summary>
    public static SoldierTask CreateSnapshot(
        this Soldier soldier,
        Guid unitTaskId,
        string changedBy) =>
        new()
        {
            Id = Guid.CreateVersion7(),
            UnitTaskId = unitTaskId,
            SoldierId = soldier.Id,
            ExternId = soldier.ExternId,
            FirstName = soldier.FirstName,
            MidleName = soldier.MidleName,
            LastName = soldier.LastName,
            NickName = soldier.NickName,
            // Unit
            UnitId = soldier.UnitId,
            UnitShortName = soldier.Unit?.ShortName ?? string.Empty,
            // AssignedUnit
            AssignedUnitId = soldier.AssignedUnitId,
            AssignedUnitShortName = soldier.AssignedUnit?.ShortName,
            //
            ArrivedAt = soldier.ArrivedAt,
            DepartedAt = soldier.DepartedAt,
            // InvolvedUnit
            InvolvedUnitId = soldier.InvolvedUnitId,
            InvolvedUnitShortName = soldier.InvolvedUnit?.ShortName,
            // Rank
            RankId = soldier.RankId,
            RankShortValue = soldier.Rank?.ShortValue ?? string.Empty,
            // Position
            PositionId = soldier.PositionId,
            PositionValue = soldier.Position?.Value ?? string.Empty,
            // State
            StateId = soldier.StateId,
            StateValue = soldier.State?.Value ?? string.Empty,
            Comment = soldier.Comment,
            ChangedBy = changedBy,
            ValidFrom = DateTime.UtcNow
        };
}
