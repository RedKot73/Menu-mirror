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
    string AreaType,
    /// <summary>
    /// Кодифікатор адмін-територіальних одиниць (ID)
    /// </summary>
    string? CityCodeId,
    /// <summary>
    /// Кодифікатор адмін-територіальних одиниць (назва)
    /// </summary>
    string? CityCode,
    /// <summary>
    /// Координати/Перелік координат РВЗ
    /// </summary>
    string? Coords);

/// <summary>
/// DTO для створення Району виконання завдань (РВЗ)
/// </summary>
public record DictAreaCreateDto(
    string Value,
    string? Comment,
    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    string AreaTypeId,
    /// <summary>
    /// Кодифікатор адмін-територіальних одиниць (опціонально)
    /// </summary>
    string? CityCodeId,
    /// <summary>
    /// Координати/Перелік координат РВЗ
    /// </summary>
    string? Coords);

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

    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public string? CityCodeId { get; set; }
    
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    [ValidateNever]
    public DictCityCode? CityCode { get; set; }

    /// <summary>
    /// Координати/Перелік координат Району виконання завдань (РВЗ)
    /// </summary>
    public string? Coords { get; set; }
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
            area.AreaType?.ShortValue ?? area.AreaType?.Value ?? string.Empty,
            area.CityCodeId,
            area.CityCode?.Value,
            area.Coords);

    /// <summary>
    /// Створює новий екземпляр DictArea з DTO
    /// </summary>
    public static DictArea ToEntity(this DictAreaDto dto) =>
        new()
        {
            Id = dto.Id,
            Value = dto.Value.Trim(),
            Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim(),
            AreaTypeId = dto.AreaTypeId,
            CityCodeId = dto.CityCodeId,
            Coords = string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim()
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
            AreaTypeId = dto.AreaTypeId,
            CityCodeId = dto.CityCodeId,
            Coords = string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim()
        };

    /// <summary>
    /// Застосовує дані з DTO до існуючої сутності DictArea
    /// </summary>
    public static void ApplyDto(this DictArea area, DictAreaDto dto)
    {
        area.Value = dto.Value.Trim();
        area.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
        area.AreaTypeId = dto.AreaTypeId;
        area.CityCodeId = dto.CityCodeId;
        area.Coords = string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim();
    }

    /// <summary>
    /// Перевіряє, чи дані в сутності DictArea співпадають з даними в DTO
    /// </summary>
    public static bool EqualsDto(this DictArea area, DictAreaDto dto)
    {
        return area.Value == dto.Value.Trim() &&
               area.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()) &&
               area.AreaTypeId == dto.AreaTypeId &&
               area.CityCodeId == dto.CityCodeId &&
               area.Coords == (string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim());
    }

    public static LookupDto ToLookupDto(this DictArea area)
    {
        return new LookupDto(area.Id, area.Value);
    }
}