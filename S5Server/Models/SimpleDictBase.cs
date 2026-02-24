using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    // DTO для внешнего API
    public record SimpleDictDto(
        [Required] Guid Id,
        [Required, StringLength(100)] string Value,
        string? Comment)
    {
    }

    public record SimpleDictCreateDto(
        [Required, StringLength(100)] string Value,
        string? Comment);


    public interface ISimpleDict
    {
        Guid Id { get; set; }
        string Value { get; set; }
        string? Comment { get; set; }
    }

    public abstract class SimpleDictBase : ISimpleDict
    {
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Comment { get; set; }
    }

    public interface IShortDictBase
    {
        string ShortValue { get; set; }
    }

    /// <summary>
    /// DTO для справочников с ShortValue
    /// </summary>
    public record ShortDictDto(
        [Required] Guid Id,
        [Required, StringLength(100)] string Value,
        [Required, StringLength(50)] string ShortValue,
        string? Comment);
    public record ShortDictCreateDto(
        [Required, StringLength(100)] string Value,
        [Required, StringLength(50)] string ShortValue,
        string? Comment);

    public class ShortDictBase : SimpleDictBase, IShortDictBase
    {
        [StringLength(50), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string ShortValue { get; set; } = string.Empty;
    }

    /// <summary>
    /// Методи розширення для роботи з SimpleDictBase
    /// </summary>
    public static class SimpleDictExtensions
    {
        /// <summary>
        /// Конвертує SimpleDictBase у DTO
        /// </summary>
        public static SimpleDictDto ToDto(this SimpleDictBase entity) =>
            new(
                entity.Id,
                entity.Value,
                entity.Comment);

        /// <summary>
        /// Створює новий екземпляр SimpleDictBase з DTO (використовується для конкретних типів)
        /// </summary>
        public static T ToEntity<T>(this SimpleDictDto dto) where T : SimpleDictBase, new() =>
            new()
            {
                Id = dto.Id,
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()
            };

        /// <summary>
        /// Створює новий екземпляр SimpleDictBase з CreateDTO
        /// </summary>
        public static T ToEntity<T>(this SimpleDictCreateDto dto) where T : SimpleDictBase, new() =>
            new()
            {
                Id = Guid.CreateVersion7(),
                Value = dto.Value.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()
            };

        /// <summary>
        /// Застосовує дані з DTO до існуючої сутності SimpleDictBase
        /// </summary>
        public static void ApplyDto(this SimpleDictBase entity, SimpleDictDto dto)
        {
            entity.Value = dto.Value.Trim();
            entity.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності SimpleDictBase співпадають з даними в DTO
        /// </summary>
        public static bool IsEqualTo(this SimpleDictBase entity, SimpleDictDto dto)
        {
            return entity.Value == dto.Value.Trim() &&
                   entity.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim());
        }
    }

    /// <summary>
    /// Методи розширення для роботи з ShortDictBase
    /// </summary>
    public static class ShortDictExtensions
    {
        /// <summary>
        /// Конвертує ShortDictBase у DTO
        /// </summary>
        public static ShortDictDto ToDto(this ShortDictBase entity) =>
            new(
                entity.Id,
                entity.Value,
                entity.ShortValue,
                entity.Comment);

        /// <summary>
        /// Створює новий екземпляр ShortDictBase з DTO
        /// </summary>
        public static T ToEntity<T>(this ShortDictDto dto) where T : ShortDictBase, new() =>
            new()
            {
                Id = dto.Id,
                Value = dto.Value.Trim(),
                ShortValue = dto.ShortValue.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()
            };

        /// <summary>
        /// Створює новий екземпляр ShortDictBase з CreateDTO
        /// </summary>
        public static T ToEntity<T>(this ShortDictCreateDto dto) where T : ShortDictBase, new() =>
            new()
            {
                Id = Guid.CreateVersion7(),
                Value = dto.Value.Trim(),
                ShortValue = dto.ShortValue.Trim(),
                Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()
            };

        /// <summary>
        /// Застосовує дані з DTO до існуючої сутності ShortDictBase
        /// </summary>
        public static void ApplyDto(this ShortDictBase entity, ShortDictDto dto)
        {
            entity.Value = dto.Value.Trim();
            entity.ShortValue = dto.ShortValue.Trim();
            entity.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності ShortDictBase співпадають з даними в DTO
        /// </summary>
        public static bool IsEqualTo(this ShortDictBase entity, ShortDictDto dto)
        {
            return entity.Value == dto.Value.Trim() &&
                   entity.ShortValue == dto.ShortValue.Trim() &&
                   entity.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim());
        }
    }
}