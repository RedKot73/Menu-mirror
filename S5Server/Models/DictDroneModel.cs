using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    public record DictDroneModelDto(
        Guid Id,
        string Value,
        string? Comment,
        Guid DroneTypeId,
        string DroneTypeName)
    {
        public static DictDroneModelDto ToDto(DictDroneModel e) =>
            new(
                e.Id,
                e.Value,
                e.Comment,
                e.DroneTypeId,
                e.DroneType?.ShortValue ?? e.DroneType?.Value ?? string.Empty);

        public static void ApplyDto(DictDroneModel e, DictDroneModelDto dto)
        {
            e.Value = dto.Value.Trim();
            e.Comment = string.IsNullOrWhiteSpace(dto.Comment) ? null : dto.Comment.Trim();
            e.DroneTypeId = dto.DroneTypeId;
        }
    }

    public record DictDroneModelCreateDto(
        string Value,
        string? Comment,
        Guid DroneTypeId);

    /// <summary>
    /// Модель БПЛА
    /// </summary>
    [Table("dict_drone_model")]
    public class DictDroneModel : SimpleDictBase, ISimpleDict
    {
        [Required]
        public Guid DroneTypeId { get; set; } = default!;
        [Required]
        public DictDroneType DroneType { get; set; } = default!;
    }
}
