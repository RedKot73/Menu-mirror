using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models;

/// <summary>
/// DTO для створення TemplateDataSet
/// </summary>
public record TemplateDataSetCreateDto(
    bool IsParentDocUsed,
    string? ParentDocNumber,
    DateOnly? ParentDocDate,
    string Name,
    string DocNumber,
    DateOnly DocDate,
    bool IsPublished);

/// <summary>
/// DTO для читання TemplateDataSet (БЕЗ деталей)
/// </summary>
public record TemplateDataSetDto(
    Guid Id,
    bool IsParentDocUsed,
    string? ParentDocNumber,
    DateOnly? ParentDocDate,
    string Name,
    string DocNumber,
    DateOnly DocDate,
    bool IsPublished,
    DateTime? PublishedAtUtc,
    DateTime CreatedAtUtc,
    DateTime ValidFrom)
    : TemplateDataSetCreateDto(
        IsParentDocUsed,
        ParentDocNumber,
        ParentDocDate,
        Name,
        DocNumber,
        DocDate,
        IsPublished);

/// <summary>
/// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
/// </summary>
[Table("template_data_sets")]
public class TemplateDataSet
{
    /// <summary>
    /// Gets or sets the unique identifier for the entity.
    /// </summary>
    /// <remarks>The identifier is generated using version 7 GUIDs, which provide improved uniqueness and
    /// ordering for distributed systems. This property is typically used as the primary key in database
    /// contexts.</remarks>
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// Чи існує документ старшого начальника
    /// </summary>
    public bool IsParentDocUsed { get; set; } = false;

    /// <summary>
    /// Номер документу старшого начальника
    /// </summary>
    [StringLength(100)]
    public string? ParentDocNumber { get; set; }  // ✅ Nullable

    /// <summary>
    /// Дата документу старшого начальника
    /// </summary>
    public DateOnly? ParentDocDate { get; set; }  // ✅ Nullable
    /// <summary>
    /// Gets or sets the name associated with this entity.
    /// </summary>
    /// <remarks>The name must be a non-empty string with a maximum length of 150 characters. This property is
    /// required and cannot be null or empty.</remarks>
    [StringLength(150), Required]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Номер документу
    /// </summary>
    [StringLength(100), Required]
    public string DocNumber { get; set; } = string.Empty;
    
    /// <summary>
    /// Дата документу
    /// </summary>
    [Required]
    public DateOnly DocDate { get; set; }

    /// <summary>
    /// Перелік завдань підрозділів
    /// </summary>
    public List<UnitTask> UnitTasks { get; set; } = [];

    // Публикация
    /// <summary>
    /// Gets or sets a value indicating whether the content is published.
    /// </summary>
    public bool IsPublished { get; set; }
    /// <summary>
    /// Gets or sets the date and time, in UTC, when the item was published.
    /// </summary>
    /// <remarks>If the value is null, the item has not been published. Use this property to determine the
    /// publication status and timestamp of the item.</remarks>
    public DateTime? PublishedAtUtc { get; set; }
    /// <summary>
    /// Gets or sets the name of the publisher associated with the item.
    /// </summary>
    [StringLength(100)]
    public string? PublishedBy { get; set; }
    /// <summary>
    /// Gets or sets the date and time when the entity was created, in Coordinated Universal Time (UTC).
    /// </summary>
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;

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
/// Extension-методи для TemplateDataSet
/// </summary>
public static class TemplateDataSetExtensions
{
    /// <summary>
    /// Створює TemplateDataSet з DTO
    /// </summary>
    public static TemplateDataSet FromCreateDto(this TemplateDataSetCreateDto dto, string changedBy) =>
        new()
        {
            Id = Guid.CreateVersion7(),
            IsParentDocUsed = dto.IsParentDocUsed,
            ParentDocNumber = dto.ParentDocNumber,
            ParentDocDate = dto.ParentDocDate,
            Name = dto.Name.Trim(),
            DocNumber = dto.DocNumber.Trim(),
            DocDate = dto.DocDate,
            IsPublished = dto.IsPublished,
            CreatedAtUtc = DateTime.UtcNow,
            ValidFrom = DateTime.UtcNow,
            ChangedBy = changedBy
        };

    /// <summary>
    /// Конвертує TemplateDataSet у DTO (БЕЗ UnitTasks)
    /// </summary>
    public static TemplateDataSetDto ToDto(this TemplateDataSet ds) =>
        new(
            ds.Id,
            ds.IsParentDocUsed,
            ds.ParentDocNumber,
            ds.ParentDocDate,
            ds.Name,
            ds.DocNumber,
            ds.DocDate,
            ds.IsPublished,
            ds.PublishedAtUtc,
            ds.CreatedAtUtc,
            ds.ValidFrom);

    /// <summary>
    /// Перевірка чи змінились дані
    /// </summary>
    public static bool IsEqualTo(this TemplateDataSet ds, TemplateDataSetDto dto) =>
        ds.IsParentDocUsed == dto.IsParentDocUsed &&
        ds.ParentDocNumber == dto.ParentDocNumber &&
        ds.ParentDocDate == dto.ParentDocDate &&
        ds.Name == dto.Name.Trim() &&
        ds.DocNumber == dto.DocNumber.Trim() &&
        ds.DocDate == dto.DocDate &&
        ds.IsPublished == dto.IsPublished;

    /// <summary>
    /// Змінити статус публікації
    /// </summary>
    public static void Publish(this TemplateDataSet ds, bool setPublish, string changedBy)
    {
        ds.IsPublished = setPublish;
        ds.PublishedAtUtc = setPublish ? DateTime.UtcNow : null;
        ds.PublishedBy = setPublish ? changedBy : null;
        ds.ValidFrom = DateTime.UtcNow;
        ds.ChangedBy = changedBy;
    }

    /// <summary>
    /// Оновити поля з DTO
    /// </summary>
    public static void UpdateFrom(this TemplateDataSet ds, TemplateDataSetDto dto, string changedBy)
    {
        var publishStateChanged = ds.IsPublished != dto.IsPublished;

        ds.IsParentDocUsed = dto.IsParentDocUsed;
        ds.ParentDocNumber = dto.ParentDocNumber;
        ds.ParentDocDate = dto.ParentDocDate;
        ds.Name = dto.Name.Trim();
        ds.DocNumber = dto.DocNumber.Trim();
        ds.DocDate = dto.DocDate;
        ds.IsPublished = dto.IsPublished;

        if (publishStateChanged)
            ds.PublishedAtUtc = dto.IsPublished ? DateTime.UtcNow : null;

        ds.ValidFrom = DateTime.UtcNow;
        ds.ChangedBy = changedBy;
    }

    /// <summary>
    /// Валідація ParentDoc полів
    /// </summary>
    public static (bool IsValid, string? ErrorMessage) ValidateParentDoc(this TemplateDataSetCreateDto dto)
    {
        if (!dto.IsParentDocUsed)
            return (true, null);

        if (string.IsNullOrWhiteSpace(dto.ParentDocNumber))
            return (false, "ParentDocNumber обов'язковий, якщо IsParentDocUsed = true");

        if (dto.ParentDocDate == null)
            return (false, "ParentDocDate обов'язковий, якщо IsParentDocUsed = true");

        return (true, null);
    }
}
