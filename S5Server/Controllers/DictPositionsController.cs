using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Route("api/dict-positions")]
public class DictPositionsController : SimpleDictApiController<DictPosition>
{
    public DictPositionsController(MainDbContext db) : base(db, db.DictPositions) { }
}