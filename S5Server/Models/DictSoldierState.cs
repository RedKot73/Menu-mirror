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
        public const string Caption = "Статус бійця";
    }
}
