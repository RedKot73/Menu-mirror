using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачі даних про модель БПЛА.
    /// </summary>
    /// <param name="Id">Унікальний ідентифікатор.</param>
    /// <param name="Value">Назва моделі.</param>
    /// <param name="Comment">Коментар.</param>
    /// <param name="DroneTypeId">ID типу БПЛА.</param>
    /// <param name="DroneTypeName">Назва типу БПЛА.</param>
    public record DictDroneModelDto(
        Guid Id,
        string Value,
        string? Comment,
        Guid DroneTypeId,
        string DroneTypeName)
    {
        /// <summary>
        /// Перетворює сутність моделі БПЛА в DTO.
        /// </summary>
        public static DictDroneModelDto ToDto(DictDroneModel e) =>
            new(
                e.Id,
                e.Value,
                e.Comment,
                e.DroneTypeId,
                e.DroneType?.ShortValue ?? e.DroneType?.Value ?? string.Empty);

        /// <summary>
        /// Оновлює сутність моделі БПЛА даними з DTO.
        /// </summary>
        public static void ApplyDto(DictDroneModel e, DictDroneModelDto dto)
        {
            e.Value = dto.Value.Trim();
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
            e.DroneTypeId = dto.DroneTypeId;
        }
    }

    /// <summary>
    /// DTO для створення нової моделі БПЛА.
    /// </summary>
    /// <param name="Value">Назва моделі.</param>
    /// <param name="Comment">Коментар.</param>
    /// <param name="DroneTypeId">ID типу БПЛА.</param>
    public record DictDroneModelCreateDto(
        string Value,
        string? Comment,
        Guid DroneTypeId);

    /// <summary>
    /// Модель БПЛА.
    /// </summary>
    [Table("dict_drone_model")]
    public class DictDroneModel : SimpleDictBase, ISimpleDict
    {
        /// <summary>
        /// ID типу БПЛА, до якого належить модель.
        /// </summary>
        [Required]
        public Guid DroneTypeId { get; set; } = default!;
        
        /// <summary>
        /// Тип БПЛА для завантаження навігаційної властивості.
        /// </summary>
        [Required]
        public DictDroneType DroneType { get; set; } = default!;
    }
}
