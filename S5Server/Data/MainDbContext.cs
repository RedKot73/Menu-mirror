using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using S5Server.Models;

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace S5Server.Data
{
    public class MainDbContext : IdentityDbContext
    {
        public MainDbContext(DbContextOptions<MainDbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
            /*
            optionsBuilder.EnableSensitiveDataLogging() // Показывает значения параметров
                .LogTo(Console.WriteLine, LogLevel.Information); // Выводит SQL в консоль
            */
            base.OnConfiguring(optionsBuilder);
        }

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
                entity.HasIndex(e => e.Value).IsUnique(); // UNIQUE(Value)
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
            });

            modelBuilder.Entity<Soldier>(entity =>
            {
                entity.ToTable("soldiers");
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id).HasColumnType("TEXT(36)");
                entity.Property(e => e.FirstName).IsRequired().HasColumnType("TEXT(50)");
                entity.Property(e => e.MidleName).HasColumnType("TEXT(50)");
                entity.Property(e => e.LastName).HasColumnType("TEXT(50)");
                entity.Property(e => e.NickName).HasColumnType("TEXT(50)");
                entity.Property(e => e.UnitId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.AssignedUnitId).HasColumnType("TEXT(36)");
                entity.Property(e => e.RankId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.PositionId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.StateId).IsRequired().HasColumnType("TEXT(36)");
                entity.Property(e => e.Comment).HasColumnType("TEXT");

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

            modelBuilder.Entity<TVezhaUser<string>>(entity =>
            {
                // SoldierId колонка в AspNetUsers
                entity.Property(u => u.SoldierId)
                      .HasColumnType("TEXT(36)")
                      .IsRequired();

                entity.HasOne(u => u.Soldier)
                      .WithOne(s => s.VezhaUser) // можно .WithOne() если в Soldier уберёте навигацию
                      .HasForeignKey<TVezhaUser<string>>(u => u.SoldierId)
                      .OnDelete(DeleteBehavior.Restrict); // или SetNull если nullable

                entity.HasIndex(u => u.SoldierId).IsUnique(); // 1:0..1
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
        /// Підрозділи
        /// </summary>
        public DbSet<Unit> Units { get; set; }
        /// <summary>
        /// Військовослужбовці (бійці)
        /// </summary>
        public DbSet<Soldier> Soldiers { get; set; }
    }
}
