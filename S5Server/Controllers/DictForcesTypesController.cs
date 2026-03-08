using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Represents an API controller that manages dictionary entries for types of forces.
/// </summary>
/// <remarks>This controller provides endpoints for retrieving and managing force type dictionary data. It
/// inherits standard CRUD operations from the base ShortDictApiController. Access to the endpoints requires
/// authorization.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-forces-types")]
public class DictForcesTypesController : ShortDictApiController<DictForcesType>
{
    /// <summary>
    /// Represents an API controller that manages dictionary entries for types of forces.
    /// </summary>
    /// <remarks>This controller provides endpoints for retrieving and managing force type dictionary data. It
    /// inherits standard CRUD operations from the base ShortDictApiController. Access to the endpoints requires
    /// authorization.</remarks>
    public DictForcesTypesController(MainDbContext db,
        ILogger<DictForcesTypesController> logger)
        : base(db, db.DictForcesTypes, logger) { }
}