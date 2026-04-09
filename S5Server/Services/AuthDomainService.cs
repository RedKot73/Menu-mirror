using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OtpNet;
using S5Server.Data;
using S5Server.Models;
using System.Security.Claims;

namespace S5Server.Services;

/// <summary>
/// Domain service implementation for handling core authentication and 2FA logic.
/// </summary>
public class AuthDomainService : IAuthDomainService
{
    private readonly ILogger<AuthDomainService> _logger;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthDomainService"/> class.
    /// </summary>
    /// <param name="logger">The logger instance.</param>
    public AuthDomainService(ILogger<AuthDomainService> logger)
    {
        _logger = logger;
    }

    /// <inheritdoc />
    public async Task<AuthenticationResult> AuthenticateAsync(UserManager<TVezhaUser> userManager, MainDbContext context, IConfiguration config, string userName, string password)
    {
        try
        {
            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return new AuthenticationResult(ErrorMessage: "Invalid username or password");
            }

            if (await userManager.IsLockedOutAsync(user))
            {
                return new AuthenticationResult(
                    IsLockedOut: true,
                    LockoutEnd: user.LockoutEnd,
                    ErrorMessage: "Account is locked"
                );
            }

            var result = await userManager.CheckPasswordAsync(user, password);
            if (!result)
            {
                await userManager.AccessFailedAsync(user);
                return new AuthenticationResult(ErrorMessage: "Invalid username or password");
            }

            await userManager.ResetAccessFailedCountAsync(user);

            var requireMandatory2fa = config.GetValue<bool>("REQUIRE_MANDATORY_2FA", false);
            var roles = await userManager.GetRolesAsync(user);

            if (!user.TwoFactorEnabled && !requireMandatory2fa)
            {
                // Update last login date only if NO 2FA is required.
                // If 2FA is required, update will happen later in VerifyTwoFactorAsync.
                user.LastLoginDate = DateTime.UtcNow;
                var updateResult = await UpdateUserWithRetryAsync(userManager, user);
                if (!updateResult.Succeeded)
                {
                    return new AuthenticationResult(ErrorMessage: "Failed to update login status");
                }
            }

            // Eager Loading for Soldier data (Consistency with existing logic)
            await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
            if (user.Soldier != null)
            {
                await context.Entry(user.Soldier).Reference(s => s.Rank).LoadAsync();
            }

            if (user.TwoFactorEnabled)
            {
                return new AuthenticationResult(
                    Success: true,
                    RequiresTwoFactor: true,
                    User: user,
                    Roles: roles
                );
            }
            else if (requireMandatory2fa)
            {
                return new AuthenticationResult(
                    Success: true,
                    Needs2FASetup: true,
                    User: user,
                    Roles: roles
                );
            }

            return new AuthenticationResult(
                Success: true,
                User: user,
                Roles: roles
            );
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error in AuthenticateAsync for user {User}", userName);
            return new AuthenticationResult(ErrorMessage: "Internal server error during authentication");
        }
    }

    /// <inheritdoc />
    public async Task<AuthenticationResult> VerifyTwoFactorAsync(UserManager<TVezhaUser> userManager, MainDbContext context, IConfiguration config, string userId, string code)
    {
        try
        {
            // Reload user to ensure we have the latest ConcurrencyStamp
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new AuthenticationResult(ErrorMessage: "User not found");
            }

            if (await userManager.IsLockedOutAsync(user))
            {
                return new AuthenticationResult(
                    IsLockedOut: true,
                    LockoutEnd: user.LockoutEnd,
                    ErrorMessage: "Account is locked"
                );
            }

            var authenticatorKey = await userManager.GetAuthenticatorKeyAsync(user);
            var twoFactorMode = config["TWO_FACTOR_MODE"] ?? "strict";
            var isSoftMode = twoFactorMode.ToLower() == "soft";

            _logger.LogInformation("[DEBUG] AuthDomainService VerifyTwoFactor: User={User}, Mode={Mode}", user.UserName, twoFactorMode);

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
                    _logger.LogError(ex, "TOTP verification error for user {UserId}", userId);
                }
            }

        if (!isValid && !isSoftMode)
        {
            _logger.LogWarning("[DEBUG] 2FA Verification FAILED for user {UserName}. Mode: {Mode}", user.UserName, twoFactorMode);
            await userManager.AccessFailedAsync(user);
            return new AuthenticationResult(ErrorMessage: "Invalid 2FA code");
        }

        if (isValid)
        {
            _logger.LogInformation("[DEBUG] 2FA Verification SUCCESS for user {UserName}. Mode: {Mode}", user.UserName, twoFactorMode);
            await userManager.ResetAccessFailedCountAsync(user);
        }
        else if (isSoftMode)
        {
            _logger.LogWarning("[DEBUG] 2FA Check Failed for user {UserName}, but access granted due to Soft Mode.", user.UserName);
        }

            // Finalize login after 2FA
            user.LastLoginDate = DateTime.UtcNow;
            var updateResult = await UpdateUserWithRetryAsync(userManager, user);

            if (!updateResult.Succeeded)
            {
                return new AuthenticationResult(ErrorMessage: "Failed to finalize login session");
            }

            var roles = await userManager.GetRolesAsync(user);

            // Eager Loading for Soldier
            await context.Entry(user).Reference(u => u.Soldier).LoadAsync();
            if (user.Soldier != null)
            {
                await context.Entry(user.Soldier).Reference(s => s.Rank).LoadAsync();
            }

            return new AuthenticationResult(
                Success: true,
                User: user,
                Roles: roles
            );
        }
        catch (Exception ex)
        {
            _logger.LogCritical(ex, "CRITICAL ERROR in VerifyTwoFactorAsync for User ID {UserId}", userId);
            return new AuthenticationResult(ErrorMessage: "Internal server error during 2FA verification");
        }
    }

    private async Task<IdentityResult> UpdateUserWithRetryAsync(UserManager<TVezhaUser> userManager, TVezhaUser user)
    {
        try
        {
            return await userManager.UpdateAsync(user);
        }
        catch (DbUpdateConcurrencyException)
        {
            _logger.LogWarning("Concurrency conflict detected for user {User}. Retrying...", user.UserName);
            
            var freshUser = await userManager.FindByIdAsync(user.Id.ToString());
            if (freshUser == null) return IdentityResult.Failed(new IdentityError { Description = "User disappeared" });

            freshUser.LastLoginDate = user.LastLoginDate;
            freshUser.TwoFactorEnabled = user.TwoFactorEnabled;
            
            return await userManager.UpdateAsync(freshUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error during UpdateUserAsync for {User}", user.UserName);
            return IdentityResult.Failed(new IdentityError { Description = ex.Message });
        }
    }
}
