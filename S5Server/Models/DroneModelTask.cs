using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для DroneModelTask
/// </summary>
public record DroneModelTaskDto(
    Guid Id,
    Guid UnitTaskId,
    Guid DroneModelId,
    string DroneModelValue,
    string DroneTypeName,
    int Quantity);

/// <summary>
/// DTO для оновлення DroneModelTask
/// </summary>
public record DroneModelTaskUpSertDto(
    Guid UnitTaskId,
    Guid DroneModelId,
    int Quantity);
/// <summary>
/// Результат масового збереження/оновлення
/// </summary>
public record BulkSaveResult(
    bool Success,
    int Created,
    int Updated,
    int Deleted,
    int Total);

/// <summary>
/// Модель БПЛА (для завдань підрозділів)
/// </summary>
[Table("drone_model_task")]
public class DroneModelTask
{
    [Key]
    public Guid Id { get; set; } = Guid.CreateVersion7();

    /// <summary>
    /// Завдання підрозділу
    /// </summary>
    [Required]
    public Guid UnitTaskId { get; set; } = default!;

    /// <summary>
    /// Завдання підрозділу
    /// </summary>
    [ValidateNever]
    public UnitTask UnitTask { get; set; } = default!;

    /// <summary>
    /// Модель БПЛА
    /// </summary>
    [Required]
    public Guid DroneModelId { get; set; } = default!;

    /// <summary>
    /// Модель БПЛА
    /// </summary>
    [ValidateNever]
    public DictDroneModel DroneModel { get; set; } = default!;

    /// <summary>
    /// Кількість
    /// </summary>
    [Required]
    public int Quantity { get; set; } = 1;
}

/// <summary>
/// Extension-методи для DroneModelTask
/// </summary>
public static class DroneModelTaskExtensions
{
    /// <summary>
    /// Конвертує DroneModelTask у DTO
    /// </summary>
    public static DroneModelTaskDto ToDto(this DroneModelTask entity) =>
        new(
            entity.Id,
            entity.UnitTaskId,
            entity.DroneModelId,
            entity.DroneModel.Value ?? string.Empty,
            entity.DroneModel.DroneType.ShortValue ?? string.Empty,
            entity.Quantity);

    /// <summary>
    /// Створює DroneModelTask з CreateDto
    /// </summary>
    public static DroneModelTask FromCreateDto(this DroneModelTaskUpSertDto dto) =>
        new()
        {
            Id = Guid.CreateVersion7(),
            UnitTaskId = dto.UnitTaskId,
            DroneModelId = dto.DroneModelId,
            Quantity = dto.Quantity
        };

    /// <summary>
    /// Оновити поля з UpdateDto
    /// </summary>
    public static void UpdateFrom(this DroneModelTask entity, DroneModelTaskUpSertDto dto)
    {
        entity.DroneModelId = dto.DroneModelId;
        entity.Quantity = dto.Quantity;
    }

    /// <summary>
    /// Перевірка чи змінились дані
    /// </summary>
    public static bool IsEqualTo(this DroneModelTask entity, DroneModelTaskUpSertDto dto) =>
        entity.DroneModelId == dto.DroneModelId &&
        entity.Quantity == dto.Quantity;

    public static bool IsEqualTo(this List<DroneModelTask> means, List<DroneModelTaskUpSertDto> dto) =>
        means.Count == dto.Count &&
        !means.Where((t, i) => !t.IsEqualTo(dto[i])).Any();
}
