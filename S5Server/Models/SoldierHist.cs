using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачи SoldierHist
    /// </summary>
    public record SoldierHistDto(
        string Id,
        string SoldierId,
        string FirstName,
        string? MidleName,
        string? LastName,
        string Fio,
        DateOnly? BirthDate,
        string? NickName,
        string UnitId,
        string UnitShortName,
        DateOnly? ArrivedAt,
        DateOnly? DepartedAt,
        string? AssignedUnitId,
        string? AssignedUnitShortName,
        string? OperationalUnitId,
        string? OperationalUnitShortName,
        string RankId,
        string RankShortValue,
        string PositionId,
        string PositionValue,
        string StateId,
        string StateValue,
        string? Comment,
        string ChangedBy,
        string Operation,
        DateTime ValidFrom,
        DateTime? ValidTo
    )
    {
        public static SoldierHistDto ToDto(SoldierHist e) =>
            new(
                e.Id,
                e.SoldierId,
                e.FirstName,
                e.MidleName,
                e.LastName,
                e.FIO,
                e.BirthDate,
                e.NickName,
                e.UnitId,
                e.Unit?.ShortName ?? e.Unit?.Name ?? string.Empty,
                e.ArrivedAt,
                e.DepartedAt,
                e.AssignedUnitId,
                e.AssignedUnit?.ShortName ?? e.AssignedUnit?.Name,
                e.OperationalUnitId,
                e.OperationalUnit?.ShortName ?? e.OperationalUnit?.Name,
                e.RankId,
                e.Rank?.ShortValue ?? e.Rank?.Value ?? string.Empty,
                e.PositionId,
                e.Position?.Value ?? string.Empty,
                e.StateId,
                e.State?.Value ?? string.Empty,
                e.Comment,
                e.ChangedBy,
                e.Operation,
                e.ValidFrom,
                e.ValidTo
            );
    }

    /// <summary>
    /// Историческая таблица изменений солдат
    /// </summary>
    [Table("soldiers_hist")]
    public class SoldierHist : Soldier
    {
        [Required]
        public string SoldierId { get; set; } = string.Empty;
        /// <summary>
        /// Кто внёс изменение (UserId или "ImportSystem")
        /// </summary>
        [Required]
        public string ChangedBy { get; set; } = string.Empty;

        /// <summary>
        /// Тип операции: INSERT, UPDATE, DELETE
        /// </summary>
        [StringLength(10), Required]
        public string Operation { get; set; } = "UPDATE";
        /// <summary>
        /// Дата начала действия записи
        /// </summary>
        [Required]
        public DateTime ValidFrom { get; set; } = DateTime.Now;
        /// <summary>
        /// Дата окончания действия записи (NULL = текущая актуальная)
        /// </summary>
        public DateTime? ValidTo { get; set; }
    }
}
