using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace S5Server.Models
{
    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    [Table("dict_unit_type"), Display(Name = Caption)]
    public class DictUnitType : ShortDictBase, IShortDictBase
    {
        public const string Caption = "Тип підрозділу";
    }
}
