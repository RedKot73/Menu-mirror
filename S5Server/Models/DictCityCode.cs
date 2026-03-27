using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачи в списки выбора
    /// Тут Id саме string оскільки формат UA01020000000022387
    /// </summary>
    public record CityCodeLookupDto(
        string Id,
        string Value
    );

    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public record CityCodeCreateDto
    {
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
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
        /// <summary>
        /// Gets or sets the unique identifier of the associated category.
        /// </summary>
        [Required]
        public Guid CategoryId { get; set; } = default!;
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
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        [Required]
        public string Id { get; set; } = default!;
        /// <summary>
        /// Indicates whether the current item has child elements.
        /// </summary>
        public bool HasChildren = false;
    }
    /// <summary>
    /// Інформація про кодифікатор адміністративно-територіальних одиниць
    /// з описом рівнів
    /// </summary>
    /// <param name="CityCodeId">Тут саме string оскільки формат UA01020000000022387</param>
    /// <param name="CityCode">Назва населеного пункту або адміністративної одиниці</param>
    /// <param name="Level1">Автономна Республіка Крим, області, міста, що мають спеціальний статус</param>
    /// <param name="Level1Cat">Категорія рівня 1 (напр. «Обл.»)</param>
    /// <param name="Level2">Район в області або Автономній Республіці Крим</param>
    /// <param name="Level2Cat">Категорія рівня 2 (напр. «Р-н»)</param>
    /// <param name="Level3">Територіальна громада (ТГР)</param>
    /// <param name="Level3Cat">Категорія рівня 3 (напр. «ТГР»)</param>
    /// <param name="Level4">Населений пункт (місто, село, селище тощо)</param>
    /// <param name="Level4Cat">Категорія рівня 4 (напр. «місто», «село»)</param>
    /// <param name="LevelExt">Район у місті</param>
    /// <param name="LevelExtCat">Категорія розширеного рівня (напр. «р-н міста»)</param>
    public record CityCodeInfo(
        string? CityCodeId,
        string? CityCode,
        string? Level1,
        string? Level1Cat,
        string? Level2,
        string? Level2Cat,
        string? Level3,
        string? Level3Cat,
        string? Level4,
        string? Level4Cat,
        string? LevelExt,
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
        /// <summary>
        /// Gets or sets the code identifier.
        /// </summary>
        /// <remarks>The code identifier must be a non-empty string with a maximum length of one
        /// character.</remarks>
        [StringLength(1), Required]
        public string CodeId { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets the collection of city codes associated with the entity.
        /// </summary>
        /// <remarks>This property is not mapped to the database and is intended for use in application
        /// logic. The collection may be empty if no city codes are associated.</remarks>
        /// <summary>
        /// Gets or sets the collection of city codes associated with the entity.
        /// </summary>
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
        /// <summary>
        /// Represents the root city code used as a default or placeholder value in city-related operations.
        /// </summary>
        /// <remarks>This constant can be used to identify the root or top-level city in hierarchical city
        /// structures. It is typically used when a specific city code is not available or when referencing the entire
        /// city hierarchy.</remarks>
        /// <summary>
        /// Represents the code for the root city in the city code hierarchy.
        /// Додано вручну для побудови дерева кодифікаторів,
        /// оскільки в даних відсутній єдиний кореневий код для всіх записів.
        /// </summary>
        public const string RootCityCode = "UA00000000000000000";

        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString("D");//"UA01000000000013043"
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public string? ParentId { get; set; }
        /// <summary>
        /// Gets or sets the parent city code associated with this instance.
        /// </summary>
        [ValidateNever]
        public DictCityCode Parent { get; set; } = default!;

        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        [Required]
        public string Level1Id { get; set; } = string.Empty;//"UA01020000000022387"
        /// <summary>
        /// Автономна Республіка Крим, області, міста, що мають спеціальний статус
        /// </summary>
        [ValidateNever]
        public DictCityCode Level1 { get; set; } = default!;

        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        public string? Level2Id { get; set; }
        /// <summary>
        /// райони в областях та Автономній Республіці Крим
        /// </summary>
        [ValidateNever]
        public DictCityCode? Level2 { get; set; }

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
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        public string? Level4Id { get; set; }
        /// <summary>
        /// міста, селища міського типу, села, селища (населені пункти)
        /// </summary>
        [ValidateNever]
        public DictCityCode? Level4 { get; set; }
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
        public Guid CategoryId { get; set; } = default!;
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
        /// <summary>
        /// Gets or sets the string value associated with this property.
        /// </summary>
        [StringLength(100), Required]
        public string Value { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets a value indicating whether the current entity has child entities.
        /// </summary>
        [NotMapped]
        public bool HasChildren { get; set; } = false;
        /// <summary>
        /// Gets or sets the collection of child city code entries associated with this instance.
        /// </summary>
        /// <summary>
        /// Gets or sets the collection of child city codes associated with this entity.
        /// </summary>
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
        /// <summary>
        /// Converts a DictCityCode instance to a CityCodeInfo object, mapping hierarchical city code values and
        /// categories.
        /// </summary>
        /// <remarks>This extension method extracts values and category short values from each
        /// hierarchical level of the city code. Use this method to simplify access to structured city code information
        /// for display or processing.</remarks>
        /// <param name="cityCode">The DictCityCode instance containing city code information to convert. Cannot be null.</param>
        /// <returns>A CityCodeInfo object populated with values and categories from the specified cityCode. Returns null if
        /// cityCode is null.</returns>
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

    /// <summary>
    /// Представлення dict.v_city_full_name — повна адреса населеного пункту
    /// у вигляді: «Область, Район, Громада, Місто»
    /// </summary>
    public class VCityFullName
    {
        /// <summary>
        /// ID запису кодифікатора (відповідає DictCityCode.Id)
        /// </summary>
        public string Id { get; set; } = string.Empty;
        /// <summary>
        /// Повна адреса: конкатенація рівнів через кому
        /// </summary>
        public string Value { get; set; } = string.Empty;
    }
}
