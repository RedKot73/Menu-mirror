namespace S5Server.Models
{
    /// <summary>
    /// Категория шаблона документа (БР/БД/и т.д.)
    /// </summary>
    public class DictTemplateCategory : ShortDictBase, IShortDictBase
    {
        public List<DictUnitTaskItem> UnitTaskItems { get; set; } = [];
    }
}