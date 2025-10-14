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
        string Format,
        string TemplateCategoryId,
        bool IsPublished,
        string? DefaultDataSetId,
        string? ContentHash,
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
                e.Format,
                e.TemplateCategoryId,
                e.IsPublished,
                e.DefaultDataSetId,
                e.ContentHash,
                e.CreatedAtUtc,
                e.UpdatedAtUtc
            );

        public static void ApplyDto(DocumentTemplate e, TemplateDto dto)
        {
            e.Name = dto.Name.Trim();
            e.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            e.Format = dto.Format;
            e.TemplateCategoryId = dto.TemplateCategoryId;
            e.IsPublished = dto.IsPublished;
            e.DefaultDataSetId = dto.DefaultDataSetId;
            e.ContentHash = dto.ContentHash;
            e.CreatedAtUtc = dto.CreatedAtUtc;
            e.UpdatedAtUtc = dto.UpdatedAtUtc;
        }
    }
    public record TemplateDetailsDto(
        string Id,
        string Name,
        string? Description,
        string Format,
        string TemplateCategoryId,
        string? TemplateCategoryName,
        bool IsPublished,
        DateTime? PublishedAtUtc,
        string? DefaultDataSetId,
        string? DefaultDataSetName,
        string? ContentHash,
        DateTime CreatedAtUtc,
        DateTime UpdatedAtUtc);

    public record CreateTemplateDto(
        [Required] string Name,
        string? Description,
        [Required] string Format,
        string TemplateCategoryId,
        string? DefaultDataSetId,
        IFormFile? File);
    public record SetCategoryDto(string? TemplateCategoryId);
    public record SetDefaultDataSetDto(string? DefaultDataSetId);

    /// <summary>
    /// Шаблон документа (HTML/TXT/DOCX), хранится в БД.
    /// Плейсхолдеры: {{Key}}
    /// </summary>
    [Table("document_templates")]
    public class DocumentTemplate
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [StringLength(150), Required]
        public string Name { get; set; } = string.Empty;

        [StringLength(300)]
        public string? Description { get; set; }

        // html|txt|docx
        /// <summary>
        /// Gets or sets the format in which the content is generated.
        /// </summary>
        /// <remarks>Supported formats include "html", "txt", and "docx". The default value is "html". The value must not
        /// exceed 10 characters.</remarks>
        [StringLength(10), Required]
        public string Format { get; set; } = "html";

        // e.g. text/html, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document
        /// <summary>
        /// Вычисляемый MIME-тип на основе <see cref="Format"/>.
        /// </summary>
        /// <remarks>The content type specifies the media type of the file, such as "text/html",
        /// "text/plain", or "application/vnd.openxmlformats-officedocument.wordprocessingml.document". This value is
        /// used to inform clients and systems about the format of the file for proper handling and display.</remarks>
        [NotMapped]
        public string ContentType => GetContentTypeByFormat(Format);

        [Required]
        public byte[] Content { get; set; } = [];

        // Категория (для фильтров/поиска)
        [StringLength(36)]
        public string TemplateCategoryId { get; set; } = ControllerFunctions.NullGuid;
        [ValidateNever]
        public DictTemplateCategory TemplateCategory { get; set; } = default!;

        // Технический хэш контента (для поиска дубликатов/быстрой сверки)
        /// <summary>
        /// Gets or sets the hash value representing the content for duplicate detection or quick comparison.
        /// </summary>
        /// <remarks>The content hash is typically used to identify identical content efficiently. The
        /// value is a string of up to 64 characters and may be null if the content has not been hashed.</remarks>
        [StringLength(64)]
        public string? ContentHash { get; set; }

        // Публикация
        /// <summary>
        /// Gets or sets a value indicating whether the content is published.
        /// </summary>
        public bool IsPublished { get; set; }
        public DateTime? PublishedAtUtc { get; set; }

        // “Дефолтный” набор данных
        /// <summary>
        /// Gets or sets the identifier of the default data set associated with this entity.
        /// </summary>
        [ForeignKey(nameof(DefaultDataSet))]
        public string? DefaultDataSetId { get; set; }

        // “Дефолтный” набор данных
        /// <summary>
        /// Gets or sets the identifier of the default data set associated with this entity.
        /// </summary>
        [ValidateNever]
        public TemplateDataSet? DefaultDataSet { get; set; }

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;

        [ValidateNever]
        public ICollection<TemplateDataSet> DataSets { get; set; } = [];

        public static string GetContentTypeByFormat(string format) =>
                    format switch
                    {
                        "html" => "text/html",
                        "txt" => "text/plain",
                        "docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        _ => "application/octet-stream"
                    };
    }
}