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

namespace S5Server.GraphQL;

/// <summary>
/// GraphQL mutations for authentication and authorization.
/// </summary>
public class AuthMutation
{
    private string GenerateJwtToken(TVezhaUser user, IList<string> roles, IConfiguration config, bool isInterim = false)
    {
        var jwtSettings = config.GetSection("JwtSettings");
        var secret = jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret not found in configuration (JwtSettings:Secret)");
        var issuer = jwtSettings["Issuer"] ?? "S5Server";
        var audience = jwtSettings["Audience"] ?? "S5Server";
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
    /// <param name="userManager">Identity UserManager service.</param>
    /// <param name="config">Application configuration service.</param>
    /// <param name="context">Database context for eager loading.</param>
    /// <returns>An AuthPayload containing a JWT token or 2FA requirement.</returns>
    [AllowAnonymous]
    public async Task<AuthPayload> Login(
        string userName,
        string password,
        [Service] UserManager<TVezhaUser> userManager,
        [Service] IConfiguration config,
        [Service] MainDbContext context)
    {
        Console.WriteLine($"[DEBUG] Login attempt for user: {userName}");
        var user = await userManager.FindByNameAsync(userName);
        if (user == null || await userManager.IsLockedOutAsync(user))
        {
            Console.WriteLine($"[DEBUG] User {userName} not found or locked out");
            return new AuthPayload();
        }

        var result = await userManager.CheckPasswordAsync(user, password);
        if (!result)
        {
            Console.WriteLine($"[DEBUG] Invalid password for user {userName}");
            await userManager.AccessFailedAsync(user);
            throw new GraphQLException("Invalid password");
        }

        Console.WriteLine($"[DEBUG] Password check successful for user {userName}");
        await userManager.ResetAccessFailedCountAsync(user);
        var roles = await userManager.GetRolesAsync(user);

        // Mandatory Eager Loading for Soldier
        await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
        if (user.Soldier != null)
        {
            await context.Entry(user.Soldier).Reference(s => s.Rank).LoadAsync();
        }
        Console.WriteLine($"[DEBUG] Soldier loaded: {user.Soldier != null}");

        if (user.TwoFactorEnabled)
        {
            Console.WriteLine($"[DEBUG] 2FA enabled for user {userName}. Generating interim token.");
            var interimToken = GenerateJwtToken(user, roles, config, isInterim: true);
            return new AuthPayload(
                Token: interimToken,
                RequiresTwoFactor: true,
                UserId: user.Id
            );
        }

        Console.WriteLine($"[DEBUG] 2FA NOT enabled for user {userName}. Generating full token.");
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
    /// <param name="userManager">Identity UserManager service.</param>
    /// <param name="principal">The current authenticated user principal (interim token).</param>
    /// <param name="config">Application configuration service.</param>
    /// <param name="context">Database context for eager loading.</param>
    /// <returns>An AuthPayload containing the final JWT token.</returns>
    [Authorize]
    public async Task<AuthPayload> VerifyTwoFactor(
        string code,
        [Service] UserManager<TVezhaUser> userManager,
        ClaimsPrincipal principal,
        [Service] IConfiguration config,
        [Service] MainDbContext context)
    {
        var userIdStr = principal.FindFirstValue(ClaimTypes.NameIdentifier) 
                       ?? principal.FindFirstValue(JwtRegisteredClaimNames.Sub);
        
        if (string.IsNullOrEmpty(userIdStr)) 
            throw new GraphQLException("Unauthorized");

        var user = await userManager.FindByIdAsync(userIdStr);
        if (user == null) throw new GraphQLException("User not found");

        // Verify TOTP via OtpNet
        var authenticatorKey = await userManager.GetAuthenticatorKeyAsync(user);
        
        var isSoftMode = config["TWO_FACTOR_MODE"]?.ToLower() == "soft";
        bool isValid = false;

        if (!string.IsNullOrEmpty(authenticatorKey))
        {
            try 
            {
                var keyBytes = Base32Encoding.ToBytes(authenticatorKey);
                var totp = new Totp(keyBytes);
                isValid = totp.VerifyTotp(code, out _, new VerificationWindow(1, 1));
                Console.WriteLine($"[DEBUG] TOTP Verification. User: {user.UserName}. ServerTime: {DateTime.UtcNow:O}. Result: {(isValid ? "Success" : "Fail")}.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[ERROR] TOTP verification error: {ex.Message}");
            }
        }

        if (!isValid)
        {
            if (isSoftMode)
            {
                Console.WriteLine($"[DEBUG] 2FA Check Failed for user {user.UserName}. Soft Mode active: Waiting 10s...");
                await Task.Delay(10000);
                Console.WriteLine($"[DEBUG] Soft Mode: Delay 10s finished. Issuing final token for {user.UserName}");
            }
            else
            {
                return new AuthPayload(); 
            }
        }

        var roles = await userManager.GetRolesAsync(user);
        
        // Mandatory Eager Loading for Soldier
        await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
        if (user.Soldier != null)
        {
            await context.Entry(user.Soldier).Reference(s => s.Rank).LoadAsync();
        }
        Console.WriteLine($"[DEBUG] Soldier loaded in Verify: {user.Soldier != null}");

        var token = GenerateJwtToken(user, roles, config);
        Console.WriteLine($"[DEBUG] 2FA SUCCESS for user {user.UserName}. Token length: {token?.Length}");

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
            Console.WriteLine($"[DEBUG] 2FA Setup initiated for User {user.Id}. New secret generated. ServerTime: {DateTime.UtcNow:O}. Issuer: {config["TOTP__Issuer"] ?? config["JwtSettings:Issuer"] ?? "S5Server"}.");
        }
        else
        {
            Console.WriteLine($"[DEBUG] 2FA Setup initiated for User {user.Id}. Returning EXISTING secret. ServerTime: {DateTime.UtcNow:O}. Issuer: {config["TOTP__Issuer"] ?? config["JwtSettings:Issuer"] ?? "S5Server"}.");
        }

        if (string.IsNullOrEmpty(unformattedKey))
            throw new GraphQLException("Failed to generate authenticator key");

        var issuer = config["TOTP__Issuer"] ?? config["JwtSettings:Issuer"] ?? "S5Server";
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
             throw new GraphQLException("Mising Authenticator Config");

        var keyBytes = Base32Encoding.ToBytes(authenticatorKey);
        var totp = new Totp(keyBytes);
        // Window (1,1) = allows ±30s clock drift — standardized for all verification steps
        var isValid = totp.VerifyTotp(code, out long matchedStep, new VerificationWindow(1, 1));

        Console.WriteLine($"[DEBUG] TOTP Verification (Setup). User: {user.UserName}. ServerTime: {DateTime.UtcNow:O}. Result: {(isValid ? "Success" : "Fail")}.");

        if (isValid)
        {
            await userManager.SetTwoFactorEnabledAsync(user, true);
            Console.WriteLine($"[DEBUG] 2FA enabled for user {user.UserName}.");
        }

        return isValid;
    }

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
            Console.WriteLine($"[DEBUG] 2FA Disable FAILED for user {user.UserName}. Invalid password.");
            return false;
        }

        var result = await userManager.SetTwoFactorEnabledAsync(user, false);
        if (result.Succeeded)
        {
            Console.WriteLine($"[DEBUG] 2FA Toggle changed for user {user.UserName}. Status: Disabled.");
            return true;
        }

        return false;
    }
}

public record TwoFactorSetupPayload(string QrUri, string ManualEntryKey, string ServerTimeIso);
