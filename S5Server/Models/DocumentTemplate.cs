using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

using S5Server.Utils;

namespace S5Server.Models
{
    public record TemplateDto(
        string Id,
        string Name,
        string? Description,
        string TemplateCategoryId,
        string? TemplateCategoryName,
        bool IsPublished,
        DateTime CreatedAtUtc,
        DateTime UpdatedAtUtc)
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
                e.UpdatedAtUtc
            );

        public static void ApplyDto(DocumentTemplate e, TemplateDto dto)
        {
            e.Name = dto.Name.Trim();
            e.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            e.TemplateCategoryId = dto.TemplateCategoryId;
            e.IsPublished = dto.IsPublished;
            e.CreatedAtUtc = dto.CreatedAtUtc;
            e.UpdatedAtUtc = dto.UpdatedAtUtc;
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
        string Id,
        string Name,
        string? Description,
        string TemplateCategoryId,
        string? TemplateCategoryName,
        bool IsPublished,
        DateTime? PublishedAtUtc,
        DateTime CreatedAtUtc,
        DateTime UpdatedAtUtc);

    public record CreateTemplateDto(
        [Required] string Name,
        string? Description,
        string TemplateCategoryId,
        bool IsPublished,
        IFormFile? File);
    public record SetCategoryDto(string? TemplateCategoryId);

    /// <summary>
    /// Represents a document template, including its content, format, metadata, and associated data sets.
    /// </summary>
    /// <remarks>A document template defines the structure and content for generated documents in various
    /// formats, such as HTML, plain text, DOCX, or PDF. Each template includes metadata, publication status, and can be
    /// associated with a category and one or more data sets. The template's content is stored as a byte array, and the
    /// format determines how the content is interpreted and delivered. Use the provided static methods to convert
    /// between format values and their string or MIME type representations.</remarks>
    [Table("document_templates")]
    public class DocumentTemplate
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [StringLength(150), Required]
        public string Name { get; set; } = string.Empty;

        [StringLength(300)]
        public string? Description { get; set; }
        [Required]
        public byte[] Content { get; set; } = [];
        /// <summary>
        /// Категория шаблона документа
        /// </summary>
        [StringLength(36)]
        public string TemplateCategoryId { get; set; } = ControllerFunctions.NullGuid;
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
        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
    }
}