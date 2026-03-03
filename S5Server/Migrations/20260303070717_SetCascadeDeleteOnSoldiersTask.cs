using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class SetCascadeDeleteOnSoldiersTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_soldiers_task_soldiers_soldier_id",
                schema: "docs",
                table: "soldiers_task");

            migrationBuilder.AddForeignKey(
                name: "fk_soldiers_task_soldiers_soldier_id",
                schema: "docs",
                table: "soldiers_task",
                column: "soldier_id",
                principalSchema: "core",
                principalTable: "soldiers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_soldiers_task_soldiers_soldier_id",
                schema: "docs",
                table: "soldiers_task");

            migrationBuilder.AddForeignKey(
                name: "fk_soldiers_task_soldiers_soldier_id",
                schema: "docs",
                table: "soldiers_task",
                column: "soldier_id",
                principalSchema: "core",
                principalTable: "soldiers",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
