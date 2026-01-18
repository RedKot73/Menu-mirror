using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Типи Напрямку ЛБЗ
/// </summary>
[ApiController]
[Route("api/dict-area-types")]
public class DictAreaTypesController : ShortDictApiController<DictAreaType>
{
    public DictAreaTypesController(
        MainDbContext db,
        ILogger<DictAreaTypesController> logger)
        : base(db, db.DictAreaTypes, logger) { }
}