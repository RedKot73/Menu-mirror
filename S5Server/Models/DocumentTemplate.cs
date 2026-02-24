using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

using S5Server.Utils;

namespace S5Server.Models
{
    public record TemplateDto(
        Guid Id,
        string Name,
        string? Description,
        Guid TemplateCategoryId,
        string? TemplateCategoryName,
        bool IsPublished,
        DateTime CreatedAtUtc,
        DateTime ValidFrom)
    {
        /// <summary>
        /// Converts a <see cref="DocumentTemplate"/> instance to its corresponding <see cref="TemplateDto"/>
        /// representation.
        /// </summary>
        /// <param name="e">The <see cref="DocumentTemplate"/> object to convert. Cannot be null.</param>
        /// <returns>A <see cref="TemplateDto"/> that contains the data from the specified <paramref name="e"/>.</returns>
        public static TemplateDto ToDto(DocumentTemplate e) =>
            new(
                e.Id,
                e.Name,
                e.Description,
                e.TemplateCategoryId,
                e.TemplateCategory?.ShortValue,
                e.IsPublished,
                e.CreatedAtUtc,
                e.ValidFrom
            );

        public static void ApplyDto(DocumentTemplate e, TemplateDto dto)
        {
            e.Name = dto.Name.Trim();
            e.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            e.TemplateCategoryId = dto.TemplateCategoryId;
            e.IsPublished = dto.IsPublished;
            e.CreatedAtUtc = dto.CreatedAtUtc;
            e.ValidFrom = dto.ValidFrom;
        }
    }

    /// <summary>
    /// Represents detailed information about a template, including its identity, metadata, publication status, and
    /// associated category and dataset information.
    /// </summary>
    /// <param name="Id">The unique identifier of the template.</param>
    /// <param name="Name">The display name of the template.</param>
    /// <param name="Description">An optional description providing additional details about the template, or null if not specified.</param>
    /// <param name="TemplateCategoryId">The unique identifier of the category to which the template belongs.</param>
    /// <param name="TemplateCategoryName">The display name of the template's category, or null if not specified.</param>
    /// <param name="IsPublished">A value indicating whether the template has been published.</param>
    /// <param name="PublishedAtUtc">The UTC date and time when the template was published, or null if the template is not published.</param>
    /// <param name="CreatedAtUtc">The UTC date and time when the template was created.</param>
    /// <param name="UpdatedAtUtc">The UTC date and time when the template was last updated.</param>
    public record TemplateDetailsDto(
        Guid Id,
        string Name,
        string? Description,
        Guid TemplateCategoryId,
        string? TemplateCategoryName,
        bool IsPublished,
        DateTime? PublishedAtUtc,
        DateTime CreatedAtUtc,
        DateTime ValidFrom);

    public record CreateTemplateDto(
        [Required] string Name,
        string? Description,
        Guid TemplateCategoryId,
        bool IsPublished,
        IFormFile? File);
    public record SetCategoryDto(Guid? TemplateCategoryId);

    /// <summary>
    /// Шаблон документа HTML-format з якорями HandleBars
    /// </summary>
    [Table("document_templates")]
    public class DocumentTemplate
    {
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        [StringLength(150), Required]
        public string Name { get; set; } = string.Empty;

        [StringLength(300)]
        public string? Description { get; set; }
        [Required]
        public string Content { get; set; } = string.Empty;
        /// <summary>
        /// Категория шаблона документа
        /// </summary>
        public Guid TemplateCategoryId { get; set; } = ControllerFunctions.NullGuid;
        /// <summary>
        /// Категория шаблона документа
        /// </summary>
        [ValidateNever]
        public DictTemplateCategory TemplateCategory { get; set; } = default!;
        // Публикация
        /// <summary>
        /// Gets or sets a value indicating whether the content is published.
        /// </summary>
        public bool IsPublished { get; set; }
        public DateTime? PublishedAtUtc { get; set; }
        [StringLength(100)]
        public string? PublishedBy { get; set; }
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
}