using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using S5Server.Models;

namespace S5Server.Services
{
    public record ImportedSoldier(
        int ExternId,
        string FirstName,
        string? MidleName,
        string? LastName,
        int ExternalId,      // B
        string Rank,         // C
        DateOnly BirthDate,  // D
        string Position,     // E
        DateOnly? ArrivedAt,  //Прибув
        DateOnly? DepartedAt  //Вибув
    );

    public record ImportUnit(
        string UnitName,
        List<ImportedSoldier> ImportedSoldiers
    );

    public enum ImportJobStatus { NotActive, Running, Succeeded, Failed }
    public record ImportJob
    {
        public string UnitId { get; set; } = string.Empty;
        public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;
        public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAtUtc { get; set; }
        public string? Error { get; set; }
    }

    public record ImportProgress(string? Sheet, int Processed, int Total, string? Message);

    public static class ImportSoldiers
    {
        private static readonly Lock _sync = new();
        private static readonly ImportJob _current = new();
        public static ImportJob Current => _current;
        public static bool IsRunning => _current.Status == ImportJobStatus.Running;

        // Потокобезопасное хранение последнего результата
        private static readonly Lock _resultLock = new();
        private static readonly List<ImportUnit> _Result = [];
        public static List<ImportUnit> GetLastResult()
        {
            lock (_resultLock)
            {
                var v = _Result.Select(t => new ImportUnit(t.UnitName, [.. t.ImportedSoldiers])).ToList();
                return v;
            }
        }

        public static event Action<ImportProgress>? Progress;
        private static void Report(ImportProgress p)
        {
            var eventHandler = Progress;
            if (eventHandler != null)
            {
                try { eventHandler(p); } catch { /* ignore listener errors */ }
            }
        }

        // Буферизация файла до запуска фоновой задачи, чтобы избежать ObjectDisposedException
        public static (bool started, ImportJob? job, string? error) TryStartBackground(Unit unit, IFormFile file, CancellationToken ct = default)
        {
            lock (_sync)
            {
                if (IsRunning)
                    return (false, null, "Імпорт вже виконується");
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
                Report(new ImportProgress(null, 0, 0, "start"));
                _ = Task.Run(() => ExecuteAsync(unit, payload, ct), ct);
                return (true, Current, null);
            }
        }

        private static async Task ExecuteAsync(Unit unit, byte[] soldiersData, CancellationToken ct)
        {
            ArgumentNullException.ThrowIfNull(_current, "Внутрішня помилка серверу - завдання не знайдено");
            try
            {
                await DoImportSoldiers(unit, soldiersData, ct);
                lock (_sync)
                {
                    _current.Status = ImportJobStatus.Succeeded;
                    _current.FinishedAtUtc = DateTime.UtcNow;
                    Report(new ImportProgress(null, 0, 0, "done"));
                }
            }
            catch (Exception ex)
            {
                if (_current is null)
                    throw;
                _current.Status = ImportJobStatus.Failed;
                _current.Error = ex.Message;
                _current.FinishedAtUtc = DateTime.UtcNow;
                Report(new ImportProgress(null, 0, 0, "failed"));
            }
            finally
            {
                lock (_sync)
                {
                    _current.Status = ImportJobStatus.NotActive;
                }
            }
        }

        public static async Task DoImportSoldiers(Unit unit, byte[] soldiersData, CancellationToken ct = default)
        {
            ArgumentNullException.ThrowIfNull(_current, "Внутрішня помилка серверу - завдання не знайдено");

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

                var import = new ImportUnit(sheet.Name!, []);
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
                Report(new ImportProgress(sheet.Name, 0, total, "sheet-start"));
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

                    var sldr = new ImportedSoldier(
                        ExternId: externalId,
                        FirstName: firstName,
                        MidleName: midleName,
                        LastName: lastName,
                        ExternalId: externalId,
                        Rank: ColRank,
                        BirthDate: birthDate,
                        Position: ColPosition.Trim(),
                        ArrivedAt: arrivedAt,
                        DepartedAt: departedAt
                    );
                    lock (_resultLock)
                    {
                        import.ImportedSoldiers.Add(sldr);
                    }

                    processed++;
                    Report(new ImportProgress(sheet.Name, processed, total, null));

                    // Заменяем блокирующую паузу на асинхронную с поддержкой отмены
                    await Task.Delay(100, ct);
                }
                Report(new ImportProgress(sheet.Name, processed, total, "sheet-done"));
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