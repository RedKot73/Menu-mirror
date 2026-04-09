using S5Server.Models;

namespace S5Server.Models;

/// <summary>
/// Payload returned by authentication mutations.
/// </summary>
/// <param name="Token">JWT Bearer Token (if authenticated or interim)</param>
/// <param name="RequiresTwoFactor">True if 2FA verification is pending</param>
/// <param name="Needs2FASetup">True if the user needs to set up 2FA</param>
/// <param name="UserId">ID of the user (for 2FA phase)</param>
/// <param name="User">Full user details (if fully authenticated)</param>
public record AuthPayload(
    string? Token = null,
    bool RequiresTwoFactor = false,
    bool Needs2FASetup = false,
    Guid? UserId = null,
    UserInfoDto? User = null
);
