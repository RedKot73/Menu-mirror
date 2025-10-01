using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

using S5Server.Data;
using S5Server.Models;

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

/*
// Создаём и открываем подключение
var sqliteConnection = new SqliteConnection(connectionString);
sqliteConnection.Open();
// Регистрируем свою коллацию
sqliteConnection.CreateCollation("UNICODE_NOCASE", (x, y) =>
{
    return string.Compare(x, y, StringComparison.OrdinalIgnoreCase);
});
*/
builder.Services.AddDbContext<MainDbContext>(options =>
    options.UseSqlite(connectionString));
    //options.UseSqlite(sqliteConnection));
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
    .AddJsonOptions(o =>
    {
        o.JsonSerializerOptions.PropertyNamingPolicy = System.Text.Json.JsonNamingPolicy.CamelCase;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "S5 API",
        Version = "v1"
    });
});

builder.Services.AddCors(p =>
{
    p.AddPolicy("AngularDev",
        b => b.WithOrigins("https://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseCors("AngularDev");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "S5 API v1");
        c.RoutePrefix = "swagger"; // URL: /swagger
    });
}

app.Run();
