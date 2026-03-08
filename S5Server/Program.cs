using System.Globalization;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

using Npgsql;

using S5Server.Data;
using S5Server.Models;

using Serilog;

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

// ✅ Application Insights отримає логи через вбудовану інтеграцію ASP.NET Core
builder.Host.UseSerilog();

// ✅ Application Insights (тільки для production/Azure)
if (builder.Environment.IsProduction())
{
    builder.Services.AddApplicationInsightsTelemetry();
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
var connectionString = connBuilder.ConnectionString;
ArgumentException.ThrowIfNullOrEmpty(connectionString);
var dataSourceBuilder = new NpgsqlDataSourceBuilder(connectionString);
// ✅ Налаштувати обробку infinity
dataSourceBuilder.EnableDynamicJson();
// ✅ Конвертувати infinity → DateTime.MaxValue/MinValue
dataSourceBuilder.ConnectionStringBuilder.Options = "-c DateStyle=ISO";
// ✅ Увімкнути legacy behavior для timestamp
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
if (builder.Environment.IsProduction())
{
    // Аналог TrustServerCertificate = true
    dataSourceBuilder.UseSslClientAuthenticationOptionsCallback(options =>
    {
        options.RemoteCertificateValidationCallback = (sender, certificate, chain, errors) => true;
    });
}
var dataSource = dataSourceBuilder.Build();

// ✅ Використати DataSource замість connectionString
builder.Services.AddPooledDbContextFactory<MainDbContext>(options =>
    options.UseNpgsql(dataSource)  // ← Замість connectionString!
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

// ✅ Конфігурація фонових сервісів
{
    var factory = app.Services.GetRequiredService<IDbContextFactory<MainDbContext>>();
    var logger = app.Services.GetRequiredService<ILogger<Program>>();
    S5Server.Services.ImportSoldiers.Configure(factory, logger);
}

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
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

app.UseHttpsRedirection();
// ✅ Статичні файли з wwwroot (Angular dist)
app.UseStaticFiles(new StaticFileOptions
{
    OnPrepareResponse = ctx =>
    {
        // Cache static files for 1 year
        if (ctx.File.Name.EndsWith(".js") || ctx.File.Name.EndsWith(".css"))
        {
            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=31536000");
        }
    }
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

// ✅ Українська культура
/*
var cultureInfo = new CultureInfo("uk-UA");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;
*/

try
{
    Log.Information("Starting S5Server");
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
