using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddAreaType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AtPermanentPoint",
                table: "dict_unit_task");

            migrationBuilder.RenameColumn(
                name: "Caption",
                table: "dict_unit_task",
                newName: "Value");

            migrationBuilder.RenameIndex(
                name: "IX_dict_unit_task_Caption",
                table: "dict_unit_task",
                newName: "IX_dict_unit_task_Value");

            migrationBuilder.AlterColumn<string>(
                name: "ShortValue",
                table: "dict_template_category",
                type: "TEXT(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 50);

            // 1. Сначала создаём таблицу dict_area_type
            migrationBuilder.CreateTable(
                name: "dict_area_type",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true),
                    ShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_area_type", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dict_area_type_Value",
                table: "dict_area_type",
                column: "Value",
                unique: true);

            // 2. Вставляем дефолтную запись
            var defaultAreaTypeId = Guid.NewGuid().ToString();
            migrationBuilder.InsertData(
                table: "dict_area_type",
                columns: new[] { "Id", "Value", "ShortValue", "Comment" },
                values: new object[] { defaultAreaTypeId, "Не указано", "Не указ.", "Тип территории по умолчанию" });

            // 3. Теперь добавляем колонки с валидным defaultValue
            migrationBuilder.AddColumn<string>(
                name: "AreaTypeId",
                table: "dict_unit_task",
                type: "TEXT(36)",
                nullable: false,
                defaultValue: defaultAreaTypeId);

            migrationBuilder.AddColumn<string>(
                name: "AreaTypeId",
                table: "dict_area",
                type: "TEXT(36)",
                nullable: false,
                defaultValue: defaultAreaTypeId);

            // 4. Создаём индексы и FK
            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_AreaTypeId",
                table: "dict_unit_task",
                column: "AreaTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_dict_area_AreaTypeId",
                table: "dict_area",
                column: "AreaTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_area_dict_area_type_AreaTypeId",
                table: "dict_area",
                column: "AreaTypeId",
                principalTable: "dict_area_type",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_unit_task_dict_area_type_AreaTypeId",
                table: "dict_unit_task",
                column: "AreaTypeId",
                principalTable: "dict_area_type",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_area_dict_area_type_AreaTypeId",
                table: "dict_area");

            migrationBuilder.DropForeignKey(
                name: "FK_dict_unit_task_dict_area_type_AreaTypeId",
                table: "dict_unit_task");

            migrationBuilder.DropTable(
                name: "dict_area_type");

            migrationBuilder.DropIndex(
                name: "IX_dict_unit_task_AreaTypeId",
                table: "dict_unit_task");

            migrationBuilder.DropIndex(
                name: "IX_dict_area_AreaTypeId",
                table: "dict_area");

            migrationBuilder.DropColumn(
                name: "AreaTypeId",
                table: "dict_unit_task");

            migrationBuilder.DropColumn(
                name: "AreaTypeId",
                table: "dict_area");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "dict_unit_task",
                newName: "Caption");

            migrationBuilder.RenameIndex(
                name: "IX_dict_unit_task_Value",
                table: "dict_unit_task",
                newName: "IX_dict_unit_task_Caption");

            migrationBuilder.AddColumn<bool>(
                name: "AtPermanentPoint",
                table: "dict_unit_task",
                type: "INTEGER",
                nullable: false,
                defaultValue: true);

            migrationBuilder.AlterColumn<string>(
                name: "ShortValue",
                table: "dict_template_category",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT(50)",
                oldMaxLength: 50);
        }
    }
}
