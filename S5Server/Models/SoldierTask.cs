using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для SoldierTask
/// </summary>
public record SoldierTaskDto(
    string Id,
    string UnitTaskId,
    string SoldierId,
    int? ExternId,
    string FirstName,
    string? MidleName,
    string? LastName,
    //DateOnly? BirthDate,
    string? NickName,
    string UnitId,
    string UnitShortName,
    DateOnly? ArrivedAt,
    DateOnly? DepartedAt,
    string? AssignedUnitId,
    string? AssignedUnitShortName,
    string? InvolvedUnitId,
    string? InvolvedUnitShortName,
    string RankId,
    string RankShortValue,
    string PositionId,
    string PositionValue,
    string StateId,
    string StateValue,
    string? Comment,
    //DateOnly? ArrivedAt,
    //DateOnly? DepartedAt,
    string ChangedBy,
    DateTime ValidFrom);

/// <summary>
/// DTO для кількості бійців
/// </summary>
public record SoldierCountDto(
    string UnitTaskId,
    int Count);

/// <summary>
/// Снимок состояния бойца на момент назначения задачи подразделению
/// </summary>
[Table("soldiers_task")]
public class SoldierTask
{
    [Key]
    [StringLength(36)]
    public string Id { get; set; } = Guid.NewGuid().ToString("D");

    /// <summary>
    /// Ссылка на UnitTask (задание подразделения)
    /// </summary>
    [Required]
    [StringLength(36)]
    public string UnitTaskId { get; set; } = string.Empty;

    /// <summary>
    /// Ссылка на UnitTask
    /// </summary>
    [ValidateNever]
    public UnitTask UnitTask { get; set; } = default!;

    /// <summary>
    /// ID оригинального бойца
    /// </summary>
    [Required]
    [StringLength(36)]
    public string SoldierId { get; set; } = string.Empty;

    /// <summary>
    /// Ссылка на оригинального бойца
    /// </summary>
    [ValidateNever]
    public Soldier Soldier { get; set; } = default!;

    /// <summary>
    /// Внешний ID (из Импульса, Армия+ и т.д.)
    /// </summary>
    public int? ExternId { get; set; }

    [StringLength(50), Required]
    public string FirstName { get; set; } = string.Empty;

    [StringLength(50)]
    public string? MidleName { get; set; }

    [StringLength(50)]
    public string? LastName { get; set; }

    private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
    private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];

    [NotMapped]
    public string FIO => string.IsNullOrEmpty(MidleName + LastName) 
        ? FirstName 
        : $"{FirstName} {MName}.{LName}.";

    //public DateOnly? BirthDate { get; set; }

    [StringLength(50)]
    public string? NickName { get; set; }

    // ========================================
    // ДЕНОРМАЛИЗОВАННЫЕ ПОЛЯ (гибридный подход: ID + значение)
    // ========================================

    /// <summary>
    /// Підрозділ (ID)
    /// </summary>
    [Required]
    [StringLength(36)]
    public string UnitId { get; set; } = string.Empty;

    /// <summary>
    /// Підрозділ (назва) - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string UnitShortName { get; set; } = string.Empty;

    /// <summary>
    /// Приданий до підрозділу (ID)
    /// </summary>
    [StringLength(36)]
    public string? AssignedUnitId { get; set; }

    /// <summary>
    /// Приданий до підрозділу (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? AssignedUnitShortName { get; set; }

    /// <summary>
    /// Задіяний в підрозділі/екіпажі (ID)
    /// </summary>
    [StringLength(36)]
    public string? InvolvedUnitId { get; set; }

    /// <summary>
    /// Задіяний в підрозділі/екіпажі (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? InvolvedUnitShortName { get; set; }

    /// <summary>
    /// Звання (ID)
    /// </summary>
    [Required]
    [StringLength(36)]
    public string RankId { get; set; } = string.Empty;

    /// <summary>
    /// Звання (назва) - денормалізація
    /// </summary>
    [StringLength(50), Required]
    public string RankShortValue { get; set; } = string.Empty;

    /// <summary>
    /// Посада (ID)
    /// </summary>
    [Required]
    [StringLength(36)]
    public string PositionId { get; set; } = string.Empty;

    /// <summary>
    /// Посада (назва) - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string PositionValue { get; set; } = string.Empty;

    /// <summary>
    /// Статус (ID)
    /// </summary>
    [Required]
    [StringLength(36)]
    public string StateId { get; set; } = string.Empty;

    /// <summary>
    /// Статус (назва) - денормалізація
    /// </summary>
    [StringLength(50), Required]
    public string StateValue { get; set; } = string.Empty;

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
    public static SoldierTaskDto ToDto(this SoldierTask soldierTask, bool isPublished)
    {
        // ✅ ЛОГІКА: Якщо unpublished і Soldier завантажено — взяти актуальні дані
        var useActualData = !isPublished && soldierTask.Soldier != null;

        return new SoldierTaskDto(
            soldierTask.Id,
            soldierTask.UnitTaskId,
            soldierTask.SoldierId,
            soldierTask.ExternId,
            useActualData ? soldierTask.Soldier!.FirstName : soldierTask.FirstName,
            useActualData ? soldierTask.Soldier!.MidleName : soldierTask.MidleName,
            useActualData ? soldierTask.Soldier!.LastName : soldierTask.LastName,
            useActualData ? soldierTask.Soldier!.NickName : soldierTask.NickName,
            // Unit
            useActualData ? soldierTask.Soldier!.UnitId : soldierTask.UnitId,
            useActualData ? soldierTask.Soldier!.Unit?.ShortName ?? string.Empty : soldierTask.UnitShortName,
            //
            useActualData ? soldierTask.Soldier!.ArrivedAt : soldierTask.ArrivedAt,
            useActualData ? soldierTask.Soldier!.DepartedAt : soldierTask.DepartedAt,
            // AssignedUnit
            useActualData ? soldierTask.Soldier!.AssignedUnitId : soldierTask.AssignedUnitId,
            useActualData ? soldierTask.Soldier!.AssignedUnit?.ShortName : soldierTask.AssignedUnitShortName,
            // InvolvedUnit
            useActualData ? soldierTask.Soldier!.InvolvedUnitId : soldierTask.InvolvedUnitId,
            useActualData ? soldierTask.Soldier!.InvolvedUnit?.ShortName : soldierTask.InvolvedUnitShortName,
            // Rank
            useActualData ? soldierTask.Soldier!.RankId : soldierTask.RankId,
            useActualData ? soldierTask.Soldier!.Rank?.ShortValue ?? string.Empty : soldierTask.RankShortValue,
            // Position
            useActualData ? soldierTask.Soldier!.PositionId : soldierTask.PositionId,
            useActualData ? soldierTask.Soldier!.Position?.Value ?? string.Empty : soldierTask.PositionValue,
            // State
            useActualData ? soldierTask.Soldier!.StateId : soldierTask.StateId,
            useActualData ? soldierTask.Soldier!.State?.Value ?? string.Empty : soldierTask.StateValue,
            useActualData ? soldierTask.Soldier!.Comment : soldierTask.Comment,
            soldierTask.ChangedBy,
            soldierTask.ValidFrom);
    }

    /// <summary>
    /// Конвертує Soldier у DTO
    /// для випадку коли UnitTask ще не опубліковано
    /// і потрібно показати актуальні дані бійця
    /// </summary>
    public static SoldierTaskDto ToDto(this Soldier soldier)
    {
        return new SoldierTaskDto(
            string.Empty,
            string.Empty,
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
        string unitTaskId,
        string changedBy) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
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
