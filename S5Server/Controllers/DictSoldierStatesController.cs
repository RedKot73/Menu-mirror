using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Route("api/dict-soldier-states")]
public class DictSoldierStatesController : SimpleDictApiController<DictSoldierState>
{
    public DictSoldierStatesController(MainDbContext db) : base(db, db.DictSoldierStates) { }
}