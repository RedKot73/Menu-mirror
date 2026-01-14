using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictUnitTaskItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_unit_task_item",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    TemplateCategoryId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    UnitTaskId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_unit_task_item", x => x.Id);
                    table.ForeignKey(
                        name: "FK_dict_unit_task_item_dict_template_category_TemplateCategoryId",
                        column: x => x.TemplateCategoryId,
                        principalTable: "dict_template_category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_dict_unit_task_item_dict_unit_task_UnitTaskId",
                        column: x => x.UnitTaskId,
                        principalTable: "dict_unit_task",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_item_TemplateCategoryId",
                table: "dict_unit_task_item",
                column: "TemplateCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_item_UnitTaskId_TemplateCategoryId",
                table: "dict_unit_task_item",
                columns: new[] { "UnitTaskId", "TemplateCategoryId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_unit_task_item");
        }
    }
}
