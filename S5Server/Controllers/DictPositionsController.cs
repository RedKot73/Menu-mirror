using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Provides API endpoints for managing position dictionary entries.
/// </summary>
/// <remarks>This controller enables CRUD operations for position dictionary records via RESTful endpoints. Access
/// to these endpoints requires authentication. Inherits common dictionary management functionality from
/// SimpleDictApiController.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-positions")]
public class DictPositionsController : SimpleDictApiController<DictPosition>
{
    /// <summary>
    /// Provides API endpoints for managing position dictionary entries.
    /// </summary>
    /// <remarks>This controller enables CRUD operations for position dictionary records via RESTful endpoints. Access
    /// to these endpoints requires authentication. Inherits common dictionary management functionality from
    /// SimpleDictApiController.</remarks>
    public DictPositionsController(MainDbContext db, ILogger<DictPositionsController> logger)
        : base(db, db.DictPositions, logger) { }
}