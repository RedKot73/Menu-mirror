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
    }
}
