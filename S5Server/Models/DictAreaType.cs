using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Тип Напрямку ЛБЗ
    /// </summary>
    [Table("dict_area_type")]
    public class DictAreaType : ShortDictBase, IShortDictBase
    {
        [ValidateNever]
        public List<DictUnitTask> UnitTasks { get; set; } = [];
        [ValidateNever]
        public List<DictArea> Areas { get; set; } = [];
    }
}
