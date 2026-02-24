using Microsoft.AspNetCore.Mvc;

namespace S5Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorController : ControllerBase
    {
        [HttpGet]
        [HttpPost]
        public IActionResult Error() => Problem();
    }
}
