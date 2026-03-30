using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using Microsoft.AspNetCore.Identity;

namespace S5Server.Models;

/// <summary>
/// Represents the data required to create a new user, including identification, credentials, and role assignments.
/// </summary>
/// <param name="SoldierId">The unique identifier of the soldier associated with the user. This value is required.</param>
/// <param name="UserName">The user name for the new user. Must be between 3 and 256 characters in length.</param>
/// <param name="Email">The email address of the user. Must be a valid email address if provided; otherwise, null.</param>
/// <param name="Password">The password for the new user. Must be at least 6 characters in length. This value is required.</param>
/// <param name="EmailConfirmed">A value indicating whether the user's email address has been confirmed. If null, the confirmation status is
/// unspecified.</param>
/// <param name="Roles">An array of roles to assign to the user. May be null if no roles are specified.</param>
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
/// <summary>
/// Represents the data required to perform a user login operation.
/// </summary>
/// <param name="UserName">The user name associated with the account to authenticate. Cannot be null or empty.</param>
/// <param name="Password">The password for the specified user account. Cannot be null or empty.</param>
/// <param name="RememberMe">A value indicating whether the authentication session should be persistent across browser sessions. Set to <see
/// langword="true"/> to enable persistent login; otherwise, <see langword="false"/>.</param>
public record LoginDto(
    string UserName,  
    string Password,
    bool RememberMe = false
);
/// <summary>
/// Represents the set of requirements that a password must meet for validation.
/// </summary>
/// <param name="RequiredLength">The minimum number of characters required for a valid password. Must be a non-negative integer.</param>
/// <param name="RequireDigit">A value indicating whether at least one numeric digit is required in the password. Set to <see langword="true"/> to
/// require a digit; otherwise, <see langword="false"/>.</param>
/// <param name="RequireLowercase">A value indicating whether at least one lowercase letter is required in the password. Set to <see langword="true"/>
/// to require a lowercase letter; otherwise, <see langword="false"/>.</param>
/// <param name="RequireUppercase">A value indicating whether at least one uppercase letter is required in the password. Set to <see langword="true"/>
/// to require an uppercase letter; otherwise, <see langword="false"/>.</param>
/// <param name="RequireNonAlphanumeric">A value indicating whether at least one non-alphanumeric character (such as a symbol) is required in the password.
/// Set to <see langword="true"/> to require a non-alphanumeric character; otherwise, <see langword="false"/>.</param>
/// <param name="RequiredUniqueChars">The minimum number of unique characters that must be present in the password. Must be a non-negative integer.</param>
public record PasswordRequirementsDto(
    int RequiredLength,
    bool RequireDigit,
    bool RequireLowercase,
    bool RequireUppercase,
    bool RequireNonAlphanumeric,
    int RequiredUniqueChars
);

/// <summary>
/// DTO для перевірки доступності імені користувача
/// </summary>
public record CheckUsernameDto
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
/// Represents the data transfer object used to validate a user's password.
/// </summary>
/// <remarks>This record is typically used when submitting password validation requests, such as during
/// authentication or password change operations. It contains the password to validate, along with optional user
/// identification fields that may be used for additional verification or context.</remarks>
public record ValidatePasswordDto
{
    /// <summary> DTO для валідації пароля </summary>
    [Required(ErrorMessage = "Пароль обов'язковий")]
    public string Password { get; set; } = string.Empty;
    /// <summary>
    /// Gets or sets the user name associated with the current instance.
    /// </summary>
    public string UserName { get; set; } = string.Empty;

    /// <summary>
    /// Email (опціонально, для додаткових перевірок)
    /// </summary>
    public string? Email { get; set; }
}

/// <summary>
/// DTO для перевірки доступності email
/// </summary>
public record CheckEmailDto
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
public record ChangeUsernameDto
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

/// <summary>
/// Повна інформація про користувача.
/// </summary>
/// <param name="Id">ID користувача.</param>
/// <param name="UserName">Логін.</param>
/// <param name="Email">Електронна пошта.</param>
/// <param name="EmailConfirmed">Чи підтверджено Email.</param>
/// <param name="PhoneNumber">Номер телефону.</param>
/// <param name="PhoneNumberConfirmed">Чи підтверджено телефон.</param>
/// <param name="TwoFactorEnabled">Чи увімкнено 2FA.</param>
/// <param name="LastLoginDate">Дата останнього входу.</param>
/// <param name="RegistrationDate">Дата реєстрації.</param>
/// <param name="LockoutEnd">Час завершення блокування.</param>
/// <param name="LockoutEnabled">Чи дозволено блокування.</param>
/// <param name="IsLocked">Чи заблоковано на даний момент.</param>
/// <param name="AccessFailedCount">Кількість невдалих спроб входу.</param>
/// <param name="RequirePasswordChange">Чи потрібно змінити пароль.</param>
/// <param name="LastPasswordChangeDate">Дата останньої зміни пароля.</param>
/// <param name="Soldier">Дані про солдата.</param>
/// <param name="Roles">Список ролей.</param>
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
/// Коротка інформація про користувача (для Login, GetCurrentUser).
/// </summary>
/// <param name="Id">ID користувача.</param>
/// <param name="UserName">Логін.</param>
/// <param name="Email">Email.</param>
/// <param name="SoldierId">ID солдата.</param>
/// <param name="LastLoginDate">Дата останнього входу.</param>
/// <param name="RequirePasswordChange">Чи потрібно змінити пароль.</param>
/// <param name="LastPasswordChangeDate">Дата останньої зміни пароля.</param>
/// <param name="Soldier">Дані про солдата (опціонально).</param>
/// <param name="Roles">Список ролей.</param>
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
        ArgumentNullException.ThrowIfNull(user.Soldier);

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
            roles ?? []
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
