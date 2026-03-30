using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace S5Server.Models
{
    /// <summary>
    /// DTO для передачі історичних даних про зміни в записі солдата.
    /// </summary>
    /// <param name="Id">Унікальний ідентифікатор запису історії.</param>
    /// <param name="SoldierId">ID солдата.</param>
    /// <param name="FirstName">Ім'я.</param>
    /// <param name="MidleName">По батькові.</param>
    /// <param name="LastName">Прізвище.</param>
    /// <param name="Fio">ПІБ.</param>
    /// <param name="BirthDate">Дата народження.</param>
    /// <param name="NickName">Позивний.</param>
    /// <param name="UnitId">ID підрозділу.</param>
    /// <param name="UnitShortName">Коротка назва підрозділу.</param>
    /// <param name="ArrivedAt">Дата прибуття.</param>
    /// <param name="DepartedAt">Дата вибуття.</param>
    /// <param name="AssignedUnitId">ID приданого підрозділу.</param>
    /// <param name="AssignedUnitShortName">Коротка назва приданого підрозділу.</param>
    /// <param name="InvolvedUnitId">ID задіяного підрозділу.</param>
    /// <param name="InvolvedUnitShortName">Коротка назва задіяного підрозділу.</param>
    /// <param name="RankId">ID звання.</param>
    /// <param name="RankShortValue">Коротка назва звання.</param>
    /// <param name="PositionId">ID посади.</param>
    /// <param name="PositionValue">Назва посади.</param>
    /// <param name="StateId">ID статусу.</param>
    /// <param name="StateValue">Назва статусу.</param>
    /// <param name="Comment">Коментар.</param>
    /// <param name="ChangedBy">Хто змінив.</param>
    /// <param name="Operation">Тип операції.</param>
    /// <param name="ValidFrom">Дата початку дії.</param>
    /// <param name="ValidTo">Дата закінчення дії.</param>
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
        /// <summary>
        /// Конвертує історичну сутність у DTO.
        /// </summary>
        /// <param name="e">Сутність історії.</param>
        /// <returns>Заповнений DTO.</returns>
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
        /// <summary>
        /// Унікальний ідентифікатор запису історії.
        /// </summary>
        [Key]
        public Guid Id { get; set; } = Guid.CreateVersion7();

        /// <summary>
        /// ID солдата, до якого відноситься цей запис.
        /// </summary>
        [Required]
        public Guid SoldierId { get; set; } = default!;

        /// <summary>
        /// Зовнішній ідентифікатор.
        /// </summary>
        public int? ExternId { get; set; }

        /// <summary>
        /// Ім'я.
        /// </summary>
        [StringLength(50), Required]
        public string FirstName { get; set; } = string.Empty;

        /// <summary>
        /// По батькові.
        /// </summary>
        [StringLength(50)]
        public string? MidleName { get; set; }

        /// <summary>
        /// Прізвище.
        /// </summary>
        [StringLength(50)]
        public string? LastName { get; set; }

        private string MName => string.IsNullOrEmpty(MidleName) ? string.Empty : MidleName[..1];
        private string LName => string.IsNullOrEmpty(LastName) ? string.Empty : LastName[..1];

        /// <summary>
        /// Повне ім'я (ПІБ).
        /// </summary>
        [NotMapped]
        public string FIO => string.IsNullOrEmpty(MidleName + LastName) ? FirstName : $"{FirstName} {MName}.{LName}.";

        /// <summary>
        /// Дата народження.
        /// </summary>
        public DateOnly? BirthDate { get; set; }

        /// <summary>
        /// Позивний.
        /// </summary>
        [StringLength(50)]
        public string? NickName { get; set; }

        /// <summary>
        /// ID підрозділу.
        /// </summary>
        [Required]
        public Guid UnitId { get; set; } = default!;

        /// <summary>
        /// Коротка назва підрозділу на момент запису.
        /// </summary>
        [StringLength(100), Required]
        public string UnitShortName { get; set; } = string.Empty;

        /// <summary>
        /// ID приданого підрозділу.
        /// </summary>
        public Guid? AssignedUnitId { get; set; }

        /// <summary>
        /// Коротка назва приданого підрозділу.
        /// </summary>
        [StringLength(100)]
        public string? AssignedUnitShortName { get; set; }

        /// <summary>
        /// ID задіяного підрозділу.
        /// </summary>
        public Guid? InvolvedUnitId { get; set; }

        /// <summary>
        /// Коротка назва задіяного підрозділу.
        /// </summary>
        [StringLength(100)]
        public string? InvolvedUnitShortName { get; set; }

        /// <summary>
        /// ID звання.
        /// </summary>
        [Required]
        public Guid RankId { get; set; } = default!;

        /// <summary>
        /// Коротка назва звання.
        /// </summary>
        [StringLength(50), Required]
        public string RankShortValue { get; set; } = string.Empty;

        /// <summary>
        /// ID посади.
        /// </summary>
        [Required]
        public Guid PositionId { get; set; } = default!;

        /// <summary>
        /// Назва посади.
        /// </summary>
        [StringLength(100), Required]
        public string PositionValue { get; set; } = string.Empty;

        /// <summary>
        /// ID статусу.
        /// </summary>
        [Required]
        public Guid StateId { get; set; } = default!;

        /// <summary>
        /// Назва статусу.
        /// </summary>
        [StringLength(50), Required]
        public string StateValue { get; set; } = string.Empty;

        /// <summary>
        /// Коментар.
        /// </summary>
        public string? Comment { get; set; }

        /// <summary>
        /// Дата прибуття.
        /// </summary>
        public DateOnly? ArrivedAt { get; set; }

        /// <summary>
        /// Дата вибуття.
        /// </summary>
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
