using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// Represents an API controller for managing template category dictionary entries.
/// </summary>
/// <remarks>This controller provides endpoints for retrieving and managing template category data in the
/// dictionary. Access to the endpoints requires authorization. Inherits common functionality from
/// ShortDictApiController for handling dictionary entities.</remarks>
[Authorize]
[ApiController]
[Route("api/dict-template-categories")]
public class DictTemplateCategoriesController : ShortDictApiController<DictTemplateCategory>
{
    /// <summary>
    /// Initializes a new instance of the DictTemplateCategoriesController class with the specified database context and
    /// logger.
    /// </summary>
    /// <param name="db">The database context used to access and manage template category data.</param>
    /// <param name="logger">The logger used to record diagnostic and operational information for this controller.</param>
    public DictTemplateCategoriesController(MainDbContext db, ILogger<DictTemplateCategoriesController> logger)
        : base(db, db.DictTemplateCategories, logger) { }
}