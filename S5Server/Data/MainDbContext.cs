using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using S5Server.Models;

namespace S5Server.Data;

/// <summary>
/// Представляет основной контекст базы данных приложения
/// Используется для работы с данными через Entity Framework
/// Core и ASP.NET Core Identity
/// </summary>
/// <remarks>Класс наследуется от IdentityDbContext и расширяет стандартную схему Identity.</remarks>
public class MainDbContext : IdentityDbContext<TVezhaUser, IdentityRole<Guid>, Guid>
{

    /// <summary>
    /// Initializes a new instance of the <see cref="MainDbContext"/> class using the specified options.
    /// </summary>
    /// <param name="options">The options to be used by this <see cref="DbContext"/>.</param>
    public MainDbContext(DbContextOptions<MainDbContext> options)
        : base(options)
    {
    }
    /*
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        
        //optionsBuilder.EnableSensitiveDataLogging() // Показывает значения параметров
        //    .LogTo(Console.WriteLine, LogLevel.Information); // Выводит SQL в консоль
        
        base.OnConfiguring(optionsBuilder);
    }
    */

    /// <summary>
    /// Configures the entity mappings and relationships for the database context using the specified model builder.
    /// </summary>
    /// <remarks>This method is called by Entity Framework during model creation to define the schema,
    /// relationships, and constraints for all entities in the context. Override this method to customize table names,
    /// column types, indexes, and relationships. It is recommended to call the base implementation to ensure proper
    /// configuration of inherited entities.</remarks>
    /// <param name="modelBuilder">The builder used to construct the model for the context. Provides configuration for entity types, relationships,
    /// table mappings, and constraints.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        /*
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(Guid) || property.ClrType == typeof(Guid?))
                {
                    property.SetColumnType("uuid");
                }
                else
                if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                {
                    property.SetColumnType("timestamp with time zone");
                }
            }
        }
        */

        modelBuilder.Entity<TVezhaUser>(entity =>
        {
            entity.ToTable("users", "identity",
                t => t.HasComment("Користувачі системи"));
            entity.Property(e => e.Id)
                .HasColumnType("uuid")
                .HasColumnName("id");
            entity.Property(e => e.UserName)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("user_name");
            entity.Property(e => e.NormalizedUserName)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("normalized_user_name");
            entity.Property(e => e.Email)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("email");
            entity.Property(e => e.NormalizedEmail)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("normalized_email");
            entity.Property(e => e.EmailConfirmed)
                .HasColumnType("boolean")
                .HasColumnName("email_confirmed");
            entity.Property(e => e.PasswordHash)
                .HasColumnType("text")
                .HasColumnName("password_hash");
            entity.Property(e => e.SecurityStamp)
                .HasColumnType("text")
                .HasColumnName("security_stamp");
            entity.Property(e => e.ConcurrencyStamp)
                .HasColumnType("text")
                .HasColumnName("concurrency_stamp");
            entity.Property(e => e.PhoneNumber)
                .HasColumnType("text")
                .HasColumnName("phone_number");
            entity.Property(e => e.PhoneNumberConfirmed)
                .HasColumnType("boolean")
                .HasColumnName("phone_number_confirmed");
            entity.Property(e => e.TwoFactorEnabled)
                .HasColumnType("boolean")
                .HasColumnName("two_factor_enabled");
            entity.Property(e => e.LockoutEnd)
                .HasColumnType("timestamp with time zone")
                .HasColumnName("lockout_end")
                .HasComment("Дата/Час до якого користувач блокований");
            entity.Property(e => e.LockoutEnabled)
                .HasColumnType("boolean")
                .HasColumnName("lockout_enabled")
                .HasComment("Блокування користувача дозволено");
            entity.Property(e => e.AccessFailedCount)
                .HasColumnType("integer")
                .HasColumnName("access_failed_count")
                .HasComment("Кількість невдалих спроб входу користувача");
            entity.Property(e => e.LastLoginDate)
                .HasColumnType("timestamp with time zone")
                .HasColumnName("last_login_date")
                .HasComment("Дата/Час останнього успішного входу користувача");
            entity.Property(e => e.RegistrationDate)
                .IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasColumnName("registration_date")
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasComment("Дата/Час коли користувача створено");
            entity.Property(e => e.SoldierId)
                .IsRequired()
                .HasColumnType("uuid")
                .HasColumnName("soldier_id")
                .HasComment("Посилання на відповідного бійця");
            entity.Property(e => e.LastPasswordChangeDate)
                .HasColumnType("timestamp with time zone")
                .HasColumnName("last_password_change_date")
                .HasComment("Дата/Час останньої зміни пароля (для моніторингу та безпеки)");
            entity.Property(e => e.RequirePasswordChange)
                .HasColumnType("boolean")
                .HasColumnName("require_password_change")
                .HasComment("При наступному вході вимагати зміну пароля (наприклад, після адміністративного скидання)");

            entity.HasOne(u => u.Soldier)
                  .WithOne(s => s.VezhaUser)
                  .HasForeignKey<TVezhaUser>(u => u.SoldierId)
                  .HasConstraintName("aspnetusers_soldiers_fk")
                  .OnDelete(DeleteBehavior.SetNull);
            entity.HasIndex(e => e.SoldierId)
                .IsUnique()
                .HasDatabaseName("aspnetusers_un_soldier_id");
            entity.HasIndex(e => e.NormalizedUserName)
                .IsUnique()
                .HasDatabaseName("UserNameIndex");
        });

        modelBuilder.Entity<IdentityRole<Guid>>(entity =>
        {
            entity.ToTable("roles", "identity",
                t => t.HasComment("Ролі користувачів системи (Admin, Commander, Operator, Viewer)"));
            entity.HasKey(r => r.Id);
            entity.Property(r => r.Id)
                .HasColumnType("uuid")
                .HasColumnName("id");
            entity.Property(r => r.Name)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("name")
                .HasComment("Назва ролі (наприклад: Admin, Commander)");
            entity.Property(r => r.NormalizedName)
                .HasMaxLength(256)
                .HasColumnType("varchar(256)")
                .HasColumnName("normalized_name")
                .HasComment("Нормалізована назва ролі для пошуку (UPPERCASE)");
            entity.Property(r => r.ConcurrencyStamp)
                .HasColumnType("text")
                .HasColumnName("concurrency_stamp")
                .HasComment("Мітка конкурентності для оптимістичного блокування");

            entity.HasIndex(r => r.NormalizedName)
                .IsUnique()
                .HasDatabaseName("RoleNameIndex");

        });

        modelBuilder.Entity<IdentityUserRole<Guid>>(entity =>
        {
            entity.ToTable("user_roles", "identity",
                t => t.HasComment("Link between a user and a role"));
            entity.HasKey(ur => new { ur.UserId, ur.RoleId });
            entity.Property(ur => ur.UserId)
                .HasColumnType("uuid")
                .HasColumnName("user_id");
            entity.Property(ur => ur.RoleId)
                .HasColumnType("uuid")
                .HasColumnName("role_id");

            entity.HasIndex(ur => ur.RoleId)
                .HasDatabaseName("ix_user_roles_role_id");
        });

        modelBuilder.Entity<IdentityUserClaim<Guid>>(entity =>
        {
            entity.ToTable("user_claims", "identity",
                t => t.HasComment("Представляє твердження, яке має користувач"));
            entity.Property(c => c.Id)
                .HasColumnType("integer")
                .HasColumnName("id")
                .ValueGeneratedOnAdd();
            entity.Property(c => c.UserId)
                .HasColumnType("uuid")
                .HasColumnName("user_id");
            entity.Property(c => c.ClaimType)
                .HasColumnType("text")
                .HasColumnName("claim_type");
            entity.Property(c => c.ClaimValue)
                .HasColumnType("text")
                .HasColumnName("claim_value");

            entity.HasIndex(c => c.UserId)
                .HasDatabaseName("ix_user_claims_user_id");
        });

        /*
        /// 1. Користувач натискає "Login with Google"
        /// 2.Перенаправлення на Google OAuth
        /// 3.Користувач дозволяє доступ
        /// 4.Google повертає ProviderKey(наприклад "105742856...")
        /// 5.ASP.NET Identity перевіряє:
        /// -Чи є запис в user_logins з LoginProvider = "Google" та ProviderKey = "105742856..." ?
        /// ✅ Якщо є → вхід під цим UserId
        /// ❌ Якщо немає → створити нового користувача або зв'язати з існуючим
        /// 6.Запис додається / оновлюється в user_logins
        */
        modelBuilder.Entity<IdentityUserLogin<Guid>>(entity =>
        {
            entity.ToTable("user_logins", "identity",
                t => t.HasComment("Для входу через зовнішні сервіси типу Facebook/Microsoft/Google"));
            entity.HasKey(l => new { l.LoginProvider, l.ProviderKey });
            entity.Property(l => l.LoginProvider)
                .HasColumnType("varchar(128)")
                .HasColumnName("login_provider")
                .HasComment("Назва зовнішнього провайдера Facebook/Microsoft/Google");
            entity.Property(l => l.ProviderKey)
                .HasColumnType("varchar(128)")
                .HasColumnName("provider_key")
                .HasComment("Google повертає ProviderKey(наприклад 105742856...)");
            entity.Property(l => l.ProviderDisplayName)
                .HasColumnType("text")
                .HasColumnName("provider_display_name")
                .HasComment("Назва провайдера для інтерфейсу");
            entity.Property(l => l.UserId)
                .HasColumnType("uuid")
                .HasColumnName("user_id")
                .HasComment("Посилання на відповідного користувача");

            entity.HasIndex(l => l.UserId)
                .HasDatabaseName("ix_user_logins_user_id");
        });

        modelBuilder.Entity<IdentityUserToken<Guid>>(entity =>
        {
            entity.ToTable("user_tokens", "identity",
                t => t.HasComment("Токени для 2FA, reset password, email confirmation та зовнішніх провайдерів"));
            entity.HasKey(t => new { t.UserId, t.LoginProvider, t.Name });
            entity.Property(t => t.UserId)
                .HasColumnType("uuid")
                .HasColumnName("user_id");
            entity.Property(t => t.LoginProvider)
                .HasColumnType("varchar(128)")
                .HasColumnName("login_provider")
                .HasComment("Провайдер: [AspNetUserStore] для внутрішніх, Google/Facebook для зовнішніх");
            entity.Property(t => t.Name)
                .HasColumnType("varchar(128)")
                .HasColumnName("name")
                .HasComment("Тип токену: AuthenticatorKey, RecoveryCodes, refresh_token");
            entity.Property(t => t.Value)
                .HasColumnType("text")
                .HasColumnName("value")
                .HasComment("Значення токену (зашифроване)");
        });

        modelBuilder.Entity<IdentityRoleClaim<Guid>>(entity =>
        {
            entity.ToTable("role_claims", "identity",
                t => t.HasComment("Додаткові дозволи та атрибути ролей. Всі користувачі з роллю автоматично отримують ці claims для перевірки прав доступу"));
            entity.Property(c => c.Id)
                .HasColumnType("integer")
                .HasColumnName("id")
                .ValueGeneratedOnAdd();
            entity.Property(c => c.RoleId)
                .HasColumnType("uuid")
                .HasColumnName("role_id");
            entity.Property(c => c.ClaimType)
                .HasColumnType("text")
                .HasColumnName("claim_type");
            entity.Property(c => c.ClaimValue)
                .HasColumnType("text")
                .HasColumnName("claim_value");

            entity.HasIndex(c => c.RoleId)
                .HasDatabaseName("ix_role_claims_role_id");
        });

        modelBuilder.Entity<DictPosition>(entity =>
        {
            entity.ToTable("dict_position", "dict",
                t => t.HasComment("Посади"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });

        modelBuilder.Entity<DictSoldierState>(entity =>
        {
            entity.ToTable("dict_soldier_state", "dict",
                t => t.HasComment("Статус бійця норм/поранено/в полоні/СЗЧ..."));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });

        modelBuilder.Entity<DictForcesType>(entity =>
        {
            entity.ToTable("dict_forces_type", "dict",
                t => t.HasComment("Вид збройних сил Сухопутні, ДШВ, ВМС..."));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });

        modelBuilder.Entity<DictUnitType>(entity =>
        {
            entity.ToTable("dict_unit_type", "dict",
                t => t.HasComment("Тип підрозділу Бригада, Полк, Батальйон, Рота"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });
        
        modelBuilder.Entity<DictRank>(entity =>
        {
            entity.ToTable("dict_rank", "dict",
                t => t.HasComment("Довідник Військове звання"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
            entity.Property(e => e.OrderVal).HasColumnType("integer");
        });
        modelBuilder.Entity<DictTemplateCategory>(entity =>
        {
            entity.ToTable("dict_template_category", "dict",
                t => t.HasComment("Категория шаблона документа(БР / БД / и т.д."));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });
        modelBuilder.Entity<DictDroneType>(entity =>
        {
            entity.ToTable("dict_drone_type", "dict",
                t => t.HasComment("Типи БПЛА"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });
        modelBuilder.Entity<DictDroneModel>(entity =>
        {
            entity.ToTable("dict_drone_model", "dict",
                t => t.HasComment("Модель БПЛА"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
            entity.HasOne(e => e.DroneType)
                .WithMany(e => e.DroneModels)
                .HasForeignKey(e => e.DroneTypeId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        /*
        /// Категорія об’єкта
        /// «О» – Автономна Республіка Крим, області
        /// «К» – міста, що мають спеціальний статус
        /// «Р» – райони в областях та Автономній Республіці Крим
        /// «Н» – території територіальних громад
        ///     (назви територіальних громад) в областях,
        ///     територіальні громади Автономної Республіки Крим
        /// «М» – міста
        /// «Т» – селища міського типу
        /// «С» – села
        /// «Х» – селища
        /// «В» – райони в містах
        */
        modelBuilder.Entity<DictCityCategory>(entity =>
        {
            entity.ToTable("dict_city_category", "dict",
                t => t.HasComment("Категорія об’єкта: «М» – міста,«С» – села..."));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.CodeId).IsRequired().HasColumnType("varchar(1)");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
            entity.HasIndex(e => e.ShortValue).IsUnique();
            entity.HasMany(e => e.CityCodes)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        /*
        /// Запис Кодифікатору адміністративно-територіальних одиниць
        /// та територій територіальних громад
        */
        modelBuilder.Entity<DictCityCode>(entity =>
        {
            entity.ToTable("dict_city_code", "dict",
                t => t.HasComment("Запис Кодифікатору адміністративно-територіальних одиниць та територій територіальних громад"));
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id).IsRequired().HasColumnType("varchar(20)");
            entity.Property(e => e.ParentId)
                .HasComment("Адм. одиниця вищого рівня")
                .HasColumnType("varchar(20)");
            entity.Property(e => e.Level1Id).IsRequired()
                .HasColumnType("varchar(20)")
                .HasComment("Автономна Республіка Крим, області, міста, що мають спеціальний статус");
            entity.Property(e => e.Level2Id)
                .HasColumnType("varchar(20)")
                .HasComment("райони в областях та Автономній Республіці Крим");
            entity.Property(e => e.Level3Id)
                .HasColumnType("varchar(20)")
                .HasComment("території територіальних громад в областях");
            entity.Property(e => e.Level4Id)
                .HasColumnType("varchar(20)")
                .HasComment("міста, селища міського типу, села, селища (населені пункти)");
            entity.Property(e => e.LevelExtId)
                .HasColumnType("varchar(20)")
                .HasComment("райони в містах (в тому числі, в містах, що мають спеціальний статус)");
            entity.Property(e => e.CategoryId)
                .HasColumnType("uuid")
                .HasComment("Категорія об’єкта: «Р»–райони в областях,«Н»–території територіальних громад...)");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");

            entity.HasOne(e => e.Level1)
                .WithMany()  // ✅ Без параметра, бо Level1Values має [NotMapped]
                .HasForeignKey(e => e.Level1Id)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
                
            entity.HasOne(e => e.Level2)
                .WithMany()
                .HasForeignKey(e => e.Level2Id)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
                
            entity.HasOne(e => e.Level3)
                .WithMany()
                .HasForeignKey(e => e.Level3Id)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.Level4)
                .WithMany()
                .HasForeignKey(e => e.Level4Id)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasOne(e => e.LevelExt)
                .WithMany()
                .HasForeignKey(e => e.LevelExtId)
                .HasPrincipalKey(e => e.Id)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Parent)
                .WithMany(e => e.Children)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        /*
        /// Тип Напрямку ЛБЗ: ППД,РВЗ,ТПУ,ПУ,РВБД,БРО
        */
        modelBuilder.Entity<DictAreaType>(entity =>
        {
            entity.ToTable("dict_area_type", "dict",
                t => t.HasComment("Тип Напрямку ЛБЗ: ППД,РВЗ,ТПУ,ПУ,РВБД,БРО"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortValue).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.HasIndex(e => e.Value).IsUnique();
        });

        /*
        /// Район виконання завдань (РВЗ)
        */
        modelBuilder.Entity<DictArea>(entity =>
        {
            entity.ToTable("dict_area", "dict",
                t => t.HasComment("Район виконання завдань (РВЗ)"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.AreaTypeId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.CityCodeId).HasColumnType("varchar(20)");
            entity.Property(e => e.Coords).HasColumnType("varchar(300)");

            entity.HasIndex(e => e.Value).IsUnique();

            entity.HasOne(e => e.AreaType)
                .WithMany(e => e.Areas)
                .HasForeignKey(e => e.AreaTypeId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.CityCode)
                .WithMany()
                .HasForeignKey(e => e.CityCodeId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        modelBuilder.Entity<DictUnitTask>(entity =>
        {
            entity.ToTable("dict_unit_task", "dict",
                t => t.HasComment("Завдання підрозділу для використання в документах БР/БД"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.Amount)
                .IsRequired()
                .HasColumnType("numeric(18, 2)")
                .HasComment("Тариф в грн. за завдання");
            entity.Property(e => e.WithMeans)
                .HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чи використовуються в завданні засоби ураження");
            entity.Property(e => e.AreaTypeId)
                .HasColumnType("uuid")
                .HasComment("Тип Напрямку ЛБЗ");

            entity.HasIndex(e => e.Value).IsUnique();
            entity.HasOne(e => e.AreaType)
                .WithMany(e => e.UnitTasks)
                .HasForeignKey(e => e.AreaTypeId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<DictUnitTaskItem>(entity =>
        {
            entity.ToTable("dict_unit_task_item", "dict",
                t => t.HasComment("Опис Завдання прив'язаний до Категорії шаблона документа"));
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.UnitTaskId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.TemplateCategoryId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.Value).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            
            entity.HasOne(e => e.UnitTask)
                .WithMany(e => e.UnitTaskItems)
                .HasForeignKey(e => e.UnitTaskId)
                .OnDelete(DeleteBehavior.Cascade);
            
            entity.HasOne(e => e.TemplateCategory)
                .WithMany(e => e.UnitTaskItems)
                .HasForeignKey(e => e.TemplateCategoryId)
                .OnDelete(DeleteBehavior.Restrict);
            
            entity.HasIndex(e => new { e.UnitTaskId, e.TemplateCategoryId });
        });

        modelBuilder.Entity<Unit>(entity =>
        {
            entity.ToTable("units", "core",
                t => t.HasComment("Підрозділи"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.ParentId)
                .HasColumnType("uuid")
                .HasComment("Основний підрозділ");
            entity.Property(e => e.AssignedUnitId)
                .HasColumnType("uuid")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.ForceTypeId).HasColumnType("uuid");
            entity.Property(e => e.UnitTypeId).HasColumnType("uuid");
            entity.Property(e => e.Name).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortName)
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.MilitaryNumber).HasColumnType("varchar(100)");
            entity.Property(e => e.OrderVal).HasColumnType("integer");
            entity.Property(e => e.IsInvolved)
                .HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("True - Позаштатний/Оперативний/Тимчасовий підрозділ");
            entity.Property(e => e.PersistentLocationId)
                .HasColumnType("uuid")
                .HasComment("ППД (Постійне приміщення дислокації)");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Керівний підрозділ
            entity.HasOne(u => u.Parent)
                  .WithMany(u => u.ChildUnits)
                  .HasForeignKey(u => u.ParentId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Приданий до підрозділу
            entity.HasOne(u => u.AssignedUnit)
                  .WithMany(u => u.AssignedUnits)
                  .HasForeignKey(u => u.AssignedUnitId)
                  .OnDelete(DeleteBehavior.SetNull);

            // Довідники
            entity.HasOne(u => u.ForceType)
                  .WithMany()
                  .HasForeignKey(u => u.ForceTypeId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(u => u.UnitType)
                  .WithMany()
                  .HasForeignKey(u => u.UnitTypeId)
                  .OnDelete(DeleteBehavior.Restrict);
                  
            entity.HasOne(u => u.PersistentLocation)
                  .WithMany()
                  .HasForeignKey(u => u.PersistentLocationId)
                  .OnDelete(DeleteBehavior.Restrict);

            entity.ToTable(tb => tb.HasTrigger("trg_units_history"));
        });

        modelBuilder.Entity<UnitHist>(entity =>
        {
            entity.ToTable("units_hist", "history",
                t => t.HasComment("Підрозділи - історія"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.UnitId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.ParentId).HasColumnType("uuid");
            entity.Property(e => e.ParentShortName)
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.AssignedUnitId).HasColumnType("uuid");
            entity.Property(e => e.AssignedUnitShortName)
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.Name).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.ShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.MilitaryNumber).HasColumnType("varchar(100)");
            entity.Property(e => e.ForceTypeId).HasColumnType("uuid");
            entity.Property(e => e.ForceTypeShortValue)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.UnitTypeId).HasColumnType("uuid");
            entity.Property(e => e.UnitTypeShortValue)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.OrderVal).HasColumnType("integer");
            entity.Property(e => e.IsInvolved).HasColumnType("boolean").HasDefaultValue(false);
            entity.Property(e => e.PersistentLocationId).HasColumnType("uuid");
            entity.Property(e => e.PersistentLocationValue).HasColumnType("varchar(100)");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.Operation).IsRequired().HasColumnType("varchar(10)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.ValidTo).HasColumnType("timestamp with time zone");

            // Індекси для аудиту та аналітики
            entity.HasIndex(e => e.UnitId);
            entity.HasIndex(e => new { e.UnitId, e.ValidFrom });
            entity.HasIndex(e => e.Operation);
        });

        modelBuilder.Entity<Soldier>(entity =>
        {
            entity.ToTable("soldiers", "core",
                t => t.HasComment("Особовий склад"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.ExternId).HasColumnType("integer")
                .HasComment("Id з Імпульса, Армія- ...");
            entity.Property(e => e.FirstName).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.MidleName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.BirthDate).HasColumnType("date");
            entity.Property(e => e.NickName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.UnitId).IsRequired().HasColumnType("uuid")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.AssignedUnitId).HasColumnType("uuid")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.InvolvedUnitId).HasColumnType("uuid")
                .HasComment("Позаштатний підрозділ - Екіпаж/Група");
            entity.Property(e => e.RankId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Звання");
            entity.Property(e => e.PositionId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Посада");
            entity.Property(e => e.StateId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Статус: Звичайний, 200,300,500,Поранено,СЗЧ...");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.ArrivedAt)
                .HasColumnType("date")
                .HasComment("Прибув");
            entity.Property(e => e.DepartedAt)
                .HasColumnType("date")
                .HasComment("Вибув");
            entity.Property(e => e.ChangedBy).IsRequired()
                .HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Основний підрозділ (обов'язковий)
            entity.HasOne(s => s.Unit)
                  .WithMany(u => u.Soldiers)
                  .HasForeignKey(s => s.UnitId)
                  .OnDelete(DeleteBehavior.Cascade);

            // Приданий до підрозділу (опціонально)
            entity.HasOne(s => s.AssignedUnit)
                  .WithMany(u => u.AssignedSoldiers)
                  .HasForeignKey(s => s.AssignedUnitId)
                  .OnDelete(DeleteBehavior.SetNull);
            // Задіяні в підрозділі/екіпажі
            entity.HasOne(s => s.InvolvedUnit)
                  .WithMany(u => u.InvolvedSoldiers)
                  .HasForeignKey(s => s.InvolvedUnitId)
                  .OnDelete(DeleteBehavior.SetNull);

            // Звання
            entity.HasOne(s => s.Rank)
                  .WithMany()
                  .HasForeignKey(s => s.RankId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Посада
            entity.HasOne(s => s.Position)
                  .WithMany()
                  .HasForeignKey(s => s.PositionId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Статус
            entity.HasOne(s => s.State)
                  .WithMany()
                  .HasForeignKey(s => s.StateId)
                  .OnDelete(DeleteBehavior.Restrict);

            // Мережевий акаунт (може бути відсутній)
            entity.HasOne(s => s.VezhaUser)
                  .WithOne(s => s.Soldier)
                  .HasForeignKey<TVezhaUser>(u => u.SoldierId)
                  .OnDelete(DeleteBehavior.SetNull);

            entity.ToTable(tb => tb.HasTrigger("trg_soldiers_history"));
            /*
            // Індекси
            entity.HasIndex(e => e.UnitId);
            entity.HasIndex(e => e.AssignedUnitId);
            entity.HasIndex(e => e.RankId);
            entity.HasIndex(e => e.PositionId);
            entity.HasIndex(e => e.StateId);
            */
        });

        modelBuilder.Entity<SoldierHist>(entity =>
        {
            entity.ToTable("soldiers_hist", "history",
                t => t.HasComment("Особовий склад - історія"));
            entity.HasKey(e => e.Id);

            // Базовые поля
            entity.Property(e => e.Id).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.SoldierId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Ссылка на оригинального бойца");
            entity.Property(e => e.ExternId)
                .HasColumnType("integer")
                .HasComment("Внешний ID (из Импульса, Армия+ и т.д.)");
            entity.Property(e => e.FirstName).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.MidleName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.BirthDate).HasColumnType("date");
            entity.Property(e => e.NickName)
                .HasMaxLength(50)
                .HasColumnType("citext")
                .HasComment("Позивний");
            // Гибридные поля: Id + денормализованные значения (БЕЗ FK constraints)
            entity.Property(e => e.UnitId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.UnitShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.AssignedUnitId)
                .HasColumnType("uuid")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.AssignedUnitShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.InvolvedUnitId)
                .HasColumnType("uuid")
                .HasComment("Позаштатний підрозділ - Екіпаж/Група");
            entity.Property(e => e.InvolvedUnitShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Позаштатний підрозділ - Екіпаж/Група");
            entity.Property(e => e.RankId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Звання");
            entity.Property(e => e.RankShortValue).IsRequired()
                .HasColumnType("varchar(50)")
                .HasComment("Звання");
            entity.Property(e => e.PositionId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Посада");
            entity.Property(e => e.PositionValue).IsRequired()
                .HasColumnType("varchar(100)")
                .HasComment("Посада");
            entity.Property(e => e.StateId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Статус: Звичайний, 200,300,500,Поранено,СЗЧ...");
            entity.Property(e => e.StateValue).IsRequired()
                .HasColumnType("varchar(50)")
                .HasComment("Статус: Звичайний, 200,300,500,Поранено,СЗЧ...");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.ArrivedAt)
                .HasColumnType("date")
                .HasComment("Прибув до підрозділу Дата");
            entity.Property(e => e.DepartedAt)
                .HasColumnType("date")
                .HasComment("Вибув з підрозділу Дата");
            // Метаданные аудита
            entity.Property(e => e.ChangedBy).IsRequired()
                .HasColumnType("varchar(100)");
            entity.Property(e => e.Operation).IsRequired()
                .HasColumnType("varchar(10)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.ValidTo).HasColumnType("timestamp with time zone");

            // Индексы для аудита и аналитики
            entity.HasIndex(e => e.SoldierId);
            entity.HasIndex(e => new { e.SoldierId, e.ValidFrom });
            entity.HasIndex(e => e.UnitId); // Для аналитики по подразделению
            //entity.HasIndex(e => e.Operation); // Для фильтрации по типу операции
        });

        modelBuilder.Entity<DocumentTemplate>(entity =>
        {
            entity.ToTable("document_templates", "docs",
                t => t.HasComment("Шаблон документа HTML-format з якорями HandleBars"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.Name).IsRequired().HasColumnType("varchar(150)");
            entity.Property(e => e.Description).HasColumnType("varchar(300)");
            entity.Property(e => e.Content).IsRequired().HasColumnType("text");
            entity.Property(e => e.TemplateCategoryId).HasColumnType("uuid")
                .HasComment("Категория шаблона документа БР/БД...");
            entity.Property(e => e.IsPublished).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чернетка/Опубліковано");
            entity.Property(e => e.PublishedAtUtc).HasColumnType("timestamp with time zone");
            entity.Property(e => e.PublishedBy).HasColumnType("varchar(100)");
            entity.Property(e => e.CreatedAtUtc).HasColumnType("timestamp with time zone");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.HasOne(e => e.TemplateCategory)
                  .WithMany()
                  .HasForeignKey(e => e.TemplateCategoryId)
                  .OnDelete(DeleteBehavior.Restrict);

            //entity.HasIndex(e => e.Name).IsUnique();
            //entity.HasIndex(e => e.IsPublished);
        });

        modelBuilder.Entity<TemplateDataSet>(entity =>
        {
            entity.ToTable("template_data_sets", "docs",
                t => t.HasComment("Сохранённый набор данных для подстановки в шаблон документа (БР/БД)"));
            entity.HasKey(e => e.Id);
            
            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.IsParentDocUsed).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чи існує документ старшого начальника");
            entity.Property(e => e.ParentDocNumber).HasColumnType("varchar(100)");
            entity.Property(e => e.ParentDocDate).HasColumnType("date");
            entity.Property(e => e.Name).IsRequired().HasColumnType("varchar(150)");
            entity.Property(e => e.DocNumber).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.DocDate).IsRequired().HasColumnType("date");
            entity.Property(e => e.IsPublished).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чернетка/Опубліковано");
            entity.Property(e => e.PublishedAtUtc).HasColumnType("timestamp with time zone");
            entity.Property(e => e.PublishedBy).HasColumnType("varchar(100)");
            entity.Property(e => e.CreatedAtUtc).IsRequired().HasColumnType("timestamp with time zone");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Зв'язок One-to-Many з UnitTask
            entity.HasMany(e => e.UnitTasks)
                .WithOne(ut => ut.DataSet)
                .HasForeignKey(ut => ut.DataSetId)
                .OnDelete(DeleteBehavior.Cascade);

            // Індекси
            //entity.HasIndex(e => e.Name);
            entity.HasIndex(e => e.DocNumber);
            //entity.HasIndex(e => e.IsPublished);
            entity.HasIndex(e => new { e.DocDate, e.DocNumber }).IsUnique();
        });

        modelBuilder.Entity<UnitTask>(entity =>
        {
            entity.ToTable("units_task", "docs",
                t => t.HasComment("Снимок состояния подразделения на момент назначения задачи"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.DataSetId).HasColumnType("uuid")
                .HasComment("Сохранённый набор данных для подстановки в шаблон документа (БР/БД)");
            entity.Property(e => e.UnitId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.UnitShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.ParentId).HasColumnType("uuid");
            entity.Property(e => e.ParentShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.AssignedUnitId)
                .HasComment("Приданий до підрозділу")
                .HasColumnType("uuid");
            entity.Property(e => e.AssignedShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.UnitTypeId).HasColumnType("uuid");
            entity.Property(e => e.UnitTypeName).HasColumnType("varchar(100)");
            entity.Property(e => e.IsInvolved).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("True - Позаштатний/Оперативний/Тимчасовий підрозділ");
            entity.Property(e => e.PersistentLocationId).HasColumnType("uuid")
                .HasComment("ППД (Постійне приміщення дислокації)");
            entity.Property(e => e.PersistentLocationValue)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("ППД (Постійне приміщення дислокації)");
            entity.Property(e => e.TaskId).IsRequired().HasColumnType("uuid")
                .HasComment("Завдання підрозділу для використання в документах БР/БД");
            entity.Property(e => e.TaskValue).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Завдання підрозділу для використання в документах БР/БД");
            entity.Property(e => e.Amount)
                .HasColumnType("numeric(18, 2)")
                .HasComment("Тариф в грн. за завдання");
            entity.Property(e => e.AreaId).IsRequired().HasColumnType("uuid")
                .HasComment("РВЗ (Район виконання завдань)");
            entity.Property(e => e.IsPublished).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чернетка/Опубліковано");
            entity.Property(e => e.PublishedAtUtc).HasColumnType("timestamp with time zone");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Зв'язки
            entity.HasOne(e => e.Unit)
                .WithMany()
                .HasForeignKey(e => e.UnitId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.Parent)
                .WithMany()
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.AssignedUnit)
                .WithMany()
                .HasForeignKey(e => e.AssignedUnitId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.UnitType)
                .WithMany()
                .HasForeignKey(e => e.UnitTypeId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.PersistentLocation)
                .WithMany()
                .HasForeignKey(e => e.PersistentLocationId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Task)
                .WithMany()
                .HasForeignKey(e => e.TaskId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasOne(e => e.Area)
                .WithMany()
                .HasForeignKey(e => e.AreaId)
                .OnDelete(DeleteBehavior.Restrict);

            // Індекси
            entity.HasIndex(e => e.UnitId);
            entity.HasIndex(e => e.TaskId);
            //entity.HasIndex(e => e.IsPublished);
            entity.HasIndex(e => new { e.UnitId, e.DataSetId }).IsUnique();

            entity.ToTable(tb => tb.HasTrigger("trg_units_task_history"));
        });
        modelBuilder.Entity<UnitTaskHist>(entity =>
        {
            entity.ToTable("units_task_hist", "history",
                t => t.HasComment("Историческая таблица изменений задач подразделений"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.UnitTaskId).IsRequired().HasColumnType("uuid")
                .HasComment("Ссылка на оригинальную запись задачи подразделения");
            entity.Property(e => e.DataSetId).IsRequired().HasColumnType("uuid")
                .HasComment("Сохранённый набор данных для подстановки в шаблон документа (БР/БД)");
            entity.Property(e => e.UnitId).IsRequired().HasColumnType("uuid")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.UnitShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.ParentId).HasColumnType("uuid");
            entity.Property(e => e.ParentShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext");
            entity.Property(e => e.AssignedUnitId).HasColumnType("uuid")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.AssignedShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.UnitTypeId).HasColumnType("uuid");
            entity.Property(e => e.UnitTypeName).HasColumnType("varchar(100)");
            entity.Property(e => e.IsInvolved).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("True - Позаштатний/Оперативний/Тимчасовий підрозділ");
            entity.Property(e => e.PersistentLocationId).HasColumnType("uuid")
                .HasComment("ППД (Постійне приміщення дислокації)");
            entity.Property(e => e.PersistentLocationValue)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("ППД (Постійне приміщення дислокації)");
            entity.Property(e => e.TaskId).IsRequired().HasColumnType("uuid")
                .HasComment("Завдання підрозділу");
            entity.Property(e => e.TaskValue).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Назва завдання підрозділу");
            entity.Property(e => e.AreaId).IsRequired().HasColumnType("uuid")
                .HasComment("РВЗ (Район виконання завдань)");
            entity.Property(e => e.AreaValue).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Назва РВЗ (Район виконання завдань)");
            entity.Property(e => e.IsPublished).HasColumnType("boolean")
                .HasDefaultValue(false)
                .HasComment("Чернетка/Опубліковано");
            entity.Property(e => e.PublishedAtUtc).HasColumnType("timestamp with time zone");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.Operation).IsRequired().HasColumnType("varchar(10)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.ValidTo).HasColumnType("timestamp with time zone");

            // Індекси для аудиту та аналітики
            entity.HasIndex(e => e.UnitTaskId);
            entity.HasIndex(e => new { e.UnitTaskId, e.ValidFrom });
            entity.HasIndex(e => e.UnitId);
            entity.HasIndex(e => e.Operation);
        });
        modelBuilder.Entity<SoldierTask>(entity =>
        {
            entity.ToTable("soldiers_task", "docs",
                t => t.HasComment("Снимок состояния бойца на момент назначения задачи подразделению"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.UnitTaskId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Ссылка на UnitTask (задание подразделения)");
            entity.Property(e => e.SoldierId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Ссылка на оригинального бойца");
            entity.Property(e => e.ExternId)
                .HasColumnType("integer")
                .HasComment("Внешний ID (из Импульса, Армия+ и т.д.)");
            entity.Property(e => e.FirstName).IsRequired()
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.MidleName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .HasColumnType("citext");
            //entity.Property(e => e.BirthDate).HasColumnType("TEXT");
            entity.Property(e => e.NickName)
                .HasMaxLength(50)
                .HasColumnType("citext")
                .HasComment("Позивний");
            
            // Денормалізовані поля
            entity.Property(e => e.UnitId).IsRequired().HasColumnType("uuid")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.UnitShortName).IsRequired()
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Штатний підрозділ");
            entity.Property(e => e.AssignedUnitId).HasColumnType("uuid")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.AssignedUnitShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Приданий до підрозділу");
            entity.Property(e => e.InvolvedUnitId).HasColumnType("uuid")
                .HasComment("Позаштатний підрозділ - Екіпаж/Група");
            entity.Property(e => e.InvolvedUnitShortName)
                .HasMaxLength(100)
                .HasColumnType("citext")
                .HasComment("Позаштатний підрозділ - Екіпаж/Група");
            entity.Property(e => e.RankId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Звання");
            entity.Property(e => e.RankShortValue).IsRequired()
                .HasColumnType("varchar(50)")
                .HasComment("Звання");
            entity.Property(e => e.PositionId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Посада");
            entity.Property(e => e.PositionValue).IsRequired()
                .HasColumnType("varchar(100)")
                .HasComment("Посада");
            entity.Property(e => e.StateId).IsRequired()
                .HasColumnType("uuid")
                .HasComment("Статус: Звичайний, 200,300,500,Поранено,СЗЧ...");
            entity.Property(e => e.StateValue).IsRequired()
                .HasColumnType("varchar(50)")
                .HasComment("Статус: Звичайний, 200,300,500,Поранено,СЗЧ...");
            entity.Property(e => e.Comment).HasColumnType("varchar(250)");
            entity.Property(e => e.ArrivedAt)
                .HasColumnType("date")
                .HasComment("Прибув до підрозділу Дата");
            entity.Property(e => e.DepartedAt)
                .HasColumnType("date")
                .HasComment("Вибув з підрозділу Дата");
            entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("varchar(100)");
            entity.Property(e => e.ValidFrom).IsRequired()
                .HasColumnType("timestamp with time zone")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            // Зв'язки
            entity.HasOne(e => e.UnitTask)
                .WithMany(u => u.SoldiersTask)
                .HasForeignKey(e => e.UnitTaskId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Soldier)
                .WithMany()
                .HasForeignKey(e => e.SoldierId)
                .OnDelete(DeleteBehavior.Cascade);

            // Індекси
            entity.HasIndex(e => e.UnitTaskId);
            entity.HasIndex(e => e.SoldierId);
            entity.HasIndex(e => new { e.UnitTaskId, e.SoldierId }).IsUnique();
        });


        modelBuilder.Entity<DroneModelTask>(entity =>
        {
            entity.ToTable("drone_model_task", "docs",
                t => t.HasComment("Модель БПЛА (для завдань підрозділів)"));
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Id).HasColumnType("uuid");
            entity.Property(e => e.UnitTaskId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.DroneModelId).IsRequired().HasColumnType("uuid");
            entity.Property(e => e.Quantity).IsRequired().HasColumnType("integer").HasDefaultValue(1);

            // Зв'язки
            entity.HasOne(e => e.UnitTask)
                .WithMany(ut => ut.Means)
                .HasForeignKey(e => e.UnitTaskId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.DroneModel)
                .WithMany()
                .HasForeignKey(e => e.DroneModelId)
                .OnDelete(DeleteBehavior.Restrict);

            // Індекси
            entity.HasIndex(e => e.UnitTaskId);
            entity.HasIndex(e => e.DroneModelId);
            entity.HasIndex(e => new { e.UnitTaskId, e.DroneModelId }).IsUnique();
        });

        modelBuilder.Entity<VCityFullName>(entity =>
        {
            entity.ToView("v_city_full_name", "dict");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnType("varchar(20)");
            entity.Property(e => e.Value).HasColumnType("text");
        });
    }

    /// <summary>
    /// Категорії об'єктів адміністративно-територіальних одиниць
    /// </summary>
    public DbSet<DictCityCategory> DictCityCategories { get; set; }
    /// <summary>
    /// Запис Кодифікатору адміністративно-територіальних одиниць
    /// та територій територіальних громад
    /// </summary>
    public DbSet<DictCityCode> DictCityCodes { get; set; }
    /// <summary>
    /// Представлення повної адреси населеного пункту (dict.v_city_full_name)
    /// </summary>
    public DbSet<VCityFullName> CityFullNames { get; set; }
    /// <summary>
    /// Напрямок ЛБЗ
    /// </summary>
    public DbSet<DictArea> DictAreas { get; set; }
    /// <summary>
    /// Тип Напрямку ЛБЗ
    /// </summary>
    public DbSet<DictAreaType> DictAreaTypes { get; set; }
    /// <summary>
    /// Посада
    /// </summary>
    public DbSet<DictPosition> DictPositions { get; set; }
    /// <summary>
    /// Вид збройних сил Сухопутні, ДШВ, ВМС...
    /// </summary>
    public DbSet<DictForcesType> DictForcesTypes { get; set; }
    /// <summary>
    /// Стан військовослужбовця
    /// </summary>
    public DbSet<DictSoldierState> DictSoldierStates { get; set; }
    /// <summary>
    /// Тип підрозділу
    /// </summary>
    public DbSet<DictUnitType> DictUnitTypes { get; set; }
    /// <summary>
    /// Довідник Військове звання
    /// </summary>
    public DbSet<DictRank> DictRanks { get; set; }
    /// <summary>
    /// Типи БПЛА
    /// </summary>
    public DbSet<DictDroneType> DictDroneTypes { get; set; }
    /// <summary>
    /// Модель БПЛА
    /// </summary>
    public DbSet<DictDroneModel> DictDroneModels { get; set; }
    /// <summary>
    /// Завдання підрозділу для використання в документах БР/БД
    /// </summary>
    public DbSet<DictUnitTask> DictUnitTasks { get; set; }
    /// <summary>
    /// Елементи завдання підрозділу для різних типів документів
    /// </summary>
    public DbSet<DictUnitTaskItem> DictUnitTaskItems { get; set; }
    /// <summary>
    /// Категория шаблона документа
    /// </summary>
    public DbSet<DictTemplateCategory> DictTemplateCategories { get; set; }

    /// <summary>
    /// Підрозділи
    /// </summary>
    public DbSet<Unit> Units { get; set; }
    /// <summary>
    /// Историческая таблица подразделений
    /// </summary>
    public DbSet<UnitHist> UnitHistories { get; set; }
    /// <summary>
    /// Снимок состояния подразделения на момент назначения задачи
    /// </summary>
    public DbSet<UnitTask> UnitTasks { get; set; }
    /// <summary>
    /// Историческая таблица изменений задач подразделений
    /// </summary>
    public DbSet<UnitTaskHist> UnitTaskHistories { get; set; }
    /// <summary>
    /// Військовослужбовці (бійці)
    /// </summary>
    public DbSet<Soldier> Soldiers { get; set; }
    /// <summary>
    /// Историческая таблица изменений солдат
    /// </summary>
    public DbSet<SoldierHist> SoldierHistories { get; set; }
    /// <summary>
    /// Снимок состояния бойца на момент назначения задачи подразделению
    /// </summary>
    public DbSet<SoldierTask> SoldierTasks { get; set; }

    /// <summary>
    /// Моделі БПЛА для завдань підрозділів
    /// </summary>
    public DbSet<DroneModelTask> DroneModelTasks { get; set; }

    /// <summary>
    /// Шаблони документів БР/БД
    /// </summary>
    public DbSet<DocumentTemplate> DocumentTemplates { get; set; }
    /// <summary>
    /// Сохранённый набор данных для подстановки в шаблон документа (БР/БД)
    /// </summary>
    public DbSet<TemplateDataSet> TemplateDataSets { get; set; }
}
