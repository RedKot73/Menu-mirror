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
        string? TemplateCategoryName,
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
                DocumentTemplate.FormatToString(e.Format),
                e.TemplateCategoryId,
                e.TemplateCategory?.ShortValue,
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
            e.Format = DocumentTemplate.ParseFormat(dto.Format); // parse
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
        DateTime CreatedAtUtc,
        DateTime UpdatedAtUtc);

    public record CreateTemplateDto(
        [Required] string Name,
        string? Description,
        [Required] string Format,
        string TemplateCategoryId,
        bool IsPublished,
        string? DefaultDataSetId,
        IFormFile? File);
    public record SetCategoryDto(string? TemplateCategoryId);
    public record SetDefaultDataSetDto(string? DefaultDataSetId);

    [Table("document_templates")]
    public class DocumentTemplate
    {
        public enum TemplateFormat
        {
            Html,
            Txt,
            Docx,
            Pdf
        }

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [StringLength(150), Required]
        public string Name { get; set; } = string.Empty;

        [StringLength(300)]
        public string? Description { get; set; }

        // Ограниченный набор значений
        [Required]
        public TemplateFormat Format { get; set; } = TemplateFormat.Html;

        [NotMapped]
        public string ContentType => GetContentTypeByFormat(Format);

        [Required]
        public byte[] Content { get; set; } = [];

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
        /// <summary>
        /// Attempts to parse the specified string into a corresponding template format value.
        /// </summary>
        /// <remarks>If parsing fails, the out parameter is set to the default format value. Leading and
        /// trailing whitespace in the input string are ignored, and comparison is case-insensitive.</remarks>
        /// <param name="s">The input string representing the format to parse. Supported values are "html", "txt", "docx", and "pdf"
        /// (case-insensitive).</param>
        /// <param name="fmt">When this method returns, contains the parsed template format if parsing succeeded; otherwise, contains the
        /// default format value.</param>
        /// <returns>true if the input string was successfully parsed into a known template format; otherwise, false.</returns>
        public static bool TryParseFormat(string? s, out TemplateFormat fmt)
        {
            switch (s?.Trim().ToLowerInvariant())
            {
                case "html": fmt = TemplateFormat.Html; return true;
                case "txt": fmt = TemplateFormat.Txt; return true;
                case "docx": fmt = TemplateFormat.Docx; return true;
                case "pdf": fmt = TemplateFormat.Pdf; return true;
                default: fmt = TemplateFormat.Html; return false;
            }
        }
        /// <summary>
        /// Parses the specified string into a corresponding <see cref="TemplateFormat"/> value.
        /// </summary>
        /// <param name="s">The string representation of the format to parse. Can be <see langword="null"/>.</param>
        /// <returns>The <see cref="TemplateFormat"/> value that corresponds to the specified string.</returns>
        /// <exception cref="ArgumentOutOfRangeException">Thrown when <paramref name="s"/> does not represent a supported format.</exception>
        public static TemplateFormat ParseFormat(string? s)
        {
            if (TryParseFormat(s, out var fmt)) return fmt;
            throw new ArgumentOutOfRangeException(nameof(s), $"Unsupported format: {s}");
        }
        /// <summary>
        /// Converts the specified template format to its corresponding string representation.
        /// </summary>
        /// <remarks>If an unrecognized format is provided, the method returns "html" as the default
        /// value.</remarks>
        /// <param name="format">The template format to convert. If the value is not a recognized format, "html" is returned by default.</param>
        /// <returns>A string representing the specified template format. Possible values are "html", "txt", "docx", or "pdf".</returns>
        public static string FormatToString(TemplateFormat format) =>
            format switch
            {
                TemplateFormat.Html => "html",
                TemplateFormat.Txt => "txt",
                TemplateFormat.Docx => "docx",
                TemplateFormat.Pdf => "pdf",
                _ => "html"
            };
        /// <summary>
        /// Returns the MIME content type string corresponding to the specified template format.
        /// </summary>
        /// <param name="format">The template format for which to retrieve the MIME content type. Must be a valid value of <see
        /// cref="TemplateFormat"/>.</param>
        /// <returns>A string representing the MIME content type for the given format. Returns "application/octet-stream" if the
        /// format is not recognized.</returns>
        public static string GetContentTypeByFormat(TemplateFormat format) =>
            format switch
            {
                TemplateFormat.Html => "text/html",
                TemplateFormat.Txt => "text/plain",
                TemplateFormat.Docx => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                TemplateFormat.Pdf => "application/pdf",
                _ => "application/octet-stream"
            };
    }
}