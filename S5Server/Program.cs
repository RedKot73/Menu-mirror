using System.Text.Json;

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using S5Server.Data;
using S5Server.Models;
using S5Server.Services;

using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Logging.ClearProviders();
builder.Logging.AddSerilog();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddEventSourceLogger();
builder.Logging.SetMinimumLevel(LogLevel.Warning);

var dbConfig = new DBConfig();
builder.Configuration.GetSection(DBConfig.ConfigKey).Bind(dbConfig);
var sqliteBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder
{
    DataSource = dbConfig.Host,
    Mode = Microsoft.Data.Sqlite.SqliteOpenMode.ReadWriteCreate,
    Cache = Microsoft.Data.Sqlite.SqliteCacheMode.Default,
};
string connectionString = sqliteBuilder.ConnectionString;

// Используем pooled factory вместо обычного AddDbContext
builder.Services.AddPooledDbContextFactory<MainDbContext>(options =>
{
    options.UseSqlite(connectionString);
    options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
// options.EnableSensitiveDataLogging();
// options.LogTo(Console.WriteLine, LogLevel.Information);
});
// Регистрируем scoped-контекст для injection в контроллерах через фабрику
builder.Services.AddScoped<MainDbContext>(sp =>
{
    var factory = sp.GetRequiredService<IDbContextFactory<MainDbContext>>();
    return factory.CreateDbContext();
});

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentity<TVezhaUser<string>, IdentityRole>(options =>
{
    // Password settings
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    options.Password.RequiredUniqueChars = 1;

    options.SignIn.RequireConfirmedAccount = false;

    //Lockout Settings
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
    options.Lockout.MaxFailedAccessAttempts = 3;
})
    .AddEntityFrameworkStores<MainDbContext>()
    .AddUserManager<UserManager<TVezhaUser<string>>>()
    .AddRoles<IdentityRole>()
    .AddDefaultTokenProviders();

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        // Вказуємо, що JSON ключі повинні бути camelCase
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        // Також бажано додати:
        options.JsonSerializerOptions.DictionaryKeyPolicy = JsonNamingPolicy.CamelCase;
    });

builder.Services.AddCors(p =>
{
    p.AddPolicy("AngularDev",
        b => b.WithOrigins(
                "http://localhost:4200", 
                "https://localhost:4200",
                "http://localhost:5000",
                "http://localhost:5001")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});
builder.Services.AddScoped<TemplateRenderer>();

var app = builder.Build();

// Конфигурация сервиса импорта с фабрикой контекста
var dbFactory = app.Services.GetRequiredService<IDbContextFactory<MainDbContext>>();
ImportSoldiers.ConfigureDbFactory(dbFactory);

// Configure the HTTP request pipeline.
//app.UseHttpsRedirection();

// Add support for static files (Angular app)
app.UseStaticFiles();

app.UseCors("AngularDev");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Fallback to index.html for Angular routing
app.MapFallbackToFile("index.html");

app.Run();
