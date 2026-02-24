using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Опис Завдання прив"язаний до Категорії шаблона документа
    /// </summary>
    public record DictUnitTaskItemDto(
        Guid Id,
        string Value,
        string? Comment,
        Guid TemplateCategoryId,
        string TemplateCategory,
        Guid UnitTaskId);

    public record DictUnitTaskItemCreateDto(
        string Value,
        string? Comment,
        Guid TemplateCategoryId,
        Guid UnitTaskId);

    /// <summary>
    /// Опис Завдання прив"язаний до Категорії шаблона документа
    /// </summary>
    [Table("dict_unit_task_item")]
    public class DictUnitTaskItem : SimpleDictBase, ISimpleDict
    {
        /// <summary>
        /// Категория шаблона документа
        /// </summary>
        [Required]
        public Guid TemplateCategoryId { get; set; } = default!;
        /// <summary>
        /// Категория шаблона документа
        /// </summary>
        [ValidateNever]
        public DictTemplateCategory TemplateCategory { get; set; } = default!;
        /// <summary>
        /// Завдання підрозділу для використання в документах БР/БД
        /// </summary>
        [Required]
        public Guid UnitTaskId { get; set; } = default!;
        /// <summary>
        /// Завдання підрозділу для використання в документах БР/БД
        /// </summary>
        [ValidateNever]
        public DictUnitTask UnitTask { get; set; } = default!;
    }

    /// <summary>
    /// Методи розширення для роботи з DictUnitTaskItem
    /// </summary>
    public static class DictUnitTaskItemExtensions
    {
        /// <summary>
        /// Конвертує DictUnitTaskItem у DTO
        /// </summary>
        public static DictUnitTaskItemDto ToDto(this DictUnitTaskItem item) =>
            new(
                item.Id,
                item.Value,
                item.Comment,
                item.TemplateCategoryId,
                item.TemplateCategory.Value,
                item.UnitTaskId);

        /// <summary>
        /// Створює новий екземпляр DictUnitTaskItem з DTO
        /// </summary>
        public static DictUnitTaskItem ToEntity(this DictUnitTaskItemDto dto) =>
            new()
            {
                Id = dto.Id,
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                TemplateCategoryId = dto.TemplateCategoryId,
                UnitTaskId = dto.UnitTaskId
            };

        /// <summary>
        /// Створює новий екземпляр DictUnitTaskItem з CreateDTO
        /// </summary>
        public static DictUnitTaskItem ToEntity(this DictUnitTaskItemCreateDto dto) =>
            new()
            {
                Id = Guid.CreateVersion7(),
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
                TemplateCategoryId = dto.TemplateCategoryId,
                UnitTaskId = dto.UnitTaskId
            };

        /// <summary>
        /// Застосовує дані з DTO до існуючої сутності DictUnitTaskItem
        /// </summary>
        public static void ApplyDto(this DictUnitTaskItem item, DictUnitTaskItemDto dto)
        {
            item.Value = dto.Value.Trim();
            item.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
            item.TemplateCategoryId = dto.TemplateCategoryId;
            item.UnitTaskId = dto.UnitTaskId;
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності DictUnitTaskItem співпадають з даними в DTO
        /// </summary>
        public static bool IsEqualTo(this DictUnitTaskItem item, DictUnitTaskItemDto dto)
        {
            return item.Value == dto.Value.Trim() &&
                   item.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()) &&
                   item.TemplateCategoryId == dto.TemplateCategoryId &&
                   item.UnitTaskId == dto.UnitTaskId;
        }
    }
}
