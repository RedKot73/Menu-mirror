using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models;

/// <summary>
/// DTO для передачі даних про військове звання.
/// </summary>
/// <param name="Id">Унікальний ідентифікатор.</param>
/// <param name="Value">Повна назва звання.</param>
/// <param name="ShortValue">Скорочена назва звання.</param>
/// <param name="Comment">Коментар.</param>
/// <param name="NatoCode">Код НАТО.</param>
/// <param name="Category">Категорія.</param>
/// <param name="SubCategory">Підкатегорія.</param>
/// <param name="OrderVal">Порядок сортування.</param>
public record DictRankDto(
    Guid Id,
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);

/// <summary>
/// DTO для створення нового військового звання.
/// </summary>
/// <param name="Value">Повна назва звання.</param>
/// <param name="ShortValue">Скорочена назва звання.</param>
/// <param name="Comment">Коментар.</param>
/// <param name="NatoCode">Код НАТО.</param>
/// <param name="Category">Категорія.</param>
/// <param name="SubCategory">Підкатегорія.</param>
/// <param name="OrderVal">Порядок сортування.</param>
public record DictRankCreateDto(
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);

/// <summary>
/// Довідник Військове звання.
/// </summary>
[Table("dict_rank"),
 Comment("Військове звання")]
public class DictRank : ShortDictBase, IShortDictBase
{
    /// <summary>
    /// Відповідник коду НАТО.
    /// </summary>
    [Display(Name = "Відповідник НАТО")]
    public string? NATOCode { get; set; }

    /// <summary>
    /// Категорія звання.
    /// </summary>
    [Display(Name = "Категорія")]
    public string? Category { get; set; }

    /// <summary>
    /// Підкатегорія звання.
    /// </summary>
    [Display(Name = "Під категорія")]
    public string? SubCategory { get; set; }

    /// <summary>
    /// Значення для порядку сортування.
    /// </summary>
    [Display(Name = "Порядок сортування")]
    public int OrderVal { get; set; } = 1;
}
