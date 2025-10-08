using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[ApiController] // важно для авто-валидации и ProblemDetails по умолчанию
[Route("api/dict-positions")]
public class DictPositionsController : SimpleDictApiController<DictPosition>
{
    public DictPositionsController(MainDbContext db, ILogger<DictPositionsController> logger)
        : base(db, db.DictPositions, logger) { }
}