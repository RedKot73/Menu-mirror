using System.Collections.Generic;
using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Services
{
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
        string UnitId,
        string RankId,
        string PositionId
    )
    {
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
            //AssignedUnitId = AssignedUnitId,
            //OperationalUnitId = OperationalUnitId,
            RankId = soldier.RankId,
            PositionId = soldier.PositionId,
            StateId = ControllerFunctions.NullGuid,
            //Comment = string.IsNullOrWhiteSpace(Comment) ? null : Comment?.Trim()
        };
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
            return soldier;
        }
        public bool Chnaged(Soldier soldier)
        {
            var res = soldier.FirstName != FirstName ||
                soldier.MidleName != MidleName ||
                soldier.LastName != LastName ||
                soldier.BirthDate != BirthDate ||
                soldier.ArrivedAt != ArrivedAt ||
                soldier.DepartedAt != DepartedAt ||
                soldier.RankId != RankId ||
                soldier.PositionId != PositionId;
            return res;
        }
    }

    public enum ImportSoldierStatus { Inserted, Updated, Deleted }
    public record ImportedSoldierResult(
        SoldierDto Soldier,
        ImportSoldierStatus Status
    )
    {
        public static ImportedSoldierResult ToDto(Soldier e, ImportSoldierStatus status)
        {
            var sldr = SoldierDto.ToDto(e);
            var res = new ImportedSoldierResult(sldr, status);
            return res;
        }
    }

    public enum ImportProgressStatus { Start, Done, Failed, UnitStart, UnitDone, UnitNotFound, RecordDone }
    public class ImportUnit {
        public string Name { get; set; }
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
        public string UnitId { get; set; } = string.Empty;
        public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;
        public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAtUtc { get; set; }
        public string? Error { get; set; }
    }

    public record ImportProgress(string? Sheet, ImportProgressStatus Status, int Processed, int Total, string? Message);

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

        public static async Task DoImportSoldiers(Unit unit, byte[] soldiersData, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(_current,
                "Внутрішня помилка серверу - завдання не знайдено");
            ArgumentNullException.ThrowIfNull(_dbFactory,
                "IDbContextFactory<MainDbContext> не сконфигурован. Вызовите ImportSoldiers.ConfigureDbFactory(...) при старте приложения.");
            try
            {
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
                    if (curUnitId == null)
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
                        if (ColArrived == "прибув") arrivedAt = DateOnly.FromDateTime(DateTime.Now);
                        else if (ColArrived == "вибув") departedAt = DateOnly.FromDateTime(DateTime.Now);

                        // Поиск RankId из кэша (сначала по ShortValue, потом по Value)
                        string? rankId = null;
                        if (!string.IsNullOrWhiteSpace(ColRank))
                        {
                            ranksByShortValue.TryGetValue(ColRank, out rankId);
                            rankId ??= ranksByValue.GetValueOrDefault(ColRank);
                        }
                        // Поиск PositionId из кэша
                        string? positionId = !string.IsNullOrWhiteSpace(ColPosition)
                            ? positionsByValue.GetValueOrDefault(ColPosition)
                            : ControllerFunctions.NullGuid;

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
                            RankId: !string.IsNullOrWhiteSpace(rankId) ?
                                rankId : ControllerFunctions.NullGuid,
                            PositionId: !string.IsNullOrWhiteSpace(positionId) ?
                                positionId : positionId = ControllerFunctions.NullGuid
                        );

                        ImportSoldierStatus? importSoldierStatus = null;
                        var soldier = await db.Soldiers
                            .AsNoTracking()
                            .Where(t => t.ExternId == sldr.ExternId)
                            .FirstOrDefaultAsync(ct);
                        if(soldier == null)
                        {
                            soldier = await db.Soldiers
                                .AsNoTracking()
                                .Where(t => t.FirstName == sldr.FirstName &&
                                t.MidleName == sldr.MidleName &&
                                t.LastName == sldr.LastName &&
                                t.BirthDate == sldr.BirthDate)
                                .FirstOrDefaultAsync(ct);
                            if (soldier == null)
                            {
                                soldier = ImportedSoldier.ToEntity(sldr);
                                soldier.ValidFrom = DateTime.Now;
                                soldier.ChangedBy = "ImportSoldiers";

                                db.Soldiers.Add(soldier);
                                importSoldierStatus = ImportSoldierStatus.Inserted;
                            }
                            else
                            if (sldr.Chnaged(soldier))
                            {
                                soldier.ValidFrom = DateTime.Now;
                                soldier.ChangedBy = "ImportSoldiers";
                                db.Soldiers.Update(soldier);
                                sldr.Update(soldier);
                                importSoldierStatus = ImportSoldierStatus.Updated;
                            }
                        }
                        else
                        if(sldr.Chnaged(soldier))
                        {
                            soldier.ValidFrom = DateTime.Now;
                            soldier.ChangedBy = "ImportSoldiers";
                            db.Soldiers.Update(soldier);
                            sldr.Update(soldier);
                            importSoldierStatus = ImportSoldierStatus.Updated;
                        }

                        if (importSoldierStatus != null)//Запис відрізняється від запису в БД
                        {
                            await db.SaveChangesAsync(ct);

                            soldier = await SoldierService.GetQuery(db.Soldiers)
                                /*
                                db.Soldiers
                                .AsNoTracking()
                                .Include(s => s.Unit)
                                .Include(s => s.AssignedUnit)
                                .Include(s => s.OperationalUnit)
                                .Include(s => s.Rank)
                                .Include(s => s.Position)
                                .Include(s => s.State)
                                */
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

                        // Заменяем блокирующую паузу на асинхронную с поддержкой отмены
                        //await Task.Delay(100, ct);
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