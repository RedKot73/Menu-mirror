using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using S5Server.Data;
using S5Server.Models;
using Serilog;
using System.Globalization;
using System.Text;
using Microsoft.IdentityModel.Tokens;

//Исправление кодировки консоли для відображення кириллицы в ошибках PostgreSQL
Console.OutputEncoding = Encoding.UTF8;
Console.InputEncoding = Encoding.UTF8;

var builder = WebApplication.CreateBuilder(args);


// ✅ Serilog - єдине джерело логування (Налаштування в appsettings.json)
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", "S5Server")
    .Enrich.WithProperty("Environment", builder.Environment.EnvironmentName)
    .CreateLogger();


// Добавьте это в самое начало файла (после логгера), чтобы видеть, что пришло от K8s
Log.Information("Запуск приложения с аргументами: {Args}", string.Join(", ", args));

// ✅ Application Insights отримає логи через вбудовану інтеграцію ASP.NET Core
builder.Host.UseSerilog();

// ✅ Application Insights (тільки для production/Azure)
if (builder.Environment.IsProduction())
{
    builder.Services.AddApplicationInsightsTelemetry();
}

// --- ВРЕМЕННАЯ ПРОВЕРКА ДЛЯ ОТЛАДКИ ---
// Читаем локальный .env файл (в продакшене K8s его не будет, и метод просто ничего не сделает)
// Загружаем .env только если мы работаем локально (Development)
if (builder.Environment.IsDevelopment())
{
    Console.WriteLine("--- DEBUG: Development Mode Detected ---");
    Console.WriteLine($"Current Environment: {builder.Environment.EnvironmentName}");
    
    // Загружаем только из .env и выводим их
    // Метод TraversePath() будет искать файл .env в текущей директории и выше по дереву папок
    var loadedVars = DotNetEnv.Env.TraversePath().Load();
    Console.WriteLine($"--- Прочитаны следующие переменные из .env ---");
    foreach (var kvp in loadedVars)
    {
        Console.WriteLine($"{kvp.Key} = {kvp.Value}");
    }
    Console.WriteLine("-----------------------------------------");
    
    // Важно: нужно заставить конфигурацию (IConfiguration) перечитать переменные окружения,
    // так как .env только что их обновил в системе (Environment)
    builder.Configuration.AddEnvironmentVariables();
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

/* ПРИМЕЧАНИЕ: Блок с 'if (builder.Environment.IsProduction())' и Callback 
   больше не нужен, так как мы добавили 'TrustServerCertificate = true' 
   прямо в connBuilder. Это работает во всех средах одинаково надежно.
*/

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
    
    if (builder.Environment.IsDevelopment())
    {
        options.Lockout.AllowedForNewUsers = false;
        options.Lockout.MaxFailedAccessAttempts = int.MaxValue;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.Zero;
    }
    else
    {
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(60);
        options.Lockout.MaxFailedAccessAttempts = 3;
        options.Lockout.AllowedForNewUsers = true;
    }
})
.AddEntityFrameworkStores<MainDbContext>()
.AddUserManager<UserManager<TVezhaUser>>()
.AddRoles<IdentityRole<Guid>>()
.AddDefaultTokenProviders();

// ✅ JWT Bearer Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secret = jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret not found");

builder.Services.AddAuthentication(options =>
{
    // Default to Cookies for general UI, but allow JWT for SPA/API/GQL
    options.DefaultAuthenticateScheme = "DefaultAuth";
    options.DefaultChallengeScheme = "DefaultAuth";
})
.AddPolicyScheme("DefaultAuth", "Cookie or JWT", options =>
{
    options.ForwardDefaultSelector = context =>
    {
        string authorization = context.Request.Headers.Authorization.ToString();
        if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
            return Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerDefaults.AuthenticationScheme;

        return IdentityConstants.ApplicationScheme;
    };
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret)),
        ClockSkew = TimeSpan.Zero
    };
});

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
    .AddMutationType<S5Server.GraphQL.Mutation>()
    .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment()) // ✅ Детальні помилки в Dev
    .AddAuthorization()                     // ✅ Підтримка [Authorize]
    .AddProjections()                       // ✅ Оптимізація Include/Select
    .AddFiltering()                         // ✅ Фільтрація (where)
    .AddSorting();                          // ✅ Сортування (orderBy)
// ✅ DbContext вже зареєстрований через AddPooledDbContextFactory!

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
            // ✅ Development: дозволити будь-який порт на localhost/127.0.0.1
            policy.SetIsOriginAllowed(origin => 
                  {
                      var host = new Uri(origin).Host;
                      return host == "localhost" || host == "127.0.0.1";
                  })
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
            // ✅ FALLBACK: дозволити Azure Web App origin
            policy.SetIsOriginAllowed(origin =>
                    origin.Contains(".azurewebsites.net", StringComparison.OrdinalIgnoreCase))
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
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
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

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

    if (app.Environment.IsDevelopment())
    {
        using var scope = app.Services.CreateScope();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<TVezhaUser>>();
        var havrokUser = userManager.FindByNameAsync("havrok").GetAwaiter().GetResult();
        if (havrokUser != null)
        {
            userManager.SetLockoutEndDateAsync(havrokUser, null).GetAwaiter().GetResult();
            userManager.ResetAccessFailedCountAsync(havrokUser).GetAwaiter().GetResult();
            Log.Information("✅ AUTOMATICALLY UNLOCKED USER 'havrok' IN DEVELOPMENT MODE");
        }
    }

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