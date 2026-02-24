using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    /// <remarks>
    /// Requires PostgreSQL 18+ for native uuidv7() support
    /// </remarks>
    public partial class AddHistoryTriggers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // ═══════════════════════════════════════════════════════════
            // SOLDIERS: Universal History Manager
            // ═══════════════════════════════════════════════════════════
            migrationBuilder.Sql(@"
                CREATE OR REPLACE FUNCTION history.fn_soldiers_history_manager()
                RETURNS TRIGGER AS $$
                DECLARE
                    rec RECORD;
                BEGIN
                    -- 1. Закриття старої версії (UPDATE/DELETE)
                    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
                        UPDATE history.soldiers_hist 
                        SET valid_to = CURRENT_TIMESTAMP
                        WHERE soldier_id = OLD.id AND valid_to IS NULL;
                    END IF;

                    -- 2. Перевірка змін для UPDATE
                    IF (TG_OP = 'UPDATE') THEN
                        IF (
                            OLD.first_name IS NOT DISTINCT FROM NEW.first_name AND
                            OLD.midle_name IS NOT DISTINCT FROM NEW.midle_name AND
                            OLD.last_name IS NOT DISTINCT FROM NEW.last_name AND
                            OLD.birth_date IS NOT DISTINCT FROM NEW.birth_date AND
                            OLD.nick_name IS NOT DISTINCT FROM NEW.nick_name AND
                            OLD.unit_id IS NOT DISTINCT FROM NEW.unit_id AND
                            OLD.assigned_unit_id IS NOT DISTINCT FROM NEW.assigned_unit_id AND
                            OLD.involved_unit_id IS NOT DISTINCT FROM NEW.involved_unit_id AND
                            OLD.rank_id IS NOT DISTINCT FROM NEW.rank_id AND
                            OLD.position_id IS NOT DISTINCT FROM NEW.position_id AND
                            OLD.state_id IS NOT DISTINCT FROM NEW.state_id AND
                            OLD.comment IS NOT DISTINCT FROM NEW.comment AND
                            OLD.arrived_at IS NOT DISTINCT FROM NEW.arrived_at AND
                            OLD.departed_at IS NOT DISTINCT FROM NEW.departed_at
                        ) THEN
                            RETURN NEW;
                        END IF;
                    END IF;

                    -- 3. Визначаємо джерело даних
                    rec := CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;

                    -- 4. Додаємо запис в історію
                    INSERT INTO history.soldiers_hist (
                        id, soldier_id, extern_id, first_name, midle_name, last_name,
                        birth_date, nick_name,
                        unit_id, unit_short_name,
                        assigned_unit_id, assigned_unit_short_name,
                        involved_unit_id, involved_unit_short_name,
                        rank_id, rank_short_value,
                        position_id, position_value,
                        state_id, state_value,
                        comment, arrived_at, departed_at,
                        changed_by, operation, valid_from, valid_to
                    )
                    SELECT
                        uuidv7(),
                        rec.id, rec.extern_id, rec.first_name, rec.midle_name, rec.last_name,
                        rec.birth_date, rec.nick_name,
                        rec.unit_id, 
                        COALESCE((SELECT short_name FROM core.units WHERE id = rec.unit_id), ''),
                        rec.assigned_unit_id,
                        (SELECT short_name FROM core.units WHERE id = rec.assigned_unit_id),
                        rec.involved_unit_id,
                        (SELECT short_name FROM core.units WHERE id = rec.involved_unit_id),
                        rec.rank_id,
                        COALESCE((SELECT short_value FROM dict.dict_rank WHERE id = rec.rank_id), ''),
                        rec.position_id,
                        COALESCE((SELECT value FROM dict.dict_position WHERE id = rec.position_id), ''),
                        rec.state_id,
                        COALESCE((SELECT value FROM dict.dict_soldier_state WHERE id = rec.state_id), ''),
                        rec.comment, rec.arrived_at, rec.departed_at,
                        rec.changed_by,
                        TG_OP,
                        CURRENT_TIMESTAMP,
                        CASE WHEN TG_OP = 'DELETE' THEN CURRENT_TIMESTAMP ELSE NULL END;

                    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
                END;
                $$ LANGUAGE plpgsql;
            ");

            migrationBuilder.Sql(@"
                DROP TRIGGER IF EXISTS trg_soldiers_history ON core.soldiers;
                CREATE TRIGGER trg_soldiers_history
                    AFTER INSERT OR UPDATE OR DELETE ON core.soldiers
                    FOR EACH ROW
                    EXECUTE FUNCTION history.fn_soldiers_history_manager();
            ");

            // ═══════════════════════════════════════════════════════════
            // UNITS: Universal History Manager
            // ═══════════════════════════════════════════════════════════
            migrationBuilder.Sql(@"
                CREATE OR REPLACE FUNCTION history.fn_units_history_manager()
                RETURNS TRIGGER AS $$
                DECLARE
                    rec RECORD;
                BEGIN
                    -- 1. Закриття старої версії
                    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
                        UPDATE history.units_hist 
                        SET valid_to = CURRENT_TIMESTAMP
                        WHERE unit_id = OLD.id AND valid_to IS NULL;
                    END IF;

                    -- 2. Перевірка змін для UPDATE
                    IF (TG_OP = 'UPDATE') THEN
                        IF (
                            OLD.name IS NOT DISTINCT FROM NEW.name AND
                            OLD.short_name IS NOT DISTINCT FROM NEW.short_name AND
                            OLD.order_val IS NOT DISTINCT FROM NEW.order_val AND
                            OLD.is_involved IS NOT DISTINCT FROM NEW.is_involved AND
                            OLD.parent_id IS NOT DISTINCT FROM NEW.parent_id AND
                            OLD.assigned_unit_id IS NOT DISTINCT FROM NEW.assigned_unit_id AND
                            OLD.military_number IS NOT DISTINCT FROM NEW.military_number AND
                            OLD.force_type_id IS NOT DISTINCT FROM NEW.force_type_id AND
                            OLD.unit_type_id IS NOT DISTINCT FROM NEW.unit_type_id AND
                            OLD.persistent_location_id IS NOT DISTINCT FROM NEW.persistent_location_id AND
                            OLD.comment IS NOT DISTINCT FROM NEW.comment
                        ) THEN
                            RETURN NEW;
                        END IF;
                    END IF;

                    -- 3. Визначаємо джерело
                    rec := CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;

                    -- 4. Запис в історію
                    INSERT INTO history.units_hist (
                        id, unit_id, parent_id, parent_short_name,
                        assigned_unit_id, assigned_unit_short_name,
                        name, short_name, military_number,
                        force_type_id, force_type_short_value,
                        unit_type_id, unit_type_short_value,
                        order_val, is_involved,
                        persistent_location_id, persistent_location_value,
                        comment, changed_by, operation, valid_from, valid_to
                    )
                    SELECT
                        uuidv7(),
                        rec.id,
                        rec.parent_id,
                        (SELECT short_name FROM core.units WHERE id = rec.parent_id),
                        rec.assigned_unit_id,
                        (SELECT short_name FROM core.units WHERE id = rec.assigned_unit_id),
                        rec.name, rec.short_name, rec.military_number,
                        rec.force_type_id,
                        (SELECT short_value FROM dict.dict_forces_type WHERE id = rec.force_type_id),
                        rec.unit_type_id,
                        (SELECT short_value FROM dict.dict_unit_type WHERE id = rec.unit_type_id),
                        rec.order_val, rec.is_involved,
                        rec.persistent_location_id,
                        (SELECT value FROM dict.dict_area WHERE id = rec.persistent_location_id),
                        rec.comment, rec.changed_by,
                        TG_OP,
                        CURRENT_TIMESTAMP,
                        CASE WHEN TG_OP = 'DELETE' THEN CURRENT_TIMESTAMP ELSE NULL END;

                    RETURN CASE WHEN TG_OP = 'DELETE' THEN OLD ELSE NEW END;
                END;
                $$ LANGUAGE plpgsql;
            ");

            migrationBuilder.Sql(@"
                DROP TRIGGER IF EXISTS trg_units_history ON core.units;
                CREATE TRIGGER trg_units_history
                    AFTER INSERT OR UPDATE OR DELETE ON core.units
                    FOR EACH ROW
                    EXECUTE FUNCTION history.fn_units_history_manager();
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Видалення тригерів
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_soldiers_history ON core.soldiers;");
            migrationBuilder.Sql("DROP TRIGGER IF EXISTS trg_units_history ON core.units;");

            // Видалення функцій
            migrationBuilder.Sql("DROP FUNCTION IF EXISTS history.fn_soldiers_history_manager();");
            migrationBuilder.Sql("DROP FUNCTION IF EXISTS history.fn_units_history_manager();");
        }
    }
}