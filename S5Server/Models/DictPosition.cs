using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    /// <summary>
    /// Посада
    /// </summary>
    [Display(Name = Caption)]
    public class DictPosition : SimpleDictBase, ISimpleDict
    {
        public const string Caption = "Посада";
    }
}