using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[ApiController] // важно для авто-валидации и ProblemDetails по умолчанию
[Route("api/dict-soldier-states")]
public class DictSoldierStatesController : SimpleDictApiController<DictSoldierState>
{
    public DictSoldierStatesController(MainDbContext db, ILogger<DictSoldierStatesController> logger) : base(db, db.DictSoldierStates, logger) { }
}