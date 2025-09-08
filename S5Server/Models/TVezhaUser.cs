using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models;

/// <summary>
/// Пользователь системы
/// </summary>
/// <typeparam name="TKey"></typeparam>
[Display(Name = Caption)]
public class TVezhaUser<TKey> : IdentityUser<TKey> where TKey : IEquatable<TKey>
{
    public const string Caption = "Користувач";
    public readonly string cnstCaption = Caption;

    /// <summary>
    /// Солдат
    /// </summary>
    [ForeignKey(nameof(Soldier)), Display(Name = Soldier.Caption)]
    public string SoldierId { get; set; } = string.Empty;

    /// <summary>
    /// Солдат
    /// </summary>
    [Display(Name = Soldier.Caption)]
    public virtual Soldier Soldier { get; set; } = default!;
    /*
    [ValidateNever, Display(Name = "Підрозділи, до яких є доступ")]
    public virtual ICollection<TUserUnits>? UserUnits { get; set; }
    */

    /// <summary>
    /// Дата створення користувача
    /// </summary>
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Display(Name = "Надано доступ")]
    public virtual DateTime? RegistrationDate { get; set; }

    /// <summary>
    /// Дата останнього успішного входу
    /// </summary>
    [Display(Name = "Останній вхід")]
    public virtual DateTime? LastLoginDate { get; set; }

    /*
    /// <summary>
    /// Связка Инф.Система - ответственные
    /// </summary>
    public virtual IEnumerable<TUnitInfSysResp>? UnitInfSysResp { get; set; } = default!;
    */
}

