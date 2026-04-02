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
}



