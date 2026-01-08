using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDictUnitTaskSetCaptionUnique : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_dict_unit_task_Value",
                table: "dict_unit_task");

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_Caption",
                table: "dict_unit_task",
                column: "Caption",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_dict_unit_task_Caption",
                table: "dict_unit_task");

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_Value",
                table: "dict_unit_task",
                column: "Value",
                unique: true);
        }
    }
}
