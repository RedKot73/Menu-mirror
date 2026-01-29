using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

using S5Server.Models;

namespace S5Server.Data
{
    public class MainDbContext : IdentityDbContext
    {
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<DictArea>(entity =>
            {
                entity.ToTable("dict_area");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.Property(e => e.AreaTypeId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.CityCodeId).HasColumnType("TEXT(36)");
                entity.Property(e => e.Coords).HasColumnType("TEXT");

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

            /// <summary>
            /// Тип Напрямку ЛБЗ
            /// </summary>
            modelBuilder.Entity<DictAreaType>(entity =>
            {
                entity.ToTable("dict_area_type");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });

            modelBuilder.Entity<DictPosition>(entity =>
            {
                entity.ToTable("dict_position");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });

            modelBuilder.Entity<DictSoldierState>(entity =>
            {
                entity.ToTable("dict_soldier_state");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });

            modelBuilder.Entity<DictForcesType>(entity =>
            {
                entity.ToTable("dict_forces_type");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });

            modelBuilder.Entity<DictUnitType>(entity =>
            {
                entity.ToTable("dict_unit_type");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });
            
            modelBuilder.Entity<DictRank>(entity =>
            {
                entity.ToTable("dict_rank");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
                entity.Property(e => e.OrderVal).HasColumnType("INTEGER");
            });
            modelBuilder.Entity<DictTemplateCategory>(entity =>
            {
                entity.ToTable("dict_template_category");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
                /*
                entity.HasMany(e => e.UnitTaskItems)
                .WithOne(e => e.TemplateCategory)
                .HasForeignKey(e => e.TemplateCategoryId);
                */
            });
            modelBuilder.Entity<DictDroneType>(entity =>
            {
                entity.ToTable("dict_drone_type");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
            });
            modelBuilder.Entity<DictDroneModel>(entity =>
            {
                entity.ToTable("dict_drone_model");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
                entity.HasOne(e => e.DroneType)
                    .WithMany(e => e.DroneModels)
                    .HasForeignKey(e => e.DroneTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<DictCityCategory>(entity =>
            {
                entity.ToTable("dict_city_category");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.CodeId).IsRequired().HasColumnType("TEXT(1)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortValue).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
                entity.HasIndex(e => e.ShortValue).IsUnique();
                entity.HasMany(e => e.CityCodes)
                    .WithOne(e => e.Category)
                    .HasForeignKey(e => e.CategoryId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<DictCityCode>(entity =>
            {
                entity.ToTable("dict_city_code");
                entity.HasKey(e => e.Id);
                
                entity.Property(e => e.Id).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.ParentId).HasColumnType("TEXT(36)");
                entity.Property(e => e.Level1Id).IsRequired().HasColumnType("TEXT(20)");
                entity.Property(e => e.Level2Id).HasColumnType("TEXT(20)");
                entity.Property(e => e.Level3Id).HasColumnType("TEXT(20)");
                entity.Property(e => e.Level4Id).HasColumnType("TEXT(20)");
                entity.Property(e => e.LevelExtId).HasColumnType("TEXT(20)");
                entity.Property(e => e.CategoryId).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");

                // ✅ ВИПРАВЛЕНІ Foreign Keys (Level1, Level2... а не Id!)
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

                // ✅ Ієрархія Parent → Childs
                entity.HasOne(e => e.Parent)
                    .WithMany(e => e.Children)
                    .HasForeignKey(e => e.ParentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<DictUnitTask>(entity =>
            {
                entity.ToTable("dict_unit_task");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.Property(e => e.Amount).IsRequired().HasColumnType("REAL");
                entity.Property(e => e.WithMeans).HasColumnType("INTEGER").HasDefaultValue(0);
                entity.Property(e => e.AreaTypeId).HasColumnType("TEXT(36)");
                entity.HasIndex(e => e.Value).IsUnique();
                entity.HasOne(e => e.AreaType)
                    .WithMany(e => e.UnitTasks)
                    .HasForeignKey(e => e.AreaTypeId)
                    .OnDelete(DeleteBehavior.Restrict);
            });
            modelBuilder.Entity<DictUnitTaskItem>(entity =>
            {
                entity.ToTable("dict_unit_task_item");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.UnitTaskId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.TemplateCategoryId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.Value).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                
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
                entity.ToTable("units");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.ParentId).HasColumnType("TEXT(36)");
                entity.Property(e => e.AssignedUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.ForceTypeId).HasColumnType("TEXT(36)");
                entity.Property(e => e.UnitTypeId).HasColumnType("TEXT(36)");
                entity.Property(e => e.Name).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ShortName).HasColumnType("TEXT(100)");
                entity.Property(e => e.MilitaryNumber).HasColumnType("TEXT(100)");
                entity.Property(e => e.OrderVal).HasColumnType("INTEGER");
                entity.Property(e => e.IsInvolved).HasColumnType("INTEGER").HasDefaultValue(0);
                entity.Property(e => e.PersistentLocationId).HasColumnType("TEXT(36)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");

                // Керівний підрозділ
                entity.HasOne(u => u.Parent)
                      //.WithMany() // заменить на .WithMany(p => p.ChildUnits) если уберёте [NotMapped] у ChildUnits
                      .WithMany(u => u.ChildUnits)
                      .HasForeignKey(u => u.ParentId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Приданий до підрозділу
                entity.HasOne(u => u.AssignedUnit)
                      //.WithMany() // заменить на .WithMany(p => p.AssignedUnits) если уберёте [NotMapped] у AssignedUnits
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
            });

            modelBuilder.Entity<Soldier>(entity =>
            {
                entity.ToTable("soldiers");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.ExternId).HasColumnType("INTEGER");
                entity.Property(e => e.FirstName).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.MidleName).HasColumnType("TEXT(50)");
                entity.Property(e => e.LastName).HasColumnType("TEXT(50)");
                entity.Property(e => e.BirthDate).HasColumnType("TEXT");
                entity.Property(e => e.NickName).HasColumnType("TEXT(50)");
                entity.Property(e => e.UnitId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.AssignedUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.InvolvedUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.RankId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.PositionId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.StateId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.Property(e => e.ArrivedAt).HasColumnType("TEXT");
                entity.Property(e => e.DepartedAt).HasColumnType("TEXT");
                entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.ValidFrom).IsRequired().HasColumnType("TEXT");

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
                      //.HasForeignKey(s => s.VezhaUserId)
                      .OnDelete(DeleteBehavior.SetNull);
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
                entity.ToTable("soldiers_hist");
                entity.HasKey(e => e.Id);

                // Базовые поля
                entity.Property(e => e.Id).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.SoldierId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.ExternId).HasColumnType("INTEGER");
                entity.Property(e => e.FirstName).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.MidleName).HasColumnType("TEXT(50)");
                entity.Property(e => e.LastName).HasColumnType("TEXT(50)");
                entity.Property(e => e.BirthDate).HasColumnType("TEXT");
                entity.Property(e => e.NickName).HasColumnType("TEXT(50)");

                // Гибридные поля: Id + денормализованные значения (БЕЗ FK constraints)
                entity.Property(e => e.UnitId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.UnitShortName).IsRequired().HasColumnType("TEXT(100)");

                entity.Property(e => e.AssignedUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.AssignedUnitShortName).HasColumnType("TEXT(100)");

                entity.Property(e => e.OperationalUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.OperationalUnitShortName).HasColumnType("TEXT(100)");

                entity.Property(e => e.RankId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.RankShortValue).IsRequired().HasColumnType("TEXT(50)");

                entity.Property(e => e.PositionId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.PositionValue).IsRequired().HasColumnType("TEXT(100)");

                entity.Property(e => e.StateId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.StateValue).IsRequired().HasColumnType("TEXT(50)");

                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.Property(e => e.ArrivedAt).HasColumnType("TEXT");
                entity.Property(e => e.DepartedAt).HasColumnType("TEXT");

                // Метаданные аудита
                entity.Property(e => e.ChangedBy).IsRequired().HasColumnType("TEXT(100)");
                entity.Property(e => e.Operation).IsRequired().HasColumnType("TEXT(10)");
                entity.Property(e => e.ValidFrom).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.ValidTo).HasColumnType("TEXT");

                // Индексы для аудита и аналитики
                entity.HasIndex(e => e.SoldierId);
                entity.HasIndex(e => new { e.SoldierId, e.ValidFrom });
                entity.HasIndex(e => e.UnitId); // Для аналитики по подразделению
                entity.HasIndex(e => e.Operation); // Для фильтрации по типу операции
            });

            // Новые сущности: шаблоны и наборы данных
            modelBuilder.Entity<DocumentTemplate>(entity =>
            {
                entity.ToTable("document_templates");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Name).IsRequired().HasColumnType("TEXT(150)");
                entity.Property(e => e.Description).HasColumnType("TEXT(300)");
                entity.Property(e => e.Content).IsRequired().HasColumnType("BLOB");
                entity.Property(e => e.TemplateCategoryId).HasColumnType("TEXT(36)");
                entity.HasOne(e => e.TemplateCategory)
                      .WithMany()
                      .HasForeignKey(e => e.TemplateCategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
                entity.Property(e => e.IsPublished).HasColumnType("INTEGER");
                entity.Property(e => e.PublishedAtUtc).HasColumnType("TEXT");
                entity.Property(e => e.CreatedAtUtc).HasColumnType("TEXT");
                entity.Property(e => e.UpdatedAtUtc).HasColumnType("TEXT");

                entity.HasIndex(e => e.Name).IsUnique();
                entity.HasIndex(e => e.IsPublished);
            });

            modelBuilder.Entity<TemplateDataSet>(entity =>
            {
                entity.ToTable("template_data_sets");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.Name).IsRequired().HasColumnType("TEXT(150)");
                entity.Property(e => e.DataJson).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.CreatedAtUtc).HasColumnType("TEXT");
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
        /// Gets or sets the collection of template category entities in the database.
        /// </summary>
        /// <remarks>Use this property to query, add, update, or remove template category records through
        /// Entity Framework. Changes made to this collection are tracked by the context and persisted to the database
        /// when SaveChanges is called.</remarks>
        public DbSet<DictTemplateCategory> DictTemplateCategories { get; set; }

        /// <summary>
        /// Підрозділи
        /// </summary>
        public DbSet<Unit> Units { get; set; }
        /// <summary>
        /// Військовослужбовці (бійці)
        /// </summary>
        public DbSet<Soldier> Soldiers { get; set; }
        /// <summary>
        /// Историческая таблица изменений солдат
        /// </summary>
        public DbSet<SoldierHist> SoldierHistories { get; set; }

        /// <summary>
        /// Gets or sets the collection of document templates in the database context.
        /// </summary>
        public DbSet<DocumentTemplate> DocumentTemplates { get; set; }
        /// <summary>
        /// Gets or sets the collection of template data sets in the database context.
        /// </summary>
        public DbSet<TemplateDataSet> TemplateDataSets { get; set; }
    }
}
