using Microsoft.AspNetCore.Identity;
using S5Server.Data;
using S5Server.Models;

namespace S5Server.Services;

/// <summary>
/// Result of an authentication attempt.
/// </summary>
/// <param name="Success">Whether the authentication was successful.</param>
/// <param name="RequiresTwoFactor">Whether 2FA verification is required.</param>
/// <param name="Needs2FASetup">Whether 2FA setup is required.</param>
/// <param name="User">The authenticated user.</param>
/// <param name="Roles">The user roles.</param>
/// <param name="ErrorMessage">Error message if authentication failed.</param>
/// <param name="IsLockedOut">Whether the user is locked out.</param>
/// <param name="LockoutEnd">When the lockout ends.</param>
public record AuthenticationResult(
    bool Success = false,
    bool RequiresTwoFactor = false,
    bool Needs2FASetup = false,
    TVezhaUser? User = null,
    IList<string>? Roles = null,
    string? ErrorMessage = null,
    bool IsLockedOut = false,
    DateTimeOffset? LockoutEnd = null
);

/// <summary>
/// Domain service for handling core authentication and 2FA logic.
/// </summary>
public interface IAuthDomainService
{
    /// <summary>
    /// Authenticates a user with username and password.
    /// </summary>
    /// <param name="userManager">The identity user manager injected from the caller's scope.</param>
    /// <param name="context">The database context injected from the caller's scope.</param>
    /// <param name="config">The configuration instance injected from the caller's scope.</param>
    /// <param name="userName">The username.</param>
    /// <param name="password">The password.</param>
    /// <returns>The authentication result.</returns>
    Task<AuthenticationResult> AuthenticateAsync(UserManager<TVezhaUser> userManager, MainDbContext context, IConfiguration config, string userName, string password);

    /// <summary>
    /// Verifies a two-factor authentication code.
    /// </summary>
    /// <param name="userManager">The identity user manager injected from the caller's scope.</param>
    /// <param name="context">The database context injected from the caller's scope.</param>
    /// <param name="config">The configuration instance injected from the caller's scope.</param>
    /// <param name="userId">The user ID.</param>
    /// <param name="code">The 2FA code.</param>
    /// <returns>The authentication result.</returns>
    Task<AuthenticationResult> VerifyTwoFactorAsync(UserManager<TVezhaUser> userManager, MainDbContext context, IConfiguration config, string userId, string code);
}
