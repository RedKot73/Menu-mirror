using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models;

/// <summary>
/// DTO для читання TemplateDataSet (БЕЗ деталей)
/// </summary>
public record TemplateDataSetDto(
    string Id,
    string Name,
    string DocNumber,
    DateTime DocDate,
    bool IsPublished,
    DateTime? PublishedAtUtc,
    DateTime CreatedAtUtc,
    DateTime? UpdatedAtUtc);

/// <summary>
/// DTO для створення TemplateDataSet
/// </summary>
public record TemplateDataSetCreateDto(
    string Name,
    string DocNumber,
    DateTime DocDate,
    bool IsPublished = false);

/// <summary>
/// DTO для оновлення TemplateDataSet
/// </summary>
public record TemplateDataSetUpdateDto(
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
    [StringLength(100), Required]
    public string ParentDocNumber { get; set; } = string.Empty;

    /// <summary>
    /// Дата документу старшого начальника
    /// </summary>
    [Required]
    public DateTime ParentDocDate { get; set; }

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
    /// Конвертує TemplateDataSet у DTO (БЕЗ UnitTasks)
    /// </summary>
    public static TemplateDataSetDto ToDto(this TemplateDataSet ds) =>
        new(
            ds.Id,
            ds.Name,
            ds.DocNumber,
            ds.DocDate,
            ds.IsPublished,
            ds.PublishedAtUtc,
            ds.CreatedAtUtc,
            ds.UpdatedAtUtc);

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
    public static void UpdateFrom(this TemplateDataSet ds, TemplateDataSetUpdateDto dto)
    {
        var publishStateChanged = ds.IsPublished != dto.IsPublished;

        ds.Name = dto.Name.Trim();
        ds.DocNumber = dto.DocNumber.Trim();
        ds.DocDate = dto.DocDate;
        ds.IsPublished = dto.IsPublished;

        if (publishStateChanged)
            ds.PublishedAtUtc = dto.IsPublished ? DateTime.UtcNow : null;

        ds.UpdatedAtUtc = DateTime.UtcNow;
    }
}
