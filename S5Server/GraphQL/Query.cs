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
            //.FirstOrDefaultAsync(t => t.Id == id)
        ;

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

