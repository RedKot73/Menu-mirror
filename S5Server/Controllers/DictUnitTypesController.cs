using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/dict-unit-types")]
public class DictUnitTypesController : ShortDictApiController<DictUnitType>
{
    public DictUnitTypesController(MainDbContext db, ILogger<DictUnitTypesController> logger)
        : base(db, db.DictUnitTypes, logger) { }
}