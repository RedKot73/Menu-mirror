using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Services;

/// <summary>
/// Provides services for creating and saving snapshot records of soldiers associated with a unit task.
/// </summary>
public static class SoldierTaskService
{
    /// <summary>
    /// Creates and saves snapshot records for all soldiers in the specified unit task.
    /// </summary>
    /// <remarks>This method retrieves all soldiers associated with the specified unit and
    /// creates snapshot records for each. The snapshots are added to the database and persisted in a single
    /// operation. If the operation is cancelled via the cancellation token, no changes are saved.</remarks>
    /// <param name="unitTask">The unit task for which soldier snapshots are to be created. Must not be null.</param>
    /// <param name="db">The database context used to access soldiers and persist snapshot records. Must not be null.</param>
    /// <param name="changedBy">The identifier of the user or process making the change. Cannot be null or empty.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the asynchronous operation.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public static async Task CreateSoldierSnapshot(this UnitTask unitTask,
        MainDbContext db,
        string changedBy, CancellationToken ct)
    {
        // 1. Завантажити бійців підрозділу
        var soldiers = await db.Soldiers.GetUnionQuery(unitTask.UnitId)
            .ToListAsync(ct);

        // 2. Створити знімки бійців
        var soldierTasks = soldiers
            .Select(s => s.CreateSnapshot(unitTask.Id, changedBy))
            .ToList();

        db.SoldierTasks.AddRange(soldierTasks);

        await db.SaveChangesAsync(ct);
    }

    /// <summary>
    /// Deletes all soldier task snapshots associated with the specified unit task from the database asynchronously.
    /// </summary>
    /// <remarks>This method removes all soldier task records linked to the provided unit task. The operation
    /// is performed asynchronously and can be cancelled using the provided cancellation token.</remarks>
    /// <param name="unitTask">The unit task whose associated soldier task snapshots are to be deleted.</param>
    /// <param name="db">The database context used to access and modify soldier task records.</param>
    /// <param name="changedBy">The identifier of the user or process making the change. This parameter is not used in this method.</param>
    /// <param name="ct">A cancellation token that can be used to cancel the asynchronous operation.</param>
    /// <returns>A task that represents the asynchronous delete operation.</returns>
    public static async Task DeleteSoldierSnapshot(this UnitTask unitTask,
        MainDbContext db,
        string changedBy, CancellationToken ct)
    {
        await db.SoldierTasks
            .Where(t => t.UnitTaskId == unitTask.Id)
            .ExecuteDeleteAsync(ct);
    }
}
