using Microsoft.AspNetCore.Mvc;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[ApiController] // важно для авто-валидации и ProblemDetails по умолчанию
[Route("api/dict-forces-types")]
public class DictForcesTypesController : ShortDictApiController<DictForcesType>
{
    public DictForcesTypesController(MainDbContext db,
        ILogger<DictForcesTypesController> logger)
        : base(db, db.DictForcesTypes, logger) { }
}