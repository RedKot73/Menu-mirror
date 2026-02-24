using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models;

public record CreateUserDto(
    Guid SoldierId,
    string Email,
    string Password,
    bool? EmailConfirmed,
    string[]? Roles
);

public record LoginDto(
    string Email,
    string Password,
    bool RememberMe = false
);

public record ChangePasswordDto(
    string CurrentPassword,
    string NewPassword
);

public record SetLockoutDto(
    bool Lock,
    DateTimeOffset? LockoutEnd = null
);

public record CreateRoleDto(
    string Name
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

    /*
    /// <summary>
    /// Связка Инф.Система - ответственные
    /// </summary>
    public virtual IEnumerable<TUnitInfSysResp>? UnitInfSysResp { get; set; } = default!;
    */
}

