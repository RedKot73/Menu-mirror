using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Controllers;

[Authorize]
[ApiController]
[Route("api/dict-template-categories")]
public class DictTemplateCategoriesController : ShortDictApiController<DictTemplateCategory>
{
    public DictTemplateCategoriesController(MainDbContext db, ILogger<DictTemplateCategoriesController> logger)
        : base(db, db.DictTemplateCategories, logger) { }
}