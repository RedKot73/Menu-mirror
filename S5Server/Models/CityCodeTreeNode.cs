namespace S5Server.Models
{
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// Для представлення кодифікатору у вигляді дерева
    /// </summary>
    public class CityCodeTreeNode
    {
        public string Id { get; set; } = default!;
        public string? ParentId { get; set; }
        public CityCodeTreeNode? Parent { get; set; }
        
        /// <summary>
        /// Категорія об'єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальний статус
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
        public string CategoryId { get; set; } = default!;
        
        /// <summary>
        /// Категорія об'єкта (об'єкт для завантаження повних даних)
        /// </summary>
        public DictCityCategory? Category { get; set; }
        
        public string Value { get; set; } = string.Empty;
        public bool HasChildren { get; set; } = false;
        public List<CityCodeTreeNode> Children { get; set; } = [];
    }

    /// <summary>
    /// DTO для древовидного представлення кодифікатору (для серіалізації в JSON)
    /// </summary>
    public record CityCodeTreeNodeDto
    {
        public string Id { get; init; } = default!;
        public string? ParentId { get; init; }
        public string CategoryId { get; init; } = default!;
        public string? Category { get; init; }
        public string Value { get; init; } = string.Empty;
        public bool HasChildren { get; init; }
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
        public static CityCodeTreeNodeDto ToDto(this CityCodeTreeNode node) =>
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
        public static CityCodeTreeNode ToEntity(this CityCodeTreeNodeDto dto) =>
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
        public static CityCodeTreeNode ToTreeNode(this DictCityCode cityCode) =>
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
        /// Будує дерево з плоского списку DictCityCode
        /// </summary>
        /// <param name="codes">Плоский список записів кодифікатора</param>
        /// <param name="rootParentId">Id батьківського елемента для кореня дерева (null для верхнього рівня)</param>
        /// <returns>Список кореневих вузлів дерева</returns>
        public static List<CityCodeTreeNode> BuildTree(
            this IEnumerable<DictCityCode> codes,
            string? rootParentId = null)
        {
            var codesList = codes.ToList();
            var lookup = codesList.ToLookup(x => x.ParentId ?? string.Empty);

            CityCodeTreeNode BuildNode(DictCityCode code)
            {
                var children = lookup[code.Id]
                    .Select(BuildNode)
                    .OrderBy(n => n.Value)
                    .ToList();

                return new CityCodeTreeNode
                {
                    Id = code.Id,
                    ParentId = code.ParentId,
                    CategoryId = code.CategoryId,
                    Category = code.Category,
                    Value = code.Value,
                    HasChildren = children.Count > 0,
                    Children = children
                };
            }

            var rootKey = rootParentId ?? string.Empty;
            return lookup[rootKey]
                .Select(BuildNode)
                .OrderBy(n => n.Value)
                .ToList();
        }

        /// <summary>
        /// Будує дерево з вказаною максимальною глибиною (для ледачого завантаження)
        /// </summary>
        /// <param name="codes">Плоский список записів</param>
        /// <param name="rootParentId">Id батьківського елемента</param>
        /// <param name="maxDepth">Максимальна глибина дерева (0 = без обмежень)</param>
        /// <returns>Список кореневих вузлів</returns>
        public static List<CityCodeTreeNode> BuildTree(
            this IEnumerable<DictCityCode> codes,
            string? rootParentId,
            int maxDepth)
        {
            if (maxDepth < 0) maxDepth = 0;

            var codesList = codes.ToList();
            var lookup = codesList.ToLookup(x => x.ParentId ?? string.Empty);

            CityCodeTreeNode BuildNode(DictCityCode code, int currentDepth)
            {
                var shouldLoadChildren = maxDepth == 0 || currentDepth < maxDepth;
                var children = shouldLoadChildren
                    ? lookup[code.Id]
                        .Select(c => BuildNode(c, currentDepth + 1))
                        .OrderBy(n => n.Value)
                        .ToList()
                    : [];

                return new CityCodeTreeNode
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
            return lookup[rootKey]
                .Select(c => BuildNode(c, 1))
                .OrderBy(n => n.Value)
                .ToList();
        }

        /// <summary>
        /// Знаходить вузол у дереві за ID
        /// </summary>
        public static CityCodeTreeNode? FindNode(this CityCodeTreeNode node, string id)
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
        /// </summary>
        public static CityCodeTreeNode? FindNode(
            this IEnumerable<CityCodeTreeNode> nodes,
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
        /// </summary>
        /// <returns>Список вузлів від кореня до шуканого вузла</returns>
        public static List<CityCodeTreeNode> GetPath(
            this IEnumerable<CityCodeTreeNode> nodes,
            string id)
        {
            var path = new List<CityCodeTreeNode>();

            bool FindPath(CityCodeTreeNode node)
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
        public static List<CityCodeTreeNode> Flatten(this CityCodeTreeNode node)
        {
            var result = new List<CityCodeTreeNode> { node };
            
            foreach (var child in node.Children)
            {
                result.AddRange(child.Flatten());
            }

            return result;
        }

        /// <summary>
        /// Перетворює список дерев у плоский список
        /// </summary>
        public static List<CityCodeTreeNode> Flatten(
            this IEnumerable<CityCodeTreeNode> nodes)
        {
            return nodes.SelectMany(n => n.Flatten()).ToList();
        }

        /// <summary>
        /// Фільтрує дерево за умовою (залишає тільки вузли, які відповідають умові та їх предків)
        /// </summary>
        public static List<CityCodeTreeNode> Filter(
            this IEnumerable<CityCodeTreeNode> nodes,
            Func<CityCodeTreeNode, bool> predicate)
        {
            var result = new List<CityCodeTreeNode>();

            foreach (var node in nodes)
            {
                var filtered = FilterNode(node, predicate);
                if (filtered != null)
                    result.Add(filtered);
            }

            return result;
        }

        private static CityCodeTreeNode? FilterNode(
            CityCodeTreeNode node,
            Func<CityCodeTreeNode, bool> predicate)
        {
            var filteredChildren = node.Children
                .Select(c => FilterNode(c, predicate))
                .Where(c => c != null)
                .Cast<CityCodeTreeNode>()
                .ToList();

            // Включаємо вузол, якщо він відповідає умові АБО має відфільтровані дочірні
            if (predicate(node) || filteredChildren.Count > 0)
            {
                return new CityCodeTreeNode
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
        public static int CountNodes(this CityCodeTreeNode node)
        {
            return 1 + node.Children.Sum(c => c.CountNodes());
        }

        /// <summary>
        /// Підраховує загальну кількість вузлів у всіх деревах
        /// </summary>
        public static int CountNodes(this IEnumerable<CityCodeTreeNode> nodes)
        {
            return nodes.Sum(n => n.CountNodes());
        }

        /// <summary>
        /// Отримує максимальну глибину дерева
        /// </summary>
        public static int GetMaxDepth(this CityCodeTreeNode node)
        {
            if (node.Children.Count == 0)
                return 1;

            return 1 + node.Children.Max(c => c.GetMaxDepth());
        }

        /// <summary>
        /// Отримує максимальну глибину серед всіх дерев
        /// </summary>
        public static int GetMaxDepth(this IEnumerable<CityCodeTreeNode> nodes)
        {
            return nodes.Any() ? nodes.Max(n => n.GetMaxDepth()) : 0;
        }
    }
}
