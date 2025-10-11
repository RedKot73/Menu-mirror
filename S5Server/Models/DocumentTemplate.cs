using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
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

        /*
         * FileName — это не путь к внешнему файлу. 
         * Это «оригинальное имя» загруженного файла (для UI и имени скачивания). 
         * Мы его показываем пользователю и используем 
         * при формировании имени экспортируемого файла.
        [StringLength(250), Required]
        public string FileName { get; set; } = string.Empty;
        */

        [StringLength(50), Required]
        public string ContentType { get; set; } = string.Empty; // e.g. text/html, text/plain, application/vnd.openxmlformats-officedocument.wordprocessingml.document

        [StringLength(10), Required]
        public string Format { get; set; } = "html"; // html|txt|docx

        [Required]
        public byte[] Content { get; set; } = [];

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

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    }
}