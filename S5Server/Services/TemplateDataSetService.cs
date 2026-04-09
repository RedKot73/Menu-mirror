using Microsoft.EntityFrameworkCore;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Services;

/// <summary>
/// Service for managing template data sets and associated document generation data.
/// </summary>
public interface ITemplateDataSetService
{
    /// <summary>
    /// Retrieves a complete template data set populated with all necessary entities for document generation.
    /// </summary>
    /// <param name="dataSetId">The ID of the template data set.</param>
    /// <param name="templateCategoryId">The ID of the template category.</param>
    /// <returns>The populated template data set, or null if not found.</returns>
    Task<TemplateDataSet?> GetTemplateDataSetForDocAsync(Guid dataSetId, Guid templateCategoryId);
}

/// <summary>
/// Implementation of the template data set service.
/// </summary>
public class TemplateDataSetService : ITemplateDataSetService
{
    private readonly MainDbContext _db;

    /// <summary>
    /// Initializes a new instance of the <see cref="TemplateDataSetService"/> class.
    /// </summary>
    /// <param name="db">The database context.</param>
    public TemplateDataSetService(MainDbContext db)
    {
        _db = db;
    }

    /// <inheritdoc />
    public async Task<TemplateDataSet?> GetTemplateDataSetForDocAsync(Guid dataSetId, Guid templateCategoryId)
    {
        // 1. Завантажуємо основні дані DataSet та UnitTasks
        var dataSet = await _db.TemplateDataSets
            .Include(d => d.UnitTasks)
                .ThenInclude(ut => ut.Area)
            .Include(d => d.UnitTasks)
                .ThenInclude(ut => ut.Task)
            .FirstOrDefaultAsync(d => d.Id == dataSetId);

        if (dataSet == null) return null;

        // 2. Визначаємо унікальні CityCodeId для всіх UnitTasks, щоб завантажити CityFullNames одним запитом
        var cityCodeIds = dataSet.UnitTasks
            .Select(ut => ut.Area.CityCodeId)
            .Where(id => id != null)
            .Distinct()
            .ToList();

        // Завантажуємо CityFullNames одним запитом для всіх Area.CityCodeId
        var cityFullNames = await _db.CityFullNames
            .Where(v => cityCodeIds.Contains(v.Id))
            .ToDictionaryAsync(v => v.Id);

        // 3. Для кожного UnitTask завантажуємо бійців за логікою UNION
        foreach (var unitTask in dataSet.UnitTasks)
        {
            var unitId = unitTask.UnitId;
            var taskId = unitTask.Id;

            var unitQry = _db.SoldierTasks
                .Where(t => t.UnitId == unitId && t.AssignedUnitId == null && t.InvolvedUnitId == null);
            var assUnitQry = _db.SoldierTasks
                .Where(t => t.AssignedUnitId == unitId);
            var invUnitQry = _db.SoldierTasks
                .Where(t => t.InvolvedUnitId == unitId);

            unitTask.SoldiersTask = await
                unitQry.Union(assUnitQry).Union(invUnitQry)
                .ToListAsync();

            unitTask.Means = await _db.DroneModelTasks
                .Include(t => t.DroneModel)
                    .ThenInclude(t => t.DroneType)
                .Where(t => t.UnitTaskId == taskId)
                .ToListAsync();

            unitTask.AreaCityFullName = unitTask.Area.CityCodeId != null
                ? cityFullNames.GetValueOrDefault(unitTask.Area.CityCodeId)
                : null;

            var taskItems = await _db.DictUnitTaskItems
                .Where(t => t.UnitTaskId == unitTask.TaskId && t.TemplateCategoryId == templateCategoryId)
                .Select(t => t)
                .ToListAsync();
            unitTask.Task.UnitTaskItems = taskItems;
            unitTask.TaskValue = string.Join("; ", taskItems
                .Select(i => i.Value));
        }

        return dataSet;
    }
}
