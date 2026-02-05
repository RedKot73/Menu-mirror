using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для набора даних підрозділу для Angular (формування документу)
/// </summary>
public record UnitDataSetDto(
    string Id,
    string? ParentId,
    string? ParentShortName,
    string? AssignedShortName,
    string ShortName,
    string? UnitTypeId,
    string? UnitType,
    bool IsInvolved,
    string? Comment)
{
    public static UnitDataSetDto From(Unit u) => new(
        u.Id,
        u.ParentId,
        u.Parent?.ShortName,
        u.AssignedUnit?.ShortName ?? u.AssignedUnit?.Name,
        u.ShortName,
        u.UnitTypeId,
        u.UnitType?.ShortValue,
        u.IsInvolved,
        u.Comment);
}

/// <summary>
/// DTO для створення UnitTask
/// </summary>
public record UnitTaskCreateDto(
    string DataSetId,
    string UnitId,
    string TaskId,
    string AreaId);

/// <summary>
/// DTO для UnitTask (БЕЗ деталей - Master-Detail Pattern)
/// </summary>
public record UnitTaskDto(
    string Id,
    string DataSetId,
    string UnitId,
    string UnitShortName,
    string? ParentId,
    string ParentShortName,
    string? AssignedUnitId,
    string? AssignedShortName,
    string? UnitTypeId,
    string? UnitTypeName,
    bool IsInvolved,
    string? PersistentLocationId,
    string? PersistentLocationValue,
    string TaskId,
    string TaskValue,
    string AreaId,
    bool IsPublished,
    DateTime? PublishedAtUtc,
    string ChangedBy,
    DateTime ValidFrom);

/// <summary>
/// Снимок состояния подразделения на момент назначения задачи
/// </summary>
[Table("units_task")]
public class UnitTask
{
    [Key]
    [StringLength(36)]
    public string Id { get; set; } = Guid.NewGuid().ToString("D");

    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    [Required, StringLength(36)]
    public string DataSetId { get; set; } = default!;
    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    [ValidateNever]
    public TemplateDataSet DataSet { get; set; } = default!;

    //Unit---------------------------------------------------------------
    /// <summary>
    /// Підрозділ (організаційно-штатна бойова одиниця)
    /// </summary>
    [Required, StringLength(36)]
    public string UnitId { get; set; } = default!;
    /// <summary>
    /// Підрозділ (організаційно-штатна бойова одиниця)
    /// </summary>
    [ValidateNever]
    public Unit Unit { get; set; } = default!;
    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
    public string UnitShortName { get; set; } = string.Empty;

    /// <summary>
    /// Основний підрозділ
    /// </summary>
    [StringLength(36)]
    public string? ParentId { get; set; }
    /// <summary>
    /// Основний підрозділ
    /// </summary>
    [ValidateNever]
    public Unit? Parent { get; set; }
    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
    public string ParentShortName { get; set; } = string.Empty;

    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    [StringLength(36)]
    public string? AssignedUnitId { get; set; }
    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    [ValidateNever]
    public Unit? AssignedUnit { get; set; }
    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    [StringLength(100)]
    public string? AssignedShortName { get; set; }

    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    [StringLength(36)]
    public string? UnitTypeId { get; set; }
    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    [ValidateNever]
    public DictUnitType? UnitType { get; set; }
    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    [StringLength(100)]
    public string? UnitTypeName { get; set; }

    /// <summary>
    /// True - Оперативний/Тимчасовий підрозділ
    /// </summary>
    public bool IsInvolved { get; set; } = false;

    /// <summary>
    /// ППД (Постійне приміщення дислокації)
    /// </summary>
    [StringLength(36)]
    public string? PersistentLocationId { get; set; }

    /// <summary>
    /// ППД
    /// </summary>
    [ValidateNever]
    public DictArea? PersistentLocation { get; set; }
    /// <summary>
    /// ППД (Постійне приміщення дислокації)
    /// </summary>
    [StringLength(100)]
    public string? PersistentLocationValue { get; set; }

    /// <summary>
    /// Особовий склад (Master-Detail: завантажується окремо через SoldierTaskController)
    /// </summary>
    [NotMapped]
    public List<SoldierTask> SoldiersTask { get; set; } = [];

    //Task---------------------------------------------------------------
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    [Required, StringLength(36)]
    public string TaskId { get; set; } = default!;
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    [ValidateNever]
    public DictUnitTask Task { get; set; } = default!;
    /// <summary>
    /// Назва Завдання підрозділу
    /// </summary>
    [StringLength(100), Required]
    public string TaskValue { get; set; } = default!;

    /// <summary>
    /// Район виконання завдань (РВЗ)
    /// </summary>
    [Required, StringLength(36)]
    public string AreaId { get; set; } = default!;
    /// <summary>
    /// Район виконання завдань (РВЗ)
    /// </summary>
    [ValidateNever]
    public DictArea Area { get; set; } = default!;

    /// <summary>
    /// Дрони, задіяні при виконанні завдання (Master-Detail: завантажується окремо через DroneModelTaskController)
    /// </summary>
    [NotMapped]
    public List<DroneModelTask> Means { get; set; } = [];

    // Публикация
    /// <summary>
    /// Опубліковано - створено SnapShot Unit and Soldiers
    /// </summary>
    public bool IsPublished { get; set; }
    public DateTime? PublishedAtUtc { get; set; }

    /// <summary>
    /// Кто внёс изменение (UserId або "System")
    /// </summary>
    [StringLength(100), Required]
    public string ChangedBy { get; set; } = string.Empty;

    /// <summary>
    /// Дата начала действия записи
    /// </summary>
    [Required]
    public DateTime ValidFrom { get; set; } = DateTime.Now;
}

/// <summary>
/// Extension-методи для UnitTask
/// </summary>
public static class UnitTaskExtensions
{
    /// <summary>
    /// Створює UnitTask зі снимка Unit (при публікації)
    /// </summary>
    /// <param name="unit">Підрозділ</param>
    /// <param name="dataSetId">ID набору даних документу</param>
    /// <param name="taskId">ID завдання</param>
    /// <param name="areaId">ID району виконання завдань</param>
    /// <param name="changedBy">Хто публікує</param>
    public static UnitTask CreateSnapshot(
        this Unit unit,
        string dataSetId,
        string taskId,
        string areaId,
        string changedBy) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
            DataSetId = dataSetId,
            UnitId = unit.Id,
            UnitShortName = unit.ShortName,
            ParentId = unit.ParentId,
            ParentShortName = unit.Parent?.ShortName ?? string.Empty,
            AssignedUnitId = unit.AssignedUnitId,
            AssignedShortName = unit.AssignedUnit?.ShortName,
            UnitTypeId = unit.UnitTypeId,
            UnitTypeName = unit.UnitType?.ShortValue ?? unit.UnitType?.Value,
            IsInvolved = unit.IsInvolved,
            PersistentLocationId = unit.PersistentLocationId,
            PersistentLocationValue = unit.PersistentLocation?.Value,
            TaskId = taskId,
            TaskValue = string.Empty, // Заповнюється через Include(t => t.Task)
            AreaId = areaId,
            IsPublished = true,
            PublishedAtUtc = DateTime.UtcNow,
            ChangedBy = changedBy,
            ValidFrom = DateTime.UtcNow
        };

    /// <summary>
    /// Конвертує UnitTask у DTO (БЕЗ деталей)
    /// </summary>
    public static UnitTaskDto ToDto(this UnitTask task) =>
        new(
            task.Id,
            task.DataSetId,
            task.UnitId,
            task.UnitShortName,
            task.ParentId,
            task.ParentShortName,
            task.AssignedUnitId,
            task.AssignedShortName,
            task.UnitTypeId,
            task.UnitTypeName,
            task.IsInvolved,
            task.PersistentLocationId,
            task.PersistentLocationValue,
            task.TaskId,
            task.TaskValue,
            task.AreaId,
            task.IsPublished,
            task.PublishedAtUtc,
            task.ChangedBy,
            task.ValidFrom);

    /// <summary>
    /// Змінити статус публікації
    /// </summary>
    public static void Publish(this UnitTask task, bool setPublish)
    {
        task.IsPublished = setPublish;
        task.PublishedAtUtc = setPublish ? DateTime.UtcNow : null;
    }
}
