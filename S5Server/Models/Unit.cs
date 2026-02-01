using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models;

/// <summary>
/// DTO для створення підрозділу
/// </summary>
public record UnitCreateDto(
    string? ParentId,
    string? AssignedUnitId,
    string Name,
    string ShortName,
    string? MilitaryNumber,
    string? ForceTypeId,
    string? UnitTypeId,
    int OrderVal,
    bool IsInvolved,
    string? PersistentLocationId,
    string? Comment);

/// <summary>
/// DTO для підрозділу
/// </summary>
public record UnitDto(
    string Id,
    string? ParentId,
    string? ParentShortName,
    string? AssignedUnitId,
    string? AssignedShortName,
    string Name,
    string ShortName,
    string? MilitaryNumber,
    string? ForceTypeId,
    string? ForceType,
    string? UnitTypeId,
    string? UnitType,
    bool IsInvolved,
    int OrderVal,
    string? PersistentLocationId,
    string? PersistentLocation,
    string? Comment,
    // ✅ ДОДАНО
    string ChangedBy,
    DateTime ValidFrom);

/// <summary>
/// Розширений DTO для дерева: додає ознаку наявності дочірніх підрозділів
/// </summary>
public record UnitTreeItemDto(
    string Id,
    string? ParentId,
    string? ParentShortName,
    string? AssignedUnitId,
    string? AssignedShortName,
    string Name,
    string ShortName,
    string? MilitaryNumber,
    string? ForceTypeId,
    string? ForceType,
    string? UnitTypeId,
    string? UnitType,
    bool IsInvolved,
    int OrderVal,
    string? PersistentLocationId,
    string? PersistentLocation,
    string? Comment,
    bool HasChildren,
    // ✅ ДОДАНО
    string ChangedBy,
    DateTime ValidFrom) 
    : UnitDto(
        Id,
        ParentId,
        ParentShortName,
        AssignedUnitId,
        AssignedShortName,
        Name,
        ShortName,
        MilitaryNumber,
        ForceTypeId,
        ForceType,
        UnitTypeId,
        UnitType,
        IsInvolved,
        OrderVal,
        PersistentLocationId,
        PersistentLocation,
        Comment,
        ChangedBy,
        ValidFrom);

/// <summary>
/// DTO для набора даних підрозділу для Angular (формування документу)
/// Soldiers включає список особового складу підрозділу (основних бійців UnitId == Id).
/// </summary>
public record UnitDataSetDto(
    string Id,
    string? ParentId,
    string? ParentShortName,
    string? AssignedShortName,
    string ShortName,
    string? UnitTypeId,
    string? UnitType,
    /// <summary>
    /// True - Оперативний/Тимчасовий підрозділ
    /// </summary>
    bool IsInvolved,
    string? Comment,
    /// <summary>
    /// Особовий склад
    /// </summary>
    SoldierDto[] Soldiers,
    /// <summary>
    /// Приданий особовий склад
    /// </summary>
    SoldierDto[] AssignedSoldiers,
    /// <summary>
    /// Задіяний особовий склад - Екіпаж
    /// </summary>
    SoldierDto[] InvolvedSoldiers)
{
    /// <summary>
    /// Створює UnitDataSetDto з Entity та списків солдатів
    /// </summary>
    public static UnitDataSetDto From(Unit u,
        List<SoldierDto> soldiers,
        List<SoldierDto> assignedSoldiers,
        List<SoldierDto> involvedSoldiers) => new(
        u.Id,
        u.ParentId,
        u.Parent?.ShortName,
        u.AssignedUnit?.ShortName ?? u.AssignedUnit?.Name,
        u.ShortName,
        u.UnitTypeId,
        u.UnitType?.ShortValue,
        u.IsInvolved,
        u.Comment,
        [.. soldiers],
        [.. assignedSoldiers],
        [.. involvedSoldiers]
    );
}

/// <summary>
/// Підрозділ (організаційно-штатна бойова одиниця).
/// Ієрархія: Parent / ChildUnits.
/// Придання: AssignedUnit / AssignedUnits.
/// Довідники: ForceType (вид ЗС), UnitType (тип підрозділу).
/// </summary>
[Table("units")]
public class Unit
{
    /// <summary>
    /// ID для запису БД представляючого "Екіпаж"
    /// </summary>
    public const string Crew_GUID = "00000000-0000-0000-0000-000000000002";

    [Key]
    [StringLength(36)]
    public string Id { get; set; } = Guid.NewGuid().ToString("D");

    /// <summary>
    /// Основний підрозділ
    /// </summary>
    public string? ParentId { get; set; }

    [ValidateNever]
    public virtual Unit? Parent { get; set; }

    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    public string? AssignedUnitId { get; set; }

    /// <summary>
    /// Приданий до підрозділу
    /// </summary>
    [ValidateNever]
    public Unit? AssignedUnit { get; set; }
    
    /// <summary>
    /// Назва підрозділу
    /// </summary>
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Скорочена назва підрозділу
    /// </summary>
    [StringLength(100), Required(ErrorMessage = UIConstant.RequiredMsg)]
    public string ShortName { get; set; } = string.Empty;

    /// <summary>
    /// Номер військової частини (В/Ч)
    /// </summary>
    [StringLength(100)]
    public string? MilitaryNumber { get; set; }

    /// <summary>
    /// Вид збройних сил Сухопутні, ДШВ, ВМС...
    /// </summary>
    public string? ForceTypeId { get; set; }

    /// <summary>
    /// Вид збройних сил
    /// </summary>
    [ValidateNever]
    public DictForcesType? ForceType { get; set; }

    /// <summary>
    /// Тип підрозділу Бригада, Полк, Батальйон, Рота
    /// </summary>
    public string? UnitTypeId { get; set; }

    /// <summary>
    /// Тип підрозділу
    /// </summary>
    [ValidateNever]
    public DictUnitType? UnitType { get; set; }

    public int OrderVal { get; set; } = 1;

    /// <summary>
    /// True - Оперативний/Тимчасовий підрозділ
    /// </summary>
    public bool IsInvolved { get; set; } = false;

    /// <summary>
    /// ППД (Постійне приміщення дислокації)
    /// </summary>
    public string? PersistentLocationId { get; set; }

    /// <summary>
    /// ППД
    /// </summary>
    [ValidateNever]
    public DictArea? PersistentLocation { get; set; }

    public string? Comment { get; set; }

    /// <summary>
    /// Підпорядковані підрозділи
    /// </summary>
    public virtual IEnumerable<Unit>? ChildUnits { get; set; }

    /// <summary>
    /// Придані підрозділи
    /// </summary>
    public List<Unit> AssignedUnits { get; set; } = [];

    /// <summary>
    /// Суміжні підрозділи
    /// </summary>
    [NotMapped]
    public List<Unit> AdjacentUnits { get; set; } = [];

    /// <summary>
    /// Особовий склад
    /// </summary>
    [NotMapped]
    public List<Soldier> Soldiers { get; set; } = [];

    /// <summary>
    /// Приданий особовий склад
    /// </summary>
    [NotMapped]
    public List<Soldier> AssignedSoldiers { get; set; } = [];

    /// <summary>
    /// Задіяний особовий склад - Екіпаж
    /// </summary>
    [NotMapped]
    public List<Soldier> InvolvedSoldiers { get; set; } = [];

    /// <summary>
    /// Кто внёс изменение (UserId або "System")
    /// </summary>
    [StringLength(100), Required]
    public string ChangedBy { get; set; } = string.Empty;

    /// <summary>
    /// Дата начала действия записи
    /// </summary>
    [Required]
    public DateTime ValidFrom { get; set; } = DateTime.Now;
}

/// <summary>
/// Методи розширення для роботи з Unit
/// </summary>
public static class UnitExtensions
{
    /// <summary>
    /// Конвертує Unit у DTO
    /// </summary>
    public static UnitDto ToDto(this Unit unit) =>
        new(
            unit.Id,
            unit.ParentId,
            unit.Parent?.ShortName,
            unit.AssignedUnitId,
            unit.AssignedUnit?.ShortName,
            unit.Name,
            unit.ShortName,
            unit.MilitaryNumber,
            unit.ForceTypeId,
            unit.ForceType?.ShortValue ?? unit.ForceType?.Value,
            unit.UnitTypeId,
            unit.UnitType?.ShortValue ?? unit.UnitType?.Value,
            unit.IsInvolved,
            unit.OrderVal,
            unit.PersistentLocationId,
            unit.PersistentLocation?.Value,
            unit.Comment,
            // ✅ ДОДАНО
            unit.ChangedBy,
            unit.ValidFrom);

    /// <summary>
    /// Конвертує Unit у TreeItemDto з прапорцем HasChildren
    /// </summary>
    public static UnitTreeItemDto ToTreeItemDto(this Unit unit, bool hasChildren = false) =>
        new(
            unit.Id,
            unit.ParentId,
            unit.Parent?.ShortName,
            unit.AssignedUnitId,
            unit.AssignedUnit?.ShortName,
            unit.Name,
            unit.ShortName,
            unit.MilitaryNumber,
            unit.ForceTypeId,
            unit.ForceType?.ShortValue ?? unit.ForceType?.Value,
            unit.UnitTypeId,
            unit.UnitType?.ShortValue ?? unit.UnitType?.Value,
            unit.IsInvolved,
            unit.OrderVal,
            unit.PersistentLocationId,
            unit.PersistentLocation?.Value,
            unit.Comment,
            hasChildren,
            // ✅ ДОДАНО
            unit.ChangedBy,
            unit.ValidFrom);

    /// <summary>
    /// Створює новий екземпляр Unit з DTO
    /// </summary>
    public static Unit ToEntity(this UnitDto dto) =>
        new()
        {
            Id = dto.Id,
            ParentId = dto.ParentId,
            AssignedUnitId = dto.AssignedUnitId,
            Name = dto.Name.Trim(),
            ShortName = dto.ShortName.Trim(),
            MilitaryNumber = string.IsNullOrWhiteSpace(dto.MilitaryNumber) 
                ? null 
                : dto.MilitaryNumber.Trim(),
            ForceTypeId = dto.ForceTypeId,
            UnitTypeId = dto.UnitTypeId,
            OrderVal = dto.OrderVal,
            IsInvolved = dto.IsInvolved,
            PersistentLocationId = dto.PersistentLocationId,
            Comment = string.IsNullOrWhiteSpace(dto.Comment) 
                ? null 
                : dto.Comment.Trim(),
            // ✅ ДОДАНО
            ChangedBy = dto.ChangedBy,
            ValidFrom = dto.ValidFrom
        };

    /// <summary>
    /// Створює новий екземпляр Unit з CreateDTO
    /// </summary>
    public static Unit ToEntity(this UnitCreateDto dto) =>
        new()
        {
            Id = Guid.NewGuid().ToString("D"),
            ParentId = dto.ParentId,
            AssignedUnitId = dto.AssignedUnitId,
            Name = dto.Name.Trim(),
            ShortName = dto.ShortName.Trim(),
            MilitaryNumber = string.IsNullOrWhiteSpace(dto.MilitaryNumber) 
                ? null 
                : dto.MilitaryNumber.Trim(),
            ForceTypeId = dto.ForceTypeId,
            UnitTypeId = dto.UnitTypeId,
            OrderVal = dto.OrderVal,
            IsInvolved = dto.IsInvolved,
            PersistentLocationId = dto.PersistentLocationId,
            Comment = string.IsNullOrWhiteSpace(dto.Comment) 
                ? null 
                : dto.Comment.Trim(),
            // ✅ ДОДАНО: автоматично встановлюються на сервері
            ChangedBy = "System", // АБО отримувати з User.Identity?.Name
            ValidFrom = DateTime.UtcNow
        };

    /// <summary>
    /// Застосовує дані з DTO до існуючої сутності Unit
    /// </summary>
    public static void ApplyDto(this Unit unit, UnitDto dto)
    {
        unit.ParentId = dto.ParentId;
        unit.AssignedUnitId = dto.AssignedUnitId;
        unit.Name = dto.Name.Trim();
        unit.ShortName = dto.ShortName.Trim();
        unit.MilitaryNumber = string.IsNullOrWhiteSpace(dto.MilitaryNumber) 
            ? null 
            : dto.MilitaryNumber.Trim();
        unit.ForceTypeId = dto.ForceTypeId;
        unit.UnitTypeId = dto.UnitTypeId;
        unit.OrderVal = dto.OrderVal;
        unit.IsInvolved = dto.IsInvolved;
        unit.PersistentLocationId = dto.PersistentLocationId;
        unit.Comment = string.IsNullOrWhiteSpace(dto.Comment) 
            ? null 
            : dto.Comment.Trim();
        // ✅ ДОДАНО: оновлюємо ChangedBy, ValidFrom НЕ оновлюємо (тільки при INSERT)
        unit.ChangedBy = dto.ChangedBy;
        // ValidFrom НЕ змінюємо при UPDATE!
    }

    /// <summary>
    /// Перевіряє, чи дані в сутності Unit співпадають з даними в DTO
    /// </summary>
    public static bool EqualsDto(this Unit unit, UnitDto dto)
    {
        return unit.ParentId == dto.ParentId &&
               unit.AssignedUnitId == dto.AssignedUnitId &&
               unit.Name == dto.Name.Trim() &&
               unit.ShortName == dto.ShortName.Trim() &&
               unit.MilitaryNumber == (string.IsNullOrWhiteSpace(dto.MilitaryNumber) 
                   ? null 
                   : dto.MilitaryNumber.Trim()) &&
               unit.ForceTypeId == dto.ForceTypeId &&
               unit.UnitTypeId == dto.UnitTypeId &&
               unit.OrderVal == dto.OrderVal &&
               unit.IsInvolved == dto.IsInvolved &&
               unit.PersistentLocationId == dto.PersistentLocationId &&
               unit.Comment == (string.IsNullOrWhiteSpace(dto.Comment) 
                   ? null 
                   : dto.Comment.Trim());
        // ✅ ChangedBy та ValidFrom НЕ порівнюємо (аудит-поля)
    }

    /// <summary>
    /// Конвертує у LookupDto для випадаючих списків
    /// </summary>
    public static LookupDto ToLookupDto(this Unit unit) =>
        new(unit.Id, unit.ShortName);
}
