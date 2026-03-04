using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачи SoldierHist
    /// </summary>
    public record SoldierHistDto(
        Guid Id,
        Guid SoldierId,
        string FirstName,
        string? MidleName,
        string? LastName,
        string Fio,
        DateOnly? BirthDate,
        string? NickName,
        Guid UnitId,
        string UnitShortName,
        DateOnly? ArrivedAt,
        DateOnly? DepartedAt,
        Guid? AssignedUnitId,
        string? AssignedUnitShortName,
        Guid? InvolvedUnitId,
        string? InvolvedUnitShortName,
        Guid RankId,
        string RankShortValue,
        Guid PositionId,
        string PositionValue,
        Guid StateId,
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
                e.UnitShortName,
                e.ArrivedAt,
                e.DepartedAt,
                e.AssignedUnitId,
                e.AssignedUnitShortName,
                e.InvolvedUnitId,
                e.InvolvedUnitShortName,
                e.RankId,
                e.RankShortValue,
                e.PositionId,
                e.PositionValue,
                e.StateId,
                e.StateValue,
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
    public class SoldierHist
    {
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        [Required]
        public Guid SoldierId { get; set; } = default!;

        public int? ExternId { get; set; }

        [StringLength(50), Required]
        public string FirstName { get; set; } = string.Empty;

        [StringLength(50)]
        public string? MidleName { get; set; }

        [StringLength(50)]
        public string? LastName { get; set; }

        private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
        private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];

        [NotMapped]
        public string FIO => string.IsNullOrEmpty(MidleName + LastName) ? FirstName : $"{FirstName} {MName}.{LName}.";

        public DateOnly? BirthDate { get; set; }

        [StringLength(50)]
        public string? NickName { get; set; }

        // Гибридный подход: Id + денормализованные значения (без FK constraints)
        [Required]
        public Guid UnitId { get; set; } = default!;

        [StringLength(100), Required]
        public string UnitShortName { get; set; } = string.Empty;

        public Guid? AssignedUnitId { get; set; }

        [StringLength(100)]
        public string? AssignedUnitShortName { get; set; }

        public Guid? InvolvedUnitId { get; set; }

        [StringLength(100)]
        public string? InvolvedUnitShortName { get; set; }

        [Required]
        public Guid RankId { get; set; } = default!;

        [StringLength(50), Required]
        public string RankShortValue { get; set; } = string.Empty;

        [Required]
        public Guid PositionId { get; set; } = default!;

        [StringLength(100), Required]
        public string PositionValue { get; set; } = string.Empty;

        [Required]
        public Guid StateId { get; set; } = default!;

        [StringLength(50), Required]
        public string StateValue { get; set; } = string.Empty;

        public string? Comment { get; set; }

        public DateOnly? ArrivedAt { get; set; }

        public DateOnly? DepartedAt { get; set; }

        /// <summary>
        /// Кто внёс изменение (UserId или "ImportSystem")
        /// </summary>
        [StringLength(100), Required]
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
        public DateTime ValidFrom { get; set; }

        /// <summary>
        /// Дата окончания действия записи (NULL = текущая актуальная)
        /// </summary>
        public DateTime? ValidTo { get; set; }
    }
}
