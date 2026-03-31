using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для передачі даних про використання БПЛА в завданні.
/// </summary>
/// <param name="Id">Унікальний ідентифікатор запису.</param>
/// <param name="UnitTaskId">ID завдання підрозділу.</param>
/// <param name="DroneModelId">ID моделі БПЛА.</param>
/// <param name="DroneModelValue">Назва моделі БПЛА.</param>
/// <param name="DroneTypeName">Назва типу БПЛА.</param>
/// <param name="Quantity">Кількість.</param>
public record DroneModelTaskDto(
    Guid Id,
    Guid UnitTaskId,
    Guid DroneModelId,
    string DroneModelValue,
    string DroneTypeName,
    int Quantity);

/// <summary>
/// DTO для створення або оновлення запису про використання БПЛА.
/// </summary>
/// <param name="UnitTaskId">ID завдання підрозділу.</param>
/// <param name="DroneModelId">ID моделі БПЛА.</param>
/// <param name="Quantity">Кількість.</param>
public record DroneModelTaskUpSertDto(
    Guid UnitTaskId,
    Guid DroneModelId,
    int Quantity);
/// <summary>
/// Результат операції масового збереження даних.
/// </summary>
/// <param name="Success">Ознака успішності операції.</param>
/// <param name="Created">Кількість створених записів.</param>
/// <param name="Updated">Кількість оновлених записів.</param>
/// <param name="Deleted">Кількість видалених записів.</param>
/// <param name="Total">Загальна кількість оброблених записів.</param>
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
    /// <summary>
    /// Унікальний ідентифікатор запису.
    /// </summary>
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

    /// <summary>
    /// Порівнює два списки засобів на відповідність даним у DTO.
    /// </summary>
    /// <param name="means">Список поточних засобів.</param>
    /// <param name="dto">Список нових даних.</param>
    /// <returns>True, якщо дані ідентичні.</returns>
    public static bool IsEqualTo(this List<DroneModelTask> means, List<DroneModelTaskUpSertDto> dto) =>
        means.Count == dto.Count &&
        !means.Where((t, i) => !t.IsEqualTo(dto[i])).Any();
}
