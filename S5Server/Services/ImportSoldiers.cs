using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Services
{
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
    public enum ImportSoldierStatus { Inserted, Updated, Deleted }
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
    public enum ImportProgressStatus { Start, Done, Failed, UnitStart, UnitDone, UnitNotFound, RecordDone }
    /// <summary>
    /// Represents a unit being imported, including its name, current import status, and the results of imported
    /// soldiers.
    /// </summary>
    /// <remarks>Use this class to track the progress and results of importing a single unit, including the
    /// collection of soldiers associated with the unit. The import status indicates the current stage of the import
    /// process for this unit.</remarks>
    public class ImportUnit {
        /// <summary>
        /// Gets or sets the name associated with the object.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Gets or sets the current status of the import progress.
        /// </summary>
        public ImportProgressStatus Status { get; set; } = ImportProgressStatus.UnitStart;
        public List<ImportedSoldierResult> ImportedSoldiers { get; init; } = [];
        //public ImportUnit(string name) => Name = name;
        public ImportUnit(string name, ImportProgressStatus status, List<ImportedSoldierResult> imports) 
        { 
            Name = name;
            Status = status;
            ImportedSoldiers = imports; 
        }
    }

    public enum ImportJobStatus { NotActive, Running, Succeeded, Failed }
    public record ImportJob
    {
        public Guid UnitId { get; set; } = default!;
        public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;
        public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAtUtc { get; set; }
        public string? Error { get; set; }
    }

    public record ImportProgress(
        string? Sheet,
        ImportProgressStatus Status,
        int Processed,
        int Total,
        string? Message);

    public static class ImportSoldiers
    {
        private static readonly Lock _sync = new();
        private static readonly ImportJob _current = new();
        public static ImportJob Current => _current;
        public static bool IsRunning => _current.Status == ImportJobStatus.Running;
        // Фабрика контекста для фоновых операций импорта
        private static IDbContextFactory<MainDbContext>? _dbFactory;
        private static ILogger? _logger;
        public static void Configure(IDbContextFactory<MainDbContext> dbFactory,
            ILogger logger)
        {
            _dbFactory = dbFactory;
            _logger = logger;
        }


        // Потокобезопасное хранение последнего результата
        private static readonly Lock _resultLock = new();
        private static readonly List<ImportUnit> _Result = [];
        public static string[] GetLastUnits()
        {
            lock (_resultLock)
            {
                var v = _Result.Select(t => t.Name).ToArray();
                return v;
            }
        }

        public static List<ImportUnit> GetUnits(string[] units)
        {
            lock (_resultLock)
            {
                var query = _Result.Where(t => 
                    t.Status == ImportProgressStatus.UnitDone || 
                    t.Status == ImportProgressStatus.UnitNotFound
                );

                if (units.Length > 0)
                {
                    query = query.Where(t => units.Contains(t.Name));
                }
                var v = query.Select(t => new ImportUnit(t.Name, t.Status, [.. t.ImportedSoldiers])).ToList();
                return v;
            }
        }

        public static event Action<ImportProgress>? Progress;
        private static void Report(ImportProgress p)
        {
            var eventHandler = Progress;
            if (eventHandler != null)
            {
                try 
                { 
                    eventHandler(p);
                    //_logger?.LogDebug("Report");
                }
                catch { /* ignore listener errors */ }
            }
        }

        // Буферизация файла до запуска фоновой задачи, чтобы избежать ObjectDisposedException
        /// <summary>
        /// Attempts to start a background import job for the specified unit using the provided file.
        /// </summary>
        /// <remarks>If an import job is already running, the method does not start a new job and returns
        /// an error message. The file is buffered in memory before the background task begins to avoid issues with
        /// disposed streams.</remarks>
        /// <param name="unit">The unit for which the import job is to be started.</param>
        /// <param name="file">The file containing data to be imported. Must not be null.</param>
        /// <param name="ct">A cancellation token that can be used to cancel the import operation. Optional.</param>
        /// <returns>A tuple containing a boolean indicating whether the job was started, the import job instance, and an error
        /// message if the job could not be started.</returns>
        public static (bool started, ImportJob job, string? error) TryStartBackground(Unit unit, IFormFile file, CancellationToken ct = default)
        {
            lock (_sync)
            {
                if (IsRunning)
                    return (false, Current, "Імпорт вже виконується");
            }

            // Считываем данные файла в память пока запрос активен
            byte[] payload;
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                payload = ms.ToArray();
            }

            lock (_sync)
            {
                _current.UnitId = unit.Id;
                _current.Status = ImportJobStatus.Running;
                _current.StartedAtUtc = DateTime.UtcNow;
                _current.FinishedAtUtc = null;
                _current.Error = string.Empty;
                Report(new ImportProgress(null, ImportProgressStatus.Start, 0, 0, "start"));
                _ = Task.Run(() => DoImportSoldiers(unit, payload, ct), ct);
                return (true, Current, null);
            }
        }
        /// <summary>
        /// Imports soldier records for the specified unit from the provided data stream asynchronously.
        /// </summary>
        /// <remarks>The method processes each worksheet in the provided data as a separate subunit,
        /// importing or updating soldier records accordingly. The import operation is thread-safe and supports
        /// cancellation. Progress is reported throughout the import process. If the operation fails, the import job
        /// status is updated to reflect the failure.</remarks>
        /// <param name="unit">The unit for which soldiers are to be imported. Must not be null.</param>
        /// <param name="soldiersData">A byte array containing the serialized soldier data to import. The data is expected to be in a supported
        /// spreadsheet format.</param>
        /// <param name="ct">A cancellation token that can be used to cancel the import operation.</param>
        /// <returns>A task that represents the asynchronous import operation.</returns>
        /// <exception cref="InvalidOperationException">Thrown if a soldier record cannot be found after insertion or update during the import process.</exception>
        public static async Task DoImportSoldiers(Unit unit, byte[] soldiersData, CancellationToken ct = default)
        {
            try
            {
                ArgumentNullException.ThrowIfNull(_current,
                    "Внутрішня помилка серверу - завдання не знайдено");
                ArgumentNullException.ThrowIfNull(_dbFactory,
                    "IDbContextFactory<MainDbContext> не сконфигурован. Вызовите ImportSoldiers.ConfigureDbFactory(...) при старте приложения.");

                await using var db = await _dbFactory.CreateDbContextAsync(ct);
                // Кэшируем справочники в память для всех листов
                var ranksByValue = await db.DictRanks
                    .AsNoTracking()
                    .ToDictionaryAsync(
                        r => r.Value,
                        r => r.Id,
                        StringComparer.OrdinalIgnoreCase, // Case-insensitive
                        ct
                    );
                var ranksByShortValue = await db.DictRanks
                    .AsNoTracking()
                    .ToDictionaryAsync(
                        r => r.ShortValue,
                        r => r.Id,
                        StringComparer.OrdinalIgnoreCase,
                        ct
                    );
                var positionsByValue = await db.DictPositions
                    .AsNoTracking()
                    .ToDictionaryAsync(
                        p => p.Value,
                        p => p.Id,
                        StringComparer.OrdinalIgnoreCase,
                        ct
                    );
                /*
                var ranksById = await db.DictRanks
                    .AsNoTracking()
                    .ToDictionaryAsync(r => r.Id, r => r, ct);
                var positionsById = await db.DictPositions
                    .AsNoTracking()
                    .ToDictionaryAsync(p => p.Id, p => p, ct);
                */

                using var ms = new MemoryStream(soldiersData, writable: false);
                ms.Position = 0;

                using var doc = SpreadsheetDocument.Open(ms, false);
                var wbPart = doc.WorkbookPart;
                var sheets = wbPart?.Workbook?.Sheets;
                if (sheets == null)
                    return;

                lock (_resultLock)
                {
                    _Result.Clear();
                }

                foreach (var sheet in sheets.OfType<Sheet>())
                {
                    // Проверка отмены перед началом обработки листа
                    ct.ThrowIfCancellationRequested();

                    if (string.IsNullOrEmpty(sheet.Name)) continue;

                    var curUnitId = await db.Units
                        .AsNoTracking()
                        .Where(t => t.ParentId == unit.Id && t.ShortName == sheet.Name)
                        .Select(t => t.Id)
                        .FirstOrDefaultAsync(ct);
                    //надеемся что default(Guid) == Guid.Empty == 0
                    //никогда не будет валидным Id в БД,
                    //иначе нужно использовать другой способ обозначения "не найдено"
                    if (curUnitId == default)
                    {
                        Report(new ImportProgress(sheet.Name, ImportProgressStatus.UnitNotFound, 0, 0, string.Empty));
                        lock (_resultLock)
                        {
                            _Result.Add(new ImportUnit(sheet.Name!, ImportProgressStatus.UnitNotFound, []));
                        }
                        //await Task.Delay(1000, ct);
                        continue;//return;
                    }

                    var import = new ImportUnit(sheet.Name!, ImportProgressStatus.UnitStart, []);
                    lock (_resultLock)
                    {
                        _Result.Add(import);
                    }

                    var wsPart = (WorksheetPart)wbPart!.GetPartById(sheet.Id!);
                    if(wsPart.Worksheet is null) continue;
                    var sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();
                    if (sheetData is null) continue;

                    var rows = sheetData.Elements<Row>().Skip(1)
                        .Where(t => t.ChildElements.Count > 1).ToList();
                    var total = rows.Count;
                    Report(new ImportProgress(sheet.Name, ImportProgressStatus.UnitStart, 0, total, "sheet-start"));
                    var processed = 0;

                    foreach (var row in rows)
                    {
                        // Проверка отмены перед обработкой строки
                        ct.ThrowIfCancellationRequested();

                        var ColFio = GetCellValue(doc, GetCell(row, "A")).Trim()
                            .Replace("\n\r", " ").Replace("\n", " ")
                            .Replace("\r", " ").Replace("\u00A0", " ");
                        var ColExternalId = GetCellValue(doc, GetCell(row, "B")).Trim();
                        var ColRank = GetCellValue(doc, GetCell(row, "C")).Trim();
                        var ColBirthDate = GetCellValue(doc, GetCell(row, "D")).Trim();
                        var ColPosition = GetCellValue(doc, GetCell(row, "E")).Trim()
                            .Replace("\n\r", " ").Replace("\n", " ")
                            .Replace("\r", " ").Replace("\u00A0", " ");
                        var ColArrived = GetCellValue(doc, GetCell(row, "F")).Trim();

                        if (string.IsNullOrWhiteSpace(ColFio) &&
                            string.IsNullOrWhiteSpace(ColExternalId) &&
                            string.IsNullOrWhiteSpace(ColRank) &&
                            string.IsNullOrWhiteSpace(ColBirthDate) &&
                            string.IsNullOrWhiteSpace(ColPosition) &&
                            string.IsNullOrWhiteSpace(ColArrived))
                        {
                            processed++;
                            break;//после пустой строки данных нет
                        }

                        var fioParts = ColFio.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                        var firstName = fioParts.ElementAtOrDefault(0) ?? string.Empty;
                        string? midleName = fioParts.Length > 1 ? fioParts[1] : null;
                        string? lastName = fioParts.Length > 2 ? string.Join(" ", fioParts.Skip(2)) : null;

                        int externalId = 0;
                        if (int.TryParse(ColExternalId, NumberStyles.Integer, CultureInfo.InvariantCulture, out var iv))
                            externalId = iv;
                        else if (double.TryParse(ColExternalId, NumberStyles.Float | NumberStyles.AllowThousands, CultureInfo.InvariantCulture, out var dv))
                            externalId = (int)Math.Truncate(dv);
                        else if (double.TryParse(ColExternalId, NumberStyles.Float | NumberStyles.AllowThousands, CultureInfo.CurrentCulture, out dv))
                            externalId = (int)Math.Truncate(dv);

                        var birthDate = TryParseExcelDate(ColBirthDate, out var dd) ? dd : default;

                        DateOnly? arrivedAt = null;
                        DateOnly? departedAt = null;
                        if (ColArrived == "прибув") arrivedAt = DateOnly.FromDateTime(DateTime.UtcNow);
                        else if (ColArrived == "вибув") departedAt = DateOnly.FromDateTime(DateTime.UtcNow);

                        // Поиск RankId из кэша (сначала по ShortValue, потом по Value)
                        var rankId = ControllerFunctions.NullGuid;
                        if (!string.IsNullOrWhiteSpace(ColRank))
                        {
                            rankId = ranksByValue.TryGetValue(ColRank, out var vRankId) ? vRankId :
                                ranksByValue.GetValueOrDefault(ColRank, ControllerFunctions.NullGuid);
                        }
                        // Поиск PositionId из кэша
                        var positionId = ControllerFunctions.NullGuid;
                        if (!string.IsNullOrWhiteSpace(ColPosition))
                        {
                            // ✅ ВИПРАВЛЕНО: використовуємо NullGuid як default
                            positionId = positionsByValue.GetValueOrDefault(
                                ColPosition,
                                ControllerFunctions.NullGuid);
                        }

                        var sldr = new ImportedSoldier(
                            FirstName: firstName,
                            MidleName: midleName,
                            LastName: lastName,
                            ExternId: externalId,
                            Rank: ColRank,
                            BirthDate: birthDate,
                            Position: ColPosition.Trim(),
                            ArrivedAt: arrivedAt,
                            DepartedAt: departedAt,
                            //-----------------
                            UnitId: curUnitId,
                            RankId: rankId,
                            PositionId: positionId
                        );

                        ImportSoldierStatus? importSoldierStatus = null;
                        var soldier = await db.Soldiers
                            .AsTracking()//.AsNoTracking()
                            .Where(t => t.ExternId == sldr.ExternId)
                            .FirstOrDefaultAsync(ct);
                        if(soldier == null)//За ExternId не знайдено
                        {
                            soldier = await db.Soldiers
                                .AsNoTracking()
                                .Where(t => t.FirstName == sldr.FirstName &&
                                t.MidleName == sldr.MidleName &&
                                t.LastName == sldr.LastName &&
                                t.BirthDate == sldr.BirthDate)
                                .FirstOrDefaultAsync(ct);
                            if (soldier == null)//За ФІО не знайдено
                            {
                                soldier = ImportedSoldier.ToEntity(sldr);
                                soldier.ValidFrom = DateTime.UtcNow;
                                soldier.ChangedBy = "ImportSoldiers";

                                db.Soldiers.Add(soldier);
                                importSoldierStatus = ImportSoldierStatus.Inserted;
                            }
                            else
                            if (sldr.Chnaged(soldier))//Дані в Exl and DB відрізняються
                            {
                                soldier.ValidFrom = DateTime.UtcNow;
                                soldier.ChangedBy = "ImportSoldiers";
                                db.Soldiers.Update(soldier);
                                sldr.Update(soldier);
                                importSoldierStatus = ImportSoldierStatus.Updated;
                            }
                        }
                        else
                        if(sldr.Chnaged(soldier))//Дані в Exl and DB відрізняються
                            {
                            soldier.ValidFrom = DateTime.UtcNow;
                            soldier.ChangedBy = "ImportSoldiers";
                            db.Soldiers.Update(soldier);
                            sldr.Update(soldier);
                            importSoldierStatus = ImportSoldierStatus.Updated;
                        }

                        if (importSoldierStatus != null)//Запис відрізняється від запису в БД
                        {
                            await db.SaveChangesAsync(ct);

                            soldier = await SoldierService.GetQuery(db.Soldiers)
                                .Where(t => t.ExternId == sldr.ExternId)
                                .FirstOrDefaultAsync(ct) ??
                                throw new InvalidOperationException($"Soldier {sldr.ExternId} not found");
                            var soldierResult = ImportedSoldierResult.ToDto(soldier, (ImportSoldierStatus)importSoldierStatus);

                            lock (_resultLock)
                            {
                                import.ImportedSoldiers.Add(soldierResult);
                            }
                        }

                        processed++;
                        Report(new ImportProgress(sheet.Name, ImportProgressStatus.RecordDone, processed, total, null));
                    }
                    import.Status = ImportProgressStatus.UnitDone;
                    Report(new ImportProgress(sheet.Name, ImportProgressStatus.UnitDone, processed, total, "sheet-done"));
                }
            }
            catch (Exception ex)
            {
                lock (_sync)
                {
                    _current.Status = ImportJobStatus.Failed;
                    _current.Error = ex.Message;
                    _current.FinishedAtUtc = DateTime.UtcNow;
                    Report(new ImportProgress(null, ImportProgressStatus.Failed, 0, 0, "failed"));
                }
            }
            finally
            {
                lock (_sync)
                {
                    if (_current.Status == ImportJobStatus.Running)
                    {
                        _current.Status = ImportJobStatus.Succeeded;
                    }
                    _current.FinishedAtUtc = DateTime.UtcNow;
                    Report(new ImportProgress(null, ImportProgressStatus.Done, 0, 0, "done"));
                }
            }
        }

        private static Cell? GetCell(Row row, string col)
        {
            var idx = row.RowIndex?.Value;
            if (idx is null) return null;
            return row.Elements<Cell>()
                .FirstOrDefault(c => string.Equals(c.CellReference?.Value,
                $"{col}{idx}", StringComparison.OrdinalIgnoreCase));
        }

        private static string GetCellValue(SpreadsheetDocument doc, Cell? cell)
        {
            if (cell is null) return string.Empty;
            var value = cell.InnerText ?? string.Empty;
            if (cell.DataType != null)
            {
                if (cell.DataType.Value == CellValues.SharedString)
                {
                    if (int.TryParse(value, out var i))
                    {
                        var sst = doc.WorkbookPart?.SharedStringTablePart?.SharedStringTable;
                        if (sst != null && i >= 0 && i < sst.Count())
                            return sst.ElementAt(i).InnerText ?? string.Empty;
                    }
                    return string.Empty;
                }
                if (cell.DataType.Value == CellValues.Boolean)
                    return value == "1" ? "TRUE" : "FALSE";
                return value;
            }
            return value;
        }

        private static bool TryParseExcelDate(string raw, out DateOnly date)
        {
            date = default;
            if (string.IsNullOrWhiteSpace(raw)) return false;
            if (double.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var oa))
            {
                try
                {
                    var dt = DateTime.FromOADate(oa);
                    date = DateOnly.FromDateTime(dt);
                    return true;
                }
                catch { }
            }
            if (DateTime.TryParse(raw, CultureInfo.CurrentCulture, DateTimeStyles.AssumeLocal, out var parsed) ||
                DateTime.TryParse(raw, CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out parsed))
            {
                date = DateOnly.FromDateTime(parsed);
                return true;
            }
            return false;
        }
    }
}