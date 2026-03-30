using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачі даних про тип підрозділу.
    /// </summary>
    /// <param name="Id">Унікальний ідентифікатор.</param>
    /// <param name="Value">Повна назва типу підрозділу.</param>
    /// <param name="ShortValue">Скорочена назва типу.</param>
    /// <param name="Comment">Коментар.</param>
    public record DictUnitTypeDto(
        Guid Id,
        string Value,
        string ShortValue,
        string? Comment);

    /// <summary>
    /// DTO для створення нового типу підрозділу.
    /// </summary>
    /// <param name="Value">Повна назва типу підрозділу.</param>
    /// <param name="ShortValue">Скорочена назва типу.</param>
    /// <param name="Comment">Коментар.</param>
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
