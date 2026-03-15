using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Services;

/// <summary>
/// Provides static methods and properties for managing the import of soldier records into the system, including job
/// control, progress reporting, and result retrieval.
/// </summary>
/// <remarks>This class is designed for thread-safe, application-wide management of background import
/// operations for soldier data. It exposes methods to configure dependencies, start import jobs, monitor progress,
/// and access the results of the most recent import. The import process supports cancellation and progress
/// notifications via the Progress event. Only one import job can run at a time; attempts to start a new job while
/// another is running will fail. Consumers should call Configure before initiating import operations to ensure
/// required services are available.</remarks>
public static class ImportSoldiersBGWorker
{
    private static readonly Lock _sync = new();
    private static readonly ImportJob _current = new();
    /// <summary>
    /// Gets the current import job instance.
    /// </summary>
    /// <remarks>Use this property to access the import job that is currently active in the
    /// application context. If no import job is active, the value may be null.</remarks>
    public static ImportJob Current => _current;
    /// <summary>
    /// Gets a value indicating whether the import job is currently running.
    /// </summary>
    public static bool IsRunning => _current.Status == ImportJobStatus.Running;
    // Фабрика контекста для фоновых операций импорта
    private static IDbContextFactory<MainDbContext>? _dbFactory;
    private static ILogger? _logger;
    /// <summary>
    /// Configures the static dependencies required for database operations and logging.
    /// </summary>
    /// <remarks>This method must be called before performing any operations that depend on the
    /// database context or logging. Calling this method multiple times will overwrite the previously configured
    /// dependencies.</remarks>
    /// <param name="dbFactory">The factory used to create instances of the main database context. Cannot be null.</param>
    /// <param name="logger">The logger used to record diagnostic and operational messages. Cannot be null.</param>
    public static void Configure(IDbContextFactory<MainDbContext> dbFactory,
        ILogger logger)
    {
        _dbFactory = dbFactory;
        _logger = logger;
    }


    // Потокобезопасное хранение последнего результата
    private static readonly Lock _resultLock = new();
    private static readonly List<ImportUnit> _Result = [];
    /// <summary>
    /// Retrieves the names of the most recently processed units.
    /// </summary>
    /// <returns>An array of strings containing the names of the last units. The array is empty if no units have been
    /// processed.</returns>
    public static string[] GetLastUnits()
    {
        lock (_resultLock)
        {
            var v = _Result.Select(t => t.Name).ToArray();
            return v;
        }
    }
    /// <summary>
    /// Retrieves a list of import units whose status is either completed or not found, optionally filtered by the
    /// specified unit names.
    /// </summary>
    /// <remarks>This method is thread-safe. The returned list contains new instances of import units
    /// based on the current import progress status.</remarks>
    /// <param name="units">An array of unit names to filter the results. If the array is empty, all units with a completed or not found
    /// status are returned.</param>
    /// <returns>A list of import units matching the specified names and having a status of either completed or not found.
    /// The list is empty if no matching units are found.</returns>
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
    /// <summary>
    /// Occurs when the import operation reports progress updates.
    /// </summary>
    /// <remarks>Subscribers receive notifications containing the current import progress. Handlers
    /// can use this event to provide user feedback or monitor the status of ongoing import operations.</remarks>
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

                var sheetName = sheet.Name?.Value?.Trim();
                if (string.IsNullOrEmpty(sheetName)) continue;

                var shortNameQry = db.Units
                    //.AsNoTracking()
                    .Where(t => t.ShortName == sheetName)
                    .Select(t => new { t.Id, t.ParentId });
                var fullNameQry = db.Units
                    //.AsNoTracking()
                    .Where(t => t.Name == sheetName)
                    .Select(t => new { t.Id, t.ParentId });
                var curUnitId = await (shortNameQry.Union(fullNameQry))
                    .AsNoTracking()
                    .Where(t => t.ParentId == unit.Id)
                    .Select(t => t.Id)
                    .FirstOrDefaultAsync(ct);

                //надеемся что default(Guid) == Guid.Empty == 0
                //никогда не будет валидным Id в БД,
                //иначе нужно использовать другой способ обозначения "не найдено"
                if (curUnitId == default)
                {
                    Report(new ImportProgress(sheetName, ImportProgressStatus.UnitNotFound, 0, 0, string.Empty));
                    lock (_resultLock)
                    {
                        _Result.Add(new ImportUnit(sheetName, ImportProgressStatus.UnitNotFound, []));
                    }
                    //await Task.Delay(1000, ct);
                    continue;//return;
                }

                var import = new ImportUnit(sheetName, ImportProgressStatus.UnitStart, []);
                lock (_resultLock)
                {
                    _Result.Add(import);
                }

                var wsPart = (WorksheetPart)wbPart!.GetPartById(sheet.Id!);
                if (wsPart.Worksheet is null) continue;
                var sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();
                if (sheetData is null) continue;

                var rows = sheetData.Elements<Row>().Skip(1)
                    .Where(t => t.ChildElements.Count > 1).ToList();
                var total = rows.Count;
                Report(new ImportProgress(sheetName, ImportProgressStatus.UnitStart, 0, total, "sheet-start"));
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
                    var extIdSldrQry = db.Soldiers
                        .Where(t => t.ExternId == sldr.ExternId);
                    var fioSldrQry = db.Soldiers
                        .Where(t => t.FirstName == sldr.FirstName &&
                        t.MidleName == sldr.MidleName &&
                        t.LastName == sldr.LastName &&
                        t.BirthDate == sldr.BirthDate);
                    var soldier = await (extIdSldrQry.Union(fioSldrQry))
                        .AsTracking()
                        .FirstOrDefaultAsync(ct);
                    if (soldier == null)//За ExternId та ФІО не знайдено
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
                            sldr.Update(soldier);
                            db.Soldiers.Update(soldier);
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
                    Report(new ImportProgress(sheetName, ImportProgressStatus.RecordDone, processed, total, null));
                }
                import.Status = ImportProgressStatus.UnitDone;
                Report(new ImportProgress(sheetName, ImportProgressStatus.UnitDone, processed, total, "sheet-done"));
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