using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models;

/// <summary>
/// Историческая таблица изменений задач подразделений
/// </summary>
[Table("units_task_hist")]
public class UnitTaskHist
{
    /// <summary>
    /// Gets or sets the unique identifier for the entity.
    /// </summary>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// ID оригинальной записи задачи подразделения
    /// </summary>
    [Required]
    public Guid UnitTaskId { get; set; } = default!;

    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    [Required]
    public Guid DataSetId { get; set; } = default!;

    // Unit---------------------------------------------------------------
    /// <summary>
    /// Підрозділ (ID)
    /// </summary>
    [Required]
    public Guid UnitId { get; set; } = default!;

    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required]
    public string UnitShortName { get; set; } = string.Empty;

    /// <summary>
    /// Основний підрозділ (ID)
    /// </summary>
    public Guid? ParentId { get; set; }

    /// <summary>
    /// Основний підрозділ (назва) - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string ParentShortName { get; set; } = string.Empty;

    /// <summary>
    /// Приданий до підрозділу (ID)
    /// </summary>
    public Guid? AssignedUnitId { get; set; }

    /// <summary>
    /// Приданий до підрозділу (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? AssignedShortName { get; set; }

    /// <summary>
    /// Суміжний підрозділ (ID)
    /// </summary>
    public Guid? AdjactedUnitId { get; set; }

    /// <summary>
    /// Суміжний підрозділ (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? AdjactedShortName { get; set; }

    /// <summary>
    /// Тип суміжного підрозділу (ID)
    /// </summary>
    public Guid? AdjactedTypeId { get; set; }

    /// <summary>
    /// Тип підрозділу (ID)
    /// </summary>
    public Guid? UnitTypeId { get; set; }

    /// <summary>
    /// Тип підрозділу (назва) - денормалізація
    /// </summary>
    [StringLength(100)]
    public string? UnitTypeName { get; set; }

    /// <summary>
    /// True - Позаштатний/Оперативний/Тимчасовий підрозділ
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

    // Task---------------------------------------------------------------
    /// <summary>
    /// Завдання підрозділу (ID)
    /// </summary>
    [Required]
    public Guid TaskId { get; set; } = default!;

    /// <summary>
    /// Назва завдання підрозділу - денормалізація
    /// </summary>
    [StringLength(100), Required]
    public string TaskValue { get; set; } = string.Empty;

    /// <summary>
    /// Район виконання завдань (РВЗ) - ID
    /// </summary>
    [Required]
    public Guid AreaId { get; set; } = default!;

    /// <summary>
    /// Назва
    /// </summary>
    [Required]
    public string AreaValue { get; set; } = default!;

    // Публикация---------------------------------------------------------
    /// <summary>
    /// Опубліковано - створено SnapShot Unit and Soldiers
    /// </summary>
    public bool IsPublished { get; set; }

    /// <summary>
    /// Дата та час публікації (UTC)
    /// </summary>
    public DateTime? PublishedAtUtc { get; set; }

    /// <summary>
    /// Хто вніс зміну (UserId або "System")
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

