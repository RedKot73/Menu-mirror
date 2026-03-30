using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Тип Напрямку ЛБЗ: ППД,РВЗ,ТПУ,ПУ,РВБД,БРО
    /// </summary>
    [Table("dict_area_type")]
    public class DictAreaType : ShortDictBase, IShortDictBase
    {
        /// <summary>
        /// ID типу "ППД" (Пункт постійної дислокації) у довіднику типів РВЗ.
        /// </summary>
        public const string PPD_AREA_TYPE_GUID = "00000000-0000-0000-0000-000000000001";
        
        /// <summary>
        /// Список завдань підрозділу, пов'язаних з цим типом району.
        /// </summary>
        [ValidateNever]
        public List<DictUnitTask> UnitTasks { get; set; } = [];
        
        /// <summary>
        /// Список районів, що належать до цього типу.
        /// </summary>
        [ValidateNever]
        public List<DictArea> Areas { get; set; } = [];
    }
}
