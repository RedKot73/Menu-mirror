using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Npgsql;
using S5Server.Data;
using S5Server.Models;
using S5Server.Utils;
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

if (builder.Environment.IsDevelopment())
{
    var currentDir = Directory.GetCurrentDirectory();
    var envPath = System.IO.Path.Combine(currentDir, ".env");
    var parentEnvPath = System.IO.Path.Combine(currentDir, "..", ".env");

    if (System.IO.File.Exists(envPath))
    {
        Log.Information("✅ [INIT] .env file found at {Path}. Loading variables.", envPath);
        DotNetEnv.Env.Load(envPath);
    }
     else if (System.IO.File.Exists(parentEnvPath))
     {
         var fullParentPath = System.IO.Path.GetFullPath(parentEnvPath);
         Log.Information("✅ [INIT] .env file found at {Path}. Loading variables.", fullParentPath);
         DotNetEnv.Env.Load(fullParentPath);
     }
    else
    {
        Log.Warning("⚠️ [INIT] .env file NOT found at {Path} or {ParentPath}.", envPath, parentEnvPath);
    }
}

// 2. ВАЖНО: Всегда загружаем переменные окружения из системы (Kubernetes)
// Ставим этот вызов ПОСЛЕ DotNetEnv, чтобы K8s перекрывал значения из .env файла
builder.Configuration.AddEnvironmentVariables();

// ✅ JWT Validation & Fail-Safe Mechanism
const string DEV_JWT_SECRET = "S5_DEV_SECRET_2026_DO_NOT_USE_IN_PROD_999";
const string DEV_JWT_S5SERVER = "S5Server";

var jwtSecret = builder.Configuration["JwtSettings:Secret"];

// 1. Secret Protection
if (string.IsNullOrEmpty(jwtSecret))
{
    if (builder.Environment.IsDevelopment())
    {
        Log.Warning("⚠️ JWT Secret missing. Using development fallback.");
        jwtSecret = DEV_JWT_SECRET;
        builder.Configuration["JwtSettings:Secret"] = DEV_JWT_SECRET;
    }
    else
    {
        Log.Fatal("❌ CRITICAL: JwtSettings:Secret is missing in Production! Terminating.");
        return;
    }
}
else if (builder.Environment.IsProduction() && jwtSecret == DEV_JWT_SECRET)
{
    Log.Fatal("❌ CRITICAL: Production environment is using the Development fallback JWT secret! Terminating.");
    return;
}

// 2. Issuer Protection
if (string.IsNullOrEmpty(builder.Configuration["JwtSettings:Issuer"]))
{
    if (builder.Environment.IsDevelopment())
    {
        Log.Warning("⚠️ JWT Issuer missing. Using development fallback: {Issuer}", DEV_JWT_S5SERVER);
        builder.Configuration["JwtSettings:Issuer"] = DEV_JWT_S5SERVER;
    }
    else
    {
        Log.Fatal("❌ CRITICAL: JwtSettings:Issuer is missing in Production! Terminating.");
        return;
    }
}

// 3. Audience Protection
if (string.IsNullOrEmpty(builder.Configuration["JwtSettings:Audience"]))
{
    if (builder.Environment.IsDevelopment())
    {
        Log.Warning("⚠️ JWT Audience missing. Using development fallback: {Audience}", DEV_JWT_S5SERVER);
        builder.Configuration["JwtSettings:Audience"] = DEV_JWT_S5SERVER;
    }
    else
    {
        Log.Fatal("❌ CRITICAL: JwtSettings:Audience is missing in Production! Terminating.");
        return;
    }
}

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
builder.Services.AddScoped<S5Server.Services.IAuthDomainService, S5Server.Services.AuthDomainService>();
builder.Services.AddScoped<S5Server.Services.ITemplateDataSetService, S5Server.Services.TemplateDataSetService>();

builder.Services.AddPooledDbContextFactory<MainDbContext>(options =>
    options.UseNpgsql(dataSource, npgsql =>
            // ← Явно вказати ім'я таблиці міграцій (UseSnakeCaseNamingConvention змінює його на __ef_migrations_history)
            npgsql.MigrationsHistoryTable("__EFMigrationsHistory", "public"))
        .UseSnakeCaseNamingConvention()
        .EnableSensitiveDataLogging(false)
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
    .AddMutationType<S5Server.GraphQL.AuthMutation>()
    .ModifyRequestOptions(opt => opt.IncludeExceptionDetails = builder.Environment.IsDevelopment()) // ✅ Детальні помилки в Dev
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
            Log.Warning("AllowedOrigins не налаштовано — CORS заборонено для production");
        }
    });
});


var app = builder.Build();

// === БЛОК АВТОМАТИЧЕСКИХ МИГРАЦИЙ ===
if (args.Any(arg => arg.Trim().Contains("--migrate", StringComparison.OrdinalIgnoreCase)))
{
    Log.Information("=== Запуск режима миграций (обнаружен флаг --migrate) ===");

    using var scope = app.Services.CreateScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<MainDbContext>();
    try
    {
        // Логируем уже применённые миграции
        var applied = (await dbContext.Database.GetAppliedMigrationsAsync()).ToList();
        Log.Information("✅ Применено миграций: {Count}", applied.Count);
        foreach (var m in applied)
            Log.Debug("   [applied] {Migration}", m);

        // Логируем ожидающие миграции
        var pending = (await dbContext.Database.GetPendingMigrationsAsync()).ToList();
        Log.Information("⏳ Ожидают применения: {Count}", pending.Count);
        foreach (var m in pending)
            Log.Information("   [pending] {Migration}", m);

        if (pending.Count == 0)
        {
            Log.Information("Нет новых миграций. База данных актуальна.");
        }
        else
        {
            Log.Information("Начинаем применение миграций...");
            await dbContext.Database.MigrateAsync();
            Log.Information("=== Все миграции успешно применены! ===");
        }

        Environment.Exit(0); 
    }
    catch (Exception ex)
    {
        // Логируем детальную информацию об ошибке
        Log.Fatal(ex, "❌ Ошибка при применении миграций");
        Log.Fatal("Тип ошибки: {ExType}", ex.GetType().FullName);
        if (ex.InnerException != null)
            Log.Fatal("Внутренняя ошибка: {Inner}", ex.InnerException.Message);
        Environment.Exit(1); 
    }
}

// === БЛОК НАСТРОЙКИ СЛУЖЕБНОГО ПОЛЬЗОВАТЕЛЯ ===
if (args.Any(arg => arg.Trim().Contains("--setup-user", StringComparison.OrdinalIgnoreCase)))
{
    Log.Information("=== Запуск режима настройки служебного пользователя (обнаружен флаг --setup-user) ===");

    using var scope = app.Services.CreateScope();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<TVezhaUser>>();
    try
    {
        const string userName = "havrok";
        var password = builder.Configuration["SERVICE_USER_PASSWORD"] ?? "QWERTY654321";
        
        var user = await userManager.FindByNameAsync(userName);
        if (user == null)
        {
            Log.Information("Создание пользователя '{User}'...", userName);
            user = new TVezhaUser { UserName = userName, Email = $"{userName}@unit.mil" };
            var result = await userManager.CreateAsync(user, password);
            if (!result.Succeeded) throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
        }
        else
        {
            Log.Information("Сброс пароля для '{User}'...", userName);
            user.PasswordHash = userManager.PasswordHasher.HashPassword(user, password);
            await userManager.UpdateAsync(user);
        }

        // Разблокировка
        await userManager.SetLockoutEndDateAsync(user, null);
        await userManager.ResetAccessFailedCountAsync(user);
        
        Log.Information("=== Пользователь '{User}' успешно настроен! ===", userName);
        Environment.Exit(0);
    }
    catch (Exception ex)
    {
        Log.Fatal(ex, "Ошибка при настройке служебного пользователя");
        Environment.Exit(1);
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
    
    // Log key security parameters for audit
    var audit2faMode = builder.Configuration["TWO_FACTOR_MODE"] ?? "strict (default)";
    var auditMandatory2fa = builder.Configuration["REQUIRE_MANDATORY_2FA"] ?? "false (default)";
    
    Log.Information("--- [AUDIT] SECURITY CONFIGURATION ---");
    Log.Information("TWO_FACTOR_MODE: {Mode}", audit2faMode);
    Log.Information("REQUIRE_MANDATORY_2FA: {Mandatory}", auditMandatory2fa);
    Log.Information("--------------------------------------");

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
