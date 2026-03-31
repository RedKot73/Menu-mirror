using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    // DTO для внешнего API
    /// <summary>
    /// Represents a simple dictionary entry for use in external APIs.
    /// </summary>
    /// <param name="Id">The unique identifier of the dictionary entry. Must not be empty.</param>
    /// <param name="Value">The display value or name of the dictionary entry. Cannot be null and must not exceed 100 characters.</param>
    /// <param name="Comment">An optional comment or description associated with the dictionary entry.</param>
    public record SimpleDictDto(
        [Required] Guid Id,
        [Required, StringLength(100)] string Value,
        string? Comment)
    {
    }
    /// <summary>
    /// Represents the data required to create a simple dictionary entry.
    /// </summary>
    /// <param name="Value">The value of the dictionary entry. Must not be null and cannot exceed 100 characters.</param>
    /// <param name="Comment">An optional comment providing additional information about the dictionary entry.</param>
    public record SimpleDictCreateDto(
        [Required, StringLength(100)] string Value,
        string? Comment);

    /// <summary>
    /// Represents a simple key-value dictionary entry with an identifier, value, and optional comment.
    /// </summary>
    public interface ISimpleDict
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity.
        /// </summary>
        Guid Id { get; set; }
        /// <summary>
        /// Gets or sets the string value associated with this instance.
        /// </summary>
        string Value { get; set; }
        /// <summary>
        /// Gets or sets an optional comment associated with the current object.
        /// </summary>
        string? Comment { get; set; }
    }
    /// <summary>
    /// Provides a base class for simple dictionary entities with an identifier, value, and optional comment.
    /// </summary>
    /// <remarks>This abstract class is intended to be inherited by concrete dictionary types that require a
    /// unique identifier and a value with optional descriptive comments. The class enforces maximum lengths for the
    /// value and comment properties to support data validation scenarios.</remarks>
    public abstract class SimpleDictBase : ISimpleDict
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity.
        /// </summary>
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();
        /// <summary>
        /// Gets or sets the string value associated with this property.
        /// </summary>
        [StringLength(100), Required]
        public string Value { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets an optional comment or note associated with the entity.
        /// </summary>
        /// <remarks>The comment is limited to a maximum of 250 characters. This property may be used to
        /// store user-provided remarks or additional information relevant to the entity.</remarks>
        [StringLength(250)]
        public string? Comment { get; set; }
    }
    /// <summary>
    /// Defines a contract for objects that expose a short string value.
    /// </summary>
    public interface IShortDictBase
    {
        /// <summary>
        /// Gets or sets the short string value associated with this instance.
        /// </summary>
        string ShortValue { get; set; }
    }

    /// <summary>
    /// Represents a short dictionary entry with an identifier, value, short value, and optional comment.
    /// </summary>
    /// <param name="Id">The unique identifier for the dictionary entry.</param>
    /// <param name="Value">The full value or description of the dictionary entry. Must not be null and cannot exceed 100 characters.</param>
    /// <param name="ShortValue">The abbreviated value or code for the dictionary entry. Must not be null and cannot exceed 50 characters.</param>
    /// <param name="Comment">An optional comment providing additional information about the dictionary entry, or null if not specified.</param>
    public record ShortDictDto(
        [Required] Guid Id,
        [Required, StringLength(100)] string Value,
        [Required, StringLength(50)] string ShortValue,
        string? Comment);
    /// <summary>
    /// Represents the data required to create a new short dictionary entry.
    /// </summary>
    /// <param name="Value">The full value of the dictionary entry. Must not be null and cannot exceed 100 characters.</param>
    /// <param name="ShortValue">The abbreviated or short form of the dictionary entry. Must not be null and cannot exceed 50 characters.</param>
    /// <param name="Comment">An optional comment providing additional information about the dictionary entry.</param>
    public record ShortDictCreateDto(
        [Required, StringLength(100)] string Value,
        [Required, StringLength(50)] string ShortValue,
        string? Comment);
    /// <summary>
    /// Represents a base class for dictionary entries that include a short string value.
    /// </summary>
    /// <remarks>This class provides a common structure for derived types that require a short value field,
    /// typically used for concise representations or codes. The maximum allowed length for the short value is 50
    /// characters.</remarks>
    public class ShortDictBase : SimpleDictBase, IShortDictBase
    {
        /// <summary>
        /// Gets or sets the short string value associated with this instance.
        /// </summary>
        [StringLength(50), Required]
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
        /// <typeparam name="T">Тип сутності, що наслідується від SimpleDictBase.</typeparam>
        /// <param name="dto">DTO з даними.</param>
        /// <returns>Новий екземпляр сутності.</returns>
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
        /// <typeparam name="T">Тип сутності, що наслідується від SimpleDictBase.</typeparam>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <returns>Новий екземпляр сутності.</returns>
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
        /// <typeparam name="T">Тип сутності, що наслідується від ShortDictBase.</typeparam>
        /// <param name="dto">DTO з даними.</param>
        /// <returns>Новий екземпляр сутності.</returns>
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
        /// <typeparam name="T">Тип сутності, що наслідується від ShortDictBase.</typeparam>
        /// <param name="dto">DTO з даними для створення.</param>
        /// <returns>Новий екземпляр сутності.</returns>
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