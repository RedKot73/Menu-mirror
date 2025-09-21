using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models
{
    /// <summary>
    /// Вид збройних сил Сухопутні, ДШВ, ВМС...
    /// </summary>
    [Table("dict_forces_type")]
    public class DictForcesType : ShortDictBase, IShortDictBase
    {
    }
}
