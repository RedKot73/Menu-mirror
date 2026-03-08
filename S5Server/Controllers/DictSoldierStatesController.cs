using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Provides API endpoints for managing soldier state dictionary entries.
/// </summary>
/// <remarks>This controller exposes CRUD operations for soldier state reference data via RESTful endpoints.
/// Access to these endpoints requires authentication. Inherits standard dictionary management functionality from
/// SimpleDictApiController.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-soldier-states")]
public class DictSoldierStatesController : SimpleDictApiController<DictSoldierState>
{
    /// <summary>
    /// Provides API endpoints for managing soldier state dictionary entries.
    /// </summary>
    /// <remarks>This controller exposes CRUD operations for soldier state reference data via RESTful endpoints.
    /// Access to these endpoints requires authentication. Inherits standard dictionary management functionality from
    /// SimpleDictApiController.</remarks>
    public DictSoldierStatesController(MainDbContext db, ILogger<DictSoldierStatesController> logger) : base(db, db.DictSoldierStates, logger) { }
}