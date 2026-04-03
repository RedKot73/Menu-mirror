using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;
using Serilog;
using System.Globalization;
using System.Text;

//Исправление кодировки консоли для отображения кириллицы в ошибках PostgreSQL
Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);


// ✅ Serilog - єдине джерело логування
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", "S5Server")
    .Enrich.WithProperty("Environment", builder.Environment.EnvironmentName)
    .WriteTo.Console(
        outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message:lj}{NewLine}{Exception}")
    .WriteTo.File(
        path: "Logs/s5server-.txt",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 7,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();


// Добавьте это в самое начало файла (после логгера), чтобы видеть, что пришло от K8s
Log.Information("Запуск приложения с аргументами: {Args}", string.Join(", ", args));

// ✅ Application Insights отримає логи через вбудовану інтеграцію ASP.NET Core
builder.Host.UseSerilog();

// --- ВРЕМЕННАЯ ПРОВЕРКА ДЛЯ ОТЛАДКИ ---
// Читаем локальный .env файл (в продакшене K8s его не будет, и метод просто ничего не сделает)
// Загружаем .env только если мы работаем локально (Development)
if (builder.Environment.IsDevelopment())
{
    DotNetEnv.Env.Load();
}
var testHost = builder.Configuration["PrimaryConnection:DB_Host"];
if (string.IsNullOrEmpty(testHost))
{
    Log.Error("⚠️ ВНИМАНИЕ: Файл .env не загрузился или переменные названы неверно!");
}
else
{
    Log.Information($"✅ Переменные подхватились! Host: {testHost}");
}
// --------------------------------------

var pgConnConfig = new DBConfig();
builder.Configuration.GetSection(DBConfig.ConfigKey).Bind(pgConnConfig);
var connBuilder = new NpgsqlConnectionStringBuilder
{
    Database = pgConnConfig.DB_Name,
    Host = pgConnConfig.DB_Host,
    Username = pgConnConfig.DB_Username,
    Password = pgConnConfig.DB_Password,
    CommandTimeout = pgConnConfig.CommandTimeout,
    Timeout = pgConnConfig.Timeout,
    Port = pgConnConfig.Port,
    SearchPath = pgConnConfig.SearchPath,

    SslMode = builder.Environment.IsDevelopment()
        ? SslMode.Prefer      // Dev: опціонально
        : SslMode.Require,    // Prod: обов'язково
    Timezone = "UTC",
    Encoding = "UTF8"
};
// 1. Формируем строку подключения из билдера
var connectionString = connBuilder.ConnectionString;
// Проверка, что строка не пустая (важно для безопасности)
ArgumentException.ThrowIfNullOrEmpty(connectionString);

// 2. Настраиваем DataSourceBuilder
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);

// Разрешаем работу с JSONB (необходимо для современных БД)
dataSourceBuilder.EnableDynamicJson();

// Настройка формата даты (ISO) для корректной работы с PostgreSQL
dataSourceBuilder.ConnectionStringBuilder.Options = "-c DateStyle=ISO";

// Совместимость со старым поведением DateTime (важно для миграций)
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// Создаем итоговый DataSource
var dataSource = dataSourceBuilder.Build();

// 3. ЦИКЛ ПОВТОРОВ (RETRIES)
int maxRetries = 3; // Количество попыток
for (int i = 1; i <= maxRetries; i++)
{
    try
    {
        Log.Information("Попытка подключения к PostgreSQL {Attempt}/{Max}...", i, maxRetries);
        
        // Открываем соединение, используя настроенный DataSource
        await using var testConnection = await dataSource.OpenConnectionAsync();
        
        // Проверочный запрос
        await using var cmd = testConnection.CreateCommand();
        cmd.CommandText = "SELECT version()";
        await cmd.ExecuteScalarAsync();

        Log.Information("✅ PostgreSQL подключен: {Database}@{Host}:{Port}", 
            pgConnConfig.DB_Name, pgConnConfig.DB_Host, pgConnConfig.Port);
        
        await testConnection.CloseAsync();
        break; // Успех — выходим из цикла
    }
    catch (Exception ex)
    {
        Log.Warning("⚠️ Попытка {Attempt} не удалась (Connection refused или SSL). Ошибка: {Message}", i, ex.Message);
        
        if (i < maxRetries)
        {
            Log.Information("Ожидание 5 секунд перед повтором...");
            await Task.Delay(5000); // Пауза 3 секунды
        }
        else
        {
            Log.Fatal(ex, "❌ Все попытки подключения провалены. Завершение работы.");
            return; // Завершаем приложение
        }
    }
}

// ✅ Використати DataSource замість connectionString
builder.Services.AddPooledDbContextFactory<MainDbContext>(options =>
    options.UseNpgsql(dataSource, npgsql =>
            // ← Явно вказати ім'я таблиці міграцій (UseSnakeCaseNamingConvention змінює його на __ef_migrations_history)
            npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "public"))
        .UseSnakeCaseNamingConvention()
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .EnableDetailedErrors(builder.Environment.IsDevelopment())
        .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
builder.Services.AddScoped<MainDbContext>(sp =>
{
    var factory = sp.GetRequiredService<IDbContextFactory<MainDbContext>>();
    return factory.CreateDbContext();
});


// ✅ Identity
builder.Services.AddIdentity<TVezhaUser, IdentityRole<Guid>>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequiredLength = 8;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = false;
    options.Password.RequiredUniqueChars = 1;
    options.SignIn.RequireConfirmedAccount = false;
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
    options.Lockout.MaxFailedAccessAttempts = 3;
})
.AddEntityFrameworkStores<MainDbContext>()
.AddUserManager<UserManager<TVezhaUser>>()
.AddRoles<IdentityRole<Guid>>()
.AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromHours(2);
    options.LoginPath = "/Identity/Account/Login";
    options.LogoutPath = "/Identity/Account/Logout";
    options.AccessDeniedPath = "/Identity/Account/AccessDenied";
    options.SlidingExpiration = true;

    // ✅ API повертають 401/403 замість redirect
    options.Events.OnRedirectToLogin = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };

    options.Events.OnRedirectToAccessDenied = context =>
    {
        if (context.Request.Path.StartsWithSegments("/api"))
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        }
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});
builder.Services.AddRateLimiter(options =>
{
    options.AddFixedWindowLimiter("login", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 5;
    });
    options.AddFixedWindowLimiter("graphql", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 100;
    });
});

// ✅ GraphQL
builder.Services
    .AddGraphQLServer()
    .AddQueryType<S5Server.GraphQL.Query>()
    .AddAuthorization()                     // ✅ Підтримка [Authorize]
    .AddProjections()                       // ✅ Оптимізація Include/Select
    .AddFiltering()                         // ✅ Фільтрація (where)
    .AddSorting();                          // ✅ Сортування (orderBy)
// ✅ DbContext вже зареєстрований через AddPooledDbContextFactory!

builder.Services.AddExceptionHandler<ClientCanceledExceptionHandler>();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration
            .GetSection("AllowedOrigins")
            .Get<string[]>() ?? [];

        if (builder.Environment.IsDevelopment())
        {
            // ✅ Development: дозволити Angular dev server
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
        else if (allowedOrigins.Length > 0)
        {
            // ✅ Production: тільки дозволені origins
            policy.WithOrigins(allowedOrigins)
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        }
        else
        {
            Log.Warning("AllowedOrigins не налаштовано — CORS заборонено для production");
        }
    });
});


var app = builder.Build();

// === БЛОК АВТОМАТИЧЕСКИХ МИГРАЦИЙ ===
// Делаем проверку регистронезависимой и ищем вхождение строки
if (args.Any(arg => arg.Trim().Contains("--migrate", StringComparison.OrdinalIgnoreCase)))
{
    Log.Information("=== Запуск режима миграций (обнаружен флаг --migrate) ===");

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MainDbContext>();
    try
    {
        Log.Information("Накатываем миграции...");
        await dbContext.Database.MigrateAsync();
        Log.Information("=== Миграции успешно применены! ===");
        
        // КРИТИЧЕСКИ ВАЖНО: Принудительный выход с кодом 0, чтобы Init-контейнер завершился
        Environment.Exit(0); 
    }
    catch (Exception ex)
    {
        Log.Fatal(ex, "Ошибка при применении миграций");
        Environment.Exit(1); // Сообщаем K8s об ошибке
    }
}

// ✅ Конфігурація фонових сервісів
{
    var factory = app.Services.GetRequiredService<IDbContextFactory<MainDbContext>>();
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    S5Server.Services.ImportSoldiersBGWorker.Configure(factory, logger);
}

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
});

// ✅ HTTPS Redirection працює правильно з проксі
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseHsts();
}

app.UseExceptionHandler();

// ✅ Редирект на HTTPS (только если запрос пришел по HTTP через проксі)
//app.UseHttpsRedirection();
// ✅ Статичні файли з wwwroot (Angular dist)
app.UseStaticFiles(new StaticFileOptions
{
    /*Кеширование JS/CSS файлов на 1 год (раскомментировать при необходимости)
    OnPrepareResponse = ctx =>
    {
        // Cache static files for 1 year
        if (ctx.File.Name.EndsWith(".js") || ctx.File.Name.EndsWith(".css"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000");
        }
    }
    */
});

// ✅ Українська культура
var supportedCultures = new[] { new CultureInfo("uk-UA") };
app.UseRequestLocalization(new RequestLocalizationOptions
{
    DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("uk-UA"),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures
});
CultureInfo.DefaultThreadCurrentCulture = supportedCultures.FirstOrDefault();
CultureInfo.DefaultThreadCurrentUICulture = supportedCultures.FirstOrDefault();

app.UseRouting();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGraphQL().RequireRateLimiting("graphql");  // ✅ Endpoint: /graphql
app.MapFallbackToFile("index.html");
// ✅ Health check для Load Balancer
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
   .AllowAnonymous();

// ✅ Українська культура
/*
var cultureInfo = new CultureInfo("uk-UA");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
*/

try
{
    Log.Information("Starting S5Server");
    var lifetime = app.Lifetime;
    lifetime.ApplicationStarted.Register(() =>
    {
        var server = app.Services.GetRequiredService<IServer>();
        var addressFeature = server.Features.Get<IServerAddressesFeature>();

        if (addressFeature != null && addressFeature.Addresses.Count != 0 == true)
        {
            foreach (var address in addressFeature.Addresses)
            {
                Log.Information("S5Server listening on: {Address}", address);
            }
        }
        else
        {
            Log.Information("S5Server started (addresses not available)");
        }
    });

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}