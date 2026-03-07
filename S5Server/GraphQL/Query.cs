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
        => db.TemplateDataSets.Where(d => d.Id == id);

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
    public async Task<DocumentTemplate?> GetDocumentTemplate(
        Guid id,
        [Service] MainDbContext db,
        CancellationToken ct)
        => await db.DocumentTemplates
            .FirstOrDefaultAsync(t => t.Id == id, ct);

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
    /// Отримати всіх бійців
    /// </summary>
    [Authorize]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<Soldier> GetSoldiers(
        [Service] MainDbContext db)
        => db.Soldiers;
}
