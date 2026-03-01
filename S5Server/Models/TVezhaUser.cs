using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Identity;

namespace S5Server.Models;

public record CreateUserDto(
    [Required]
    Guid SoldierId,
    [Required, MinLength(3), MaxLength(256)]
    string UserName,
    [EmailAddress]
    string? Email,
    [Required, MinLength(6)]
    string Password,
    bool? EmailConfirmed,
    string[]? Roles
);

public record LoginDto(
    string UserName,  
    string Password,
    bool RememberMe = false
);

/// <summary>
/// Вимоги до пароля
/// </summary>
public record PasswordRequirementsDto(
    /// <summary>
    /// Мінімальна довжина пароля
    /// </summary>
    int RequiredLength,

    /// <summary>
    /// Чи потрібна цифра
    /// </summary>
    bool RequireDigit,

    /// <summary>
    /// Чи потрібна мала літера
    /// </summary>
    bool RequireLowercase,

    /// <summary>
    /// Чи потрібна велика літера
    /// </summary>
    bool RequireUppercase,

    /// <summary>
    /// Чи потрібен спеціальний символ
    /// </summary>
    bool RequireNonAlphanumeric,

    /// <summary>
    /// Кількість унікальних символів
    /// </summary>
    int RequiredUniqueChars
);

/// <summary>
/// DTO для перевірки доступності імені користувача
/// </summary>
public class CheckUsernameDto
{
    /// <summary>
    /// Ім'я користувача для перевірки
    /// </summary>
    [Required(ErrorMessage = "UserName обов'язковий")]
    [StringLength(256, MinimumLength = 3, ErrorMessage = "UserName має бути від 3 до 256 символів")]
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// ID користувача, якщо це оновлення (щоб виключити себе з перевірки)
    /// </summary>
    public Guid? ExcludeUserId { get; set; }
}

/// <summary>
/// DTO для валідації пароля
/// </summary>
public class ValidatePasswordDto
{
    [Required(ErrorMessage = "Пароль обов'язковий")]
    public string Password { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// Email (опціонально, для додаткових перевірок)
    /// </summary>
    public string? Email { get; set; }
}

/// <summary>
/// DTO для перевірки доступності email
/// </summary>
public class CheckEmailDto
{
    /// <summary>
    /// Email для перевірки
    /// </summary>
    [Required(ErrorMessage = "Email обов'язковий")]
    [EmailAddress(ErrorMessage = "Некоректний формат email")]
    [StringLength(256, ErrorMessage = "Email не може бути довшим за 256 символів")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// ID користувача, якщо це оновлення (щоб виключити себе з перевірки)
    /// </summary>
    public Guid? ExcludeUserId { get; set; }
}

/// <summary>
/// Представляет данные, необходимые для запроса на смену пароля пользователя.
/// </summary>
/// <param name="CurrentPassword">Текущий пароль пользователя, который требуется для подтверждения права на изменение пароля.
/// </param>
/// <param name="NewPassword">Новый пароль, который будет установлен для пользователя.
/// </param>
public record ChangePasswordDto(
    string CurrentPassword,
    string NewPassword
);

/// <summary>
/// DTO для адміністративного скидання пароля
/// Не потребує поточного пароля користувача,
/// оскільки це робить адміністратор
/// </summary>
public class AdminResetPasswordDto
{
    /// <summary>
    /// Новий пароль
    /// </summary>
    [Required(ErrorMessage = "Новий пароль обов'язковий")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "Пароль має бути від 6 до 100 символів")]
    public string NewPassword { get; set; } = string.Empty;

    /// <summary>
    /// Чи потрібно вимагати зміну пароля при наступному вході
    /// </summary>
    public bool RequirePasswordChange { get; set; } = true;
}

/// <summary>
/// DTO для зміни імені користувача
/// </summary>
public class ChangeUsernameDto
{
    /// <summary>
    /// Поточний пароль для підтвердження зміни
    /// </summary>
    [Required(ErrorMessage = "Поточний пароль обов'язковий")]
    public string CurrentPassword { get; set; } = string.Empty;

    /// <summary>
    /// Нове ім'я користувача
    /// </summary>
    [Required(ErrorMessage = "Нове ім'я користувача обов'язкове")]
    [StringLength(256, MinimumLength = 3, ErrorMessage = "Ім'я користувача має бути від 3 до 256 символів")]
    public string NewUserName { get; set; } = string.Empty;
}

/// <summary>
/// DTO для адміністративної зміни імені користувача
/// Не потребує поточного пароля користувача,
/// оскільки це робить адміністратор
/// </summary>
public class AdminChangeUsernameDto
{
    /// <summary>
    /// Нове ім'я користувача
    /// </summary>
    [Required(ErrorMessage = "Нове ім'я користувача обов'язкове")]
    [StringLength(256, MinimumLength = 3, ErrorMessage = "Ім'я користувача має бути від 3 до 256 символів")]
    public string NewUserName { get; set; } = string.Empty;
}

/// <summary>
/// Блокування/розблокування користувача
/// </summary>
/// <param name="Lock">Блокувати/Розблокувати</param>
/// <param name="LockoutEnd">Дата, до якої користувача блоковано</param>
public record SetLockoutDto(
    bool Lock,
    DateTimeOffset? LockoutEnd = null
);

public record CreateRoleDto(
    string Name
);

/// <summary>
/// Повна інформація про користувача
/// </summary>
public record UserDto(
    Guid Id,
    string UserName,
    string? Email,
    bool EmailConfirmed,
    string? PhoneNumber,
    bool PhoneNumberConfirmed,
    bool TwoFactorEnabled,
    DateTime? LastLoginDate,
    DateTime RegistrationDate,
    DateTimeOffset? LockoutEnd,
    bool LockoutEnabled,
    bool IsLocked,
    int AccessFailedCount,
    bool RequirePasswordChange,
    DateTime? LastPasswordChangeDate,
    SoldierDto Soldier,
    IList<string> Roles
);

/// <summary>
/// Коротка інформація про користувача (для Login, GetCurrentUser)
/// </summary>
public record UserInfoDto(
    Guid Id,
    string UserName,
    string? Email,
    Guid SoldierId,
    DateTime? LastLoginDate,
    bool RequirePasswordChange,
    DateTime? LastPasswordChangeDate,
    SoldierDto? Soldier,
    IList<string> Roles
);

/// <summary>
/// Пользователь системы
/// </summary>
public class TVezhaUser : IdentityUser<Guid>
{
    /// <summary>
    /// Солдат
    /// </summary>
    [ForeignKey(nameof(Soldier))]
    public Guid SoldierId { get; set; } = default!;

    /// <summary>
    /// Солдат
    /// </summary>
    public Soldier Soldier { get; set; } = default!;
    /*
    [ValidateNever, Display(Name = "Підрозділи, до яких є доступ")]
    public virtual ICollection<TUserUnits>? UserUnits { get; set; }
    */

    /// <summary>
    /// Дата останнього входу
    /// </summary>
    public DateTime? LastLoginDate { get; set; }

    /// <summary>
    /// Дата реєстрації акаунту
    /// </summary>
    public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// При наступному вході вимагати зміну пароля (наприклад, після адміністративного скидання)
    /// </summary>
    public bool RequirePasswordChange { get; set; } = true;
    /// <summary>
    /// Дата останньої зміни пароля (для моніторингу та безпеки)
    /// </summary>
    public DateTime? LastPasswordChangeDate { get; set; }

    /*
    /// <summary>
    /// Связка Инф.Система - ответственные
    /// </summary>
    public virtual IEnumerable<TUnitInfSysResp>? UnitInfSysResp { get; set; } = default!;
    */
}

/// <summary>
/// Методи розширення для роботи з TVezhaUser
/// </summary>
public static class TVezhaUserExtensions
{
    /// <summary>
    /// Конвертує TVezhaUser у повний DTO з ролями (для Get)
    /// </summary>
    /// <param name="user">Користувач</param>
    /// <param name="roles">Ролі користувача</param>
    /// <returns>Повний DTO користувача</returns>
    public static UserDto ToDto(this TVezhaUser user, IList<string>? roles = null)
    {
        ArgumentNullException.ThrowIfNull(user);
        ArgumentNullException.ThrowIfNull(roles);

        return new UserDto(
            user.Id,
            user.UserName ?? string.Empty,
            user.Email,
            user.EmailConfirmed,
            user.PhoneNumber,
            user.PhoneNumberConfirmed,
            user.TwoFactorEnabled,
            user.LastLoginDate,
            user.RegistrationDate,
            user.LockoutEnd,
            user.LockoutEnabled,
            IsLocked: user.LockoutEnd.HasValue && user.LockoutEnd > DateTimeOffset.UtcNow,
            user.AccessFailedCount,
            user.RequirePasswordChange,
            user.LastPasswordChangeDate,
            user.Soldier.ToSoldierDto(),
            roles
        );
    }

    /// <summary>
    /// Конвертує TVezhaUser у короткий DTO з ролями (для Login, GetCurrentUser)
    /// </summary>
    /// <param name="user">Користувач</param>
    /// <param name="roles">Ролі користувача</param>
    /// <param name="includeSoldier">Чи включати повну інформацію про солдата (для GetCurrentUser)</param>
    /// <returns>Короткий DTO користувача</returns>
    public static UserInfoDto ToInfoDto(this TVezhaUser user, IList<string> roles, bool includeSoldier = false)
    {
        ArgumentNullException.ThrowIfNull(user);
        ArgumentNullException.ThrowIfNull(roles);

        return new UserInfoDto(
            user.Id,
            user.UserName ?? string.Empty,
            user.Email,
            user.SoldierId,
            user.LastLoginDate,
            user.RequirePasswordChange,
            user.LastPasswordChangeDate,
            includeSoldier ? user.Soldier?.ToSoldierDto() : null,
            roles
        );
    }
}
