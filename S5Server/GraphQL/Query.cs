using HotChocolate;            // Добавлено для [Service]
using HotChocolate.Data;       // Добавлено для [UseProjection], [UseFiltering], [UseSorting]
using HotChocolate.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using S5Server.Data;
using S5Server.Models;



namespace S5Server.GraphQL;

/// <summary>
/// GraphQL запити для отримання даних
/// </summary>
public class Query
{
    /// <summary>
    /// Отримати поточний час сервера (UTC)
    /// </summary>
    [AllowAnonymous]
    public DateTime GetServerTime() => DateTime.UtcNow;
    
    /// <summary>
    /// DTO для метаданих збірки
    /// </summary>
    public record AppMetadataDto(string AppVersion, string ImageName, string BuildAt);

    /// <summary>
    /// Отримати метадані збірки (APP_VERSION, IMAGE_NAME, BUILD_AT)
    /// </summary>
    [AllowAnonymous]
    public AppMetadataDto GetAppMetadata([Service] IConfiguration config)
    {
        return new AppMetadataDto(
            config["APP_VERSION"] ?? "unknown",
            config["IMAGE_NAME"] ?? "unknown",
            config["BUILD_AT"] ?? "unknown"
        );
    }

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
    /// <param name="service">The template data set service.</param>
    /// <returns>A TemplateDataSet object containing the requested data and related entities, or null if no matching data set is
    /// found.</returns>
    [Authorize]
    public async Task<TemplateDataSet?> GetTemplateDataSetForDoc(
        Guid dataSetId,
        Guid templateCategoryId,
        [Service] S5Server.Services.ITemplateDataSetService service)
        => await service.GetTemplateDataSetForDocAsync(dataSetId, templateCategoryId);

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

    /// <summary>
    /// Отримати статус 2FA для поточного користувача
    /// </summary>
    [Authorize]
    public async Task<bool> GetTwoFactorStatus(
        System.Security.Claims.ClaimsPrincipal principal,
        [Service] UserManager<TVezhaUser> userManager)
    {
        var userId = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value
                     ?? principal.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub)?.Value;

        if (string.IsNullOrEmpty(userId)) return false;

        var user = await userManager.FindByIdAsync(userId);
        return user?.TwoFactorEnabled ?? false;
    }
}

