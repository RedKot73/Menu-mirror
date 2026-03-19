using Microsoft.AspNetCore.Mvc;

namespace S5Server.Controllers
{
    /// <summary>
    /// Handles error requests and returns a standardized problem response suitable for API clients.
    /// </summary>
    /// <remarks>This controller provides a generic endpoint for error handling in API scenarios. It can be
    /// used as a centralized error handler to return consistent error information in accordance with RFC 7807 (Problem
    /// Details for HTTP APIs). The endpoint supports both GET and POST requests, making it suitable for various error
    /// handling workflows.</remarks>
    [ApiController]
    [Route("api/[controller]")]
    public class ErrorController : ControllerBase
    {
        /// <summary>
        /// Handles error requests and returns a standardized problem response suitable for API clients.
        /// </summary>
        /// <remarks>This controller provides a generic endpoint for error handling in API scenarios. It can be
        /// used as a centralized error handler to return consistent error information in accordance with RFC 7807 (Problem
        /// Details for HTTP APIs). The endpoint supports both GET and POST requests, making it suitable for various error
        /// handling workflows.</remarks>
        [HttpGet]
        [HttpPost]
        public IActionResult Error() => Problem();
    }
}
