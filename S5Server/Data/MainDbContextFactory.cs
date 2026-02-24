using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace S5Server.Data;

/// <summary>
/// Factory для створення DbContext під час design-time (міграції)
/// </summary>
public class MainDbContextFactory : IDesignTimeDbContextFactory<MainDbContext>
{
    public MainDbContext CreateDbContext(string[] args)
    {
        // ✅ Налаштування для міграцій
        var optionsBuilder = new DbContextOptionsBuilder<MainDbContext>();
        var connectionString = "Database=S5_DB;Host=localhost;Username=postgres;Password=Vik7319rt;Command Timeout=600;Timeout=1024;Port=5432;Search Path=core,dict,docs,identity,history,public;SSL Mode=Prefer;Timezone=UTC;Encoding=UTF8";

        // Конфігурація DbContext для міграцій
        optionsBuilder
            .UseNpgsql(connectionString, npgsqlOptions =>
            {
                npgsqlOptions.MigrationsHistoryTable("__EFMigrationsHistory", "public");
            })
            .UseSnakeCaseNamingConvention();

        return new MainDbContext(optionsBuilder.Options);
    }
}
