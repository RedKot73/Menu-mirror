using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using HotChocolate;
using HotChocolate.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using OtpNet;
using S5Server.Models;
using S5Server.Data; // Добавлено для MainDbContext
using Microsoft.Extensions.Logging;
using S5Server.Services;

namespace S5Server.GraphQL;

/// <summary>
/// GraphQL mutations for authentication and authorization.
/// </summary>
public class AuthMutation
{
    private readonly ILogger<AuthMutation> _logger;

    private readonly IAuthDomainService _authService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthMutation"/> class.
    /// Logs current 2FA security configuration.
    /// </summary>
    /// <param name="logger">The logger instance.</param>
    /// <param name="config">The configuration instance.</param>
    /// <param name="authService">The authentication domain service.</param>
    public AuthMutation(ILogger<AuthMutation> logger, IConfiguration config, IAuthDomainService authService)
    {
        _logger = logger;
        _authService = authService;
        var requireMandatory = config.GetValue<bool>("REQUIRE_MANDATORY_2FA", false);
        var twoFactorMode = config["TWO_FACTOR_MODE"] ?? "strict";
        _logger.LogInformation("[DEBUG] 2FA CONFIGURATION: Mandatory={Mandatory}, Mode={Mode}", requireMandatory, twoFactorMode);
    }

    private string GenerateJwtToken(TVezhaUser user, IList<string> roles, IConfiguration config, bool isInterim = false)
    {
        var jwtSettings = config.GetSection("JwtSettings");
        var secret = config["JwtSettings:Secret"] ?? throw new InvalidOperationException("JWT Secret is not initialized");
        var issuer = config["JwtSettings:Issuer"] ?? throw new InvalidOperationException("JWT Issuer is not initialized");
        var audience = config["JwtSettings:Audience"] ?? throw new InvalidOperationException("JWT Audience is not initialized");
        var expiryMinutesStr = jwtSettings["ExpiryInMinutes"] ?? "120";

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("requiresTwoFactor", isInterim.ToString().ToLower()),
            new Claim("twoFactorMode", (config["TWO_FACTOR_MODE"] ?? "strict").ToLower())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(expiryMinutesStr)),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    /// <summary>
    /// Performs a user login and returns an authentication payload.
    /// </summary>
    /// <param name="userName">The user's login name.</param>
    /// <param name="password">The user's password.</param>
    /// <param name="userManager">The identity user manager.</param>
    /// <param name="context">The database context.</param>
    /// <param name="config">Application configuration service.</param>
    /// <returns>An AuthPayload containing a JWT token or 2FA requirement.</returns>
    [AllowAnonymous]
    public async Task<AuthPayload> Login(
        string userName,
        string password,
        [Service] UserManager<TVezhaUser> userManager,
        [Service] MainDbContext context,
        [Service] IConfiguration config)
    {
        var authResult = await _authService.AuthenticateAsync(userManager, context, config, userName, password);

        if (!authResult.Success || authResult.User == null)
        {
            if (authResult.IsLockedOut)
            {
                return new AuthPayload(); // Standard behavior for locked out
            }
            throw new GraphQLException(authResult.ErrorMessage ?? "Invalid password");
        }

        var user = authResult.User;
        var roles = authResult.Roles ?? new List<string>();

        if (authResult.RequiresTwoFactor)
        {
            var interimToken = GenerateJwtToken(user, roles, config, isInterim: true);
            return new AuthPayload(
                Token: interimToken,
                RequiresTwoFactor: true,
                UserId: user.Id
            );
        }
        else if (authResult.Needs2FASetup)
        {
            Console.WriteLine($"[DEBUG] Mandatory 2FA triggered for user {userName}. Returning SetupRequired status.");
            var interimToken = GenerateJwtToken(user, roles, config, isInterim: true);
            return new AuthPayload(
                Token: interimToken,
                RequiresTwoFactor: false,
                Needs2FASetup: true,
                UserId: user.Id
            );
        }

        var token = GenerateJwtToken(user, roles, config);
        return new AuthPayload(
            Token: token,
            RequiresTwoFactor: false,
            User: user.ToInfoDto(roles)
        );
    }

    /// <summary>
    /// Verifies a two-factor authentication code and returns a final authentication payload.
    /// </summary>
    /// <param name="code">The TOTP code from the authenticator app.</param>
    /// <param name="principal">The current authenticated user principal (interim token).</param>
    /// <param name="userManager">The identity user manager.</param>
    /// <param name="context">The database context.</param>
    /// <param name="config">Application configuration service.</param>
    /// <returns>An AuthPayload containing the final JWT token.</returns>
    [Authorize]
    public async Task<AuthPayload> VerifyTwoFactor(
        string code,
        ClaimsPrincipal principal,
        [Service] UserManager<TVezhaUser> userManager,
        [Service] MainDbContext context,
        [Service] IConfiguration config)
    {
        var userIdStr = principal.FindFirstValue(ClaimTypes.NameIdentifier) 
                       ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
        
        if (string.IsNullOrEmpty(userIdStr)) 
            throw new GraphQLException("Unauthorized");

        var authResult = await _authService.VerifyTwoFactorAsync(userManager, context, config, userIdStr, code);

        if (!authResult.Success || authResult.User == null)
        {
            return new AuthPayload();
        }

        var user = authResult.User;
        var roles = authResult.Roles ?? new List<string>();

        var token = GenerateJwtToken(user, roles, config);

        return new AuthPayload(
            Token: token,
            RequiresTwoFactor: false,
            User: user.ToInfoDto(roles)
        );
    }

    /// <summary>
    /// Returns the current 2FA setup payload (QR URI + manual key).
    /// Generates a NEW secret only if none exists yet — does NOT regenerate if one is already set.
    /// Call this to display setup QR code for the current user.
    /// </summary>
    [Authorize]
    public async Task<TwoFactorSetupPayload> GetTwoFactorSetup(
        ClaimsPrincipal principal,
        [Service] UserManager<TVezhaUser> userManager,
        [Service] IConfiguration config)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(userId))
            throw new GraphQLException("Unauthorized");

        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
            throw new GraphQLException("User not found");

        // Only generate a new key if one does not exist yet.
        // Regenerating would break any authenticator apps already configured.
        var unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
        if (string.IsNullOrEmpty(unformattedKey))
        {
            await userManager.ResetAuthenticatorKeyAsync(user);
            unformattedKey = await userManager.GetAuthenticatorKeyAsync(user);
        }
        else
        {
        }

        if (string.IsNullOrEmpty(unformattedKey))
            throw new GraphQLException("Failed to generate authenticator key");

        var issuer = config["TOTP:Issuer"];
        if (string.IsNullOrEmpty(issuer))
        {
             // Fallback to JwtSettings:Issuer or hardcoded default
             issuer = config["JwtSettings:Issuer"] ?? throw new InvalidOperationException("JWT Issuer is not initialized");
        }
        
        var email = user.Email ?? user.UserName ?? "User";
        var qrUri = $"otpauth://totp/{Uri.EscapeDataString(issuer)}:{Uri.EscapeDataString(email)}?secret={unformattedKey}&issuer={Uri.EscapeDataString(issuer)}";

        return new TwoFactorSetupPayload(qrUri, unformattedKey, DateTime.UtcNow.ToString("O"));
    }

    /// <summary>
    /// Verifies the submitted TOTP configuration code and enables 2FA for the account.
    /// </summary>
    [Authorize]
    public async Task<bool> EnableTwoFactor(
        string code,
        ClaimsPrincipal principal,
        [Service] UserManager<TVezhaUser> userManager)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(userId))
            throw new GraphQLException("Unauthorized");

        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
            throw new GraphQLException("User not found");

        var authenticatorKey = await userManager.GetAuthenticatorKeyAsync(user);
        if (string.IsNullOrEmpty(authenticatorKey))
             throw new GraphQLException("Missing Authenticator Config");

        var keyBytes = Base32Encoding.ToBytes(authenticatorKey);
        var totp = new Totp(keyBytes);
        // Window (1,1) = allows ±30s clock drift — standardized for all verification steps
        var isValid = totp.VerifyTotp(code, out long matchedStep, new VerificationWindow(1, 1));

        if (isValid)
        {
            Console.WriteLine($"[DEBUG] 2FA Enabled successfully for user {user.UserName}. Transitioning to Step 2 without logout.");
            await userManager.SetTwoFactorEnabledAsync(user, true);
        }

        return isValid;
    }

    /// <summary>
    /// Disables two-factor authentication for the current user after validating their password.
    /// </summary>
    /// <param name="password">The current user's password to confirm the identity.</param>
    /// <param name="principal">The security principal representing the current authenticated user.</param>
    /// <param name="userManager">Identity UserManager service for updating user settings.</param>
    /// <returns>True if 2FA was successfully disabled; otherwise, false if the password was incorrect.</returns>
    [Authorize]
    public async Task<bool> DisableTwoFactor(
        string password,
        ClaimsPrincipal principal,
        [Service] UserManager<TVezhaUser> userManager)
    {
        var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier)
                     ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);

        if (string.IsNullOrEmpty(userId))
            throw new GraphQLException("Unauthorized");

        var user = await userManager.FindByIdAsync(userId);
        if (user == null)
            throw new GraphQLException("User not found");

        var passwordValid = await userManager.CheckPasswordAsync(user, password);
        if (!passwordValid)
        {
            return false;
        }

        var result = await userManager.SetTwoFactorEnabledAsync(user, false);
        if (result.Succeeded)
        {
            return true;
        }

        return false;
    }
}

/// <summary>
/// Represents the data required for a user to set up two-factor authentication.
/// </summary>
/// <param name="QrUri">The otpauth URI for generating the QR code (e.g. for Google Authenticator).</param>
/// <param name="ManualEntryKey">The unformatted secret key for manual entry if QR scanning is not available.</param>
/// <param name="ServerTimeIso">The current server time in ISO-8601 format to help users verify time synchronization.</param>
public record TwoFactorSetupPayload(string QrUri, string ManualEntryKey, string ServerTimeIso);
