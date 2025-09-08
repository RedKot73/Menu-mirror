using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Route("api/dict-unit-types")]
public class DictUnitTypesController : SimpleDictApiController<DictUnitType>
{
    public DictUnitTypesController(MainDbContext db) : base(db, db.DictUnitTypes) { }
}