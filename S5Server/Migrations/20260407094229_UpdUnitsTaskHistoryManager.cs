using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdUnitsTaskHistoryManager : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION history.fn_units_task_history_manager()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_changed boolean := false;
BEGIN
    -- 1. Для UPDATE проверяем, изменились ли значимые поля
    IF (TG_OP = 'UPDATE') THEN
        IF (
            OLD.data_set_id               IS DISTINCT FROM NEW.data_set_id               OR
            OLD.unit_id                   IS DISTINCT FROM NEW.unit_id                   OR
            OLD.unit_short_name           IS DISTINCT FROM NEW.unit_short_name           OR
            OLD.parent_id                 IS DISTINCT FROM NEW.parent_id                 OR
            OLD.parent_short_name         IS DISTINCT FROM NEW.parent_short_name         OR
            OLD.assigned_unit_id          IS DISTINCT FROM NEW.assigned_unit_id          OR
            OLD.assigned_short_name       IS DISTINCT FROM NEW.assigned_short_name       OR
			OLD.adjacted_short_name       IS DISTINCT FROM NEW.adjacted_short_name       OR
			OLD.adjacted_unit_id       	  IS DISTINCT FROM NEW.adjacted_unit_id       	 OR
			OLD.adjacted_type_id       	  IS DISTINCT FROM NEW.adjacted_type_id       	 OR
            OLD.unit_type_id              IS DISTINCT FROM NEW.unit_type_id              OR
            OLD.unit_type_name            IS DISTINCT FROM NEW.unit_type_name            OR
            OLD.is_involved               IS DISTINCT FROM NEW.is_involved               OR
            OLD.persistent_location_id    IS DISTINCT FROM NEW.persistent_location_id    OR
            OLD.persistent_location_value IS DISTINCT FROM NEW.persistent_location_value OR
            OLD.task_id                   IS DISTINCT FROM NEW.task_id                   OR
            OLD.task_value                IS DISTINCT FROM NEW.task_value                OR
            OLD.area_id                   IS DISTINCT FROM NEW.area_id                   OR
            OLD.is_published              IS DISTINCT FROM NEW.is_published              OR
            OLD.published_at_utc          IS DISTINCT FROM NEW.published_at_utc
        ) THEN
            v_changed := true;
        END IF;

        -- Если ничего не изменилось — выходим без записи в историю
        IF NOT v_changed THEN
            RETURN NEW;
        END IF;
    END IF;

    -- 2. Закрываем предыдущую активную версию (для UPDATE и DELETE)
    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
        UPDATE history.units_task_hist
        SET valid_to = CURRENT_TIMESTAMP
        WHERE unit_task_id = OLD.id AND valid_to IS NULL;
    END IF;

    -- 3. При DELETE — только закрываем историю и выходим
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    END IF;

    -- 4. Создаём новую версию записи (для INSERT и UPDATE)
    INSERT INTO history.units_task_hist (
        id,
        unit_task_id,
        data_set_id,
        unit_id,
		unit_short_name,
        parent_id,
		parent_short_name,
        assigned_unit_id,
		assigned_short_name,
		adjacted_short_name,
		adjacted_unit_id,
		adjacted_type_id,
        unit_type_id,
		unit_type_name,
        is_involved,
        persistent_location_id,
		persistent_location_value,
        task_id,
		task_value,
        area_id,
		area_value,
        is_published,
		published_at_utc,
        changed_by,
        operation,
        valid_from,
        valid_to
    )
    VALUES (
        uuidv7(),
        NEW.id,
        NEW.data_set_id,
        NEW.unit_id,
        NEW.unit_short_name,
        NEW.parent_id,
        NEW.parent_short_name,
        NEW.assigned_unit_id,
        NEW.assigned_short_name,
		NEW.adjacted_short_name,
		NEW.adjacted_unit_id,
		NEW.adjacted_type_id,
        NEW.unit_type_id,
        NEW.unit_type_name,
        NEW.is_involved,
        NEW.persistent_location_id,
        NEW.persistent_location_value,
        NEW.task_id,
        NEW.task_value,
        NEW.area_id,
        (SELECT value FROM dict.dict_area WHERE id = NEW.area_id),
        NEW.is_published,
        NEW.published_at_utc,
        NEW.changed_by,
        TG_OP,
        CURRENT_TIMESTAMP,
        NULL
    );

    RETURN NEW;
END;
$function$;
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Восстанавливаем предыдущую версию функции без полей adjacted_*
            migrationBuilder.Sql(@"
CREATE OR REPLACE FUNCTION history.fn_units_task_history_manager()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_changed boolean := false;
BEGIN
    -- 1. Для UPDATE проверяем, изменились ли значимые поля
    IF (TG_OP = 'UPDATE') THEN
        IF (
            OLD.data_set_id               IS DISTINCT FROM NEW.data_set_id               OR
            OLD.unit_id                   IS DISTINCT FROM NEW.unit_id                   OR
            OLD.unit_short_name           IS DISTINCT FROM NEW.unit_short_name           OR
            OLD.parent_id                 IS DISTINCT FROM NEW.parent_id                 OR
            OLD.parent_short_name         IS DISTINCT FROM NEW.parent_short_name         OR
            OLD.assigned_unit_id          IS DISTINCT FROM NEW.assigned_unit_id          OR
            OLD.assigned_short_name       IS DISTINCT FROM NEW.assigned_short_name       OR
            OLD.unit_type_id              IS DISTINCT FROM NEW.unit_type_id              OR
            OLD.unit_type_name            IS DISTINCT FROM NEW.unit_type_name            OR
            OLD.is_involved               IS DISTINCT FROM NEW.is_involved               OR
            OLD.persistent_location_id    IS DISTINCT FROM NEW.persistent_location_id    OR
            OLD.persistent_location_value IS DISTINCT FROM NEW.persistent_location_value OR
            OLD.task_id                   IS DISTINCT FROM NEW.task_id                   OR
            OLD.task_value                IS DISTINCT FROM NEW.task_value                OR
            OLD.area_id                   IS DISTINCT FROM NEW.area_id                   OR
            OLD.is_published              IS DISTINCT FROM NEW.is_published              OR
            OLD.published_at_utc          IS DISTINCT FROM NEW.published_at_utc
        ) THEN
            v_changed := true;
        END IF;

        -- Если ничего не изменилось — выходим без записи в историю
        IF NOT v_changed THEN
            RETURN NEW;
        END IF;
    END IF;

    -- 2. Закрываем предыдущую активную версию (для UPDATE и DELETE)
    IF (TG_OP IN ('UPDATE', 'DELETE')) THEN
        UPDATE history.units_task_hist
        SET valid_to = CURRENT_TIMESTAMP
        WHERE unit_task_id = OLD.id AND valid_to IS NULL;
    END IF;

    -- 3. При DELETE — только закрываем историю и выходим
    IF (TG_OP = 'DELETE') THEN
        RETURN OLD;
    END IF;

    -- 4. Создаём новую версию записи (для INSERT и UPDATE)
    INSERT INTO history.units_task_hist (
        id,
        unit_task_id,
        data_set_id,
        unit_id,               unit_short_name,
        parent_id,             parent_short_name,
        assigned_unit_id,      assigned_short_name,
        unit_type_id,          unit_type_name,
        is_involved,
        persistent_location_id, persistent_location_value,
        task_id,               task_value,
        area_id,               area_value,
        is_published,          published_at_utc,
        changed_by,
        operation,
        valid_from,
        valid_to
    )
    VALUES (
        uuidv7(),
        NEW.id,
        NEW.data_set_id,
        NEW.unit_id,
        NEW.unit_short_name,
        NEW.parent_id,
        NEW.parent_short_name,
        NEW.assigned_unit_id,
        NEW.assigned_short_name,
        NEW.unit_type_id,
        NEW.unit_type_name,
        NEW.is_involved,
        NEW.persistent_location_id,
        NEW.persistent_location_value,
        NEW.task_id,
        NEW.task_value,
        NEW.area_id,
        (SELECT value FROM dict.dict_area WHERE id = NEW.area_id),
        NEW.is_published,
        NEW.published_at_utc,
        NEW.changed_by,
        TG_OP,
        CURRENT_TIMESTAMP,
        NULL
    );

    RETURN NEW;
END;
$function$;
");
        }
    }
}
