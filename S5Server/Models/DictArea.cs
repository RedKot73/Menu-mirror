using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для Району виконання завдань (РВЗ)
/// </summary>
public record DictAreaDto(
    string Id,
    /// <summary>
    /// Назва
    /// </summary>
    string Value,
    string? Comment,
    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    string AreaTypeId,
    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    string AreaType);

/// <summary>
/// DTO для створення Району виконання завдань (РВЗ)
/// </summary>
public record DictAreaCreateDto(
    string Value,
    string? Comment,
    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    string AreaTypeId);

/// <summary>
/// Район виконання завдань (РВЗ)
/// </summary>
[Table("dict_area")]
public partial class DictArea : SimpleDictBase, ISimpleDict
{
    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    [Required]
    public string AreaTypeId { get; set; } = default!;

    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    [ValidateNever]
    public DictAreaType AreaType { get; set; } = default!;
}

/// <summary>
/// Методи розширення для роботи з DictArea
/// </summary>
public static class DictAreaExtensions
{
    /// <summary>
    /// Конвертує DictArea у DTO
    /// </summary>
    public static DictAreaDto ToDto(this DictArea area) =>
        new(
            area.Id,
            area.Value,
            area.Comment,
            area.AreaTypeId,
            area.AreaType?.ShortValue ?? area.AreaType?.Value ?? string.Empty);

    /// <summary>
    /// Створює новий екземпляр DictArea з DTO
    /// </summary>
    public static DictArea ToEntity(this DictAreaDto dto) =>
        new()
        {
            Id = dto.Id,
            Value = dto.Value.Trim(),
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
            AreaTypeId = dto.AreaTypeId
        };

    /// <summary>
    /// Створює новий екземпляр DictArea з CreateDTO
    /// </summary>
    public static DictArea ToEntity(this DictAreaCreateDto dto) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
            Value = dto.Value.Trim(),
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
            AreaTypeId = dto.AreaTypeId
        };

    /// <summary>
    /// Застосовує дані з DTO до існуючої сутності DictArea
    /// </summary>
    public static void ApplyDto(this DictArea area, DictAreaDto dto)
    {
        area.Value = dto.Value.Trim();
        area.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        area.AreaTypeId = dto.AreaTypeId;
    }

    /// <summary>
    /// Перевіряє, чи дані в сутності DictArea співпадають з даними в DTO
    /// </summary>
    public static bool EqualsDto(this DictArea area, DictAreaDto dto)
    {
        return area.Value == dto.Value.Trim() &&
               area.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()) &&
               area.AreaTypeId == dto.AreaTypeId;
    }
}