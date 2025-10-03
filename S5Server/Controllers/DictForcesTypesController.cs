using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Route("api/dict-forces-types")]
public class DictForcesTypesController : ShortDictApiController<DictForcesType>
{
    public DictForcesTypesController(MainDbContext db) : base(db, db.DictForcesTypes) { }
}