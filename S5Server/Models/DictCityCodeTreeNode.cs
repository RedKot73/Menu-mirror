namespace S5Server.Models
{
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// Для представлення кодифікатору у вигляді дерева
    /// </summary>
    public class DictCityCodeTreeNode
    {
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public string Id { get; set; } = default!;
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public string? ParentId { get; set; }
        /// <summary>
        /// Посилання на батьківський вузол.
        /// </summary>
        public DictCityCodeTreeNode? Parent { get; set; }
        
        /// <summary>
        /// Категорія об'єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальный статус
        /// «Р» – райони в областях та Автономній Республіці Крим
        /// «Н» – території територіальних громад
        ///     (назви територіальних громад) в областях,
        ///     територіальні громади Автономної Республіки Крим
        /// «М» – міста
        /// «Т» – селища міського типу
        /// «С» – села
        /// «Х» – селища
        /// «В» – райони в містах
        /// </summary>
        public Guid CategoryId { get; set; } = default!;
        
        /// <summary>
        /// Категорія об'єкта (об'єкт для завантаження повних даних)
        /// </summary>
        public DictCityCategory? Category { get; set; }
        
        /// <summary>
        /// Назва населеного пункту або території.
        /// </summary>
        public string Value { get; set; } = string.Empty;
        
        /// <summary>
        /// Ознака наявності дочірніх вузлів.
        /// </summary>
        public bool HasChildren { get; set; } = false;
        
        /// <summary>
        /// Список дочірніх вузлів у дереві Кодифікатора.
        /// </summary>
        public List<DictCityCodeTreeNode> Children { get; set; } = [];
    }

    /// <summary>
    /// DTO для древовидного представлення кодифікатору (для серіалізації в JSON)
    /// </summary>
    public record CityCodeTreeNodeDto
    {
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public string Id { get; init; } = default!;
        /// <summary>
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public string? ParentId { get; init; }
        /// <summary>
        /// Gets the unique identifier of the associated category.
        /// </summary>
        public Guid CategoryId { get; init; } = default!;
        /// <summary>
        /// Gets the category associated with the item.
        /// </summary>
        public string? Category { get; init; }
        /// <summary>
        /// Gets the value represented by this property.
        /// </summary>
        public string Value { get; init; } = string.Empty;
        /// <summary>
        /// Gets a value indicating whether this instance has any child elements.
        /// </summary>
        public bool HasChildren { get; init; }
        /// <summary>
        /// Gets the collection of child nodes in the city code tree.
        /// </summary>
        /// <remarks>This property is read-only and is initialized during object construction. The
        /// collection will be empty if the node has no children.</remarks>
        public List<CityCodeTreeNodeDto> Children { get; init; } = [];
    }

    /// <summary>
    /// Методи розширення для роботи з CityCodeTreeNode
    /// </summary>
    public static class CityCodeTreeNodeExtensions
    {
        /// <summary>
        /// Конвертує CityCodeTreeNode у DTO для відправки клієнту
        /// </summary>
        public static CityCodeTreeNodeDto ToDto(this DictCityCodeTreeNode node) =>
            new()
            {
                Id = node.Id,
                ParentId = node.ParentId,
                CategoryId = node.CategoryId,
                Category = node.Category?.ShortValue ?? node.Category?.Value,
                Value = node.Value,
                HasChildren = node.HasChildren,
                Children = node.Children?.Select(c => c.ToDto()).ToList() ?? []
            };

        /// <summary>
        /// Конвертує DTO у CityCodeTreeNode
        /// </summary>
        public static DictCityCodeTreeNode ToEntity(this CityCodeTreeNodeDto dto) =>
            new()
            {
                Id = dto.Id,
                ParentId = dto.ParentId,
                CategoryId = dto.CategoryId,
                Value = dto.Value,
                HasChildren = dto.HasChildren,
                Children = dto.Children?.Select(c => c.ToEntity()).ToList() ?? []
            };

        /// <summary>
        /// Конвертує DictCityCode у CityCodeTreeNode
        /// </summary>
        public static DictCityCodeTreeNode ToTreeNode(this DictCityCode cityCode) =>
            new()
            {
                Id = cityCode.Id,
                ParentId = cityCode.ParentId,
                CategoryId = cityCode.CategoryId,
                Category = cityCode.Category,
                Value = cityCode.Value,
                HasChildren = false, // Буде розраховано при побудові дерева
                Children = []
            };

        /// <summary>
        /// Будує дерево з вказаною максимальною глибиною (для ледачого завантаження)
        /// </summary>
        /// <param name="codes">Плоский список записів</param>
        /// <param name="rootParentId">Id батьківського елемента</param>
        /// <param name="maxDepth">Максимальна глибина дерева (0 = без обмежень)</param>
        /// <returns>Список кореневих вузлів</returns>
        public static List<DictCityCodeTreeNode> BuildTree(
            this IEnumerable<DictCityCode> codes,
            string? rootParentId = DictCityCode.RootCityCode,
            int maxDepth = 1)
        {
            if (maxDepth < 0) maxDepth = 0;

            var codesList = codes.ToList();
            var lookup = codesList.ToLookup(x => x.ParentId ?? string.Empty);

            DictCityCodeTreeNode BuildNode(DictCityCode code, int currentDepth)
            {
                var shouldLoadChildren = maxDepth == 0 || currentDepth < maxDepth;
                var children = shouldLoadChildren
                    ? lookup[code.Id]
                        .Select(c => BuildNode(c, currentDepth + 1))
                        .OrderBy(n => n.Value)
                        .ToList()
                    : [];

                return new DictCityCodeTreeNode
                {
                    Id = code.Id,
                    ParentId = code.ParentId,
                    CategoryId = code.CategoryId,
                    Category = code.Category,
                    Value = code.Value,
                    HasChildren = lookup[code.Id].Any(),
                    Children = children
                };
            }

            var rootKey = rootParentId ?? string.Empty;
            return [.. lookup[rootKey]
                .Select(c => BuildNode(c, 1))
                .OrderBy(n => n.Value)];
        }

        /// <summary>
        /// Знаходить вузол у дереві за ID
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public static DictCityCodeTreeNode? FindNode(this DictCityCodeTreeNode node, string id)
        {
            if (node.Id == id)
                return node;

            foreach (var child in node.Children)
            {
                var found = child.FindNode(id);
                if (found != null)
                    return found;
            }

            return null;
        }

        /// <summary>
        /// Знаходить вузол у списку дерев за ID
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        public static DictCityCodeTreeNode? FindNode(
            this IEnumerable<DictCityCodeTreeNode> nodes,
            string id)
        {
            foreach (var node in nodes)
            {
                var found = node.FindNode(id);
                if (found != null)
                    return found;
            }

            return null;
        }

        /// <summary>
        /// Отримує шлях від кореня до вузла (breadcrumb)
        /// Тут саме string оскільки формат UA01020000000022387
        /// </summary>
        /// <returns>Список вузлів від кореня до шуканого вузла</returns>
        public static List<DictCityCodeTreeNode> GetPath(
            this IEnumerable<DictCityCodeTreeNode> nodes,
            string id)
        {
            var path = new List<DictCityCodeTreeNode>();

            bool FindPath(DictCityCodeTreeNode node)
            {
                path.Add(node);

                if (node.Id == id)
                    return true;

                foreach (var child in node.Children)
                {
                    if (FindPath(child))
                        return true;
                }

                path.RemoveAt(path.Count - 1);
                return false;
            }

            foreach (var node in nodes)
            {
                if (FindPath(node))
                    return path;
            }

            return [];
        }

        /// <summary>
        /// Перетворює дерево у плоский список (всі вузли)
        /// </summary>
        public static List<DictCityCodeTreeNode> Flatten(this DictCityCodeTreeNode node)
        {
            var result = new List<DictCityCodeTreeNode> { node };
            
            foreach (var child in node.Children)
            {
                result.AddRange(child.Flatten());
            }

            return result;
        }

        /// <summary>
        /// Перетворює список дерев у плоский список
        /// </summary>
        public static List<DictCityCodeTreeNode> Flatten(
            this IEnumerable<DictCityCodeTreeNode> nodes)
        {
            return [.. nodes.SelectMany(n => n.Flatten())];
        }

        /// <summary>
        /// Фільтрує дерево за умовою (залишає тільки вузли, які відповідають умові та їх предків)
        /// </summary>
        public static List<DictCityCodeTreeNode> Filter(
            this IEnumerable<DictCityCodeTreeNode> nodes,
            Func<DictCityCodeTreeNode, bool> predicate)
        {
            var result = new List<DictCityCodeTreeNode>();

            foreach (var node in nodes)
            {
                var filtered = FilterNode(node, predicate);
                if (filtered != null)
                    result.Add(filtered);
            }

            return result;
        }

        private static DictCityCodeTreeNode? FilterNode(
            DictCityCodeTreeNode node,
            Func<DictCityCodeTreeNode, bool> predicate)
        {
            var filteredChildren = node.Children
                .Select(c => FilterNode(c, predicate))
                .Where(c => c != null)
                .Cast<DictCityCodeTreeNode>()
                .ToList();

            // Включаємо вузол, якщо він відповідає умові АБО має відфільтровані дочірні
            if (predicate(node) || filteredChildren.Count > 0)
            {
                return new DictCityCodeTreeNode
                {
                    Id = node.Id,
                    ParentId = node.ParentId,
                    CategoryId = node.CategoryId,
                    Category = node.Category,
                    Value = node.Value,
                    HasChildren = filteredChildren.Count > 0,
                    Children = filteredChildren
                };
            }

            return null;
        }

        /// <summary>
        /// Підраховує загальну кількість вузлів у дереві
        /// </summary>
        public static int CountNodes(this DictCityCodeTreeNode node)
        {
            return 1 + node.Children.Sum(c => c.CountNodes());
        }

        /// <summary>
        /// Підраховує загальну кількість вузлів у всіх деревах
        /// </summary>
        public static int CountNodes(this IEnumerable<DictCityCodeTreeNode> nodes)
        {
            return nodes.Sum(n => n.CountNodes());
        }

        /// <summary>
        /// Отримує максимальну глибину дерева
        /// </summary>
        public static int GetMaxDepth(this DictCityCodeTreeNode node)
        {
            if (node.Children.Count == 0)
                return 1;

            return 1 + node.Children.Max(c => c.GetMaxDepth());
        }

        /// <summary>
        /// Отримує максимальну глибину серед всіх дерев
        /// </summary>
        public static int GetMaxDepth(this IEnumerable<DictCityCodeTreeNode> nodes)
        {
            return nodes.Any() ? nodes.Max(n => n.GetMaxDepth()) : 0;
        }
    }
}
