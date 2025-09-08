using System.ComponentModel.DataAnnotations;

namespace S5Server.Models;

/// <summary>
/// Напрямок ЛБЗ
/// </summary>
[Display(Name = Caption)]
public partial class DictArea : SimpleDictBase, ISimpleDict
{
    public const string Caption = "Напрямок ЛБЗ";
}