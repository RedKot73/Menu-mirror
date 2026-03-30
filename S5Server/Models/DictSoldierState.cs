using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models
{
    /// <summary>
    /// Статус бійця
    /// </summary>
    [Table("dict_soldier_state"), Display(Name = Caption)]
    public class DictSoldierState : SimpleDictBase, ISimpleDict
    {
        /// <summary>
        /// Текстовий заголовок для статусу бійця.
        /// </summary>
        public const string Caption = "Статус бійця";
    }
}
