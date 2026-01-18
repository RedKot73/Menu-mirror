using System.ComponentModel.DataAnnotations;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// Напрямок ЛБЗ
/// </summary>
public partial class DictArea : SimpleDictBase, ISimpleDict
{
    /// <summary>
    /// Тип Напрямку ЛБЗ
    /// </summary>
    [Required]
    public string AreaTypeId { get; set; } = default!;
    /// <summary>
    /// Тип Напрямку ЛБЗ
    /// </summary>
    [ValidateNever]
    public DictAreaType AreaType { get; set; } = default!;
}