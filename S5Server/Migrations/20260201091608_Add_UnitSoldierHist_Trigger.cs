using System;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_UnitSoldierHist_Trigger : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "units_hist",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    UnitId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    ParentShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    AssignedUnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    Name = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    MilitaryNumber = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    ForceTypeId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    ForceTypeShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    UnitTypeId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    UnitTypeShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    OrderVal = table.Column<int>(type: "INTEGER", nullable: false),
                    IsInvolved = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    PersistentLocationId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    PersistentLocationValue = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    ChangedBy = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Operation = table.Column<string>(type: "TEXT(10)", maxLength: 10, nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ValidTo = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_units_hist", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_units_hist_Operation",
                table: "units_hist",
                column: "Operation");

            migrationBuilder.CreateIndex(
                name: "IX_units_hist_UnitId",
                table: "units_hist",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_units_hist_UnitId_ValidFrom",
                table: "units_hist",
                columns: ["UnitId", "ValidFrom", "ValidTo"]);

            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_soldiers_insert_history
            AFTER INSERT ON soldiers
            FOR EACH ROW
            BEGIN
                INSERT INTO soldiers_hist (
                    Id,
                    SoldierId, ExternId, FirstName, MidleName, LastName,
                    BirthDate, NickName,
                    UnitId, UnitShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    OperationalUnitId, OperationalUnitShortName,
                    RankId, RankShortValue,
                    PositionId, PositionValue,
                    StateId, StateValue,
                    Comment, ArrivedAt, DepartedAt,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    NEW.Id, NEW.ExternId, NEW.FirstName, NEW.MidleName, NEW.LastName,
                    NEW.BirthDate, NEW.NickName,
                    NEW.UnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.UnitId), ''),
                    NEW.AssignedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.AssignedUnitId), NULL),
                    NEW.InvolvedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.InvolvedUnitId), NULL),
                    NEW.RankId, COALESCE((SELECT ShortValue FROM dict_rank WHERE Id = NEW.RankId), ''),
                    NEW.PositionId, COALESCE((SELECT Value FROM dict_position WHERE Id = NEW.PositionId), ''),
                    NEW.StateId, COALESCE((SELECT Value FROM dict_soldier_state WHERE Id = NEW.StateId), ''),
                    NEW.Comment, NEW.ArrivedAt, NEW.DepartedAt,
                    NEW.ChangedBy, 'INSERT', datetime('now'), NULL;
            END;");

            // ✅ ТРИГЕР на UPDATE
            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_soldiers_update_history
            AFTER UPDATE ON soldiers
            FOR EACH ROW
            WHEN (
                OLD.FirstName != NEW.FirstName OR
                OLD.MidleName != NEW.MidleName OR
                OLD.LastName != NEW.LastName OR
                OLD.BirthDate != NEW.BirthDate OR
                OLD.NickName != NEW.NickName OR
                OLD.UnitId != NEW.UnitId OR
                OLD.AssignedUnitId != NEW.AssignedUnitId OR
                OLD.InvolvedUnitId != NEW.InvolvedUnitId OR
                OLD.RankId != NEW.RankId OR
                OLD.PositionId != NEW.PositionId OR
                OLD.StateId != NEW.StateId OR
                OLD.Comment != NEW.Comment OR
                OLD.ArrivedAt != NEW.ArrivedAt OR
                OLD.DepartedAt != NEW.DepartedAt
            )
            BEGIN
                -- Закриваємо попередній запис
                UPDATE soldiers_hist 
                SET ValidTo = datetime('now')
                WHERE SoldierId = OLD.Id AND ValidTo IS NULL;

                -- Додаємо новий запис
                INSERT INTO soldiers_hist (
                    Id,
                    SoldierId, ExternId, FirstName, MidleName, LastName,
                    BirthDate, NickName,
                    UnitId, UnitShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    OperationalUnitId, OperationalUnitShortName,
                    RankId, RankShortValue,
                    PositionId, PositionValue,
                    StateId, StateValue,
                    Comment, ArrivedAt, DepartedAt,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT 
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    NEW.Id, NEW.ExternId, NEW.FirstName, NEW.MidleName, NEW.LastName,
                    NEW.BirthDate, NEW.NickName,
                    NEW.UnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.UnitId), ''),
                    NEW.AssignedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.AssignedUnitId), NULL),
                    NEW.InvolvedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = NEW.InvolvedUnitId), NULL),
                    NEW.RankId, COALESCE((SELECT ShortValue FROM dict_rank WHERE Id = NEW.RankId), ''),
                    NEW.PositionId, COALESCE((SELECT Value FROM dict_position WHERE Id = NEW.PositionId), ''),
                    NEW.StateId, COALESCE((SELECT Value FROM dict_soldier_state WHERE Id = NEW.StateId), ''),
                    NEW.Comment, NEW.ArrivedAt, NEW.DepartedAt,
                    NEW.ChangedBy, 'UPDATE', datetime('now'), NULL;
            END;");

            // ✅ ТРИГЕР на DELETE
            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_soldiers_delete_history
            AFTER DELETE ON soldiers
            FOR EACH ROW
            BEGIN
                -- Закриваємо останній запис
                UPDATE soldiers_hist 
                SET ValidTo = datetime('now')
                WHERE SoldierId = OLD.Id AND ValidTo IS NULL;

                -- Додаємо запис про видалення
                INSERT INTO soldiers_hist (
                    Id,
                    SoldierId, ExternId, FirstName, MidleName, LastName,
                    BirthDate, NickName,
                    UnitId, UnitShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    OperationalUnitId, OperationalUnitShortName,
                    RankId, RankShortValue,
                    PositionId, PositionValue,
                    StateId, StateValue,
                    Comment, ArrivedAt, DepartedAt,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    OLD.Id, OLD.ExternId, OLD.FirstName, OLD.MidleName, OLD.LastName,
                    OLD.BirthDate, OLD.NickName,
                    OLD.UnitId, COALESCE((SELECT ShortName FROM units WHERE Id = OLD.UnitId), ''),
                    OLD.AssignedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = OLD.AssignedUnitId), NULL),
                    OLD.InvolvedUnitId, COALESCE((SELECT ShortName FROM units WHERE Id = OLD.InvolvedUnitId), NULL),
                    OLD.RankId, COALESCE((SELECT ShortValue FROM dict_rank WHERE Id = OLD.RankId), ''),
                    OLD.PositionId, COALESCE((SELECT Value FROM dict_position WHERE Id = OLD.PositionId), ''),
                    OLD.StateId, COALESCE((SELECT Value FROM dict_soldier_state WHERE Id = OLD.StateId), ''),
                    OLD.Comment, OLD.ArrivedAt, OLD.DepartedAt,
                    OLD.ChangedBy, 'DELETE', datetime('now'), datetime('now');
            END;");

            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_units_insert_history
            AFTER INSERT ON units
            FOR EACH ROW
            BEGIN
                INSERT INTO units_hist (
                    Id,
                    UnitId, 
                    ParentId, ParentShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    Name, ShortName, MilitaryNumber,
                    ForceTypeId, ForceTypeShortValue,
                    UnitTypeId, UnitTypeShortValue,
                    OrderVal, IsInvolved,
                    PersistentLocationId, PersistentLocationValue,
                    Comment,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    NEW.Id,
                    NEW.ParentId,
                    (SELECT ShortName FROM units WHERE Id = NEW.ParentId),
                    NEW.AssignedUnitId,
                    (SELECT ShortName FROM units WHERE Id = NEW.AssignedUnitId),
                    NEW.Name,
                    NEW.ShortName,
                    NEW.MilitaryNumber,
                    NEW.ForceTypeId,
                    COALESCE((SELECT ShortValue FROM dict_forces_type WHERE Id = NEW.ForceTypeId), NULL),
                    NEW.UnitTypeId,
                    COALESCE((SELECT ShortValue FROM dict_unit_type WHERE Id = NEW.UnitTypeId), NULL),
                    NEW.OrderVal,
                    NEW.IsInvolved,
                    NEW.PersistentLocationId,
                    (SELECT Value FROM dict_area WHERE Id = NEW.PersistentLocationId),
                    NEW.Comment,
                    NEW.ChangedBy,
                    'INSERT',
                    NEW.ValidFrom,
                    NULL;
            END;");

            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_units_update_history
            AFTER UPDATE ON units
            FOR EACH ROW
            WHEN (
                -- Перевірка змін ОБОВ'ЯЗКОВИХ полів
                OLD.Name != NEW.Name OR
                OLD.ShortName != NEW.ShortName OR
                OLD.OrderVal != NEW.OrderVal OR
                OLD.IsInvolved != NEW.IsInvolved OR
                -- Перевірка змін NULLABLE полів через COALESCE
                COALESCE(OLD.ParentId, '') != COALESCE(NEW.ParentId, '') OR
                COALESCE(OLD.AssignedUnitId, '') != COALESCE(NEW.AssignedUnitId, '') OR
                COALESCE(OLD.MilitaryNumber, '') != COALESCE(NEW.MilitaryNumber, '') OR
                COALESCE(OLD.ForceTypeId, '') != COALESCE(NEW.ForceTypeId, '') OR
                COALESCE(OLD.UnitTypeId, '') != COALESCE(NEW.UnitTypeId, '') OR
                COALESCE(OLD.PersistentLocationId, '') != COALESCE(NEW.PersistentLocationId, '') OR
                COALESCE(OLD.Comment, '') != COALESCE(NEW.Comment, '')
            )
            BEGIN
                -- 1. Закриваємо поточну версію
                UPDATE units_hist 
                SET ValidTo = datetime('now')
                WHERE UnitId = OLD.Id AND ValidTo IS NULL;

                -- 2. Створюємо нову версію
                INSERT INTO units_hist (
                    Id,
                    UnitId, 
                    ParentId, ParentShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    Name, ShortName, MilitaryNumber,
                    ForceTypeId, ForceTypeShortValue,
                    UnitTypeId, UnitTypeShortValue,
                    OrderVal, IsInvolved,
                    PersistentLocationId, PersistentLocationValue,
                    Comment,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT 
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    NEW.Id,
                    NEW.ParentId,
                    (SELECT ShortName FROM units WHERE Id = NEW.ParentId),
                    NEW.AssignedUnitId,
                    (SELECT ShortName FROM units WHERE Id = NEW.AssignedUnitId),
                    NEW.Name,
                    NEW.ShortName,
                    NEW.MilitaryNumber,
                    NEW.ForceTypeId,
                    COALESCE((SELECT ShortValue FROM dict_forces_type WHERE Id = NEW.ForceTypeId), NULL),
                    NEW.UnitTypeId,
                    COALESCE((SELECT ShortValue FROM dict_unit_type WHERE Id = NEW.UnitTypeId), NULL),
                    NEW.OrderVal,
                    NEW.IsInvolved,
                    NEW.PersistentLocationId,
                    (SELECT Value FROM dict_area WHERE Id = NEW.PersistentLocationId),
                    NEW.Comment,
                    NEW.ChangedBy,
                    'UPDATE',
                    datetime('now'),
                    NULL;
            END;");

            migrationBuilder.Sql(@"
            CREATE TRIGGER IF NOT EXISTS trg_units_delete_history
            AFTER DELETE ON units
            FOR EACH ROW
            BEGIN
                -- 1. Закриваємо останню версію
                UPDATE units_hist 
                SET ValidTo = datetime('now')
                WHERE UnitId = OLD.Id AND ValidTo IS NULL;

                -- 2. Додаємо запис про видалення
                INSERT INTO units_hist (
                    Id,
                    UnitId, 
                    ParentId, ParentShortName,
                    AssignedUnitId, AssignedUnitShortName,
                    Name, ShortName, MilitaryNumber,
                    ForceTypeId, ForceTypeShortValue,
                    UnitTypeId, UnitTypeShortValue,
                    OrderVal, IsInvolved,
                    PersistentLocationId, PersistentLocationValue,
                    Comment,
                    ChangedBy, Operation, ValidFrom, ValidTo
                )
                SELECT
                    REPLACE(lower(hex(randomblob(16))), '0', ''),
                    OLD.Id,
                    OLD.ParentId,
                    (SELECT ShortName FROM units WHERE Id = OLD.ParentId),
                    OLD.AssignedUnitId,
                    (SELECT ShortName FROM units WHERE Id = OLD.AssignedUnitId),
                    OLD.Name,
                    OLD.ShortName,
                    OLD.MilitaryNumber,
                    OLD.ForceTypeId,
                    COALESCE((SELECT ShortValue FROM dict_forces_type WHERE Id = OLD.ForceTypeId), NULL),
                    OLD.UnitTypeId,
                    COALESCE((SELECT ShortValue FROM dict_unit_type WHERE Id = OLD.UnitTypeId), NULL),
                    OLD.OrderVal,
                    OLD.IsInvolved,
                    OLD.PersistentLocationId,
                    (SELECT Value FROM dict_area WHERE Id = OLD.PersistentLocationId),
                    OLD.Comment,
                    OLD.ChangedBy,
                    'DELETE',
                    datetime('now'),
                    datetime('now');
            END;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_soldiers_insert_history;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_soldiers_update_history;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_soldiers_delete_history;");

            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_units_insert_history;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_units_update_history;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_units_delete_history;");

            migrationBuilder.DropTable(
                name: "units_hist");
        }
    }
}
