using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Route("api/dict-areas")]
public class DictAreasController : SimpleDictApiController<DictArea>
{
    public DictAreasController(MainDbContext db) : base(db, db.DictAreas) { }
}