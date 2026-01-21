using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public record CityCodeCreateDto
    {
        public string? ParentId { get; set; }
        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        [Required]
        public string Level1 { get; set; } = string.Empty;
        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string Level2 { get; set; } = string.Empty;
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        public string Level3 { get; set; } = string.Empty;
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string Level4 { get; set; } = string.Empty;
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        public string LevelExt { get; set; } = string.Empty;
        /// <summary>
        /// Категорія об’єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальний статус
        /// «Р» – райони в областях та Автономній Республіці Крим
        /// «Н» – території територіальних громад
        ///     (назви територіальних громад) в областях,
        ///     територіальні громади Автономної Республіки Крим
        /// «М» – міста
        /// «Т» – селища міського типу
        /// «С» – села
        /// «Х» – селища
        /// «В» – райони в містах
        /// </summary>
        [Required]
        public string Category { get; set; } = default!;
        [Required]
        public string CategoryId { get; set; } = default!;
        /// <summary>
        /// Назва
        /// </summary>
        [Required]
        public string Value { get; set; } = default!;
    }
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public record CityCodeDto : CityCodeCreateDto
    {
        [Required]
        public string Id { get; set; } = default!;
    }

    /// <summary>
    /// Категорія об’єкта
    /// «О» – Автономна Республіка Крим, області
    /// «К» – міста, що мають спеціальний статус
    /// «Р» – райони в областях та Автономній Республіці Крим
    /// «Н» – території територіальних громад
    ///     (назви територіальних громад) в областях,
    ///     територіальні громади Автономної Республіки Крим
    /// «М» – міста
    /// «Т» – селища міського типу
    /// «С» – села
    /// «Х» – селища
    /// «В» – райони в містах
    /// </summary>
    [Table("dict_city_category")]
    public class DictCityCategory : ShortDictBase, IShortDictBase
    {
        [StringLength(1), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string CodeId { get; set; } = string.Empty;
        [NotMapped]
        public List<DictCityCode> CityCodes { get; set; } = [];
    }

    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    [Table("dict_city_code")]
    public class DictCityCode
    {
        public const string RootCityCode = "UA00000000000000000";

        [Key]
        [StringLength(36)]
        public string Id { get; set; } = string.Empty;//Guid.NewGuid().ToString("D");
        [StringLength(36)]
        public string? ParentId { get; set; }
        [ValidateNever]
        public DictCityCode Parent { get; set; } = default!;

        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        [Required]
        public string Level1 { get; set; } = string.Empty;
        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string Level2 { get; set; } = string.Empty;
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        public string Level3 { get; set; } = string.Empty;
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string Level4 { get; set; } = string.Empty;
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        public string LevelExt { get; set; } = string.Empty;

        /// <summary>
        /// Категорія об’єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальний статус
        /// «Р» – райони в областях та Автономній Республіці Крим
        /// «Н» – території територіальних громад
        ///     (назви територіальних громад) в областях,
        ///     територіальні громади Автономної Республіки Крим
        /// «М» – міста
        /// «Т» – селища міського типу
        /// «С» – села
        /// «Х» – селища
        /// «В» – райони в містах
        /// </summary>
        [Required]
        public string CategoryId { get; set; } = default!;
        /// <summary>
        /// Категорія об’єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальний статус
        /// «Р» – райони в областях та Автономній Республіці Крим
        /// «Н» – території територіальних громад
        ///     (назви територіальних громад) в областях,
        ///     територіальні громади Автономної Республіки Крим
        /// «М» – міста
        /// «Т» – селища міського типу
        /// «С» – села
        /// «Х» – селища
        /// «В» – райони в містах
        /// </summary>
        [ValidateNever]
        public DictCityCategory Category { get; set; } = default!;

        [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = string.Empty;
        [NotMapped]
        public List<DictCityCode> Childs { get; set; } = [];
    }

    /// <summary>
    /// Методи розширення для роботи з DictCityCode
    /// </summary>
    public static class DictCityCodeExtensions
    {
        /// <summary>
        /// Конвертує DictCityCode у DTO
        /// </summary>
        public static CityCodeDto ToDto(this DictCityCode cityCode) =>
            new()
            {
                Id = cityCode.Id,
                ParentId = cityCode.ParentId,
                Level1 = cityCode.Level1,
                Level2 = cityCode.Level2,
                Level3 = cityCode.Level3,
                Level4 = cityCode.Level4,
                LevelExt = cityCode.LevelExt,
                CategoryId = cityCode.CategoryId,
                Category = cityCode.Category.Value,
                Value = cityCode.Value
            };

        /// <summary>
        /// Створює новий екземпляр DictCityCode з DTO
        /// </summary>
        public static DictCityCode ToEntity(this CityCodeDto dto) =>
            new()
            {
                Id = dto.Id,
                ParentId = dto.ParentId,
                Level1 = dto.Level1.Trim(),
                Level2 = dto.Level2.Trim(),
                Level3 = dto.Level3.Trim(),
                Level4 = dto.Level4.Trim(),
                LevelExt = dto.LevelExt.Trim(),
                CategoryId = dto.CategoryId,
                Value = dto.Value.Trim()
            };

        /// <summary>
        /// Визначає ID та ParentID для запису кодифікатора
        /// </summary>
        /// <param name="keys">Масив рівнів [Root, Level1, Level2, Level3, Level4, LevelExt]. 
        /// УВАГА: keys[0] буде перезаписаний на RootCityCode</param>
        public static (string Id, string ParentId) GetCityCodeKeys(string level1,
            string level2,
            string level3,
            string level4,
            string levelExt)
        {
            var keys = new[] { DictCityCode.RootCityCode, level1, level2, level3, level4, levelExt };
            // Знаходимо індекс найнижчого непустого рівня
            int currentIndex = -1;
            for (int i = keys.Length - 1; i >= 1; i--) // Починаємо з кінця, пропускаємо Root
            {
                if (!string.IsNullOrEmpty(keys[i]))
                {
                    currentIndex = i;
                    break;
                }
            }

            if (currentIndex == -1)
                throw new Exception($"Ключі відсутні");

            // ID - це значення поточного рівня
            var id = keys[currentIndex];

            // ParentId - це значення попереднього непустого рівня
            var parentId = keys[0]; // За замовчуванням Root
            for (int i = currentIndex - 1; i >= 0; i--)
            {
                if (!string.IsNullOrEmpty(keys[i]))
                {
                    parentId = keys[i];
                    break;
                }
            }
            return (id, parentId);
        }

        /// <summary>
        /// Створює новий екземпляр DictCityCode з CreateDTO
        /// </summary>
        public static DictCityCode ToEntity(this CityCodeCreateDto dto)
        {
            var level1 = dto.Level1.Trim();
            var level2 = dto.Level2.Trim();
            var level3 = dto.Level3.Trim();
            var level4 = dto.Level4.Trim();
            var levelExt = dto.LevelExt.Trim();
            var (id, parentId) = GetCityCodeKeys(level1, level2, level3, level4, levelExt);

            return new DictCityCode()
            {
                Id = id,
                ParentId = parentId,
                Level1 = level1,
                Level2 = level2,
                Level3 = level3,
                Level4 = level4,
                LevelExt = levelExt,
                CategoryId = dto.CategoryId,
                Value = dto.Value.Trim()
            };
        }

        /// <summary>
        /// Застосовує дані з DTO до існуючої сутності DictCityCode
        /// </summary>
        public static void ApplyDto(this DictCityCode cityCode, CityCodeDto dto)
        {
            cityCode.ParentId = dto.ParentId?.Trim();
            cityCode.Level1 = dto.Level1.Trim();
            cityCode.Level2 = dto.Level2.Trim();
            cityCode.Level3 = dto.Level3.Trim();
            cityCode.Level4 = dto.Level4.Trim();
            cityCode.LevelExt = dto.LevelExt.Trim();
            cityCode.CategoryId = dto.CategoryId;
            cityCode.Value = dto.Value.Trim();
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності DictCityCode співпадають з даними в DTO
        /// </summary>
        public static bool EqualsDto(this DictCityCode cityCode, CityCodeDto dto)
        {
            return cityCode.ParentId == dto.ParentId?.Trim() &&
                   cityCode.Level1 == dto.Level1.Trim() &&
                   cityCode.Level2 == dto.Level2.Trim() &&
                   cityCode.Level3 == dto.Level3.Trim() &&
                   cityCode.Level4 == dto.Level4.Trim() &&
                   cityCode.LevelExt == dto.LevelExt.Trim() &&
                   cityCode.CategoryId == dto.CategoryId &&
                   cityCode.Value == dto.Value.Trim();
        }
    }
}
