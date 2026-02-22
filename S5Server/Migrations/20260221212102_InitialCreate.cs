using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dict");

            migrationBuilder.EnsureSchema(
                name: "docs");

            migrationBuilder.EnsureSchema(
                name: "identity");

            migrationBuilder.EnsureSchema(
                name: "core");

            migrationBuilder.EnsureSchema(
                name: "history");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:citext", ",,");

            migrationBuilder.CreateTable(
                name: "dict_area_type",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_area_type", x => x.id);
                },
                comment: "Тип Напрямку ЛБЗ: ППД,РВЗ,ТПУ,ПУ,РВБД,БРО");

            migrationBuilder.CreateTable(
                name: "dict_city_category",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    code_id = table.Column<string>(type: "varchar(1)", maxLength: 1, nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_city_category", x => x.id);
                },
                comment: "Категорія об’єкта: «М» – міста,«С» – села...");

            migrationBuilder.CreateTable(
                name: "dict_drone_type",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_drone_type", x => x.id);
                },
                comment: "Типи БПЛА");

            migrationBuilder.CreateTable(
                name: "dict_forces_type",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_forces_type", x => x.id);
                },
                comment: "Вид збройних сил Сухопутні, ДШВ, ВМС...");

            migrationBuilder.CreateTable(
                name: "dict_position",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_position", x => x.id);
                },
                comment: "Посади");

            migrationBuilder.CreateTable(
                name: "dict_rank",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    nato_code = table.Column<string>(type: "text", nullable: true),
                    category = table.Column<string>(type: "text", nullable: true),
                    sub_category = table.Column<string>(type: "text", nullable: true),
                    order_val = table.Column<int>(type: "integer", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_rank", x => x.id);
                },
                comment: "Довідник Військове звання");

            migrationBuilder.CreateTable(
                name: "dict_soldier_state",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_soldier_state", x => x.id);
                },
                comment: "Статус бійця норм/поранено/в полоні/СЗЧ...");

            migrationBuilder.CreateTable(
                name: "dict_template_category",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_template_category", x => x.id);
                },
                comment: "Категория шаблона документа(БР / БД / и т.д.");

            migrationBuilder.CreateTable(
                name: "dict_unit_type",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_unit_type", x => x.id);
                },
                comment: "Тип підрозділу Бригада, Полк, Батальйон, Рота");

            migrationBuilder.CreateTable(
                name: "roles",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true, comment: "Назва ролі (наприклад: Admin, Commander)"),
                    normalized_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true, comment: "Нормалізована назва ролі для пошуку (UPPERCASE)"),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true, comment: "Мітка конкурентності для оптимістичного блокування")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_roles", x => x.id);
                },
                comment: "Ролі користувачів системи (Admin, Commander, Operator, Viewer)");

            migrationBuilder.CreateTable(
                name: "soldiers_hist",
                schema: "history",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    soldier_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Ссылка на оригинального бойца"),
                    extern_id = table.Column<int>(type: "integer", nullable: true, comment: "Внешний ID (из Импульса, Армия+ и т.д.)"),
                    first_name = table.Column<string>(type: "citext", maxLength: 50, nullable: false),
                    midle_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    last_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    birth_date = table.Column<DateOnly>(type: "date", nullable: true),
                    nick_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true, comment: "Позивний"),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Штатний підрозділ"),
                    unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false, comment: "Штатний підрозділ"),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Приданий до підрозділу"),
                    assigned_unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "Приданий до підрозділу"),
                    involved_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Позаштатний підрозділ - Екіпаж/Група"),
                    involved_unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "Позаштатний підрозділ - Екіпаж/Група"),
                    rank_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Звання"),
                    rank_short_value = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, comment: "Звання"),
                    position_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Посада"),
                    position_value = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, comment: "Посада"),
                    state_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Статус: Звичайний, 200,300,500,Поранено,СЗЧ..."),
                    state_value = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, comment: "Статус: Звичайний, 200,300,500,Поранено,СЗЧ..."),
                    comment = table.Column<string>(type: "varchar(250)", nullable: true),
                    arrived_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Прибув до підрозділу Дата"),
                    departed_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Вибув з підрозділу Дата"),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    operation = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    valid_to = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_soldiers_hist", x => x.id);
                },
                comment: "Особовий склад - історія");

            migrationBuilder.CreateTable(
                name: "template_data_sets",
                schema: "docs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    is_parent_doc_used = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Чи існує документ старшого начальника"),
                    parent_doc_number = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    parent_doc_date = table.Column<DateOnly>(type: "date", nullable: true),
                    name = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    doc_number = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    doc_date = table.Column<DateOnly>(type: "date", nullable: false),
                    is_published = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Чернетка/Опубліковано"),
                    published_at_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    published_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    created_at_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_template_data_sets", x => x.id);
                },
                comment: "Сохранённый набор данных для подстановки в шаблон документа (БР/БД)");

            migrationBuilder.CreateTable(
                name: "units_hist",
                schema: "history",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    parent_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true),
                    assigned_unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true),
                    name = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    military_number = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    force_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    force_type_short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    unit_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    unit_type_short_value = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    order_val = table.Column<int>(type: "integer", nullable: false),
                    is_involved = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    persistent_location_id = table.Column<Guid>(type: "uuid", nullable: true),
                    persistent_location_value = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    comment = table.Column<string>(type: "varchar(250)", nullable: true),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    operation = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    valid_to = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_units_hist", x => x.id);
                },
                comment: "Підрозділи - історія");

            migrationBuilder.CreateTable(
                name: "dict_unit_task",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true),
                    amount = table.Column<decimal>(type: "money", nullable: false),
                    with_means = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false),
                    area_type_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_unit_task", x => x.id);
                    table.ForeignKey(
                        name: "fk_dict_unit_task_dict_area_type_area_type_id",
                        column: x => x.area_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_area_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Завдання підрозділу для використання в документах БР/БД");

            migrationBuilder.CreateTable(
                name: "dict_city_code",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(20)", nullable: false),
                    parent_id = table.Column<string>(type: "varchar(20)", nullable: true, comment: "Адм. одиниця вищого рівня"),
                    level1id = table.Column<string>(type: "varchar(20)", nullable: false, comment: "Автономна Республіка Крим, області, міста, що мають спеціальний статус"),
                    level2id = table.Column<string>(type: "varchar(20)", nullable: true, comment: "райони в областях та Автономній Республіці Крим"),
                    level3id = table.Column<string>(type: "varchar(20)", nullable: true, comment: "території територіальних громад в областях"),
                    level4id = table.Column<string>(type: "varchar(20)", nullable: true, comment: "міста, селища міського типу, села, селища (населені пункти)"),
                    level_ext_id = table.Column<string>(type: "varchar(20)", nullable: true, comment: "райони в містах (в тому числі, в містах, що мають спеціальний статус)"),
                    category_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Категорія об’єкта: «Р»–райони в областях,«Н»–території територіальних громад...)"),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_city_code", x => x.id);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_category_category_id",
                        column: x => x.category_id,
                        principalSchema: "dict",
                        principalTable: "dict_city_category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_level1id",
                        column: x => x.level1id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_level2id",
                        column: x => x.level2id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_level3id",
                        column: x => x.level3id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_level4id",
                        column: x => x.level4id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_level_ext_id",
                        column: x => x.level_ext_id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_city_code_dict_city_code_parent_id",
                        column: x => x.parent_id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Запис Кодифікатору адміністративно-територіальних одиниць та територій територіальних громад");

            migrationBuilder.CreateTable(
                name: "dict_drone_model",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    drone_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_drone_model", x => x.id);
                    table.ForeignKey(
                        name: "fk_dict_drone_model_dict_drone_type_drone_type_id",
                        column: x => x.drone_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_drone_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Модель БПЛА");

            migrationBuilder.CreateTable(
                name: "document_templates",
                schema: "docs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "varchar(150)", maxLength: 150, nullable: false),
                    description = table.Column<string>(type: "varchar(300)", maxLength: 300, nullable: true),
                    content = table.Column<string>(type: "text", nullable: false),
                    template_category_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Категория шаблона документа БР/БД..."),
                    is_published = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Чернетка/Опубліковано"),
                    published_at_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    published_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    created_at_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_document_templates", x => x.id);
                    table.ForeignKey(
                        name: "fk_document_templates_dict_template_categories_template_catego",
                        column: x => x.template_category_id,
                        principalSchema: "dict",
                        principalTable: "dict_template_category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Шаблон документа HTML-format з якорями HandleBars");

            migrationBuilder.CreateTable(
                name: "role_claims",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<Guid>(type: "uuid", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_role_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_role_claims_roles_role_id",
                        column: x => x.role_id,
                        principalSchema: "identity",
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Додаткові дозволи та атрибути ролей. Всі користувачі з роллю автоматично отримують ці claims для перевірки прав доступу");

            migrationBuilder.CreateTable(
                name: "dict_unit_task_item",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    template_category_id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_task_id = table.Column<Guid>(type: "uuid", nullable: false),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_unit_task_item", x => x.id);
                    table.ForeignKey(
                        name: "fk_dict_unit_task_item_dict_template_categories_template_categ",
                        column: x => x.template_category_id,
                        principalSchema: "dict",
                        principalTable: "dict_template_category",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_unit_task_item_dict_unit_task_unit_task_id",
                        column: x => x.unit_task_id,
                        principalSchema: "dict",
                        principalTable: "dict_unit_task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Опис Завдання прив'язаний до Категорії шаблона документа");

            migrationBuilder.CreateTable(
                name: "dict_area",
                schema: "dict",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    area_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    city_code_id = table.Column<string>(type: "varchar(20)", nullable: true),
                    coords = table.Column<string>(type: "varchar(300)", nullable: true),
                    value = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    comment = table.Column<string>(type: "varchar(250)", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_dict_area", x => x.id);
                    table.ForeignKey(
                        name: "fk_dict_area_dict_area_type_area_type_id",
                        column: x => x.area_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_area_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_dict_area_dict_city_code_city_code_id",
                        column: x => x.city_code_id,
                        principalSchema: "dict",
                        principalTable: "dict_city_code",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                },
                comment: "Район виконання завдань (РВЗ)");

            migrationBuilder.CreateTable(
                name: "units",
                schema: "core",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Основний підрозділ"),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Приданий до підрозділу"),
                    name = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    military_number = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    force_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    unit_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    order_val = table.Column<int>(type: "integer", nullable: false),
                    is_involved = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "True - Позаштатний/Оперативний/Тимчасовий підрозділ"),
                    persistent_location_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "ППД (Постійне приміщення дислокації)"),
                    comment = table.Column<string>(type: "varchar(250)", nullable: true),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_units", x => x.id);
                    table.ForeignKey(
                        name: "fk_units_dict_area_persistent_location_id",
                        column: x => x.persistent_location_id,
                        principalSchema: "dict",
                        principalTable: "dict_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_dict_forces_type_force_type_id",
                        column: x => x.force_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_forces_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_dict_unit_type_unit_type_id",
                        column: x => x.unit_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_unit_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_units_assigned_unit_id",
                        column: x => x.assigned_unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_units_units_parent_id",
                        column: x => x.parent_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                },
                comment: "Підрозділи");

            migrationBuilder.CreateTable(
                name: "soldiers",
                schema: "core",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    extern_id = table.Column<int>(type: "integer", nullable: true, comment: "Id з Імпульса, Армія- ..."),
                    first_name = table.Column<string>(type: "citext", maxLength: 50, nullable: false),
                    midle_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    last_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    birth_date = table.Column<DateOnly>(type: "date", nullable: true),
                    nick_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Штатний підрозділ"),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Приданий до підрозділу"),
                    involved_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Позаштатний підрозділ - Екіпаж/Група"),
                    rank_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Звання"),
                    position_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Посада"),
                    state_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Статус: Звичайний, 200,300,500,Поранено,СЗЧ..."),
                    comment = table.Column<string>(type: "varchar(250)", nullable: true),
                    arrived_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Прибув"),
                    departed_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Вибув"),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_soldiers", x => x.id);
                    table.ForeignKey(
                        name: "fk_soldiers_dict_positions_position_id",
                        column: x => x.position_id,
                        principalSchema: "dict",
                        principalTable: "dict_position",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_soldiers_dict_rank_rank_id",
                        column: x => x.rank_id,
                        principalSchema: "dict",
                        principalTable: "dict_rank",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_soldiers_dict_soldier_state_state_id",
                        column: x => x.state_id,
                        principalSchema: "dict",
                        principalTable: "dict_soldier_state",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_soldiers_units_assigned_unit_id",
                        column: x => x.assigned_unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_soldiers_units_involved_unit_id",
                        column: x => x.involved_unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_soldiers_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Особовий склад");

            migrationBuilder.CreateTable(
                name: "units_task",
                schema: "docs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    data_set_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Сохранённый набор данных для подстановки в шаблон документа (БР/БД)"),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Штатний підрозділ"),
                    unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false, comment: "Штатний підрозділ"),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    parent_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Приданий до підрозділу"),
                    assigned_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "Приданий до підрозділу"),
                    unit_type_id = table.Column<Guid>(type: "uuid", nullable: true),
                    unit_type_name = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true),
                    is_involved = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "True - Позаштатний/Оперативний/Тимчасовий підрозділ"),
                    persistent_location_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "ППД (Постійне приміщення дислокації)"),
                    persistent_location_value = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "ППД (Постійне приміщення дислокації)"),
                    task_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Завдання підрозділу для використання в документах БР/БД"),
                    task_value = table.Column<string>(type: "citext", maxLength: 100, nullable: false, comment: "Завдання підрозділу для використання в документах БР/БД"),
                    area_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "РВЗ (Район виконання завдань)"),
                    is_published = table.Column<bool>(type: "boolean", nullable: false, defaultValue: false, comment: "Чернетка/Опубліковано"),
                    published_at_utc = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_units_task", x => x.id);
                    table.ForeignKey(
                        name: "fk_units_task_dict_area_area_id",
                        column: x => x.area_id,
                        principalSchema: "dict",
                        principalTable: "dict_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_task_dict_area_persistent_location_id",
                        column: x => x.persistent_location_id,
                        principalSchema: "dict",
                        principalTable: "dict_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_task_dict_unit_task_task_id",
                        column: x => x.task_id,
                        principalSchema: "dict",
                        principalTable: "dict_unit_task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_task_dict_unit_type_unit_type_id",
                        column: x => x.unit_type_id,
                        principalSchema: "dict",
                        principalTable: "dict_unit_type",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_task_template_data_sets_data_set_id",
                        column: x => x.data_set_id,
                        principalSchema: "docs",
                        principalTable: "template_data_sets",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_units_task_units_assigned_unit_id",
                        column: x => x.assigned_unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_units_task_units_parent_id",
                        column: x => x.parent_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_units_task_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Снимок состояния подразделения на момент назначения задачи");

            migrationBuilder.CreateTable(
                name: "users",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    soldier_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Посилання на відповідного бійця"),
                    last_login_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: true, comment: "Дата/Час останнього успішного входу користувача"),
                    registration_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP", comment: "Дата/Час коли користувача створено"),
                    user_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: true),
                    security_stamp = table.Column<string>(type: "text", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true, comment: "Дата/Час до якого користувач блокований"),
                    lockout_enabled = table.Column<bool>(type: "boolean", nullable: false, comment: "Блокування користувача дозволено"),
                    access_failed_count = table.Column<int>(type: "integer", nullable: false, comment: "Кількість невдалих спроб входу користувача")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_users", x => x.id);
                    table.ForeignKey(
                        name: "aspnetusers_soldiers_fk",
                        column: x => x.soldier_id,
                        principalSchema: "core",
                        principalTable: "soldiers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                },
                comment: "Користувачі системи");

            migrationBuilder.CreateTable(
                name: "drone_model_task",
                schema: "docs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_task_id = table.Column<Guid>(type: "uuid", nullable: false),
                    drone_model_id = table.Column<Guid>(type: "uuid", nullable: false),
                    quantity = table.Column<int>(type: "integer", nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_drone_model_task", x => x.id);
                    table.ForeignKey(
                        name: "fk_drone_model_task_dict_drone_model_drone_model_id",
                        column: x => x.drone_model_id,
                        principalSchema: "dict",
                        principalTable: "dict_drone_model",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_drone_model_task_units_task_unit_task_id",
                        column: x => x.unit_task_id,
                        principalSchema: "docs",
                        principalTable: "units_task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Модель БПЛА (для завдань підрозділів)");

            migrationBuilder.CreateTable(
                name: "soldiers_task",
                schema: "docs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_task_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Ссылка на UnitTask (задание подразделения)"),
                    soldier_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Ссылка на оригинального бойца"),
                    extern_id = table.Column<int>(type: "integer", nullable: true, comment: "Внешний ID (из Импульса, Армия+ и т.д.)"),
                    first_name = table.Column<string>(type: "citext", maxLength: 50, nullable: false),
                    midle_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    last_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true),
                    nick_name = table.Column<string>(type: "citext", maxLength: 50, nullable: true, comment: "Позивний"),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Штатний підрозділ"),
                    unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: false, comment: "Штатний підрозділ"),
                    assigned_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Приданий до підрозділу"),
                    assigned_unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "Приданий до підрозділу"),
                    involved_unit_id = table.Column<Guid>(type: "uuid", nullable: true, comment: "Позаштатний підрозділ - Екіпаж/Група"),
                    involved_unit_short_name = table.Column<string>(type: "citext", maxLength: 100, nullable: true, comment: "Позаштатний підрозділ - Екіпаж/Група"),
                    rank_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Звання"),
                    rank_short_value = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, comment: "Звання"),
                    position_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Посада"),
                    position_value = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, comment: "Посада"),
                    state_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Статус: Звичайний, 200,300,500,Поранено,СЗЧ..."),
                    state_value = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, comment: "Статус: Звичайний, 200,300,500,Поранено,СЗЧ..."),
                    comment = table.Column<string>(type: "varchar(250)", nullable: true),
                    arrived_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Прибув до підрозділу Дата"),
                    departed_at = table.Column<DateOnly>(type: "date", nullable: true, comment: "Вибув з підрозділу Дата"),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_soldiers_task", x => x.id);
                    table.ForeignKey(
                        name: "fk_soldiers_task_soldiers_soldier_id",
                        column: x => x.soldier_id,
                        principalSchema: "core",
                        principalTable: "soldiers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_soldiers_task_units_task_unit_task_id",
                        column: x => x.unit_task_id,
                        principalSchema: "docs",
                        principalTable: "units_task",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Снимок состояния бойца на момент назначения задачи подразделению");

            migrationBuilder.CreateTable(
                name: "user_claims",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_user_claims_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "identity",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Представляє твердження, яке має користувач");

            migrationBuilder.CreateTable(
                name: "user_logins",
                schema: "identity",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "varchar(128)", nullable: false, comment: "Назва зовнішнього провайдера Facebook/Microsoft/Google"),
                    provider_key = table.Column<string>(type: "varchar(128)", nullable: false, comment: "Google повертає ProviderKey(наприклад 105742856...)"),
                    provider_display_name = table.Column<string>(type: "text", nullable: true, comment: "Назва провайдера для інтерфейсу"),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false, comment: "Посилання на відповідного користувача")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_logins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "fk_user_logins_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "identity",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Для входу через зовнішні сервіси типу Facebook/Microsoft/Google");

            migrationBuilder.CreateTable(
                name: "user_roles",
                schema: "identity",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    role_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_roles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_user_roles_roles_role_id",
                        column: x => x.role_id,
                        principalSchema: "identity",
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_user_roles_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "identity",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Link between a user and a role");

            migrationBuilder.CreateTable(
                name: "user_tokens",
                schema: "identity",
                columns: table => new
                {
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    login_provider = table.Column<string>(type: "varchar(128)", nullable: false, comment: "Провайдер: [AspNetUserStore] для внутрішніх, Google/Facebook для зовнішніх"),
                    name = table.Column<string>(type: "varchar(128)", nullable: false, comment: "Тип токену: AuthenticatorKey, RecoveryCodes, refresh_token"),
                    value = table.Column<string>(type: "text", nullable: true, comment: "Значення токену (зашифроване)")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_user_tokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "fk_user_tokens_users_user_id",
                        column: x => x.user_id,
                        principalSchema: "identity",
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Токени для 2FA, reset password, email confirmation та зовнішніх провайдерів");

            migrationBuilder.CreateIndex(
                name: "ix_dict_area_area_type_id",
                schema: "dict",
                table: "dict_area",
                column: "area_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_area_city_code_id",
                schema: "dict",
                table: "dict_area",
                column: "city_code_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_area_value",
                schema: "dict",
                table: "dict_area",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_area_type_value",
                schema: "dict",
                table: "dict_area_type",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_category_short_value",
                schema: "dict",
                table: "dict_city_category",
                column: "short_value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_category_value",
                schema: "dict",
                table: "dict_city_category",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_category_id",
                schema: "dict",
                table: "dict_city_code",
                column: "category_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_level_ext_id",
                schema: "dict",
                table: "dict_city_code",
                column: "level_ext_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_level1id",
                schema: "dict",
                table: "dict_city_code",
                column: "level1id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_level2id",
                schema: "dict",
                table: "dict_city_code",
                column: "level2id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_level3id",
                schema: "dict",
                table: "dict_city_code",
                column: "level3id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_level4id",
                schema: "dict",
                table: "dict_city_code",
                column: "level4id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_city_code_parent_id",
                schema: "dict",
                table: "dict_city_code",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_drone_model_drone_type_id",
                schema: "dict",
                table: "dict_drone_model",
                column: "drone_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_drone_model_value",
                schema: "dict",
                table: "dict_drone_model",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_drone_type_value",
                schema: "dict",
                table: "dict_drone_type",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_forces_type_value",
                schema: "dict",
                table: "dict_forces_type",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_position_value",
                schema: "dict",
                table: "dict_position",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_rank_value",
                schema: "dict",
                table: "dict_rank",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_soldier_state_value",
                schema: "dict",
                table: "dict_soldier_state",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_template_category_value",
                schema: "dict",
                table: "dict_template_category",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_unit_task_area_type_id",
                schema: "dict",
                table: "dict_unit_task",
                column: "area_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_unit_task_value",
                schema: "dict",
                table: "dict_unit_task",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_dict_unit_task_item_template_category_id",
                schema: "dict",
                table: "dict_unit_task_item",
                column: "template_category_id");

            migrationBuilder.CreateIndex(
                name: "ix_dict_unit_task_item_unit_task_id_template_category_id",
                schema: "dict",
                table: "dict_unit_task_item",
                columns: new[] { "unit_task_id", "template_category_id" });

            migrationBuilder.CreateIndex(
                name: "ix_dict_unit_type_value",
                schema: "dict",
                table: "dict_unit_type",
                column: "value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_document_templates_template_category_id",
                schema: "docs",
                table: "document_templates",
                column: "template_category_id");

            migrationBuilder.CreateIndex(
                name: "ix_drone_model_task_drone_model_id",
                schema: "docs",
                table: "drone_model_task",
                column: "drone_model_id");

            migrationBuilder.CreateIndex(
                name: "ix_drone_model_task_unit_task_id",
                schema: "docs",
                table: "drone_model_task",
                column: "unit_task_id");

            migrationBuilder.CreateIndex(
                name: "ix_drone_model_task_unit_task_id_drone_model_id",
                schema: "docs",
                table: "drone_model_task",
                columns: new[] { "unit_task_id", "drone_model_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_role_claims_role_id",
                schema: "identity",
                table: "role_claims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                schema: "identity",
                table: "roles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_assigned_unit_id",
                schema: "core",
                table: "soldiers",
                column: "assigned_unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_involved_unit_id",
                schema: "core",
                table: "soldiers",
                column: "involved_unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_position_id",
                schema: "core",
                table: "soldiers",
                column: "position_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_rank_id",
                schema: "core",
                table: "soldiers",
                column: "rank_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_state_id",
                schema: "core",
                table: "soldiers",
                column: "state_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_unit_id",
                schema: "core",
                table: "soldiers",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_hist_soldier_id",
                schema: "history",
                table: "soldiers_hist",
                column: "soldier_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_hist_soldier_id_valid_from",
                schema: "history",
                table: "soldiers_hist",
                columns: new[] { "soldier_id", "valid_from" });

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_hist_unit_id",
                schema: "history",
                table: "soldiers_hist",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_task_soldier_id",
                schema: "docs",
                table: "soldiers_task",
                column: "soldier_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_task_unit_task_id",
                schema: "docs",
                table: "soldiers_task",
                column: "unit_task_id");

            migrationBuilder.CreateIndex(
                name: "ix_soldiers_task_unit_task_id_soldier_id",
                schema: "docs",
                table: "soldiers_task",
                columns: new[] { "unit_task_id", "soldier_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_template_data_sets_doc_date_doc_number",
                schema: "docs",
                table: "template_data_sets",
                columns: new[] { "doc_date", "doc_number" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_template_data_sets_doc_number",
                schema: "docs",
                table: "template_data_sets",
                column: "doc_number");

            migrationBuilder.CreateIndex(
                name: "ix_units_assigned_unit_id",
                schema: "core",
                table: "units",
                column: "assigned_unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_force_type_id",
                schema: "core",
                table: "units",
                column: "force_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_parent_id",
                schema: "core",
                table: "units",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_persistent_location_id",
                schema: "core",
                table: "units",
                column: "persistent_location_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_unit_type_id",
                schema: "core",
                table: "units",
                column: "unit_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_hist_operation",
                schema: "history",
                table: "units_hist",
                column: "operation");

            migrationBuilder.CreateIndex(
                name: "ix_units_hist_unit_id",
                schema: "history",
                table: "units_hist",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_hist_unit_id_valid_from",
                schema: "history",
                table: "units_hist",
                columns: new[] { "unit_id", "valid_from" });

            migrationBuilder.CreateIndex(
                name: "ix_units_task_area_id",
                schema: "docs",
                table: "units_task",
                column: "area_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_assigned_unit_id",
                schema: "docs",
                table: "units_task",
                column: "assigned_unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_data_set_id",
                schema: "docs",
                table: "units_task",
                column: "data_set_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_parent_id",
                schema: "docs",
                table: "units_task",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_persistent_location_id",
                schema: "docs",
                table: "units_task",
                column: "persistent_location_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_task_id",
                schema: "docs",
                table: "units_task",
                column: "task_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_unit_id",
                schema: "docs",
                table: "units_task",
                column: "unit_id");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_unit_id_task_id",
                schema: "docs",
                table: "units_task",
                columns: new[] { "unit_id", "task_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_units_task_unit_type_id",
                schema: "docs",
                table: "units_task",
                column: "unit_type_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_claims_user_id",
                schema: "identity",
                table: "user_claims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_logins_user_id",
                schema: "identity",
                table: "user_logins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_user_roles_role_id",
                schema: "identity",
                table: "user_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "aspnetusers_un_soldier_id",
                schema: "identity",
                table: "users",
                column: "soldier_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                schema: "identity",
                table: "users",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                schema: "identity",
                table: "users",
                column: "normalized_user_name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_unit_task_item",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "document_templates",
                schema: "docs");

            migrationBuilder.DropTable(
                name: "drone_model_task",
                schema: "docs");

            migrationBuilder.DropTable(
                name: "role_claims",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "soldiers_hist",
                schema: "history");

            migrationBuilder.DropTable(
                name: "soldiers_task",
                schema: "docs");

            migrationBuilder.DropTable(
                name: "units_hist",
                schema: "history");

            migrationBuilder.DropTable(
                name: "user_claims",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "user_logins",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "user_roles",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "user_tokens",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "dict_template_category",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_drone_model",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "units_task",
                schema: "docs");

            migrationBuilder.DropTable(
                name: "roles",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "users",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "dict_drone_type",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_unit_task",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "template_data_sets",
                schema: "docs");

            migrationBuilder.DropTable(
                name: "soldiers",
                schema: "core");

            migrationBuilder.DropTable(
                name: "dict_position",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_rank",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_soldier_state",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "units",
                schema: "core");

            migrationBuilder.DropTable(
                name: "dict_area",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_forces_type",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_unit_type",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_area_type",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_city_code",
                schema: "dict");

            migrationBuilder.DropTable(
                name: "dict_city_category",
                schema: "dict");
        }
    }
}
