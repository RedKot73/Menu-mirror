using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/dict-forces-types")]
public class DictForcesTypesController : ShortDictApiController<DictForcesType>
{
    public DictForcesTypesController(MainDbContext db,
        ILogger<DictForcesTypesController> logger)
        : base(db, db.DictForcesTypes, logger) { }
}