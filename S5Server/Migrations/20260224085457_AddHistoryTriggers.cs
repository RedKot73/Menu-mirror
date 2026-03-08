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
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_changed boolean := false;
BEGIN
    -- 1. Если это UPDATE, проверяем, изменились ли данные ВООБЩЕ
    IF (TG_OP = 'UPDATE') THEN
        IF (
            OLD.first_name IS DISTINCT FROM NEW.first_name OR
            OLD.midle_name IS DISTINCT FROM NEW.midle_name OR
            OLD.last_name IS DISTINCT FROM NEW.last_name OR
            OLD.birth_date IS DISTINCT FROM NEW.birth_date OR
            OLD.nick_name IS DISTINCT FROM NEW.nick_name OR
            OLD.unit_id IS DISTINCT FROM NEW.unit_id OR
            OLD.assigned_unit_id IS DISTINCT FROM NEW.assigned_unit_id OR
            OLD.involved_unit_id IS DISTINCT FROM NEW.involved_unit_id OR
            OLD.rank_id IS DISTINCT FROM NEW.rank_id OR
            OLD.position_id IS DISTINCT FROM NEW.position_id OR
            OLD.state_id IS DISTINCT FROM NEW.state_id OR
            OLD.comment IS DISTINCT FROM NEW.comment OR
            OLD.arrived_at IS DISTINCT FROM NEW.arrived_at OR
            OLD.departed_at IS DISTINCT FROM NEW.departed_at
        ) THEN
            v_changed := true;
        END IF;

        -- Если ничего из списка не менялось, просто выходим
        IF NOT v_changed THEN
            RETURN NEW;
        END IF;
    END IF;

    -- 2. Закрываем предыдущую версию в истории (для UPDATE и DELETE)
    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
        UPDATE history.soldiers_hist 
        SET valid_to = CURRENT_TIMESTAMP
        WHERE soldier_id = OLD.id AND valid_to IS NULL;
    END IF;

    -- 3. Если это DELETE, на этом всё (запись закрыли, новую не создаем)
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    END IF;

    -- 4. Добавляем новую версию (для INSERT и UPDATE)
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
    VALUES (
        uuidv7(),
        NEW.id, NEW.extern_id, NEW.first_name, NEW.midle_name, NEW.last_name,
        NEW.birth_date, NEW.nick_name,
        NEW.unit_id, 
        COALESCE((SELECT short_name FROM core.units WHERE id = NEW.unit_id), ''),
        NEW.assigned_unit_id,
        (SELECT short_name FROM core.units WHERE id = NEW.assigned_unit_id),
        NEW.involved_unit_id,
        (SELECT short_name FROM core.units WHERE id = NEW.involved_unit_id),
        NEW.rank_id,
        COALESCE((SELECT short_value FROM dict.dict_rank WHERE id = NEW.rank_id), ''),
        NEW.position_id,
        COALESCE((SELECT value FROM dict.dict_position WHERE id = NEW.position_id), ''),
        NEW.state_id,
        COALESCE((SELECT value FROM dict.dict_soldier_state WHERE id = NEW.state_id), ''),
        NEW.comment, NEW.arrived_at, NEW.departed_at,
        NEW.changed_by,
        TG_OP,
        CURRENT_TIMESTAMP,
        NULL -- Новая запись всегда открыта
    );

    RETURN NEW;
END;
$function$;
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
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_changed boolean := false;
BEGIN
    -- 1. Для UPDATE проверяем, изменились ли значимые поля
    IF (TG_OP = 'UPDATE') THEN
        IF (
            OLD.name IS DISTINCT FROM NEW.name OR
            OLD.short_name IS DISTINCT FROM NEW.short_name OR
            OLD.order_val IS DISTINCT FROM NEW.order_val OR
            OLD.is_involved IS DISTINCT FROM NEW.is_involved OR
            OLD.parent_id IS DISTINCT FROM NEW.parent_id OR
            OLD.assigned_unit_id IS DISTINCT FROM NEW.assigned_unit_id OR
            OLD.military_number IS DISTINCT FROM NEW.military_number OR
            OLD.force_type_id IS DISTINCT FROM NEW.force_type_id OR
            OLD.unit_type_id IS DISTINCT FROM NEW.unit_type_id OR
            OLD.persistent_location_id IS DISTINCT FROM NEW.persistent_location_id OR
            OLD.comment IS DISTINCT FROM NEW.comment
        ) THEN
            v_changed := true;
        END IF;

        -- Если ничего не изменилось, просто завершаем работу
        IF NOT v_changed THEN
            RETURN NEW;
        END IF;
    END IF;

    -- 2. Закрываем предыдущую активную версию (для UPDATE и DELETE)
    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
        UPDATE history.units_hist 
        SET valid_to = CURRENT_TIMESTAMP
        WHERE unit_id = OLD.id AND valid_to IS NULL;
    END IF;

    -- 3. При удалении (DELETE) только закрываем историю и выходим
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    END IF;

    -- 4. Создаем новую версию записи (для INSERT и UPDATE)
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
    VALUES (
        uuidv7(),
        NEW.id,
        NEW.parent_id,
        (SELECT short_name FROM core.units WHERE id = NEW.parent_id),
        NEW.assigned_unit_id,
        (SELECT short_name FROM core.units WHERE id = NEW.assigned_unit_id),
        NEW.name, NEW.short_name, NEW.military_number,
        NEW.force_type_id,
        (SELECT short_value FROM dict.dict_forces_type WHERE id = NEW.force_type_id),
        NEW.unit_type_id,
        (SELECT short_value FROM dict.dict_unit_type WHERE id = NEW.unit_type_id),
        NEW.order_val, NEW.is_involved,
        NEW.persistent_location_id,
        (SELECT value FROM dict.dict_area WHERE id = NEW.persistent_location_id),
        NEW.comment, NEW.changed_by,
        TG_OP,
        CURRENT_TIMESTAMP,
        NULL -- Новая запись всегда открыта
    );

    RETURN NEW;
END;
$function$;
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