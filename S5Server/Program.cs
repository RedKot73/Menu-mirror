using System.Globalization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.AzureAppServices;
using Microsoft.IdentityModel.Tokens;

using Npgsql;
using Serilog;

using S5Server.Data;
using S5Server.Models;

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

builder.Host.UseSerilog();

// ✅ Azure App Service Diagnostics (тільки для production)
if (!builder.Environment.IsDevelopment())
{
    builder.Logging.AddAzureWebAppDiagnostics();
    
    builder.Services.Configure<AzureFileLoggerOptions>(options =>
    {
        options.FileName = "s5server";
        options.FileSizeLimit = 10 * 1024 * 1024; // 10 MB
        options.RetainedFileCountLimit = 3;       // Останні 3 файли
    });
    
    builder.Services.Configure<AzureBlobLoggerOptions>(options =>
    {
        options.BlobName = "s5server.log";
    });
}

// ✅ PostgreSQL
var pgConnConfig = new DBConfig();
builder.Configuration.GetSection(DBConfig.ConfigKey).Bind(pgConnConfig);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrEmpty(connectionString))
{
    var connBuilder = new NpgsqlConnectionStringBuilder
    {
        Database = pgConnConfig.Database,
        Host = pgConnConfig.Host,
        Username = pgConnConfig.DB_Username,//vAppBuilder.Configuration["Adm"],
        Password = pgConnConfig.DB_Password,//builder.Configuration["Password"],//
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
    connectionString = connBuilder.ConnectionString;
}

ArgumentException.ThrowIfNullOrEmpty(connectionString);

builder.Services.AddDbContext<MainDbContext>(options =>
    options.UseNpgsql(connectionString)
        .UseSnakeCaseNamingConvention()
        .EnableSensitiveDataLogging(builder.Environment.IsDevelopment())
        .EnableDetailedErrors(builder.Environment.IsDevelopment()));

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
});

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
    });
});

// ✅ JWT Authentication
/*
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});
*/

var app = builder.Build();

app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
});

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    //app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
//app.UseStaticFiles();
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
app.UseRouting();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
//app.MapRazorPages();
app.MapFallbackToFile("index.html");

// ✅ Українська культура
var cultureInfo = new CultureInfo("uk-UA");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

try
{
    Log.Information("Starting S5Server");
    // ✅ Seed roles при запуску
    using (var scope = app.Services.CreateScope())
    {
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();
        await DbInitializer.SeedRoles(roleManager);
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
