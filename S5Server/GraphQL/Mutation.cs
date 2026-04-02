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

public class Mutation
{
    private string GenerateJwtToken(TVezhaUser user, IList<string> roles, IConfiguration config, bool isInterim = false)
    {
        var jwtSettings = config.GetSection("JwtSettings");
        var secret = jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret not found");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName ?? ""),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("requiresTwoFactor", isInterim.ToString().ToLower())
        };

        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        var token = new JwtSecurityToken(
            issuer: jwtSettings["Issuer"],
            audience: jwtSettings["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(double.Parse(jwtSettings["ExpiryInMinutes"] ?? "120")),
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
        if (user == null)
        {
            Console.WriteLine($"[DEBUG] User {userName} not found");
            return new AuthPayload();
        }

        if (await userManager.IsLockedOutAsync(user))
        {
            Console.WriteLine($"[DEBUG] User {userName} is locked out");
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

        await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
        Console.WriteLine($"[DEBUG] Soldier loaded: {user.Soldier != null}");

        if (user.TwoFactorEnabled)
        {
            Console.WriteLine($"[DEBUG] 2FA enabled for user {userName}. Generating interim token.");
            // Step 1: Return interim token to allow /welcome access
            var interimToken = GenerateJwtToken(user, roles, config, isInterim: true);
            return new AuthPayload(
                Token: interimToken,
                RequiresTwoFactor: true,
                UserId: user.Id
            );
        }

        Console.WriteLine($"[DEBUG] 2FA NOT enabled for user {userName}. Generating full token.");
        // Standard Login
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
        [Service] ClaimsPrincipal principal,
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
                // If soft mode, we might still want to allow, but let's see why it failed
            }
        }
        else 
        {
            Console.WriteLine($"[WARNING] No authenticator key for user {user.UserName}");
        }

        if (!isValid)
        {
            if (isSoftMode)
            {
                Console.WriteLine($"[DEBUG] 2FA Check Failed for user {user.UserName}. Soft Mode active: Waiting 3s...");
                await Task.Delay(3000);
                // After delay, we allow access
            }
            else
            {
                // Invalid code and not in soft mode
                return new AuthPayload(); 
            }
        }

        var roles = await userManager.GetRolesAsync(user);
        
        await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
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


