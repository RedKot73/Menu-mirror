using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для DroneModelTask
/// </summary>
public record DroneModelTaskDto(
    string Id,
    string UnitTaskId,
    string DroneModelId,
    string DroneModelValue,
    int Quantity);

/// <summary>
/// DTO для створення DroneModelTask
/// </summary>
public record DroneModelTaskCreateDto(
    string UnitTaskId,
    string DroneModelId,
    int Quantity = 1);

/// <summary>
/// DTO для оновлення DroneModelTask
/// </summary>
public record DroneModelTaskUpdateDto(
    string DroneModelId,
    int Quantity);

/// <summary>
/// Модель БПЛА (для завдань підрозділів)
/// </summary>
[Table("drone_model_task")]
public class DroneModelTask
{
    [Key]
    [StringLength(36)]
    public string Id { get; set; } = Guid.NewGuid().ToString("D");

    /// <summary>
    /// Завдання підрозділу
    /// </summary>
    [Required]
    [StringLength(36)]
    public string UnitTaskId { get; set; } = default!;

    /// <summary>
    /// Завдання підрозділу
    /// </summary>
    [ValidateNever]
    public UnitTask UnitTask { get; set; } = default!;

    /// <summary>
    /// Модель БПЛА
    /// </summary>
    [Required]
    [StringLength(36)]
    public string DroneModelId { get; set; } = default!;

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
            entity.DroneModel?.Value ?? string.Empty,
            entity.Quantity);

    /// <summary>
    /// Створює DroneModelTask з CreateDto
    /// </summary>
    public static DroneModelTask FromCreateDto(this DroneModelTaskCreateDto dto) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
            UnitTaskId = dto.UnitTaskId,
            DroneModelId = dto.DroneModelId,
            Quantity = dto.Quantity
        };

    /// <summary>
    /// Оновити поля з UpdateDto
    /// </summary>
    public static void UpdateFrom(this DroneModelTask entity, DroneModelTaskUpdateDto dto)
    {
        entity.DroneModelId = dto.DroneModelId;
        entity.Quantity = dto.Quantity;
    }

    /// <summary>
    /// Перевірка чи змінились дані
    /// </summary>
    public static bool EqualsDto(this DroneModelTask entity, DroneModelTaskUpdateDto dto) =>
        entity.DroneModelId == dto.DroneModelId &&
        entity.Quantity == dto.Quantity;
}
