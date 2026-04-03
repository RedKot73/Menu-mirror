using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для створення UnitTask (застарілий варіант).
/// </summary>
/// <param name="Id">ID завдання.</param>
/// <param name="DataSetId">ID набору даних.</param>
/// <param name="UnitId">ID підрозділу.</param>
/// <param name="TaskId">ID типу завдання.</param>
/// <param name="AreaId">ID району.</param>
/// <param name="IsPublished">Чи опубліковано.</param>
public record UnitTaskNewDTO(
    Guid Id,
    Guid DataSetId,
    Guid UnitId,
    Guid TaskId,
    Guid AreaId,
    bool IsPublished);

/// <summary>
/// DTO для створення завдання підрозділу.
/// </summary>
/// <param name="DataSetId">ID набору даних.</param>
/// <param name="UnitId">ID підрозділу.</param>
/// <param name="TaskId">ID типу завдання.</param>
/// <param name="AreaId">ID району.</param>
public record UnitTaskCreateDto(
    Guid DataSetId,
    Guid UnitId,
    Guid TaskId,
    Guid AreaId);

/// <summary>
/// DTO для передачі даних про завдання підрозділу (Master-Detail Pattern).
/// </summary>
/// <param name="Id">ID завдання.</param>
/// <param name="DataSetId">ID набору даних.</param>
/// <param name="UnitId">ID підрозділу.</param>
/// <param name="UnitShortName">Коротка назва підрозділу.</param>
/// <param name="ParentId">ID вищого підрозділу.</param>
/// <param name="ParentShortName">Коротка назва вищого підрозділу.</param>
/// <param name="AssignedUnitId">ID приданого підрозділу.</param>
/// <param name="AssignedShortName">Коротка назва приданого підрозділу.</param>
/// <param name="AdjactedUnitId">ID суміжного підрозділу.</param>
/// <param name="AdjactedShortName">Коротка назва суміжного підрозділу.</param>
/// <param name="UnitTypeId">ID типу підрозділу.</param>
/// <param name="UnitTypeName">Назва типу підрозділу.</param>
/// <param name="IsInvolved">Ознака задіяності.</param>
/// <param name="PersistentLocationId">ID ППД.</param>
/// <param name="PersistentLocationValue">Назва ППД.</param>
/// <param name="TaskId">ID типу завдання.</param>
/// <param name="TaskValue">Назва завдання.</param>
/// <param name="TaskWithMeans">Чи потребує завдання вказання засобів (БПЛА).</param>
/// <param name="AreaId">ID району.</param>
/// <param name="AreaValue">Назва району.</param>
/// <param name="IsPublished">Ознака публікації.</param>
/// <param name="PublishedAtUtc">Час публікації (UTC).</param>
/// <param name="ChangedBy">Хто змінив.</param>
/// <param name="ValidFrom">Дата початку дії.</param>
public record UnitTaskDto(
    Guid Id,
    Guid DataSetId,
    Guid UnitId,
    string UnitShortName,
    Guid? ParentId,
    string? ParentShortName,
    Guid? AssignedUnitId,
    string? AssignedShortName,
    Guid? AdjactedUnitId,
    string? AdjactedShortName,
    Guid? UnitTypeId,
    string? UnitTypeName,
    bool IsInvolved,
    Guid? PersistentLocationId,
    string? PersistentLocationValue,
    Guid TaskId,
    string TaskValue,
    bool TaskWithMeans,
    Guid AreaId,
    string? AreaValue,
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
    /// <summary>
    /// Gets or sets the unique identifier for the entity.
    /// </summary>
    /// <remarks>The identifier is generated using version 7 GUIDs, which provide improved uniqueness and
    /// ordering for distributed systems. This property is typically used as the primary key in database
    /// entities.</remarks>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    [Required]
    public Guid DataSetId { get; set; } = default!;
    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    [ValidateNever]
    public TemplateDataSet DataSet { get; set; } = default!;

    //Unit---------------------------------------------------------------
    /// <summary>
    /// Підрозділ (організаційно-штатна бойова одиниця)
    /// </summary>
    [Required]
    public Guid UnitId { get; set; } = default!;
    /// <summary>
    /// Підрозділ (організаційно-штатна бойова одиниця)
    /// </summary>
    [ValidateNever]
    public Unit Unit { get; set; } = default!;
    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required]
    public string UnitShortName { get; set; } = string.Empty;

    /// <summary>
    /// Основний підрозділ
    /// </summary>
    public Guid? ParentId { get; set; }
    /// <summary>
    /// Основний підрозділ
    /// </summary>
    [ValidateNever]
    public Unit? Parent { get; set; }
    /// <summary>
    /// Основний підрозділ
    /// </summary>
    [StringLength(100)]
    public string? ParentShortName { get; set; }

    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    public Guid? AssignedUnitId { get; set; }
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
    /// Суміжний підрозділ (для координації завдань)
    /// </summary>
    public Guid? AdjactedUnitId { get; set; }
    /// <summary>
    /// Gets or sets the unit that is adjacent to the current unit, if any.
    /// </summary>
    [ValidateNever]
    public Unit? AdjactedUnit { get; set; }
    /// <summary>
    /// Gets or sets the abbreviated or short name associated with the entity.
    /// </summary>
    [StringLength(100)]
    public string? AdjactedShortName { get; set; }

    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    public Guid? UnitTypeId { get; set; }
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
    /// True - Позаштатний/Оперативний/Тимчасовий підрозділ
    /// </summary>
    public bool IsInvolved { get; set; } = false;

    /// <summary>
    /// ППД (Постійне приміщення дислокації)
    /// </summary>
    public Guid? PersistentLocationId { get; set; }

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
    //[NotMapped]
    public List<SoldierTask> SoldiersTask { get; set; } = [];

    //Task---------------------------------------------------------------
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    [Required]
    public Guid TaskId { get; set; } = default!;
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
    /// Сума (грн)
    /// </summary>
    [Column(TypeName = "numeric(18, 2)")]
    public decimal Amount { get; set; }

    /// <summary>
    /// Район виконання завдань (РВЗ)
    /// </summary>
    [Required]
    public Guid AreaId { get; set; } = default!;
    /// <summary>
    /// Район виконання завдань (РВЗ)
    /// </summary>
    [ValidateNever]
    public DictArea Area { get; set; } = default!;

    /// <summary>
    /// Район виконання завдань (РВЗ)
    /// Повна адреса: конкатенація рівнів через кому
    /// </summary>
    [NotMapped]
    public VCityFullName? AreaCityFullName { get; set; }

    /// <summary>
    /// Дрони, задіяні при виконанні завдання (Master-Detail: завантажується окремо через DroneModelTaskController)
    /// </summary>
    //[NotMapped]
    public List<DroneModelTask> Means { get; set; } = [];

    // Публикация
    /// <summary>
    /// Опубліковано - створено SnapShot Unit and Soldiers
    /// </summary>
    public bool IsPublished { get; set; }
    /// <summary>
    /// Gets or sets the date and time, in UTC, when the content was published.
    /// </summary>
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
    public DateTime ValidFrom { get; set; } = DateTime.UtcNow;
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
    /// <param name="task">Завдання підрозділу</param>
    /// <param name="area">Район виконання завдань</param>
    /// <param name="changedBy">Хто публікує</param>
    public static UnitTask Create(
        this Unit unit,
        Guid dataSetId,
        DictUnitTask task,
        DictArea area,
        string changedBy) =>
        new()
        {
            Id = Guid.CreateVersion7(),
            DataSetId = dataSetId,
            UnitId = unit.Id,
            UnitShortName = unit.ShortName,
            ParentId = unit.ParentId,
            ParentShortName = unit.Parent?.ShortName,
            AssignedUnitId = unit.AssignedUnitId,
            AssignedShortName = unit.AssignedUnit?.ShortName,
            UnitTypeId = unit.UnitTypeId,
            UnitTypeName = unit.UnitType?.ShortValue ?? unit.UnitType?.Value,
            IsInvolved = unit.IsInvolved,
            PersistentLocationId = unit.PersistentLocationId,
            PersistentLocationValue = unit.PersistentLocation?.Value,
            Task = task, //проверить что в вызывающем коде стоит DictTask.AsTracking иначе EF Core будет делать лишний INSERT
            TaskId = task.Id,
            TaskValue = task.Value,
            Area = area, //проверить что в вызывающем коде стоит DictArea.AsTracking иначе EF Core будет делать лишний INSERT
            AreaId = area.Id,
            IsPublished = false,
            PublishedAtUtc = DateTime.UtcNow,
            ChangedBy = changedBy,
            ValidFrom = DateTime.UtcNow
        };

    /// <summary>
    /// Конвертує UnitTask у DTO (БЕЗ деталей)
    /// Smart: Published = snapshot, Unpublished = actual from Unit
    /// </summary>
    public static UnitTaskDto ToDto(this UnitTask task)
    {
        // ✅ ЛОГІКА: Якщо IsPublished - false і Unit != null — взяти актуальні дані з Unit,
        // ігноруючи збережені в UnitTask (які можуть бути застарілими)
        var useActualData = !task.IsPublished && task.Unit != null;

        return new UnitTaskDto(
            task.Id,
            task.DataSetId,
            task.UnitId,
            // ✅ Smart: snapshot або actual
            useActualData ? task.Unit!.ShortName : task.UnitShortName,
            useActualData ? task.Unit!.ParentId : task.ParentId,
            useActualData ? task.Unit!.Parent?.ShortName : task.ParentShortName,
            useActualData ? task.Unit!.AssignedUnitId : task.AssignedUnitId,
            useActualData ? task.Unit!.AssignedUnit?.ShortName : task.AssignedShortName,
            task.AdjactedUnitId,
            task.AdjactedShortName,
            useActualData ? task.Unit!.UnitTypeId : task.UnitTypeId,
            useActualData ? (task.Unit!.UnitType?.ShortValue ?? task.Unit!.UnitType?.Value) : task.UnitTypeName,
            useActualData ? task.Unit!.IsInvolved : task.IsInvolved,
            useActualData ? task.Unit!.PersistentLocationId : task.PersistentLocationId,
            useActualData ? task.Unit!.PersistentLocation?.Value : task.PersistentLocationValue,
            task.TaskId,
            task.TaskValue ?? task.Task.Value,
            task.Task.WithMeans,
            task.AreaId,
            task.Area?.Value,
            task.IsPublished,
            task.PublishedAtUtc,
            task.ChangedBy,
            task.ValidFrom);
    }

    /// <summary>
    /// Determines whether the specified unit task and unit task data transfer object represent the same task based on
    /// their identifiers and publication status.
    /// </summary>
    /// <param name="task">The unit task to compare. Cannot be null.</param>
    /// <param name="dto">The unit task data transfer object to compare. Cannot be null.</param>
    /// <returns>true if the task and the data transfer object have matching task identifiers, area identifiers, and publication
    /// status; otherwise, false.</returns>
    public static bool IsEqualTo(this UnitTask task, UnitTaskDto dto) =>
        task.TaskId == dto.TaskId &&
        task.AreaId == dto.AreaId &&
        task.IsPublished == dto.IsPublished;
    /// <summary>
    /// Updates the properties of a unit task based on the values provided in the data transfer object.
    /// </summary>
    /// <remarks>If the publication status changes, the method updates it accordingly. When both the existing
    /// task and the DTO indicate a published state, no further updates are applied. Otherwise, the task's properties
    /// are updated to match the DTO, and the change is attributed to the specified user.</remarks>
    /// <param name="task">The unit task instance to update. Must not be null.</param>
    /// <param name="dto">The data transfer object containing updated values for the unit task. Must not be null.</param>
    /// <param name="changedBy">The identifier of the user or process making the change. Used to record who performed the update.</param>
    public static void UpdateFromDto(this UnitTask task, UnitTaskDto dto, string changedBy)
    {
        // Оновити статус публікації
        if (dto.IsPublished != task.IsPublished)
            task.Publish(dto.IsPublished, changedBy);
        
        // Якщо обидва published - не змінюємо дані
        if (task.IsPublished && dto.IsPublished)
            return;
        
        // Це draft (або став draft) - оновлюємо
        task.TaskId = dto.TaskId;
        task.TaskValue = dto.TaskValue;
        task.AreaId = dto.AreaId;
        task.ChangedBy = changedBy;
    }

    /// <summary>
    /// Змінити статус публікації
    /// </summary>
    public static void Publish(this UnitTask task, bool setPublish, string changedBy)
    {
        task.IsPublished = setPublish;
        task.PublishedAtUtc = setPublish ? DateTime.UtcNow : null;
        task.ChangedBy = changedBy;
    }
}
