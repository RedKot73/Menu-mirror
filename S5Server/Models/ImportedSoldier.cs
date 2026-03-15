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
    /// <remarks>The comparison includes first name, middle name, last name, birth date, arrival and
    /// departure dates, rank ID, and position ID. Use this method to detect changes before updating or saving
    /// soldier information.</remarks>
    /// <param name="soldier">The soldier to compare with the current instance. Cannot be null.</param>
    /// <returns>true if any of the compared fields differ between the specified soldier and the current instance; otherwise,
    /// false.</returns>
    public bool Chnaged(Soldier soldier)
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
/// <remarks>Use this enumeration to determine whether a soldier record was inserted, updated, or deleted
/// as a result of the import process. This can be useful for tracking changes or providing feedback to users after
/// an import completes.</remarks>
public enum ImportSoldierStatus
{
    /// <summary>
    /// Gets a value indicating whether the item has been inserted into the collection.
    /// </summary>
    Inserted,
    /// <summary>
    /// Gets or sets the date and time when the entity was last updated.
    /// </summary>
    Updated,
    /// <summary>
    /// Gets or sets a value indicating whether the item has been marked as deleted.
    /// </summary>
    Deleted
}
/// <summary>
/// Represents the result of importing a soldier, including the imported soldier's data and the status of the import
/// operation.
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
/// <remarks>Use this enumeration to track and report the progress of an import process. The values
/// indicate the overall state (such as start, completion, or failure) as well as the status of individual units or
/// records within the import. This can be useful for providing feedback to users or for logging purposes during
/// batch data import scenarios.</remarks>
public enum ImportProgressStatus
{
    /// <summary>
    /// Gets or sets the start value or position.
    /// </summary>
    Start,
    /// <summary>
    /// Indicates that the operation has been completed.
    /// </summary>
    Done,
    /// <summary>
    /// Indicates that the operation has failed.
    /// </summary>
    Failed,
    /// <summary>
    /// Gets or sets the start value of the unit range.
    /// </summary>
    UnitStart,
    /// <summary>
    /// Indicates that a unit of work has been completed.
    /// </summary>
    UnitDone,
    /// <summary>
    /// Indicates that the specified unit could not be found.
    /// </summary>
    UnitNotFound,
    /// <summary>
    /// Gets or sets a value indicating whether the record operation has completed.
    /// </summary>
    RecordDone
}
/// <summary>
/// Represents a unit being imported, including its name, current import status, and the results of imported
/// soldiers.
/// </summary>
/// <remarks>Use this class to track the progress and results of importing a single unit, including the
/// collection of soldiers associated with the unit. The import status indicates the current stage of the import
/// process for this unit.</remarks>
public class ImportUnit
{
    /// <summary>
    /// Gets or sets the name associated with the object.
    /// </summary>
    public string Name { get; set; }
    /// <summary>
    /// Gets or sets the current status of the import progress.
    /// </summary>
    public ImportProgressStatus Status { get; set; } = ImportProgressStatus.UnitStart;
    /// <summary>
    /// Gets the collection of results for imported soldiers.
    /// </summary>
    public List<ImportedSoldierResult> ImportedSoldiers { get; init; } = [];
    /// <summary>
    /// Initializes a new instance of the ImportUnit class with the specified name, import status, and list of
    /// imported soldiers.
    /// </summary>
    /// <param name="name">The name of the import unit. Cannot be null.</param>
    /// <param name="status">The current progress status of the import operation.</param>
    /// <param name="imports">A list of results for each imported soldier. Cannot be null.</param>
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
/// <remarks>Use this enumeration to determine the current state of an import job, such as whether it is
/// running, has completed successfully, has failed, or is not currently active. The status can be used to monitor
/// progress and handle different outcomes appropriately.</remarks>
public enum ImportJobStatus
{
    /// <summary>
    /// Indicates that the entity is not currently active.
    /// </summary>
    NotActive,
    /// <summary>
    /// Indicates that the current operation or process is running.
    /// </summary>
    Running,
    /// <summary>
    /// Indicates that the operation completed successfully.
    /// </summary>
    Succeeded,
    /// <summary>
    /// Indicates that the operation has failed.
    /// </summary>
    Failed
}
/// <summary>
/// Represents a record of an import job, including its status, associated unit, timestamps, and any error
/// information.
/// </summary>
public record ImportJob
{
    /// <summary>
    /// Gets or sets the unique identifier for the unit.
    /// </summary>
    public Guid UnitId { get; set; } = default!;
    /// <summary>
    /// Gets or sets the current status of the import job.
    /// </summary>
    public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;
    /// <summary>
    /// Gets or sets the date and time, in Coordinated Universal Time (UTC), when the operation started.
    /// </summary>
    public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
    /// <summary>
    /// Gets or sets the date and time, in Coordinated Universal Time (UTC), when the operation was completed.
    /// </summary>
    public DateTime? FinishedAtUtc { get; set; }
    /// <summary>
    /// Gets or sets the error message associated with the current operation.
    /// </summary>
    public string? Error { get; set; }
}
/// <summary>
/// Represents the progress of an import operation, including the current sheet, status, processed item count, total
/// item count, and an optional message.
/// </summary>
/// <param name="Sheet">The name of the sheet currently being imported, or null if not applicable.</param>
/// <param name="Status">The current status of the import operation.</param>
/// <param name="Processed">The number of items that have been processed so far.</param>
/// <param name="Total">The total number of items to be processed.</param>
/// <param name="Message">An optional message providing additional information about the import progress, or null if not set.</param>
public record ImportProgress(
    string? Sheet,
    ImportProgressStatus Status,
    int Processed,
    int Total,
    string? Message);
