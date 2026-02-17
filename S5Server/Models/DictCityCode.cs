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
        public string Level1Id { get; set; } = string.Empty;
        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        public string Level1 { get; set; } = string.Empty;

        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string? Level2Id { get; set; }
        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string? Level2 { get; set; }

        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        public string? Level3Id { get; set; }
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        public string? Level3 { get; set; }

        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string? Level4Id { get; set; }
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string? Level4 { get; set; }

        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        public string? LevelExtId { get; set; }
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        public string? LevelExt { get; set; }

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
        public bool HasChildren = false;
    }
    /// <summary>
    /// Інформація про кодифікатор адміністративно-територіальних одиниць
    /// з описом рівнів
    /// </summary>
    public record CityCodeInfo(
        string? CityCodeId,
        string? CityCode,
        /// <summary>
        /// Область
        /// </summary>
        string? Level1,
        /// <summary>
        /// Обл.
        /// </summary>
        string? Level1Cat,
        /// <summary>
        /// Район
        /// </summary>
        string? Level2,
        /// <summary>
        /// Р-н
        /// </summary>
        string? Level2Cat,
        /// <summary>
        /// Громада
        /// </summary>
        string? Level3,
        /// <summary>
        /// ТГР
        /// </summary>
        string? Level3Cat,
        /// <summary>
        /// Населений пункт
        /// </summary>
        string? Level4,
        /// <summary>
        /// місто
        /// </summary>
        string? Level4Cat,
        /// <summary>
        /// Район у місті
        /// </summary>
        string? LevelExt,
        /// <summary>
        /// р-н міста
        /// </summary>
        string? LevelExtCat
        );

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
        public string Level1Id { get; set; } = string.Empty;
        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        [ValidateNever]
        public DictCityCode Level1 { get; set; } = default!;
        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        /*
        [NotMapped, JsonIgnore]
        public IReadOnlyList<DictCityCode> Levels1 { get; set; } = [];
        */

        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string? Level2Id { get; set; }
        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        [ValidateNever]
        public DictCityCode? Level2 { get; set; }
        /*
        [NotMapped, JsonIgnore]
        public IReadOnlyList<DictCityCode> Levels2 { get; set; } = [];
        */
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        public string? Level3Id { get; set; }
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        [ValidateNever]
        public DictCityCode? Level3 { get; set; }
        /// <summary>
        /// території територіальних громад в областях,
        /// територіальні громади Автономної Республіки Крим
        /// </summary>
        /*
        [NotMapped, JsonIgnore]
        public IReadOnlyList<DictCityCode> Levels3 { get; set; } = [];
        */
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string? Level4Id { get; set; }
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        [ValidateNever]
        public DictCityCode? Level4 { get; set; }
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        /*
        [NotMapped, JsonIgnore]
        public IReadOnlyList<DictCityCode> Levels4 { get; set; } = [];
        */
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        public string? LevelExtId { get; set; }
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        [ValidateNever]
        public DictCityCode? LevelExt { get; set; }
        /// <summary>
        /// райони в містах (в тому числі, в містах, що мають спеціальний статус)
        /// </summary>
        /*
        [NotMapped, JsonIgnore]
        public IReadOnlyList<DictCityCode> LevelsExt { get; set; } = [];
        */
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
        public bool HasChildren { get; set; } = false;
        [NotMapped]
        public List<DictCityCode> Children { get; set; } = [];
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
                Level1Id = cityCode.Level1Id,
                Level1 = cityCode.Level1.Value,
                Level2Id = cityCode.Level2Id,
                Level2 = cityCode.Level2?.Value,
                Level3Id = cityCode.Level3Id,
                Level3 = cityCode.Level3?.Value,
                Level4Id = cityCode.Level4Id,
                Level4 = cityCode.Level4?.Value,
                LevelExtId = cityCode.LevelExtId,
                LevelExt = cityCode.LevelExt?.Value,
                CategoryId = cityCode.CategoryId,
                Category = cityCode.Category.Value,
                Value = cityCode.Value,
                HasChildren = cityCode.HasChildren
            };

        public static CityCodeInfo ToCityCodeInfo(this DictCityCode cityCode) =>
            new(
                cityCode.Id,
                cityCode.Value,
                cityCode.Level1?.Value,
                cityCode.Level1?.Category.ShortValue,
                cityCode.Level2?.Value,
                cityCode.Level2?.Category.ShortValue,
                cityCode.Level3?.Value,
                cityCode.Level3?.Category.ShortValue,
                cityCode.Level4?.Value,
                cityCode.Level4?.Category.ShortValue,
                cityCode.LevelExt?.Value,
                cityCode.LevelExt?.Category.ShortValue
                );

        /// <summary>
        /// Створює новий екземпляр DictCityCode з DTO
        /// </summary>
        public static DictCityCode ToEntity(this CityCodeDto dto) =>
            new()
            {
                Id = dto.Id,
                ParentId = dto.ParentId,
                Level1Id = dto.Level1Id.Trim(),
                Level2Id = dto.Level2Id?.Trim(),
                Level3Id = dto.Level3Id?.Trim(),
                Level4Id = dto.Level4Id?.Trim(),
                LevelExtId = dto.LevelExtId?.Trim(),
                CategoryId = dto.CategoryId,
                Value = dto.Value.Trim()
            };

        /// <summary>
        /// Визначає ID та ParentID для запису кодифікатора
        /// </summary>
        /// <param name="keys">Масив рівнів [Root, Level1, Level2, Level3, Level4, LevelExt]. 
        /// УВАГА: keys[0] буде перезаписаний на RootCityCode</param>
        public static (string? Id, string? ParentId) GetCityCodeKeys(string level1,
            string? level2,
            string? level3,
            string? level4,
            string? levelExt)
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
            var level1Id = dto.Level1Id.Trim();
            var level2Id = dto.Level2Id?.Trim();
            var level3Id = dto.Level3Id?.Trim();
            var level4Id = dto.Level4Id?.Trim();
            var levelExtId = dto.LevelExtId?.Trim();
            var (id, parentId) = GetCityCodeKeys(level1Id, level2Id, level3Id, level4Id, levelExtId);
            ArgumentNullException.ThrowIfNull(id, "Відсутній основний ключ");


            return new DictCityCode()
            {
                Id = id,
                ParentId = parentId,
                Level1Id = level1Id,
                Level2Id = level2Id,
                Level3Id = level3Id,
                Level4Id = level4Id,
                LevelExtId = levelExtId,
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
            cityCode.Level1Id = dto.Level1Id.Trim();
            cityCode.Level2Id = dto.Level2Id?.Trim();
            cityCode.Level3Id = dto.Level3Id?.Trim();
            cityCode.Level4Id = dto.Level4Id?.Trim();
            cityCode.LevelExtId = dto.LevelExtId?.Trim();
            cityCode.CategoryId = dto.CategoryId;
            cityCode.Value = dto.Value.Trim();
        }

        /// <summary>
        /// Перевіряє, чи дані в сутності DictCityCode співпадають з даними в DTO
        /// </summary>
        public static bool IsEqualTo(this DictCityCode cityCode, CityCodeDto dto)
        {
            return cityCode.ParentId == dto.ParentId?.Trim() &&
                   cityCode.Level1Id == dto.Level1Id?.Trim() &&
                   cityCode.Level2Id == dto.Level2Id?.Trim() &&
                   cityCode.Level3Id == dto.Level3Id?.Trim() &&
                   cityCode.Level4Id == dto.Level4Id?.Trim() &&
                   cityCode.LevelExtId == dto.LevelExtId?.Trim() &&
                   cityCode.CategoryId == dto.CategoryId &&
                   cityCode.Value == dto.Value.Trim();
        }
    }
}
