using Microsoft.EntityFrameworkCore;

using S5Server.Models;

namespace S5Server.Services;

/// <summary>
/// Provides extension methods for querying collections of Soldier entities with related data included for read-only
/// operations.
/// </summary>
/// <remarks>This static class contains methods that simplify the retrieval of soldiers and their related entities
/// from a DbSet. The methods are designed for scenarios where related data is required and no modifications to the
/// entities are intended. All queries are configured to disable change tracking and to eagerly load related entities,
/// making them suitable for reporting, display, or other read-only use cases.</remarks>
public static class SoldierService
{
    /// <summary>
    /// Returns a queryable collection of soldiers with related unit, assigned unit, involved unit, rank, position, and
    /// state entities included for read-only operations.
    /// </summary>
    /// <remarks>The returned query is configured for read-only scenarios by disabling change tracking and
    /// eagerly loading related entities. This method is suitable for scenarios where the related data is required and
    /// no modifications to the entities are intended.</remarks>
    /// <param name="set">The DbSet representing the collection of soldiers to query.</param>
    /// <returns>An IQueryable of Soldier entities with related data included and change tracking disabled.</returns>
    public static IQueryable<Soldier> GetQuery(this DbSet<Soldier> set)
    {
        var res = set.AsNoTracking()
            .Include(s => s.Unit)
            .Include(s => s.AssignedUnit)
            .Include(s => s.InvolvedUnit)
            .Include(s => s.Rank)
            .Include(s => s.Position)
            .Include(s => s.State);
        return res;
    }
    /// <summary>
    /// Возвращает объединённый запрос, содержащий всех военнослужащих, связанных с указанным подразделением по одному
    /// из трёх идентификаторов: основному, назначенному или вовлечённому.
    /// </summary>
    /// <remarks>Запрос выполняется без отслеживания изменений (AsNoTracking) и может быть дополнительно
    /// модифицирован перед выполнением. Используйте этот метод для получения полного списка военнослужащих, связанных с
    /// подразделением по разным ролям.</remarks>
    /// <param name="set">Набор сущностей военнослужащих, к которому применяется расширяющий метод.</param>
    /// <param name="unitId">Уникальный идентификатор подразделения, по которому производится поиск связанных военнослужащих.</param>
    /// <returns>Объект запроса, включающий всех военнослужащих, у которых совпадает основной, назначенный или вовлечённый
    /// идентификатор подразделения с указанным значением. Результат включает связанные сущности подразделения, звания,
    /// должности и состояния, а также отсортирован по имени, отчеству и фамилии.</returns>
    public static IQueryable<Soldier> GetUnionQuery(this DbSet<Soldier> set, Guid unitId)
    {
        var qry1 = set.AsNoTracking().Where(s => s.UnitId == unitId);
        var qry2 = set.AsNoTracking().Where(s => s.AssignedUnitId == unitId);
        var qry3 = set.AsNoTracking().Where(s => s.InvolvedUnitId == unitId);
        var result = (qry1
            .Union(qry2)
            .Union(qry3))
            .Include(s => s.Unit)
            .Include(s => s.AssignedUnit)
            .Include(s => s.InvolvedUnit)
            .Include(s => s.Rank)
            .Include(s => s.Position)
            .Include(s => s.State)
            .OrderBy(s => s.FirstName)
            .ThenBy(s => s.MidleName)
            .ThenBy(s => s.LastName);
        return result;
    }

}
