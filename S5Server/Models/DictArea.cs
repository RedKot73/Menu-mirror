using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для Району виконання завдань (РВЗ)
/// </summary>
/// <param name="Id">Унікальний ідентифікатор</param>
/// <param name="Value">Назва</param>
/// <param name="Comment">Коментар</param>
/// <param name="AreaTypeId">Ідентифікатор типу Району виконання завдань (РВЗ)</param>
/// <param name="AreaType">Тип Району виконання завдань (РВЗ)</param>
/// <param name="Coords">Координати/Перелік координат РВЗ</param>
/// <param name="CityCodeInfo">Запис Кодифікатору адміністративно-територіальних одиниць</param>
public record DictAreaDto(
    Guid Id,
    string Value,
    string? Comment,
    Guid AreaTypeId,
    string AreaType,
    string? Coords,
    CityCodeInfo? CityCodeInfo);

/// <summary>
/// DTO для створення Району виконання завдань (РВЗ)
/// </summary>
/// <param name="Value">Назва</param>
/// <param name="Comment">Коментар</param>
/// <param name="AreaTypeId">Тип Району виконання завдань (РВЗ)</param>
/// <param name="CityCodeId">Кодифікатор адмін-територіальних одиниць (опціонально). Формат: UA01020000000022387</param>
/// <param name="Coords">Координати/Перелік координат РВЗ</param>
public record DictAreaCreateDto(
    string Value,
    string? Comment,
    Guid AreaTypeId,
    string? CityCodeId,
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
    public Guid AreaTypeId { get; set; } = default!;

    /// <summary>
    /// Тип Району виконання завдань (РВЗ)
    /// </summary>
    [ValidateNever]
    public DictAreaType AreaType { get; set; } = default!;

    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// Тут саме string оскільки формат UA01020000000022387
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
    /// <summary>
    /// Gets or sets the collection of unit areas associated with the current instance.
    /// </summary>
    public List<UnitAreas> Units { get; set; } = [];
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
            area.Coords,
            // ✅ Створюємо вкладений record
            area.CityCode?.ToCityCodeInfo());

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
            CityCodeId = dto.CityCodeInfo?.CityCodeId,
            Coords = string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim()
        };

    /// <summary>
    /// Створює новий екземпляр DictArea з CreateDTO
    /// </summary>
    public static DictArea ToEntity(this DictAreaCreateDto dto) =>
        new()
        {
            Id = Guid.CreateVersion7(),
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
        area.CityCodeId = dto.CityCodeInfo?.CityCodeId;
        area.Coords = string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim();
    }

    /// <summary>
    /// Перевіряє, чи дані в сутності DictArea співпадають з даними в DTO
    /// </summary>
    public static bool IsEqualTo(this DictArea area, DictAreaDto dto)
    {
        return area.Value == dto.Value.Trim() &&
               area.Comment == (string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim()) &&
               area.AreaTypeId == dto.AreaTypeId &&
               area.CityCodeId == dto.CityCodeInfo?.CityCodeId &&
               area.Coords == (string.IsNullOrWhiteSpace(dto.Coords) ? null : dto.Coords.Trim());
    }
    /// <summary>
    /// Converts a DictArea instance to a LookupDto for use in lookup scenarios.
    /// </summary>
    /// <param name="area">The DictArea object to convert. Cannot be null.</param>
    /// <returns>A LookupDto containing the identifier and value from the specified DictArea.</returns>
    public static LookupDto ToLookupDto(this DictArea area)
    {
        return new LookupDto(area.Id, area.Value);
    }
}