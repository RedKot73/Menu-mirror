using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Типи Напрямку ЛБЗ
/// </summary>
[Authorize]
[ApiController]
[Route("api/dict-area-types")]
public class DictAreaTypesController : ShortDictApiController<DictAreaType>
{
    /// <summary>
    /// Типи Напрямку ЛБЗ
    /// </summary>
    public DictAreaTypesController(
        MainDbContext db,
        ILogger<DictAreaTypesController> logger)
        : base(db, db.DictAreaTypes, logger) { }
}