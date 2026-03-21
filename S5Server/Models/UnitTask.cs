using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// Заглушка для створення UnitTask без Id
/// </summary>
/// <param name="Id">The unique identifier for the unit task.</param>
/// <param name="DataSetId">The identifier of the dataset associated with the unit task.</param>
/// <param name="UnitId">The identifier of the unit to which the task is assigned.</param>
/// <param name="TaskId">The identifier of the task being created.</param>
/// <param name="AreaId">The identifier of the area related to the unit task.</param>
/// <param name="IsPublished">Indicates whether the unit task is published. Set to <see langword="true"/> if published; otherwise, <see
/// langword="false"/>.</param>
public record UnitTaskNewDTO(
    Guid Id,
    Guid DataSetId,
    Guid UnitId,
    Guid TaskId,
    Guid AreaId,
    bool IsPublished);

/// <summary>
/// DTO для створення UnitTask
/// </summary>
public record UnitTaskCreateDto(
    Guid DataSetId,
    Guid UnitId,
    Guid TaskId,
    Guid AreaId);

/// <summary>
/// DTO для UnitTask (БЕЗ деталей - Master-Detail Pattern)
/// </summary>
public record UnitTaskDto(
    Guid Id,
    Guid DataSetId,
    Guid UnitId,
    string UnitShortName,
    Guid? ParentId,
    string ParentShortName,
    Guid? AssignedUnitId,
    string? AssignedShortName,
    Guid? UnitTypeId,
    string? UnitTypeName,
    bool IsInvolved,
    Guid? PersistentLocationId,
    string? PersistentLocationValue,
    Guid TaskId,
    string TaskValue,
    bool TaskWithMeans,
    Guid AreaId,
    string? AreaValue,          // ✅ ДОДАНО: назва району
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
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
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
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
    public string ParentShortName { get; set; } = string.Empty;

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
            ParentShortName = unit.Parent?.ShortName ?? string.Empty,
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
            useActualData ? (task.Unit!.Parent?.ShortName ?? string.Empty) : task.ParentShortName,
            useActualData ? task.Unit!.AssignedUnitId : task.AssignedUnitId,
            useActualData ? task.Unit!.AssignedUnit?.ShortName : task.AssignedShortName,
            useActualData ? task.Unit!.UnitTypeId : task.UnitTypeId,
            useActualData ? (task.Unit!.UnitType?.ShortValue ?? task.Unit!.UnitType?.Value) : task.UnitTypeName,
            useActualData ? task.Unit!.IsInvolved : task.IsInvolved,
            useActualData ? task.Unit!.PersistentLocationId : task.PersistentLocationId,
            useActualData ? task.Unit!.PersistentLocation?.Value : task.PersistentLocationValue,
            task.TaskId,
            //task.TaskValue ? task.Task.Value,
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
