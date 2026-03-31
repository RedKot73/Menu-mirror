using S5Server.Utils;

namespace S5Server.Models;

/// <summary>
/// Represents a data transfer object for importing soldier information, including personal details, rank, position,
/// and unit identifiers.
/// </summary>
/// <remarks>This record is typically used for importing soldier data from external sources and mapping it
/// to the internal domain model. It provides a convenient structure for batch operations or data migration
/// scenarios.</remarks>
/// <param name="FirstName">The first name of the soldier. Cannot be null or empty.</param>
/// <param name="MidleName">The middle name of the soldier, if available; otherwise, null.</param>
/// <param name="LastName">The last name of the soldier, if available; otherwise, null.</param>
/// <param name="ExternId">The external identifier associated with the soldier record.</param>
/// <param name="Rank">The rank of the soldier as a string representation.</param>
/// <param name="BirthDate">The date of birth of the soldier.</param>
/// <param name="Position">The position or job title of the soldier.</param>
/// <param name="ArrivedAt">The date the soldier arrived, or null if not specified.</param>
/// <param name="DepartedAt">The date the soldier departed, or null if not specified.</param>
/// <param name="UnitId">The unique identifier of the unit to which the soldier is assigned.</param>
/// <param name="RankId">The unique identifier of the soldier's rank.</param>
/// <param name="PositionId">The unique identifier of the soldier's position.</param>
public record ImportedSoldier(
    string FirstName,
    string? MidleName,
    string? LastName,
    int ExternId,        // B
    string Rank,         // C
    DateOnly BirthDate,  // D
    string Position,     // E
    DateOnly? ArrivedAt,  //Прибув
    DateOnly? DepartedAt,  //Вибув
                           //---------------------------
    Guid UnitId,
    Guid RankId,
    Guid PositionId
)
{
    /// <summary>
    /// Преобразует экземпляр типа ImportedSoldier в новый объект Soldier.
    /// </summary>
    /// <remarks>Поля MidleName и LastName будут установлены в null, если соответствующие значения в
    /// исходном объекте содержат только пробелы или пусты. Свойство NickName будет установлено в пустую
    /// строку.</remarks>
    /// <param name="soldier">Экземпляр ImportedSoldier, содержащий данные для преобразования. Не должен быть равен null.</param>
    /// <returns>Новый объект Soldier, инициализированный на основе данных из параметра soldier.</returns>
    public static Soldier ToEntity(ImportedSoldier soldier) => new()
    {
        ExternId = soldier.ExternId,
        FirstName = soldier.FirstName.Trim(),
        MidleName = string.IsNullOrWhiteSpace(soldier.MidleName) ? null : soldier.MidleName.Trim(),
        LastName = string.IsNullOrWhiteSpace(soldier.LastName) ? null : soldier.LastName.Trim(),
        BirthDate = soldier.BirthDate,
        NickName = string.Empty,
        UnitId = soldier.UnitId,
        ArrivedAt = soldier.ArrivedAt,
        DepartedAt = soldier.DepartedAt,
        RankId = soldier.RankId,
        PositionId = soldier.PositionId,
        StateId = ControllerFunctions.NullGuid,
        //Comment = string.IsNullOrWhiteSpace(Comment) ? null : Comment?.Trim()
    };
    /// <summary>
    /// Updates the specified soldier's properties with the current object's values.
    /// </summary>
    /// <remarks>This method copies the current object's property values to the provided soldier
    /// instance. The caller is responsible for ensuring that the soldier parameter is a valid, non-null
    /// object.</remarks>
    /// <param name="soldier">The soldier instance to update. Cannot be null.</param>
    /// <returns>The updated soldier instance with properties set to match the current object.</returns>
    public Soldier Update(Soldier soldier)
    {
        soldier.FirstName = FirstName;
        soldier.MidleName = MidleName;
        soldier.LastName = LastName;
        soldier.BirthDate = BirthDate;
        soldier.ArrivedAt = ArrivedAt;
        soldier.DepartedAt = DepartedAt;
        soldier.RankId = RankId;
        soldier.PositionId = PositionId;
        soldier.UnitId = UnitId;
        return soldier;
    }
    /// <summary>
    /// Determines whether the specified soldier's personal and service details differ from the current instance.
    /// </summary>
    /// <param name="soldier">The soldier to compare with the current instance. Cannot be null.</param>
    /// <returns>true if any of the compared fields differ between the specified soldier and the current instance; otherwise, false.</returns>
    public bool Changed(Soldier soldier)
    {
        var res = soldier.FirstName != FirstName ||
            soldier.MidleName != MidleName ||
            soldier.LastName != LastName ||
            soldier.BirthDate != BirthDate ||
            soldier.ArrivedAt != ArrivedAt ||
            soldier.DepartedAt != DepartedAt ||
            soldier.RankId != RankId ||
            soldier.PositionId != PositionId ||
            soldier.UnitId != UnitId;
        return res;
    }
}

/// <summary>
/// Specifies the possible outcomes for a soldier record during an import operation.
/// </summary>
public enum ImportSoldierStatus
{
    /// <summary>
    /// Запис було вставлено.
    /// </summary>
    Inserted,
    /// <summary>
    /// Запис було оновлено.
    /// </summary>
    Updated,
    /// <summary>
    /// Запис було видалено.
    /// </summary>
    Deleted
}

/// <summary>
/// Represents the result of importing a soldier, including the imported soldier's data and the status of the import operation.
/// </summary>
/// <param name="Soldier">The data transfer object containing information about the imported soldier.</param>
/// <param name="Status">The status indicating the outcome of the import operation for the soldier.</param>
public record ImportedSoldierResult(
    SoldierDto Soldier,
    ImportSoldierStatus Status
)
{
    /// <summary>
    /// Creates a new ImportedSoldierResult instance from the specified soldier and import status.
    /// </summary>
    /// <param name="e">The soldier entity to convert to a data transfer object.</param>
    /// <param name="status">The status indicating the result of the import operation for the soldier.</param>
    /// <returns>An ImportedSoldierResult containing the converted soldier data and the specified import status.</returns>
    public static ImportedSoldierResult ToDto(Soldier e, ImportSoldierStatus status)
    {
        var sldr = e.ToSoldierDto();
        var res = new ImportedSoldierResult(sldr, status);
        return res;
    }
}

/// <summary>
/// Specifies the status of an import operation or its individual units.
/// </summary>
public enum ImportProgressStatus
{
    /// <summary>
    /// Початок імпорту.
    /// </summary>
    Start,
    /// <summary>
    /// Імпорт завершено.
    /// </summary>
    Done,
    /// <summary>
    /// Помилка імпорту.
    /// </summary>
    Failed,
    /// <summary>
    /// Початок імпорту підрозділу.
    /// </summary>
    UnitStart,
    /// <summary>
    /// Імпорт підрозділу завершено.
    /// </summary>
    UnitDone,
    /// <summary>
    /// Підрозділ не знайдено.
    /// </summary>
    UnitNotFound,
    /// <summary>
    /// Обробку запису завершено.
    /// </summary>
    RecordDone
}

/// <summary>
/// Represents a unit being imported, including its name, current import status, and the results of imported soldiers.
/// </summary>
public class ImportUnit
{
    /// <summary>
    /// Назва підрозділу.
    /// </summary>
    public string Name { get; set; }

    /// <summary>
    /// Статус прогресу імпорту.
    /// </summary>
    public ImportProgressStatus Status { get; set; } = ImportProgressStatus.UnitStart;

    /// <summary>
    /// Список результатів імпорту бійців.
    /// </summary>
    public List<ImportedSoldierResult> ImportedSoldiers { get; init; } = [];

    /// <summary>
    /// Конструктор одиниці імпорту.
    /// </summary>
    /// <param name="name">Назва підрозділу.</param>
    /// <param name="status">Статус.</param>
    /// <param name="imports">Результати імпорту.</param>
    public ImportUnit(string name, ImportProgressStatus status, List<ImportedSoldierResult> imports)
    {
        Name = name;
        Status = status;
        ImportedSoldiers = imports;
    }
}

/// <summary>
/// Specifies the status of an import job operation.
/// </summary>
public enum ImportJobStatus
{
    /// <summary>
    /// Неактивний.
    /// </summary>
    NotActive,
    /// <summary>
    /// В процесі виконання.
    /// </summary>
    Running,
    /// <summary>
    /// Завершено успішно.
    /// </summary>
    Succeeded,
    /// <summary>
    /// Помилка.
    /// </summary>
    Failed
}

/// <summary>
/// Represents a record of an import job, including its status, associated unit, timestamps, and any error information.
/// </summary>
public record ImportJob
{
    /// <summary>
    /// ID підрозділу.
    /// </summary>
    public Guid UnitId { get; set; } = default!;

    /// <summary>
    /// Поточний статус завдання.
    /// </summary>
    public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;

    /// <summary>
    /// Час початку (UTC).
    /// </summary>
    public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Час закінчення (UTC).
    /// </summary>
    public DateTime? FinishedAtUtc { get; set; }

    /// <summary>
    /// Повідомлення про помилку.
    /// </summary>
    public string? Error { get; set; }
}

/// <summary>
/// Represents the progress of an import operation, including the current sheet, status, processed item count, total item count, and an optional message.
/// </summary>
/// <param name="Sheet">Назва аркуша.</param>
/// <param name="Status">Статус.</param>
/// <param name="Processed">Кількість оброблених записів.</param>
/// <param name="Total">Загальна кількість записів.</param>
/// <param name="Message">Повідомлення.</param>
public record ImportProgress(
    string? Sheet,
    ImportProgressStatus Status,
    int Processed,
    int Total,
    string? Message);
