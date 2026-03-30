using DocumentFormat.OpenXml.Office2010.Excel;

using HotChocolate.Authorization;

using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.GraphQL;

/// <summary>
/// GraphQL запити для отримання даних
/// </summary>
public class Query
{
    /// <summary>
    /// Отримати всі набори даних для шаблонів
    /// </summary>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<TemplateDataSet> GetTemplateDataSets(
        [Service] MainDbContext db)
        => db.TemplateDataSets;

    /// <summary>
    /// Отримати набір даних за ID
    /// </summary>
    [Authorize]
    [UseProjection]
    public IQueryable<TemplateDataSet> GetTemplateDataSet(
        Guid id,
        [Service] MainDbContext db)
        => db.TemplateDataSets
            .Where(d => d.Id == id)
        ;

    /// <summary>
    /// Retrieves a template data set, including associated unit tasks and their related areas, means, and soldier
    /// tasks, for the specified document identifier.
    /// </summary>
    /// <remarks>Unit tasks within the returned data set include their associated areas, means, and soldier
    /// tasks. Soldier tasks are loaded based on unit and task relationships. This method requires
    /// authorization.</remarks>
    /// <param name="dataSetId">The unique identifier of the template data set to retrieve.</param>
    /// <param name="templateCategoryId">Тип шаблону документу: БР/БД....</param>
    /// <param name="db">The database context used to access template data sets and related entities.</param>
    /// <returns>A TemplateDataSet object containing the requested data and related entities, or null if no matching data set is
    /// found.</returns>
    [Authorize]
    public async Task<TemplateDataSet?> GetTemplateDataSetForDoc(
        Guid dataSetId,
        Guid templateCategoryId,
        [Service] MainDbContext db)
    {
        // 1. Завантажуємо основні дані DataSet та UnitTasks
        var dataSet = await db.TemplateDataSets
            .Include(d => d.UnitTasks)
                .ThenInclude(ut => ut.Area)
            .Include(d => d.UnitTasks)
                .ThenInclude(ut => ut.Task)
            .FirstOrDefaultAsync(d => d.Id == dataSetId);

        if (dataSet == null) return null;

        /* Подумать над оптимизацией количества запросов 
         * к БД для загрузки SoldierTasks для всех UnitTasks. Варианты:
var unitIds = dataSet.UnitTasks.Select(ut => ut.UnitId).Distinct().ToList();

var unitSoldiers = db.SoldierTasks
    .Where(t => unitIds.Contains(t.UnitId) && t.AssignedUnitId == null && t.InvolvedUnitId == null);

var assSoldiers = db.SoldierTasks
    .Where(t => t.AssignedUnitId != null && unitIds.Contains(t.AssignedUnitId.Value));

var invSoldiers = await db.SoldierTasks
    .Where(t => t.InvolvedUnitId != null && unitIds.Contains(t.InvolvedUnitId.Value));

var allSoldiers = await unitSoldiers.Union(assSoldiers).Union(invSoldiers)
                .ToListAsync();
        */

        // 2. Визначаємо унікальні CityCodeId для всіх UnitTasks, щоб завантажити CityFullNames одним запитом
        var cityCodeIds = dataSet.UnitTasks
            .Select(ut => ut.Area.CityCodeId)
            .Where(id => id != null)
            .Distinct()
            .ToList();

        // Завантажуємо CityFullNames одним запитом для всіх Area.CityCodeId
        var cityFullNames = await db.CityFullNames
            .Where(v => cityCodeIds.Contains(v.Id))
            .ToDictionaryAsync(v => v.Id);

        // 3. Для кожного UnitTask вручную завантажуємо бійців за логікою UNION
        foreach (var unitTask in dataSet.UnitTasks)
        {
            var unitId = unitTask.UnitId;
            var taskId = unitTask.Id;

            var unitQry = db.SoldierTasks
                .Where(t => t.UnitId == unitId && t.AssignedUnitId == null && t.InvolvedUnitId == null);
            var assUnitQry = db.SoldierTasks
                .Where(t => t.AssignedUnitId == unitId);
            var invUnitQry = db.SoldierTasks
                .Where(t => t.InvolvedUnitId == unitId);

            unitTask.SoldiersTask = await
                unitQry.Union(assUnitQry).Union(invUnitQry)
                .ToListAsync();

            unitTask.Means = await db.DroneModelTasks
                .Include(t => t.DroneModel)
                    .ThenInclude(t => t.DroneType)
                .Where(t => t.UnitTaskId == taskId)
                .ToListAsync();

            unitTask.AreaCityFullName = unitTask.Area.CityCodeId != null
                ? cityFullNames.GetValueOrDefault(unitTask.Area.CityCodeId)
                : null;

            var taskItems = await db.DictUnitTaskItems
                .Where(t => t.UnitTaskId == unitTask.TaskId && t.TemplateCategoryId == templateCategoryId)
                .Select(t => t)
                .ToListAsync();
            unitTask.Task.UnitTaskItems = taskItems;
            unitTask.TaskValue = string.Join("; ", taskItems
                .Select(i => i.Value));
        }

        return dataSet;
    }

    /// <summary>
    /// Отримати всі шаблони документів
    /// </summary>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<DocumentTemplate> GetDocumentTemplates(
        [Service] MainDbContext db)
        => db.DocumentTemplates;

    /// <summary>
    /// Отримати шаблон за ID
    /// </summary>
    [Authorize]
    [UseProjection]
    public IQueryable<DocumentTemplate?> GetDocumentTemplate(
        Guid id,
        [Service] MainDbContext db)
        => db.DocumentTemplates
            .Where(t => t.Id == id);

    /// <summary>
    /// Отримати всі підрозділи
    /// </summary>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Unit> GetUnits(
        [Service] MainDbContext db)
        => db.Units;

    /// <summary>
    /// Отримати підрозділ за id
    /// </summary>
    [Authorize]
    [UseProjection]
    public IQueryable<Unit?> GetUnit(
        Guid id,
        [Service] MainDbContext db)
        => db.Units
            .Where(t => t.Id == id);

    /// <summary>
    /// Отримати всіх бійців
    /// </summary>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Soldier> GetSoldiers(
        [Service] MainDbContext db)
        => db.Soldiers;

    /// <summary>
    /// Историческая таблица подразделений
    /// </summary>
    /// <param name="db"></param>
    /// <returns></returns>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<UnitHist> GetUnitsHistories(
        [Service] MainDbContext db)
        => db.UnitHistories;

    /// <summary>
    /// Историческая таблица подразделений
    /// </summary>
    /// <param name="id">Id підрозділу</param>
    /// <param name="db"></param>
    /// <returns></returns>
    [Authorize]
    [UseProjection]
    public IQueryable<UnitHist> GetUnitHistory(
        Guid id,
        [Service] MainDbContext db)
        => db.UnitHistories
           .Where(t => t.UnitId == id);

    /// <summary>
    /// Історична таблиця змін бійців
    /// </summary>
    /// <param name="db"></param>
    /// <returns></returns>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<SoldierHist> GetSoldierHistories(
        [Service] MainDbContext db)
        => db.SoldierHistories;

    /// <summary>
    /// Історична таблиця змін бійця
    /// </summary>
    /// <param name="id">Id бійця</param>
    /// <param name="db"></param>
    /// <returns></returns>
    [Authorize]
    [UseProjection]
    public IQueryable<SoldierHist> GetSoldierHistory(
        Guid id,
        [Service] MainDbContext db)
        => db.SoldierHistories
           .Where(t => t.SoldierId == id);
}

