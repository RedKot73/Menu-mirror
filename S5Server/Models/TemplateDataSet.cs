using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models;

/// <summary>
/// DTO для читання TemplateDataSet (БЕЗ деталей)
/// </summary>
public record TemplateDataSetDto(
    string Id,
    bool IsParentDocUsed,
    string? ParentDocNumber,
    DateTime? ParentDocDate,
    string Name,
    string DocNumber,
    DateTime DocDate,
    bool IsPublished,
    DateTime? PublishedAtUtc,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

/// <summary>
/// DTO для оновлення TemplateDataSet
/// </summary>
public record TemplateDataSetUpSertDto(
    bool IsParentDocUsed,
    string? ParentDocNumber,
    DateTime? ParentDocDate,
    string Name,
    string DocNumber,
    DateTime DocDate,
    bool IsPublished);

/// <summary>
/// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
/// </summary>
[Table("template_data_sets")]
public class TemplateDataSet
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public string Id { get; set; } = Guid.NewGuid().ToString("D");

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
    public DateTime? ParentDocDate { get; set; }  // ✅ Nullable

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
    public DateTime DocDate { get; set; }

    /// <summary>
    /// Список завдань підрозділів
    /// </summary>
    public List<UnitTask> UnitTasks { get; set; } = [];

    // Публикация
    /// <summary>
    /// Gets or sets a value indicating whether the content is published.
    /// </summary>
    public bool IsPublished { get; set; }
    public DateTime? PublishedAtUtc { get; set; }

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAtUtc { get; set; }
}

/// <summary>
/// Extension-методи для TemplateDataSet
/// </summary>
public static class TemplateDataSetExtensions
{
    /// <summary>
    /// Створює TemplateDataSet з DTO
    /// </summary>
    public static TemplateDataSet FromCreateDto(this TemplateDataSetUpSertDto dto) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
            IsParentDocUsed = dto.IsParentDocUsed,
            ParentDocNumber = dto.ParentDocNumber,
            ParentDocDate = dto.ParentDocDate,
            Name = dto.Name.Trim(),
            DocNumber = dto.DocNumber.Trim(),
            DocDate = dto.DocDate,
            IsPublished = dto.IsPublished,
            CreatedAtUtc = DateTime.UtcNow
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
            ds.UpdatedAtUtc);

    /// <summary>
    /// Перевірка чи змінились дані
    /// </summary>
    public static bool IsEqualTo(this TemplateDataSet ds, TemplateDataSetUpSertDto dto) =>
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
    public static void Publish(this TemplateDataSet ds, bool setPublish)
    {
        ds.IsPublished = setPublish;
        ds.PublishedAtUtc = setPublish ? DateTime.UtcNow : null;
        ds.UpdatedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Оновити поля з DTO
    /// </summary>
    public static void UpdateFrom(this TemplateDataSet ds, TemplateDataSetUpSertDto dto)
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

        ds.UpdatedAtUtc = DateTime.UtcNow;
    }

    /// <summary>
    /// Валідація ParentDoc полів
    /// </summary>
    public static (bool IsValid, string? ErrorMessage) ValidateParentDoc(this TemplateDataSetUpSertDto dto)
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
