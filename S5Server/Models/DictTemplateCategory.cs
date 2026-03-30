namespace S5Server.Models
{
    /// <summary>
    /// Категория шаблона документа (БР/БД/и т.д.)
    /// </summary>
    public class DictTemplateCategory : ShortDictBase, IShortDictBase
    {
        /// <summary>
        /// Список описів завдань, прив'язаних до цієї категорії шаблону.
        /// </summary>
        public List<DictUnitTaskItem> UnitTaskItems { get; set; } = [];
    }
}