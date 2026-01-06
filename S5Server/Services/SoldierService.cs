using Microsoft.EntityFrameworkCore;

using S5Server.Models;

namespace S5Server.Services
{
    public class SoldierService
    {
        public static IQueryable<Soldier> GetQuery(DbSet<Soldier> set)
        {
            var res = set.AsNoTracking()
                .Include(s => s.Unit)
                .Include(s => s.AssignedUnit)
                .Include(s => s.InvolvedUnit)
                .Include(s => s.Rank)
                .Include(s => s.Position)
                .Include(s => s.State);
            return res;
        }
    }
}
