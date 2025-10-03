using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Controllers;

[ApiController]
[Route("api/dict-unit-types")]
public class DictUnitTypesController : ShortDictApiController<DictUnitType>
{
    public DictUnitTypesController(MainDbContext db) : base(db, db.DictUnitTypes) { }
}