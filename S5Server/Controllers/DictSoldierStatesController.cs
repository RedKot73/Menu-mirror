using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/dict-soldier-states")]
public class DictSoldierStatesController : SimpleDictApiController<DictSoldierState>
{
    public DictSoldierStatesController(MainDbContext db, ILogger<DictSoldierStatesController> logger) : base(db, db.DictSoldierStates, logger) { }
}