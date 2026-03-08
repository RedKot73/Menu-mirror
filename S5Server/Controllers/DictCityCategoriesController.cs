using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Категорії об'єктів адміністративно-територіальних одиниць
/// </summary>
[Authorize]
[ApiController]
[Route("api/dict-city-categories")]
public class DictCityCategoriesController : ShortDictApiController<DictCityCategory>
{
    /// <summary>
    /// Категорії об'єктів адміністративно-територіальних одиниць
    /// </summary>
    public DictCityCategoriesController(
        MainDbContext db,
        ILogger<DictCityCategoriesController> logger)
        : base(db, db.DictCityCategories, logger) { }
}