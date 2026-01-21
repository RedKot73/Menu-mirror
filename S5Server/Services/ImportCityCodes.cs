using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;

using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;

namespace S5Server.Services
{
    public enum CityCodesProgressStatus { Start, Done, Failed }
    public record ImportCityCodesProgress(CityCodesProgressStatus Status, int Processed, int Total, string? Message);

    /// <summary>
    /// Механізм імпорту
    /// Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public static class ImportCityCodes
    {
        private static readonly Lock _sync = new();
        private static CityCodesProgressStatus _Status = CityCodesProgressStatus.Done;
        // Фабрика контекста для фоновых операций импорта
        private static IDbContextFactory<MainDbContext>? _dbFactory;
        private static ILogger? _logger;
        public static void Configure(IDbContextFactory<MainDbContext> dbFactory,
            ILogger logger)
        {
            _dbFactory = dbFactory;
            _logger = logger;

        }
        public static event Action<ImportCityCodesProgress>? Progress;
        private static void Report(ImportCityCodesProgress p)
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

        // Буферизація файла до запуска фоновой задачи, чтобы избежать ObjectDisposedException
        public static (bool started, CityCodesProgressStatus status, string? error) TryStartBackground(IFormFile file, CancellationToken ct = default)
        {
            lock (_sync)
            {
                if (_Status == CityCodesProgressStatus.Start)
                    return (false, _Status, "Імпорт вже виконується");
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
                _Status = CityCodesProgressStatus.Start;
                Report(new ImportCityCodesProgress(_Status, 0, 0, "start"));
                _ = Task.Run(() => DoImport(payload, ct), ct);
                return (true, _Status, "Імпорт почався");
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

            // Обробка SharedStringTable
            if (cell.DataType?.Value == CellValues.SharedString)
            {
                var stringTable = doc.WorkbookPart?.SharedStringTablePart?.SharedStringTable;
                if (stringTable != null && int.TryParse(value, out var index))
                {
                    value = stringTable.ElementAt(index).InnerText;
                }
            }

            return value.Trim();
        }

        public static async Task DoImport(byte[] sourceData, CancellationToken ct = default)
        {
            var processed = 0;
            try
            {
                ArgumentNullException.ThrowIfNull(_dbFactory,
                    "IDbContextFactory<MainDbContext> не сконфігуровано");

                await using var db = await _dbFactory.CreateDbContextAsync(ct);
                
                // Кешуємо категорії
                var dictCityCategories = await db.DictCityCategories
                    .AsNoTracking()
                    .ToDictionaryAsync(r => r.CodeId, r => r.Id, StringComparer.OrdinalIgnoreCase, ct);

                using var ms = new MemoryStream(sourceData, writable: false);
                using var doc = SpreadsheetDocument.Open(ms, false);
                
                var wbPart = doc.WorkbookPart ?? throw new Exception("Відсутні сторінки");
                var sheets = wbPart.Workbook?.Sheets ?? throw new Exception("Відсутні сторінки");
                var sheet = sheets.OfType<Sheet>().FirstOrDefault() ?? throw new Exception("Відсутні сторінки");
                var wsPart = (WorksheetPart)wbPart.GetPartById(sheet.Id!);
                var sheetData = wsPart.Worksheet?.GetFirstChild<SheetData>() ?? throw new Exception("Порожня сторінка");

                ct.ThrowIfCancellationRequested();

                var rows = sheetData.Elements<Row>()
                    .SkipWhile(row =>
                    {
                        var firstCell = GetCellValue(doc, GetCell(row, "A"));
                        return !firstCell.StartsWith("UA01", StringComparison.OrdinalIgnoreCase);
                    })
                    .ToList();
                    
                var total = rows.Count;
                Report(new ImportCityCodesProgress(_Status, 0, total, "Починаю обробку даних"));

                // Створюємо Root
                var root = new DictCityCode
                {
                    Id = DictCityCode.RootCityCode,
                    ParentId = null,
                    Level1 = DictCityCode.RootCityCode,
                    Level2 = string.Empty,
                    Level3 = string.Empty,
                    Level4 = string.Empty,
                    LevelExt = string.Empty,
                    CategoryId = ControllerFunctions.NullGuid,
                    Value = "---"
                };
                db.DictCityCodes.Add(root);

                // 🚀 Збираємо всі записи в пам'яті
                var entities = new List<DictCityCode>(total);
                var errors = new List<string>();

                foreach (var row in rows)
                {
                    ct.ThrowIfCancellationRequested();

                    try
                    {
                        var level1 = GetCellValue(doc, GetCell(row, "A"));
                        var level2 = GetCellValue(doc, GetCell(row, "B"));
                        var level3 = GetCellValue(doc, GetCell(row, "C"));
                        var level4 = GetCellValue(doc, GetCell(row, "D"));
                        var levelExt = GetCellValue(doc, GetCell(row, "E"));
                        var category = GetCellValue(doc, GetCell(row, "F"));
                        var value = GetCellValue(doc, GetCell(row, "G"));

                        // Перевірка на кінець даних
                        if (string.IsNullOrWhiteSpace(level1) &&
                            string.IsNullOrWhiteSpace(level2) &&
                            string.IsNullOrWhiteSpace(level3) &&
                            string.IsNullOrWhiteSpace(level4) &&
                            string.IsNullOrWhiteSpace(levelExt) &&
                            string.IsNullOrWhiteSpace(value))
                        {
                            break;
                        }

                        // Валідація
                        if (string.IsNullOrWhiteSpace(level1))
                        {
                            errors.Add($"Рядок {row.RowIndex}: відсутній Level1");
                            continue;
                        }
                        if (string.IsNullOrWhiteSpace(value))
                        {
                            errors.Add($"Рядок {row.RowIndex}: відсутнє значення");
                            continue;
                        }

                        if (!dictCityCategories.TryGetValue(category, out var categoryId))
                        {
                            errors.Add($"Рядок {row.RowIndex}: невідома категорія '{category}'");
                            continue;
                        }

                        var (id, parentId) = DictCityCodeExtensions.GetCityCodeKeys(
                            level1, level2, level3, level4, levelExt);

                        entities.Add(new DictCityCode
                        {
                            Id = id,
                            ParentId = parentId,
                            Level1 = level1,
                            Level2 = level2,
                            Level3 = level3,
                            Level4 = level4,
                            LevelExt = levelExt,
                            CategoryId = categoryId,
                            Value = value
                        });

                        processed++;

                        // Проміжний звіт кожні 500 записів
                        if (processed % 500 == 0)
                        {
                            Report(new ImportCityCodesProgress(_Status, processed, total,
                                $"Оброблено {processed} з {total} записів"));
                        }
                    }
                    catch (Exception ex)
                    {
                        errors.Add($"Рядок {row.RowIndex}: {ex.Message}");
                    }
                }

                // Логування помилок
                if (errors.Count != 0)
                {
                    var errorMsg = $"Знайдено {errors.Count} помилок:\n" + 
                                  string.Join("\n", errors.Take(10));
                    if (errors.Count > 10)
                        errorMsg += $"\n... та ще {errors.Count - 10} помилок";
                    
                    _logger?.LogWarning("Помилки під час парсингу:\n{Errors}", errorMsg);
                }

                // 🚀 ОДИН batch insert для всіх записів
                Report(new ImportCityCodesProgress(_Status, processed, total,
                    "Збереження даних в базу..."));
                
                db.DictCityCodes.AddRange(entities);
                await db.SaveChangesAsync(ct);

                var finalMsg = errors.Count != 0
                    ? $"Імпортовано {processed} з {total} записів. Пропущено {errors.Count} з помилками."
                    : $"Успішно імпортовано {processed} записів";

                lock (_sync)
                {
                    _Status = CityCodesProgressStatus.Done;
                    Report(new ImportCityCodesProgress(_Status, processed, total, finalMsg));
                }

                if (_logger?.IsEnabled(LogLevel.Information) == true)
                    _logger?.LogInformation("Імпорт завершено: {Count} записів", processed);
            }
            catch (Exception ex)
            {
                if (_logger?.IsEnabled(LogLevel.Error) == true)
                    _logger.LogError(ex, "Помилка імпорту DictCityCode: {Message}", ex.Message);
                
                lock (_sync)
                {
                    _Status = CityCodesProgressStatus.Failed;
                    Report(new ImportCityCodesProgress(_Status, processed, 0,
                        "Помилка імпорту\nПодробиці у журналі серверу"));
                }
            }
        }
    }
}
