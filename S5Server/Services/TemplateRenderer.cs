using System.Net;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;

using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace S5Server.Services
{
    public class TemplateRenderer
    {
        public enum TemplateFormat { Html, Txt, Docx }

        public record RenderResult(string ContentType, byte[] Bytes, string FileName);

        public static TemplateFormat ParseFormat(string format) =>
            format.ToLowerInvariant() switch
            {
                "html" => TemplateFormat.Html,
                "txt" => TemplateFormat.Txt,
                "docx" => TemplateFormat.Docx,
                _ => TemplateFormat.Html
            };

        public IDictionary<string, string> ParseJsonToDict(string dataJson)
        {
            if (string.IsNullOrWhiteSpace(dataJson))
                return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            var dict = JsonSerializer.Deserialize<Dictionary<string, object?>>(dataJson) ?? [];
            // Преобразуем значения в строки
            return dict.ToDictionary(k => k.Key, v => v.Value?.ToString() ?? string.Empty, StringComparer.OrdinalIgnoreCase);
        }

        public string ReplaceTokens(string text, IDictionary<string, string> data)
        {
            if (string.IsNullOrEmpty(text) || data.Count == 0) return text;
            foreach (var kv in data)
                text = text.Replace("{{" + kv.Key + "}}", kv.Value ?? string.Empty, StringComparison.OrdinalIgnoreCase);
            return text;
        }

        public byte[] RenderTxt(byte[] templateContent, IDictionary<string, string> data)
        {
            var txt = Encoding.UTF8.GetString(templateContent);
            txt = ReplaceTokens(txt, data);
            return Encoding.UTF8.GetBytes(txt);
        }

        public byte[] RenderHtml(byte[] templateContent, IDictionary<string, string> data)
        {
            var html = Encoding.UTF8.GetString(templateContent);
            html = ReplaceTokens(html, data);
            return Encoding.UTF8.GetBytes(html);
        }

        /// <summary>
        /// Generates a DOCX document by replacing tokens in the provided template with corresponding values from the
        /// specified data dictionary.
        /// </summary>
        /// <remarks>The method replaces all occurrences of tokens in the template with the provided
        /// values. The returned byte array can be saved to disk or further processed as a DOCX file. The input template
        /// is not modified.</remarks>
        /// <param name="templateContent">The byte array containing the DOCX template to be processed. Must represent a valid DOCX file.</param>
        /// <param name="data">A dictionary of key-value pairs where each key corresponds to a token in the template, and each value is the
        /// replacement text.</param>
        /// <returns>A byte array containing the rendered DOCX document with all tokens replaced by their corresponding values.</returns>
        public byte[] RenderDocx(byte[] templateContent, IDictionary<string, string> data)
        {
            using var ms = new MemoryStream();
            ms.Write(templateContent, 0, templateContent.Length);
            ms.Position = 0;

            using (var doc = WordprocessingDocument.Open(ms, true))
            {
                var texts = doc.MainDocumentPart!.Document.Descendants<Text>();
                foreach (var t in texts)
                    t.Text = ReplaceTokens(t.Text, data);

                doc.MainDocumentPart.Document.Save();
            }
            return ms.ToArray();
        }

        // Простая конвертация DOCX -> HTML без CSS (параграфы, базовые стили, ссылки, таблицы)
        /// <summary>
        /// Converts the contents of a DOCX document to a basic HTML string without CSS, preserving paragraphs, basic
        /// styles, hyperlinks, and tables.
        /// </summary>
        /// <remarks>The generated HTML is intended for simple preview purposes and does not include
        /// advanced formatting or embedded styles. Only basic document elements such as paragraphs, tables, and
        /// hyperlinks are supported. The method does not modify the input data.</remarks>
        /// <param name="docxBytes">A byte array containing the DOCX file data to be converted. Must not be null and should represent a valid
        /// DOCX document.</param>
        /// <returns>A string containing the HTML representation of the DOCX document. The HTML includes paragraphs, basic
        /// formatting, links, and tables, but does not include CSS styling.</returns>
        public string DocxToHtml(byte[] docxBytes)
        {
            using var ms = new MemoryStream(docxBytes, writable: false);
            using var doc = WordprocessingDocument.Open(ms, false);
            var mdp = doc.MainDocumentPart!;
            var body = mdp.Document.Body!;

            var sb = new StringBuilder();
            sb.Append("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>Preview</title></head><body>");

            foreach (var el in body.Elements())
            {
                if (el is Paragraph p)
                    sb.Append(RenderParagraph(p, mdp));
                else if (el is Table tbl)
                    sb.Append(RenderTable(tbl, mdp));
            }

            sb.Append("</body></html>");
            return sb.ToString();
        }

        /// <summary>
        /// Renders the specified paragraph as an HTML string, converting headings, list markers, and supported inline
        /// elements.
        /// </summary>
        /// <remarks>The rendered HTML includes heading tags if the paragraph style indicates a heading,
        /// and prepends a bullet marker for numbered or bulleted lists. Supported inline elements include runs, line
        /// breaks, tabs, and hyperlinks. Other elements are ignored.</remarks>
        /// <param name="p">The paragraph to render. Must not be null.</param>
        /// <param name="mdp">The main document part containing additional context for hyperlinks and other elements. Must not be null.</param>
        /// <returns>A string containing the HTML representation of the paragraph, including heading tags, list markers, and
        /// supported inline formatting.</returns>
        private static string RenderParagraph(Paragraph p, MainDocumentPart mdp)
        {
            // Заголовки
            var styleId = p.ParagraphProperties?.ParagraphStyleId?.Val?.Value;
            var tag = GetHeadingTag(styleId) ?? "p";

            // Очень упрощённые маркеры списков
            var hasNum = p.ParagraphProperties?.NumberingProperties != null;
            var bulletPrefix = hasNum ? "• " : string.Empty;

            var sb = new StringBuilder();
            sb.Append('<').Append(tag).Append('>');
            if (bulletPrefix.Length > 0)
                sb.Append(WebUtility.HtmlEncode(bulletPrefix));

            foreach (var child in p.Elements<OpenXmlElement>())
            {
                switch (child)
                {
                    case Run r:
                        sb.Append(RenderRun(r));
                        break;
                    case Break:
                        sb.Append("<br/>");
                        break;
                    case TabChar:
                        sb.Append("&nbsp;&nbsp;");
                        break;
                    case Hyperlink h:
                        sb.Append(RenderHyperlink(h, mdp));
                        break;
                }
            }

            sb.Append("</").Append(tag).Append('>');
            return sb.ToString();
        }

        /// <summary>
        /// Renders the content of the specified run as an HTML-encoded string, applying basic text formatting and
        /// indicating the presence of images.
        /// </summary>
        /// <remarks>The returned string uses HTML tags to represent formatting found in the run, such as
        /// <strong> for bold and <em> for italic. If the run contains an image, the output includes a placeholder text.
        /// This method does not render actual images or complex formatting beyond the supported tags.</remarks>
        /// <param name="r">The run to render. Must not be null. The formatting and content of the run are used to generate the output
        /// string.</param>
        /// <returns>A string containing the HTML-encoded text of the run, with formatting tags applied for bold, italic,
        /// underline, strikethrough, subscript, and superscript. If the run contains an image, the string includes an
        /// image placeholder.</returns>
        private static string RenderRun(Run r)
        {
            var text = string.Concat(r.Elements<Text>().Select(t => t.Text));
            var hasImage = r.Descendants<Drawing>().Any();
            var encoded = WebUtility.HtmlEncode(text);

            // Базовые стили
            var rp = r.RunProperties;
            bool bold = rp?.Bold != null;
            bool italic = rp?.Italic != null;
            bool underline = rp?.Underline != null && rp.Underline.Val?.Value != UnderlineValues.None;
            bool strike = rp?.Strike != null;
            bool sub = rp?.VerticalTextAlignment?.Val?.Value == VerticalPositionValues.Subscript;
            bool sup = rp?.VerticalTextAlignment?.Val?.Value == VerticalPositionValues.Superscript;

            var sb = new StringBuilder();

            if (hasImage)
            {
                // Заглушка под изображение
                sb.Append("[Image]");
            }

            string content = encoded;

            if (underline) content = $"<u>{content}</u>";
            if (strike) content = $"<del>{content}</del>";
            if (italic) content = $"<em>{content}</em>";
            if (bold) content = $"<strong>{content}</strong>";
            if (sub) content = $"<sub>{content}</sub>";
            if (sup) content = $"<sup>{content}</sup>";

            sb.Append(content);
            return sb.ToString();
        }

        private static string RenderHyperlink(Hyperlink h, MainDocumentPart mdp)
        {
            var inner = new StringBuilder();
            foreach (var child in h.Elements<Run>())
                inner.Append(RenderRun(child));

            string? href = null;
            if (h.Id != null)
            {
                var rel = mdp.HyperlinkRelationships.FirstOrDefault(x => x.Id == h.Id);
                href = rel?.Uri.ToString();
            }

            if (!string.IsNullOrEmpty(href))
                return $"<a href=\"{WebUtility.HtmlEncode(href)}\">{inner}</a>";

            // локальные закладки/ссылки без внешнего URL
            return inner.ToString();
        }

        /// <summary>
        /// Renders the specified Open XML table and its contents as an HTML table string.
        /// </summary>
        /// <remarks>Nested tables and paragraphs within the table are recursively rendered as HTML. The
        /// output uses basic HTML table markup with borders and cell padding. This method does not perform HTML
        /// escaping; ensure that the table content is safe for HTML output.</remarks>
        /// <param name="table">The Open XML table to render as HTML. Must not be null.</param>
        /// <param name="mdp">The main document part containing resources referenced by the table. Must not be null.</param>
        /// <returns>A string containing the HTML representation of the table and its nested content.</returns>
        private static string RenderTable(Table table, MainDocumentPart mdp)
        {
            var sb = new StringBuilder();
            sb.Append("<table border=\"1\" cellspacing=\"0\" cellpadding=\"4\">");
            foreach (var row in table.Elements<TableRow>())
            {
                sb.Append("<tr>");
                foreach (var cell in row.Elements<TableCell>())
                {
                    sb.Append("<td>");
                    foreach (var el in cell.Elements())
                    {
                        if (el is Paragraph p)
                            sb.Append(RenderParagraph(p, mdp));
                        else if (el is Table nested)
                            sb.Append(RenderTable(nested, mdp));
                    }
                    sb.Append("</td>");
                }
                sb.Append("</tr>");
            }
            sb.Append("</table>");
            return sb.ToString();
        }

        /// <summary>
        /// Обычные имена стилей в Word: Heading1..Heading6
        /// Returns the corresponding HTML heading tag name for a Word style identifier if it matches a standard heading
        /// style.
        /// </summary>
        /// <remarks>This method supports standard Word heading styles ("Heading1" through "Heading6") and
        /// returns the matching HTML tag name. The comparison is case-insensitive.</remarks>
        /// <param name="styleId">The Word style identifier to evaluate. Typically in the form "Heading1" through "Heading6". Can be null.</param>
        /// <returns>A string containing the HTML heading tag name (e.g., "h1" through "h6") if the style identifier matches a
        /// standard heading style; otherwise, null.</returns>
        private static string? GetHeadingTag(string? styleId)
        {
            if (string.IsNullOrEmpty(styleId)) return null;
            if (styleId.StartsWith("Heading", StringComparison.OrdinalIgnoreCase))
            {
                var numPart = new string(styleId.SkipWhile(c => !char.IsDigit(c)).ToArray());
                if (int.TryParse(numPart, out var n) && n is >= 1 and <= 6)
                    return $"h{n}";
            }
            return null;
        }

        // Оставлен текущий способ PDF (если нужен)
        public async Task<byte[]> HtmlToPdfAsync(string html)
        {
            throw new NotImplementedException("Поки не реалізовано");
            /*
            using var fetcher = new BrowserFetcher();
            await fetcher.DownloadAsync(BrowserFetcher.DefaultChromiumRevision);

            await using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
            await using var page = await browser.NewPageAsync();
            await page.SetContentAsync(html, new NavigationOptions { WaitUntil = new[] { WaitUntilNavigation.Load } });
            return await page.PdfDataAsync(new PdfOptions
            {
                PrintBackground = true,
                Format = PaperFormat.A4,
                MarginOptions = new MarginOptions { Top = "15mm", Bottom = "15mm", Left = "15mm", Right = "15mm" }
            });
            */
        }
        private static string MakeSafeFileName(string name)
        {
            var invalid = Path.GetInvalidFileNameChars();
            var sb = new StringBuilder(name.Length);
            foreach (var ch in name)
                sb.Append(invalid.Contains(ch) ? '_' : ch);
            return Regex.Replace(sb.ToString(), "_{2,}", "_").Trim('_');
        }

        public async Task<RenderResult> RenderAsync(string name, TemplateFormat format,
            byte[] template, string dataJson, string export)
        {
            var data = ParseJsonToDict(dataJson);//Путь к каталогу в конфиге
            var fileName = MakeSafeFileName($"{name}_{DateTime.Now:yyyyMMdd_HHmmss_fff}");
            string fileNameBase = Path.GetFileNameWithoutExtension(fileName);

            switch (export.ToLowerInvariant())
            {
                case "html":
                    if (format == TemplateFormat.Docx)
                    {
                        var mergedDocx = RenderDocx(template, data);
                        var html = DocxToHtml(mergedDocx);
                        return new RenderResult("text/html; charset=utf-8", Encoding.UTF8.GetBytes(html), fileNameBase + ".html");
                    }
                    else
                    {
                        var html = format == TemplateFormat.Txt
                            ? $"<pre>{WebUtility.HtmlEncode(Encoding.UTF8.GetString(RenderTxt(template, data)))}</pre>"
                            : Encoding.UTF8.GetString(RenderHtml(template, data));
                        return new RenderResult("text/html; charset=utf-8", Encoding.UTF8.GetBytes(html), fileNameBase + ".html");
                    }

                case "txt":
                    var txtBytes = format == TemplateFormat.Docx
                        ? Encoding.UTF8.GetBytes(DocxToHtml(RenderDocx(template, data)))
                        : RenderTxt(template, data);
                    return new RenderResult("text/plain; charset=utf-8", txtBytes, fileNameBase + ".txt");

                case "docx":
                    var docx = format == TemplateFormat.Docx
                        ? RenderDocx(template, data)
                        : RenderDocx(Encoding.UTF8.GetBytes("<html>" + ReplaceTokens(Encoding.UTF8.GetString(template), data) + "</html>"), new Dictionary<string, string>());
                    return new RenderResult("application/vnd.openxmlformats-officedocument.wordprocessingml.document", docx, fileNameBase + ".docx");

                case "pdf":
                    throw new NotImplementedException("Поки не реалізовано");
                    /*
                    string htmlForPdf;
                    if (format == TemplateFormat.Docx)
                        htmlForPdf = DocxToHtml(RenderDocx(template, data));
                    else if (format == TemplateFormat.Txt)
                        htmlForPdf = $"<pre>{WebUtility.HtmlEncode(Encoding.UTF8.GetString(RenderTxt(template, data)))}</pre>";
                    else
                        htmlForPdf = Encoding.UTF8.GetString(RenderHtml(template, data));

                    var pdf = await HtmlToPdfAsync(htmlForPdf);
                    return new RenderResult("application/pdf", pdf, fileNameBase + ".pdf");
                    */
                default:
                    return await RenderAsync(fileNameBase, format, template, dataJson, "html");
            }
        }

        private static string HtmlToPlainText(string html)
        {
            if (string.IsNullOrWhiteSpace(html)) return string.Empty;
            var text = Regex.Replace(html, "<[^>]+>", " ", RegexOptions.Singleline);
            text = WebUtility.HtmlDecode(text);
            text = Regex.Replace(text, @"[ \t]+", " ");
            text = Regex.Replace(text, @"(\r?\n)\s+", "$1");
            return text.Trim();
        }

        public Task<RenderResult> RenderFromClientHtmlAsync(string name,
            string html, string export,
            CancellationToken ct = default)
        {
            var safeBase = Path.GetFileNameWithoutExtension(MakeSafeFileName($"{name}_{DateTime.Now:yyyyMMdd_HHmmss_fff}"));
            switch (export.ToLowerInvariant())
            {
                case "html":
                    return Task.FromResult(new RenderResult(
                        "text/html; charset=utf-8",
                        Encoding.UTF8.GetBytes(html ?? string.Empty),
                        safeBase + ".html"));

                case "txt":
                    var plain = HtmlToPlainText(html ?? string.Empty);
                    return Task.FromResult(new RenderResult(
                        "text/plain; charset=utf-8",
                        Encoding.UTF8.GetBytes(plain),
                        safeBase + ".txt"));

                case "pdf":
                    throw new NotImplementedException("Экспорт HTML → PDF пока не реализован");

                case "docx":
                    throw new NotImplementedException("Экспорт HTML → DOCX пока не реализован");

                default:
                    // По умолчанию HTML
                    return Task.FromResult(new RenderResult(
                        "text/html; charset=utf-8",
                        Encoding.UTF8.GetBytes(html ?? string.Empty),
                        safeBase + ".html"));
            }
        }
    }
}