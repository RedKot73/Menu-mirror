using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveDictTemplateCategoryIdShadowProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_unit_task_item_dict_template_category_DictTemplateCategoryId",
                table: "dict_unit_task_item");

            migrationBuilder.DropColumn(
                name: "DictTemplateCategoryId",
                table: "dict_unit_task_item");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "dict_unit_task");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DictTemplateCategoryId",
                table: "dict_unit_task_item",
                type: "TEXT(36)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Value",
                table: "dict_unit_task",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_unit_task_item_dict_template_category_DictTemplateCategoryId",
                table: "dict_unit_task_item",
                column: "DictTemplateCategoryId",
                principalTable: "dict_template_category",
                principalColumn: "Id");
        }
    }
}
