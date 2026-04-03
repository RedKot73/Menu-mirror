using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UnitTaskAddAdjactedUnit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "adjacted_short_name",
                schema: "docs",
                table: "units_task",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_units_task_adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_unit_id");

            migrationBuilder.AddForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_unit_id",
                principalSchema: "core",
                principalTable: "units",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropIndex(
                name: "ix_units_task_adjacted_unit_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropColumn(
                name: "adjacted_short_name",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropColumn(
                name: "adjacted_unit_id",
                schema: "docs",
                table: "units_task");
        }
    }
}
