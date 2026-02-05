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
    string Fio,
    //DateOnly? BirthDate,
    string? NickName,
    string UnitId,
    string UnitShortName,
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
    //public DateOnly? ArrivedAt { get; set; }

    /// <summary>
    /// Вибув з підрозділу
    /// </summary>
    //public DateOnly? DepartedAt { get; set; }

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
    /// Створює SoldierTask зі снимка Soldier (при публікації завдання)
    /// </summary>
    /// <param name="soldier">Боєць</param>
    /// <param name="unitTaskId">ID завдання підрозділу</param>
    /// <param name="changedBy">Хто публікує</param>
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
            //BirthDate = soldier.BirthDate,
            NickName = soldier.NickName,
            UnitId = soldier.UnitId,
            UnitShortName = soldier.Unit?.ShortName ?? soldier.Unit?.Name ?? string.Empty,
            AssignedUnitId = soldier.AssignedUnitId,
            AssignedUnitShortName = soldier.AssignedUnit?.ShortName ?? soldier.AssignedUnit?.Name,
            InvolvedUnitId = soldier.InvolvedUnitId,
            InvolvedUnitShortName = soldier.InvolvedUnit?.ShortName ?? soldier.InvolvedUnit?.Name,
            RankId = soldier.RankId,
            RankShortValue = soldier.Rank?.ShortValue ?? soldier.Rank?.Value ?? string.Empty,
            PositionId = soldier.PositionId,
            PositionValue = soldier.Position?.Value ?? string.Empty,
            StateId = soldier.StateId,
            StateValue = soldier.State?.Value ?? string.Empty,
            Comment = soldier.Comment,
            //ArrivedAt = soldier.ArrivedAt,
            //DepartedAt = soldier.DepartedAt,
            ChangedBy = changedBy,
            ValidFrom = DateTime.UtcNow
        };

    /// <summary>
    /// Конвертує SoldierTask у DTO
    /// </summary>
    public static SoldierTaskDto ToDto(this SoldierTask task) =>
        new(
            task.Id,
            task.UnitTaskId,
            task.SoldierId,
            task.ExternId,
            task.FirstName,
            task.MidleName,
            task.LastName,
            task.FIO,
            //task.BirthDate,
            task.NickName,
            task.UnitId,
            task.UnitShortName,
            task.AssignedUnitId,
            task.AssignedUnitShortName,
            task.InvolvedUnitId,
            task.InvolvedUnitShortName,
            task.RankId,
            task.RankShortValue,
            task.PositionId,
            task.PositionValue,
            task.StateId,
            task.StateValue,
            task.Comment,
            //task.ArrivedAt,
            //task.DepartedAt,
            task.ChangedBy,
            task.ValidFrom);
}
