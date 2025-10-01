using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace S5Server.Models
{
    public record DictUnitTypeDto(
        string Id,
        string Value,
        string ShortValue,
        string? Comment);
    public record DictUnitTypeCreateDto(
        string Value,
        string ShortValue,
        string? Comment);


    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    [Table("dict_unit_type")]
    public class DictUnitType : ShortDictBase, IShortDictBase
    {
        public static DictUnitTypeDto ToDto(DictUnitType e) =>
            new(e.Id, e.Value, e.ShortValue, e.Comment);
        public static void ApplyDto(DictUnitType e, DictUnitTypeDto dto)
        {
            e.Value = dto.Value.Trim();
            e.ShortValue = dto.ShortValue.Trim();
            e.Comment = dto.Comment?.Trim();
        }
    }
}
