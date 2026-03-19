using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Provides API endpoints for managing unit type dictionary entries. Inherits functionality for standard dictionary
/// operations from the base controller.
/// </summary>
/// <remarks>This controller is secured with authorization and is intended for use in scenarios where unit type
/// dictionary data must be accessed or modified via HTTP requests. All endpoints require authentication. The controller
/// routes requests to 'api/dict-unit-types'.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-unit-types")]
public class DictUnitTypesController : ShortDictApiController<DictUnitType>
{
    /// <summary>
    /// Provides API endpoints for managing unit type dictionary entries. Inherits functionality for standard dictionary
    /// operations from the base controller.
    /// </summary>
    /// <remarks>This controller is secured with authorization and is intended for use in scenarios where unit type
    /// dictionary data must be accessed or modified via HTTP requests. All endpoints require authentication. The controller
    /// routes requests to 'api/dict-unit-types'.</remarks>
    public DictUnitTypesController(MainDbContext db, ILogger<DictUnitTypesController> logger)
        : base(db, db.DictUnitTypes, logger) { }
}