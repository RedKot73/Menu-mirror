using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для читання UnitAreas
    /// <paramref name="AreaId"></paramref>
    /// </summary>
    public record UnitAreasDto(
        Guid Id,
        Guid UnitId,
        string UnitShortName,
        Guid AreaId,
        string AreaValue,
        string AreaTypeValue,
        DateTime ValidFrom);

    /// <summary>
    /// DTO для створення/оновлення UnitAreas
    /// </summary>
    public record UnitAreasUpsertDto(
        Guid UnitId,
        Guid AreaId);

    /// <summary>
    /// Represents the association between a military unit and its designated operational area.
    /// </summary>
    /// <remarks>This class links an organizational unit to a specific area where tasks are performed. It is
    /// typically used to map units to their assigned regions within operational planning or management
    /// systems.</remarks>
    public class UnitAreas
    {
        /// <summary>
        /// Gets or sets the unique identifier for the entity.
        /// </summary>
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();
        /// <summary>
        /// Підрозділ (організаційно-штатна бойова одиниця)
        /// </summary>
        [Required]
        public Guid UnitId { get; set; } = default!;
        /// <summary>
        /// Підрозділ (організаційно-штатна бойова одиниця)
        /// </summary>
        [ValidateNever]
        public Unit Unit { get; set; } = default!;
        /// <summary>
        /// Район виконання завдань (РВЗ)
        /// </summary>
        [Required]
        public Guid AreaId { get; set; } = default!;
        /// <summary>
        /// Район виконання завдань (РВЗ)
        /// </summary>
        [ValidateNever]
        public DictArea Area { get; set; } = default!;
        /// <summary>
        /// Кто внёс изменение (UserId або "System")
        /// </summary>
        [StringLength(100), Required]
        public string ChangedBy { get; set; } = string.Empty;

        /// <summary>
        /// Дата начала действия записи
        /// </summary>
        [Required]
        public DateTime ValidFrom { get; set; } = DateTime.UtcNow;
    }

    /// <summary>
    /// Extension-методи для UnitAreas
    /// </summary>
    public static class UnitAreasExtensions
    {
        /// <summary>
        /// Converts a UnitAreas entity to its corresponding UnitAreasDto data transfer object.
        /// </summary>
        /// <param name="e">The UnitAreas entity to convert. Cannot be null.</param>
        /// <returns>A UnitAreasDto instance containing the data from the specified UnitAreas entity.</returns>
        public static UnitAreasDto ToDto(this UnitAreas e) =>
            new(
                e.Id,
                e.UnitId,
                e.Unit?.ShortName ?? string.Empty,
                e.AreaId,
                e.Area?.Value ?? string.Empty,
                e.Area?.AreaType?.ShortValue ?? string.Empty,
                e.ValidFrom);
        /// <summary>
        /// Creates a new instance of the UnitAreas entity from the specified data transfer object and user identifier.
        /// </summary>
        /// <param name="dto">The data transfer object containing the unit and area information to be mapped.</param>
        /// <param name="changedBy">The identifier of the user making the change. Cannot be null.</param>
        /// <returns>A new UnitAreas entity populated with values from the provided data transfer object and the specified user
        /// identifier.</returns>
        public static UnitAreas FromDto(this UnitAreasUpsertDto dto, string changedBy) =>
            new()
            {
                UnitId = dto.UnitId,
                AreaId = dto.AreaId,
                ChangedBy = changedBy,
                ValidFrom = DateTime.UtcNow
            };
        /// <summary>
        /// Determines whether the specified unit area matches the provided data transfer object based on unit and area
        /// identifiers.
        /// </summary>
        /// <param name="e">The unit area instance to compare.</param>
        /// <param name="dto">The data transfer object containing unit and area identifiers to compare against.</param>
        /// <returns>true if both the unit and area identifiers are equal; otherwise, false.</returns>
        public static bool IsEqualTo(this UnitAreas e, UnitAreasUpsertDto dto) =>
            e.UnitId == dto.UnitId && e.AreaId == dto.AreaId;
        /// <summary>
        /// Converts a UnitAreas instance to a LookupDto containing its identifier and unit name.
        /// </summary>
        /// <param name="e">The UnitAreas instance to convert.</param>
        /// <returns>A LookupDto representing the identifier and unit name of the specified UnitAreas instance. The unit name is
        /// taken from ShortName if available; otherwise, Name is used. If both are null, an empty string is returned.</returns>
        public static LookupDto ToLookUpDto(this UnitAreas e)
        {
            return new LookupDto(e.UnitId, e.Unit.ShortName ?? e.Unit.Name ?? string.Empty);
        }
    }
}
