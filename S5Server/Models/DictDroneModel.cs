using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    public record DictDroneModelDto(
        string Id,
        string Value,
        string? Comment,
        string DroneTypeId,
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
        string DroneTypeId);

    /// <summary>
    /// Модель БПЛА
    /// </summary>
    [Table("dict_drone_model")]
    public class DictDroneModel : SimpleDictBase, ISimpleDict
    {
        [Required]
        public string DroneTypeId { get; set; } = default!;
        [Required]
        public DictDroneType DroneType { get; set; } = default!;
    }
}
