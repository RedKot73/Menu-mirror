using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUnitTaskUniqueKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_units_task_unit_id_task_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_unit_id_data_set_id",
                schema: "docs",
                table: "units_task",
                columns: new[] { "unit_id", "data_set_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_units_task_unit_id_data_set_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_unit_id_task_id",
                schema: "docs",
                table: "units_task",
                columns: new[] { "unit_id", "task_id" },
                unique: true);
        }
    }
}
