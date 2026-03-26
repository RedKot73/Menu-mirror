using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    /// <param name="Id">Ідентифікатор</param>
    /// <param name="Value">Назва</param>
    /// <param name="Comment">Коментар</param>
    /// <param name="Amount">Сума (грн)</param>
    /// <param name="WithMeans">True - треба вказати засоби (БПЛА)</param>
    /// <param name="AreaTypeId">Тип Напрямку ЛБЗ (ідентифікатор)</param>
    /// <param name="AreaType">Тип Напрямку ЛБЗ (назва)</param>
    public record DictUnitTaskDto(
        Guid Id,
        string Value,
        string? Comment,
        decimal Amount,
        bool WithMeans,
        Guid AreaTypeId,
        string AreaType);

    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    /// <param name="Value">Назва</param>
    /// <param name="Comment">Коментар</param>
    /// <param name="Amount">Сума (грн)</param>
    /// <param name="AreaTypeId">Тип Напрямку ЛБЗ</param>
    /// <param name="WithMeans">True - треба вказати засоби (БПЛА)</param>
    public record DictUnitTaskCreateDto(
        string Value,
        string? Comment,
        decimal Amount,
        Guid AreaTypeId,
        bool WithMeans = false
        );

    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    [Table("dict_unit_task")]
    public class DictUnitTask
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity.
        /// </summary>
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        /// <summary>
        /// Назва
        /// </summary>
        [StringLength(100), Required]
        public string Value { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets an optional comment associated with the entity.
        /// </summary>
        /// <remarks>The comment is limited to a maximum of 250 characters. This property can be null if
        /// no comment is provided.</remarks>
        [StringLength(250)]
        public string? Comment { get; set; }

        /// <summary>
        /// Сума (грн)
        /// </summary>
        [Required]
        [Column(TypeName = "numeric(18, 2)")]
        public decimal Amount { get; set; }

        /// <summary>
        /// Чи використовуються в завданні засоби ураження
        /// </summary>
        public bool WithMeans { get; set; } = false;

        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        [Required]
        public Guid AreaTypeId { get; set; } = default!;
        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        [ValidateNever]
        public DictAreaType AreaType { get; set; } = default!;
        /// <summary>
        /// Завдання прив"язані до Категорії шаблона документа
        /// </summary>
        [ValidateNever]
        public List<DictUnitTaskItem> UnitTaskItems { get; set; } = [];
        /// <summary>
        /// Напрямки ЛБЗ, відфільтровані по AreaType
        /// </summary>
        [ValidateNever, NotMapped]
        public List<DictArea> Areas { get; set; } = [];
    }


    /// <summary>
    /// Методи розширення для роботи з DictUnitTask
    /// </summary>
    public static class DictUnitTaskExtensions
    {
        /// <summary>
        /// Конвертує DictUnitTask у DTO
        /// </summary>
        public static DictUnitTaskDto ToDto(this DictUnitTask unitTask) =>
            new(
                unitTask.Id,
                unitTask.Value,
                unitTask.Comment,
                unitTask.Amount,
                unitTask.WithMeans,
                unitTask.AreaTypeId,
                unitTask.AreaType.ShortValue);

        /// <summary>
        /// Створює новий екземпляр DictUnitTask з DTO
        /// </summary>
        public static DictUnitTask ToEntity(this DictUnitTaskDto dto) =>
            new()
            {
                Id = dto.Id,
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                Amount = dto.Amount,
                WithMeans = dto.WithMeans,
                AreaTypeId = dto.AreaTypeId
            };

        /// <summary>
        /// Створює новий екземпляр DictUnitTask з CreateDTO
        /// </summary>
        public static DictUnitTask ToEntity(this DictUnitTaskCreateDto dto) =>
            new()
            {
                Id = Guid.CreateVersion7(),
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                Amount = dto.Amount,
                WithMeans = dto.WithMeans,
                AreaTypeId = dto.AreaTypeId
            };

        /// <summary>
        /// Застосовує дані з DTO до існуючої сутності DictUnitTask
        /// </summary>
        public static void ApplyDto(this DictUnitTask unitTask, DictUnitTaskDto dto)
        {
            unitTask.Value = dto.Value.Trim();
            unitTask.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
            unitTask.Amount = dto.Amount;
            unitTask.WithMeans = dto.WithMeans;
            unitTask.AreaTypeId = dto.AreaTypeId;
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності DictUnitTask співпадають з даними в DTO
        /// </summary>
        public static bool IsEqualTo(this DictUnitTask unitTask, DictUnitTaskDto dto)
        {
            return unitTask.Value == dto.Value.Trim() &&
                   unitTask.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()) &&
                   unitTask.Amount == dto.Amount &&
                   unitTask.WithMeans == dto.WithMeans &&
                   unitTask.AreaTypeId == dto.AreaTypeId;
        }
        /// <summary>
        /// Конвертує у LookupDto для випадаючих списків
        /// </summary>
        public static LookupDto ToLookupDto(this DictUnitTask unitTask) =>
            new(unitTask.Id, $"{unitTask.Value} ({unitTask.AreaType.ShortValue})");
    }
}