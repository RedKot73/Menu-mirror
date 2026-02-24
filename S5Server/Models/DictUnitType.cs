using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace S5Server.Models
{
    public record DictUnitTypeDto(
        Guid Id,
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
    }
}
