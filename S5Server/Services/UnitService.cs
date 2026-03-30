using Microsoft.EntityFrameworkCore;
using S5Server.Models;

namespace S5Server.Services;

/// <summary>
/// Provides methods for querying unit entities with related navigation properties included.
/// </summary>
/// <remarks>Use this class to retrieve unit data along with associated entities such as parent units, assigned
/// units, force types, unit types, and persistent locations. This is useful when a complete view of a unit and its
/// relationships is required for operations such as display or processing.</remarks>
public static class UnitService
{
    /// <summary>
    /// Завантажує повну інформацію про підрозділ (Include всіх навігаційних властивостей)
    /// </summary>
    public static IQueryable<Unit> QueryWithIncludes(this IQueryable<Unit> query)
    {
        return query
            .Include(t => t.Parent)
            .Include(t => t.AssignedUnit)
            .Include(t => t.ForceType)
            .Include(t => t.UnitType)
            .Include(t => t.PersistentLocation);
    }
}
