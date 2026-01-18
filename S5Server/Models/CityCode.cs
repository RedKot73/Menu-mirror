using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public record CityCodeCreateDto
    {
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
        [Key]
        [StringLength(36)]
        public string Id { get; set; } = string.Empty;//Guid.NewGuid().ToString("D");
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
                Level1 = cityCode.Level1,
                Level2 = cityCode.Level2,
                Level3 = cityCode.Level3,
                Level4 = cityCode.Level4,
                LevelExt = cityCode.LevelExt,
                CategoryId = cityCode.CategoryId,
                Value = cityCode.Value
            };

        /// <summary>
        /// Створює новий екземпляр DictCityCode з DTO
        /// </summary>
        public static DictCityCode ToEntity(this CityCodeDto dto) =>
            new()
            {
                Id = dto.Id,
                Level1 = dto.Level1.Trim(),
                Level2 = dto.Level2.Trim(),
                Level3 = dto.Level3.Trim(),
                Level4 = dto.Level4.Trim(),
                LevelExt = dto.LevelExt.Trim(),
                CategoryId = dto.CategoryId,
                Value = dto.Value.Trim()
            };

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
            // ID формується з найнижчого непустого рівня (пріоритет: LevelExt > Level4 > Level3 > Level2 > Level1)
            var id = !string.IsNullOrEmpty(levelExt) ? levelExt :
                     !string.IsNullOrEmpty(level4) ? level4 :
                     !string.IsNullOrEmpty(level3) ? level3 :
                     !string.IsNullOrEmpty(level2) ? level2 :
                     level1;

            return new DictCityCode()
            {
                Id = id,
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
            return cityCode.Level1 == dto.Level1.Trim() &&
                   cityCode.Level2 == dto.Level2.Trim() &&
                   cityCode.Level3 == dto.Level3.Trim() &&
                   cityCode.Level4 == dto.Level4.Trim() &&
                   cityCode.LevelExt == dto.LevelExt.Trim() &&
                   cityCode.CategoryId == dto.CategoryId &&
                   cityCode.Value == dto.Value.Trim();
        }
    }
}
