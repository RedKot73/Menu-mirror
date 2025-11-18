using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using S5Server.Models;

namespace S5Server.Services
{
    public record ImportedSoldier(
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
    public class ImportJob
    {
        public string UnitId { get; init; } = string.Empty;
        public ImportJobStatus Status { get; set; } = ImportJobStatus.NotActive;
        public DateTime StartedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAtUtc { get; set; }
        public string? Error { get; set; }
        public List<ImportUnit>? Result { get; set; }
    }

    public class ImportSoldiers
    {
        private static readonly Lock _sync = new();
        private static ImportJob? _current;
        public static ImportJob? Current => _current;
        public static bool IsRunning => _current is not null && _current.Status == ImportJobStatus.Running;

        public static (bool started, ImportJob? job, string? error) TryStartBackground(Unit unit, IFormFile file, CancellationToken ct = default)
        {
            lock (_sync)
            {
                if (IsRunning)
                    return (false, null, "Імпорт вже виконується");

                /*using*/ 
                /*
                var ms = new MemoryStream();
                file.CopyTo(ms);
                ms.Position = 0;
                */
                _current = new ImportJob
                {
                    UnitId = unit.Id,
                    Status = ImportJobStatus.Running,
                    StartedAtUtc = DateTime.UtcNow
                };
                // Запускаем в фоне простым Task.Run
                _ = Task.Run(() => ExecuteAsync(unit, /*ms*/file, ct), ct);
                return (true, Current, null);
            }
        }

        private static async Task ExecuteAsync(Unit unit, /*MemoryStream soldiers*/IFormFile soldiers, CancellationToken ct)
        {
            ArgumentNullException.ThrowIfNull(_current, "Внутрішня помилка серверу - завдання не знайдено");
            try
            {
                _current.Result = await DoImportSoldiers(unit, soldiers, ct);
                _current.Status = ImportJobStatus.Succeeded;
                _current.FinishedAtUtc = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                if (_current is null)
                    throw;
                _current.Status = ImportJobStatus.Failed;
                _current.Error = ex.Message;
                _current.FinishedAtUtc = DateTime.UtcNow;
            }
            finally
            {
                lock (_sync)
                {
                    _current = null;
                }
            }
        }

        public static async Task<List<ImportUnit>> DoImportSoldiers(Unit unit, /*MemoryStream soldiers*/IFormFile soldiers, CancellationToken ct = default)
        {
            using var ms = new MemoryStream();
            soldiers.CopyTo(ms);
            ms.Position = 0;

            using var doc = SpreadsheetDocument.Open(ms, false);
            var wbPart = doc.WorkbookPart;
            var sheets = wbPart?.Workbook?.Sheets;
            if (sheets == null)
                return [];

            var res = new List<ImportUnit>();
            foreach (var sheet in sheets.OfType<Sheet>())
            {
                if (string.IsNullOrEmpty(sheet.Name)) continue;

                var import = new ImportUnit(sheet.Name!, []);
                res.Add(import);

                var wsPart = (WorksheetPart)wbPart!.GetPartById(sheet.Id!);
                var sheetData = wsPart.Worksheet.GetFirstChild<SheetData>();
                if (sheetData is null) continue;

                foreach (var row in sheetData.Elements<Row>().Skip(1)) // skip header
                {
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
                        continue;
                    }

                    // Разбиваем ФИО на три поля по пробелам
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
                    import.ImportedSoldiers.Add(sldr);
                }
            }
            return res;
        }

        private static Cell? GetCell(Row row, string columnName) => row.Elements<Cell>()
            .FirstOrDefault(c =>
            {
                var r = c.CellReference?.Value;
                if (string.IsNullOrEmpty(r)) return false;
                var col = new string(r.Where(char.IsLetter).ToArray());
                return string.Equals(col, columnName, StringComparison.OrdinalIgnoreCase);
            });

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