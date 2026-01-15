using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;

namespace S5Server.Services
{
    public class DictUnitTaskItemsService
    {
        private static IQueryable<DictUnitTaskItem> Query(DbSet<DictUnitTaskItem> set) => set.AsNoTracking()
            .Include(x => x.TemplateCategory)
            .Include(x => x.UnitTask);

        /// <summary>
        /// Створити новий елемент завдання
        /// </summary>
        public static async Task<DictUnitTaskItemDto> Create(
            MainDbContext db,
            DictUnitTaskItemCreateDto dto,
            CancellationToken ct = default)
        {
            var entity = dto.ToEntity();
            var set = db.DictUnitTaskItems;
            set.Add(entity);
            await db.SaveChangesAsync(ct);

            var created = await Query(set).FirstAsync(x => x.Id == entity.Id, ct);
            return created.ToDto();
        }

        /// <summary>
        /// Отримати елемент за UnitTaskId та TemplateCategoryId
        /// </summary>
        public static async Task<DictUnitTaskItemDto?> GetByTaskAndTemplate(
            MainDbContext db,
            string unitTaskId,
            string templateCategoryId,
            CancellationToken ct = default)
        {
            var set = db.DictUnitTaskItems;
            var item = await Query(set)
                .Where(x => x.UnitTaskId == unitTaskId && x.TemplateCategoryId == templateCategoryId)
                .FirstOrDefaultAsync(ct);

            return item?.ToDto();
        }

        /// <summary>
        /// Отримати всі елементи для завдання
        /// </summary>
        public static async Task<List<DictUnitTaskItemDto>> GetByUnitTaskId(
            MainDbContext db,
            string unitTaskId,
            CancellationToken ct = default)
        {
            var set = db.DictUnitTaskItems;
            var items = await Query(set)
                .Where(x => x.UnitTaskId == unitTaskId)
                .OrderBy(x => x.Value)
                .ToListAsync(ct);

            return [.. items.Select(x => x.ToDto())];
        }

        /// <summary>
        /// Оновити елемент завдання
        /// </summary>
        public static async Task<bool> Update(
            MainDbContext db,
            string id,
            DictUnitTaskItemDto dto,
            CancellationToken ct = default)
        {
            var set = db.DictUnitTaskItems;
            var entity = await set.FirstOrDefaultAsync(x => x.Id == id, ct);
            
            if (entity == null)
                return false;

            if (entity.EqualsDto(dto))
                return true; // Нічого не змінилось

            entity.ApplyDto(dto);
            await db.SaveChangesAsync(ct);
            return true;
        }

        /// <summary>
        /// Видалити елемент завдання
        /// </summary>
        public static async Task<bool> Delete(
            MainDbContext db,
            string id,
            CancellationToken ct = default)
        {
            var set = db.DictUnitTaskItems;
            var entity = await set.FirstOrDefaultAsync(x => x.Id == id, ct);
            
            if (entity == null)
                return false;

            set.Remove(entity);
            await db.SaveChangesAsync(ct);
            return true;
        }

        /// <summary>
        /// Перевірити чи існують елементи для завдання
        /// </summary>
        public static async Task<bool> HasItems(
            MainDbContext db,
            string unitTaskId,
            CancellationToken ct = default)
        {
            return await db.DictUnitTaskItems
                .AnyAsync(x => x.UnitTaskId == unitTaskId, ct);
        }
    }
}
