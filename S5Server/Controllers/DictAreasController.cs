using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[ApiController] // важно для авто-валидации и ProblemDetails по умолчанию
[Route("api/dict-areas")]
public class DictAreasController : SimpleDictApiController<DictArea>
{
    public DictAreasController(MainDbContext db, ILogger<DictAreasController> logger) : base(db, db.DictAreas, logger) { }
}