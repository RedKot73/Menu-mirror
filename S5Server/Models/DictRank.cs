using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models;

public record DictRankDto(
    Guid Id,
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);
public record DictRankCreateDto(
    string Value,
    string ShortValue,
    string? Comment,
    string? NatoCode,
    string? Category,
    string? SubCategory,
    int OrderVal);

/// <summary>
/// Довідник Військове звання
/// </summary>
[Table("dict_rank"),
 Comment("Військове звання")]
public class DictRank : ShortDictBase, IShortDictBase
{
    [Display(Name = "Відповідник НАТО")]
    public string? NATOCode { get; set; }

    [Display(Name = "Категорія")]
    public string? Category { get; set; }

    [Display(Name = "Під категорія")]
    public string? SubCategory { get; set; }

    [Display(Name = "Порядок сортування")]
    public int OrderVal { get; set; } = 1;
}
