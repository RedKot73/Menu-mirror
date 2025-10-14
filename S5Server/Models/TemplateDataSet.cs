using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    public record TemplateDataSetDto(
        string Id,
        string TemplateId,
        string? TemplateName,
        string Name,
        string DataJson,
        bool IsPublished,
        DateTime CreatedAtUtc,
        DateTime UpdatedAtUtc)
    {
        public static TemplateDataSetDto ToDto(TemplateDataSet e) =>
            new(
                e.Id,
                e.TemplateId,
                e.Template?.Name,
                e.Name,
                e.DataJson,
                e.IsPublished,
                e.CreatedAtUtc,
                e.UpdatedAtUtc
            );

        public static void ApplyDto(TemplateDataSet e, TemplateDataSetDto dto)
        {
            e.TemplateId = dto.TemplateId;
            e.Name = dto.Name.Trim();
            e.DataJson = dto.DataJson.Trim();
            e.IsPublished = dto.IsPublished;
            e.CreatedAtUtc = dto.CreatedAtUtc;
            e.UpdatedAtUtc = dto.UpdatedAtUtc;
        }
    }
    public record TemplateDataSetCreateDto(
        string TemplateId,
        string Name,
        string DataJson,
        bool IsPublished);

    /// <summary>
    /// Сохранённый набор данных (JSON) для конкретного шаблона
    /// </summary>
    [Table("template_data_sets")]
    public class TemplateDataSet
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [ForeignKey(nameof(Template)), Required]
        public string TemplateId { get; set; } = string.Empty;

        [ValidateNever]
        public DocumentTemplate Template { get; set; } = default!;

        [StringLength(150), Required]
        public string Name { get; set; } = string.Empty;

        /// <summary>
        /// JSON с данными для подстановки
        /// </summary>
        [Required]
        public string DataJson { get; set; } = "{}";

        // Публикация
        /// <summary>
        /// Gets or sets a value indicating whether the content is published.
        /// </summary>
        public bool IsPublished { get; set; }
        public DateTime? PublishedAtUtc { get; set; }

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
    }
}
