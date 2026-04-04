using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using S5Server.Models;

namespace S5Server.Controllers;

/// <summary>
/// API для керування двофакторною аутентифікацією (TOTP)
/// </summary>
[ApiController]
[Route("api/totp")]
[Authorize]
public class TotpController : ControllerBase
{
    private readonly UserManager<TVezhaUser> _userManager;
    private readonly ILogger<TotpController> _logger;
    private readonly UrlEncoder _urlEncoder;
    private readonly IConfiguration _config;

    private const string AuthenticatorUriFormat = "otpauth://totp/{0}:{1}?secret={2}&issuer={0}&digits=6";

    /// <summary>
    /// Конструктор контролера TOTP
    /// </summary>
    public TotpController(
        UserManager<TVezhaUser> userManager,
        ILogger<TotpController> logger,
        UrlEncoder urlEncoder,
        IConfiguration config)
    {
        _userManager = userManager;
        _logger = logger;
        _urlEncoder = urlEncoder;
        _config = config;
    }

    /// <summary>
    /// Отримати дані для налаштування 2FA (ключ та URI)
    /// </summary>
    [HttpGet("setup")]
    public async Task<IActionResult> Setup()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
        if (string.IsNullOrEmpty(unformattedKey))
        {
            await _userManager.ResetAuthenticatorKeyAsync(user);
            unformattedKey = await _userManager.GetAuthenticatorKeyAsync(user);
        }

        if (string.IsNullOrEmpty(unformattedKey))
             return Problem(statusCode: 500, title: "Не вдалося отримати ключ автентифікатора");

        string sharedKey = FormatKey(unformattedKey);
        string authenticatorUri = GenerateQrCodeUri(user.UserName ?? string.Empty, unformattedKey);

        return Ok(new
        {
            sharedKey,
            authenticatorUri
        });
    }

    /// <summary>
    /// Увімкнути 2FA за допомогою введеного коду
    /// </summary>
    /// <param name="dto">Об'єкт з кодом перевірки</param>
    [HttpPost("enable")]
    public async Task<IActionResult> Enable([FromBody] EnableTotpDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var code = dto.Code.Replace(" ", string.Empty).Replace("-", string.Empty);
        var isValid = await _userManager.VerifyTwoFactorTokenAsync(
            user, _userManager.Options.Tokens.AuthenticatorTokenProvider, code);

        if (!isValid)
        {
            return BadRequest(new { message = "Недійсний код верифікації" });
        }

        await _userManager.SetTwoFactorEnabledAsync(user, true);

        var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);
        
        _logger.LogInformation("Увімкнено 2FA для UserId={UserId}", user.Id);

        return Ok(new
        {
            message = "2FA успішно увімкнено",
            recoveryCodes
        });
    }

    /// <summary>
    /// Вимкнути 2FA (потребує поточний пароль)
    /// </summary>
    /// <param name="dto">Об'єкт, що містить пароль для підтвердження</param>
    [HttpPost("disable")]
    public async Task<IActionResult> Disable([FromBody] DisableTotpDto dto)
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        var passwordValid = await _userManager.CheckPasswordAsync(user, dto.Password);
        if (!passwordValid)
        {
            return BadRequest(new { message = "Недійсний пароль" });
        }

        await _userManager.SetTwoFactorEnabledAsync(user, false);
        await _userManager.ResetAuthenticatorKeyAsync(user);

        _logger.LogInformation("Вимкнено 2FA для UserId={UserId}", user.Id);

        return Ok(new { message = "2FA вимкнено" });
    }

    /// <summary>
    /// Згенерувати нові резервні коди відновлення
    /// </summary>
    [HttpGet("recovery-codes")]
    public async Task<IActionResult> GenerateRecoveryCodes()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        if (!user.TwoFactorEnabled)
        {
            return BadRequest(new { message = "2FA не увімкнено, неможливо згенерувати коди" });
        }

        var recoveryCodes = await _userManager.GenerateNewTwoFactorRecoveryCodesAsync(user, 10);
        
        return Ok(new { recoveryCodes });
    }

    /// <summary>
    /// Отримати поточний статус 2FA
    /// </summary>
    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
            return Unauthorized();

        return Ok(new
        {
            isTwoFactorEnabled = user.TwoFactorEnabled
        });
    }

    private static string FormatKey(string unformattedKey)
    {
        var result = new StringBuilder();
        int currentPosition = 0;
        while (currentPosition + 4 < unformattedKey.Length)
        {
            result.Append(unformattedKey.AsSpan(currentPosition, 4)).Append(' ');
            currentPosition += 4;
        }
        if (currentPosition < unformattedKey.Length)
        {
            result.Append(unformattedKey.AsSpan(currentPosition));
        }

        return result.ToString().ToLowerInvariant();
    }

    private string GenerateQrCodeUri(string email, string unformattedKey)
    {
        var issuer = _config["TOTP:Issuer"];
        if (string.IsNullOrEmpty(issuer))
        {
             issuer = _config["JwtSettings:Issuer"] ?? "S5Server";
        }

        return string.Format(
            AuthenticatorUriFormat,
            _urlEncoder.Encode(issuer),
            _urlEncoder.Encode(email),
            unformattedKey);
    }
}

/// <summary>
/// DTO для увімкнення TOTP
/// </summary>
/// <param name="Code">6-значний код з аутентифікатора</param>
public record EnableTotpDto(
    [Required] string Code
);

/// <summary>
/// DTO для вимкнення TOTP
/// </summary>
/// <param name="Password">Поточний пароль користувача для підтвердження дії</param>
public record DisableTotpDto(
    [Required] string Password
);
