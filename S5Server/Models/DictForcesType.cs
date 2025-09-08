using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    /// <summary>
    /// Вид збройних сил Сухопутні, ДШВ, ВМС...
    /// </summary>
    [Display(Name = Caption)]
    public class DictForcesType : ShortDictBase, IShortDictBase
    {
        public const string Caption = "Вид збройних сил";
    }
}
