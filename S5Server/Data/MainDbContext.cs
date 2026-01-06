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
                entity.Property(e => e.Comment).HasColumnType("TEXT");
                entity.HasIndex(e => e.Value).IsUnique();
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
            modelBuilder.Entity<DictUnitTask>(e =>
            {
                e.ToTable("dict_unit_task");
                e.HasKey(e => e.Id);
                e.Property(e => e.Id).HasColumnType("TEXT(36)");
                e.Property(e => e.Value).IsRequired().HasColumnType("TEXT(100)");
                e.Property(e => e.Comment).HasColumnType("TEXT");
                e.Property(e => e.Amount).IsRequired().HasColumnType("REAL");
                e.Property(e => e.WithMeans).HasColumnType("INTEGER").HasDefaultValue(0);
                e.Property(e => e.AtPermanentPoint).HasColumnType("INTEGER").HasDefaultValue(1);
                e.HasIndex(e => e.Value).IsUnique();
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
                entity.Property(e => e.AreaId).HasColumnType("TEXT(36)");
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
                entity.HasOne(u => u.Area)
                      .WithMany()
                      .HasForeignKey(u => u.AreaId)
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

                // Храним enum Format в нижнем регистре (html|txt|docx|pdf)
                /*
                var fmtConverter = new ValueConverter<DocumentTemplate.TemplateFormat, string>(
                    v => DocumentTemplate.FormatToString(v),
                    v => DocumentTemplate.ParseFormat(v)
                );
                entity.Property(e => e.Format)
                      .HasConversion(fmtConverter)
                      .IsRequired()
                      .HasColumnType("TEXT(10)");
                */
                entity.Property(e => e.TemplateCategoryId).HasColumnType("TEXT(36)");
                entity.HasOne(e => e.TemplateCategory)
                      .WithMany()
                      .HasForeignKey(e => e.TemplateCategoryId)
                      .OnDelete(DeleteBehavior.Restrict);

                //entity.Property(e => e.ContentHash).HasColumnType("TEXT(64)");
                entity.Property(e => e.IsPublished).HasColumnType("INTEGER");
                entity.Property(e => e.PublishedAtUtc).HasColumnType("TEXT");
                /*
                entity.Property(e => e.DefaultDataSetId).HasColumnType("TEXT(36)");
                entity.HasOne(e => e.DefaultDataSet)
                      .WithMany()
                      .HasForeignKey(e => e.DefaultDataSetId)
                      .OnDelete(DeleteBehavior.SetNull);
                */

                entity.Property(e => e.CreatedAtUtc).HasColumnType("TEXT");
                entity.Property(e => e.UpdatedAtUtc).HasColumnType("TEXT");

                entity.HasIndex(e => e.Name).IsUnique();
                //entity.HasIndex(e => e.ContentHash);
                entity.HasIndex(e => e.IsPublished);
            });

            modelBuilder.Entity<TemplateDataSet>(entity =>
            {
                entity.ToTable("template_data_sets");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                //entity.Property(e => e.TemplateId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.Name).IsRequired().HasColumnType("TEXT(150)");
                entity.Property(e => e.DataJson).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.CreatedAtUtc).HasColumnType("TEXT");
                /*
                entity.HasOne(d => d.Template)
                      .WithMany(t => t.DataSets)
                      .HasForeignKey(d => d.TemplateId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.TemplateId, e.Name }).IsUnique();
                */
            });
        }

        /// <summary>
        /// Напрямок ЛБЗ
        /// </summary>
        public DbSet<DictArea> DictAreas { get; set; }
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
