using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    public interface ISimpleDict
    {
        string Id { get; set; }
        string Value { get; set; }
        string? Comment { get; set; }
    }

    public abstract class SimpleDictBase : ISimpleDict
    {
        // 36 символов формата 8-4-4-4-12 (GUID "D"). Если допускаете иные строки, можно убрать атрибут.
        [Key]
        [StringLength(36)]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");

        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = string.Empty;

        [StringLength(250)]
        public string? Comment { get; set; }
    }

    public interface IShortDictBase
    {
        string ShortValue { get; set; }
    }

    public class ShortDictBase : SimpleDictBase, IShortDictBase
    {
        [StringLength(50), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string ShortValue { get; set; } = string.Empty;
    }
}