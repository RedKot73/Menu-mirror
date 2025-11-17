using System.Globalization;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using S5Server.Models;

namespace S5Server.Services
{
    public record ImportedSoldier(
        string FIO,          // A
        int ExternalId,      // B
        string Rank,         // C
        DateOnly BirthDate,  // D
        string Position,     // E
        //string? Arrived,     // F
        DateOnly? ArrivedAt,  //Прибув
        DateOnly? DepartedAt  //Вибув
    );

    public record ImportUnit(
        string UnitName,
        List<ImportedSoldier> ImportedSoldiers
    );

    public class ImportSoldiers
    {
        public static async Task<List<ImportUnit>> DoImportSoldiers(Unit unit, IFormFile soldiers, CancellationToken ct = default)
        {
            using var ms = new MemoryStream();
            await soldiers.CopyToAsync(ms, ct);
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
                    var ColFio = GetCellValue(doc, GetCell(row, "A")).Trim();
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
                        continue; // пустая строка
                    }

                    // externalId может быть в виде "3390" или "3390.0" из Excel
                    int externalId = 0;
                    if (int.TryParse(ColExternalId, NumberStyles.Integer,
                        CultureInfo.InvariantCulture, out var iv))
                    {
                        externalId = iv;
                    }
                    else if (double.TryParse(ColExternalId,
                        NumberStyles.Float | NumberStyles.AllowThousands,
                        CultureInfo.InvariantCulture, out var dv))
                    {
                        externalId = (int)Math.Truncate(dv);
                    }
                    else if (double.TryParse(ColExternalId,
                        NumberStyles.Float | NumberStyles.AllowThousands,
                        CultureInfo.CurrentCulture, out dv))
                    {
                        externalId = (int)Math.Truncate(dv);
                    }

                    var birthDate = TryParseExcelDate(ColBirthDate, out var dd) ? dd : default;

                    DateOnly? arrivedAt = null;
                    DateOnly? departedAt = null;
                    if (ColArrived == "прибув")
                        arrivedAt = DateOnly.FromDateTime(DateTime.Now);
                    else if (ColArrived == "вибув")
                        departedAt = DateOnly.FromDateTime(DateTime.Now);

                    var sldr = new ImportedSoldier(
                        FIO: ColFio.Trim(),
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

        private static Cell? GetCell(Row row, string columnName)
        {
            return row.Elements<Cell>()
                .FirstOrDefault(c =>
                {
                    var r = c.CellReference?.Value;
                    if (string.IsNullOrEmpty(r)) return false;
                    var col = new string(r.Where(char.IsLetter).ToArray());
                    return string.Equals(col, columnName, StringComparison.OrdinalIgnoreCase);
                });
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
                else if (cell.DataType.Value == CellValues.Boolean)
                {
                    return value == "1" ? "TRUE" : "FALSE";
                }
                else
                    return value;
            }

            // Значение как есть (числа/даты в виде OADate попадут сюда)
            return value;
        }

        // Пытается распознать Excel-даты как OADate или текстовую дату
        private static bool TryParseExcelDate(string raw, out DateOnly date)
        {
            date = default;
            if (string.IsNullOrWhiteSpace(raw)) return false;

            // OADate (число)
            if (double.TryParse(raw, NumberStyles.Any, CultureInfo.InvariantCulture, out var oa))
            {
                try
                {
                    var dt = DateTime.FromOADate(oa);
                    date = DateOnly.FromDateTime(dt);
                    return true;
                }
                catch { /* ignore */ }
            }

            // Текстовая дата
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

/*
// Вернуть JSON с импортированными данными (например):
return Ok(new { unitId, sheets = wbPart.Workbook.Sheets!.OfType<DocumentFormat.OpenXml.Spreadsheet.Sheet>().Select(s => s.Name!.Value), items = imported });
    }
}
*/