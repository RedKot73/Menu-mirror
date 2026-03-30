using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models;

/// <summary>
/// DTO для передачі історичних даних про зміни в записі підрозділу.
/// </summary>
/// <param name="Id">Унікальний ідентифікатор запису історії.</param>
/// <param name="UnitId">ID підрозділу.</param>
/// <param name="ParentId">ID вищого підрозділу.</param>
/// <param name="ParentShortName">Коротка назва вищого підрозділу.</param>
/// <param name="AssignedUnitId">ID приданого підрозділу.</param>
/// <param name="AssignedUnitShortName">Коротка назва приданого підрозділу.</param>
/// <param name="Name">Повна назва.</param>
/// <param name="ShortName">Скорочена назва.</param>
/// <param name="MilitaryNumber">Номер в/ч.</param>
/// <param name="ForceTypeId">ID виду військ.</param>
/// <param name="ForceTypeShortValue">Коротка назва виду військ.</param>
/// <param name="UnitTypeId">ID типу підрозділу.</param>
/// <param name="UnitTypeShortValue">Коротка назва типу підрозділу.</param>
/// <param name="OrderVal">Порядок сортування.</param>
/// <param name="IsInvolved">Ознака задіяності.</param>
/// <param name="PersistentLocationId">ID ППД.</param>
/// <param name="PersistentLocationValue">Назва ППД.</param>
/// <param name="Comment">Коментар.</param>
/// <param name="ChangedBy">Хто змінив.</param>
/// <param name="Operation">Тип операції.</param>
/// <param name="ValidFrom">Дата початку дії.</param>
/// <param name="ValidTo">Дата закінчення дії.</param>
public record UnitHistDto(
    Guid Id,
    Guid UnitId,
    Guid? ParentId,
    string? ParentShortName,
    Guid? AssignedUnitId,
    string? AssignedUnitShortName,
    string Name,
    string ShortName,
    string? MilitaryNumber,
    Guid? ForceTypeId,
    string? ForceTypeShortValue,
    Guid? UnitTypeId,
    string? UnitTypeShortValue,
    int OrderVal,
    bool IsInvolved,
    Guid? PersistentLocationId,
    string? PersistentLocationValue,
    string? Comment,
    string ChangedBy,
    string Operation,
    DateTime ValidFrom,
    DateTime? ValidTo);

/// <summary>
/// Історична таблиця змін підрозділів
/// </summary>
[Table("units_hist")]
public class UnitHist
{
    /// <summary>
    /// Унікальний ідентифікатор запису в таблиці історії.
    /// </summary>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// ID оригінального підрозділу
    /// </summary>
    [Required]
    public Guid UnitId { get; set; } = default!;

    /// <summary>
    /// Основний підрозділ (ID)
    /// </summary>
    public Guid? ParentId { get; set; }

    /// <summary>
    /// Основний підрозділ (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? ParentShortName { get; set; }

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
    /// Назва підрозділу
    /// </summary>
    [StringLength(100), Required]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required]
    public string ShortName { get; set; } = string.Empty;

    /// <summary>
    /// Номер військової частини (В/Ч)
    /// </summary>
    [StringLength(100)]
    public string? MilitaryNumber { get; set; }

    /// <summary>
    /// Вид збройних сил (ID)
    /// </summary>
    public Guid? ForceTypeId { get; set; }

    /// <summary>
    /// Вид збройних сил (назва) - денормалізація
    /// </summary>
    [StringLength(50)]
    public string? ForceTypeShortValue { get; set; }

    /// <summary>
    /// Тип підрозділу (ID)
    /// </summary>
    public Guid? UnitTypeId { get; set; }

    /// <summary>
    /// Тип підрозділу (назва) - денормалізація
    /// </summary>
    [StringLength(50)]
    public string? UnitTypeShortValue { get; set; }

    /// <summary>
    /// Порядковий номер
    /// </summary>
    public int OrderVal { get; set; } = 1;

    /// <summary>
    /// True - Оперативний/Тимчасовий підрозділ
    /// </summary>
    public bool IsInvolved { get; set; } = false;

    /// <summary>
    /// ППД (Постійне приміщення дислокації) - ID
    /// </summary>
    public Guid? PersistentLocationId { get; set; }

    /// <summary>
    /// ППД (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? PersistentLocationValue { get; set; }

    /// <summary>
    /// Коментар
    /// </summary>
    public string? Comment { get; set; }

    /// <summary>
    /// Хто вніс зміну (UserId або "ImportSystem")
    /// </summary>
    [StringLength(100), Required]
    public string ChangedBy { get; set; } = string.Empty;

    /// <summary>
    /// Тип операції: INSERT, UPDATE, DELETE
    /// </summary>
    [StringLength(10), Required]
    public string Operation { get; set; } = "UPDATE";

    /// <summary>
    /// Дата початку дії запису
    /// </summary>
    [Required]
    public DateTime ValidFrom { get; set; }

    /// <summary>
    /// Дата закінчення дії запису (NULL = поточна актуальна)
    /// </summary>
    public DateTime? ValidTo { get; set; }
}

/// <summary>
/// Extension-методи для роботи з UnitHist
/// </summary>
public static class UnitHistExtensions
{
    /// <summary>
    /// Конвертує UnitHist у DTO
    /// </summary>
    public static UnitHistDto ToDto(this UnitHist e) =>
        new(
            e.Id,
            e.UnitId,
            e.ParentId,
            e.ParentShortName,
            e.AssignedUnitId,
            e.AssignedUnitShortName,
            e.Name,
            e.ShortName,
            e.MilitaryNumber,
            e.ForceTypeId,
            e.ForceTypeShortValue,
            e.UnitTypeId,
            e.UnitTypeShortValue,
            e.OrderVal,
            e.IsInvolved,
            e.PersistentLocationId,
            e.PersistentLocationValue,
            e.Comment,
            e.ChangedBy,
            e.Operation,
            e.ValidFrom,
            e.ValidTo
        );

    /// <summary>
    /// Створює UnitHist з Unit для збереження в історію
    /// </summary>
    /// <param name="unit">Оригінальний підрозділ</param>
    /// <param name="changedBy">Хто вніс зміну</param>
    /// <param name="operation">Тип операції (INSERT/UPDATE/DELETE)</param>
    public static UnitHist ToHistory(this Unit unit, string changedBy, string operation = "UPDATE") =>
        new()
        {
            Id = Guid.CreateVersion7(),
            UnitId = unit.Id,
            ParentId = unit.ParentId,
            ParentShortName = unit.Parent?.ShortName,
            AssignedUnitId = unit.AssignedUnitId,
            AssignedUnitShortName = unit.AssignedUnit?.ShortName,
            Name = unit.Name,
            ShortName = unit.ShortName,
            MilitaryNumber = unit.MilitaryNumber,
            ForceTypeId = unit.ForceTypeId,
            ForceTypeShortValue = unit.ForceType?.ShortValue,
            UnitTypeId = unit.UnitTypeId,
            UnitTypeShortValue = unit.UnitType?.ShortValue,
            OrderVal = unit.OrderVal,
            IsInvolved = unit.IsInvolved,
            PersistentLocationId = unit.PersistentLocationId,
            PersistentLocationValue = unit.PersistentLocation?.Value,
            Comment = unit.Comment,
            ChangedBy = changedBy,
            Operation = operation,
            ValidFrom = DateTime.UtcNow,
            ValidTo = null
        };
}