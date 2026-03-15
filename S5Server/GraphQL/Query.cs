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
            .FirstOrDefaultAsync(d => d.Id == dataSetId);

        if (dataSet == null) return null;

        // 2. Для кожного UnitTask вручную завантажуємо бійців за логікою UNION
        foreach (var task in dataSet.UnitTasks)
        {
            var unitId = task.UnitId;
            var taskId = task.Id;

            task.SoldiersTask = await db.SoldierTasks
                .Where(st => st.UnitTaskId == taskId)
                .Where(st =>
                    (st.UnitId == unitId && st.AssignedUnitId == null && st.InvolvedUnitId == null) ||
                    (st.AssignedUnitId == unitId) ||
                    (st.InvolvedUnitId == unitId)
                )
                .ToListAsync();

            task.Means = await db.DroneModelTasks
                .Include(t => t.DroneModel)
                    .ThenInclude(t => t.DroneType)
                .Where(t => t.UnitTaskId == taskId)
                .ToListAsync();

            task.TaskValue = await db.DictUnitTaskItems
                .Where(t => t.UnitTaskId == task.TaskId && t.TemplateCategoryId == templateCategoryId)
                .Select(t => t.Value)
                .FirstOrDefaultAsync() ?? string.Empty;
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

