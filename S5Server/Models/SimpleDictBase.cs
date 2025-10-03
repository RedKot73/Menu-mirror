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

    /// <summary>
    /// DTO для справочников с ShortValue
    /// </summary>
    public record ShortDictDto(string Id, string Value, string ShortValue, string? Comment);
    public record ShortDictCreateDto(string Value, string ShortValue, string? Comment);

    public class ShortDictBase : SimpleDictBase, IShortDictBase
    {
        [StringLength(50), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string ShortValue { get; set; } = string.Empty;

        public static ShortDictDto ToDto<T>(T e) where T: ShortDictBase  => new(e.Id, e.Value, e.ShortValue, e.Comment);
        public static void ApplyDto(ShortDictBase e, ShortDictDto dto)
        {
            e.Value = dto.Value.Trim();
            e.ShortValue = dto.ShortValue.Trim();
            e.Comment = dto.Comment?.Trim();
        }

    }
}