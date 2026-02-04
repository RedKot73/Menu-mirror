using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    public record DictUnitTaskDto(
        string Id,
        /// <summary>
        /// Назва
        /// </summary>
        string Value,
        string? Comment,
        /// <summary>
        /// Сума (грн)
        /// </summary>
        decimal Amount,
        /// <summary>
        /// True - треба вказати засоби (БПЛА)
        /// </summary>
        bool WithMeans,
        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        string AreaTypeId,
        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        string AreaType);

    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    public record DictUnitTaskCreateDto(
        string Value,
        string? Comment,
        decimal Amount,
        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        string AreaTypeId,
        bool WithMeans = false
        );

    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    [Table("dict_unit_task")]
    public class DictUnitTask
    {
        [Key]
        [StringLength(36)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        /// <summary>
        /// Назва
        /// </summary>
        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Comment { get; set; }

        /// <summary>
        /// Сума (грн)
        /// </summary>
        [Required]
        public decimal Amount { get; set; }

        /// <summary>
        /// Чи використовуються в завданні засоби ураження
        /// </summary>
        public bool WithMeans { get; set; } = false;

        /// <summary>
        /// Тип Напрямку ЛБЗ
        /// </summary>
        [Required]
        public string AreaTypeId { get; set; } = default!;
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
                Id = Guid.NewGuid().ToString("D"),
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
        public static bool EqualsDto(this DictUnitTask unitTask, DictUnitTaskDto dto)
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