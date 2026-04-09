using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UnitTaskAddAdjactedType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.AddColumn<string>(
                name: "adjacted_short_name",
                schema: "history",
                table: "units_task_hist",
                type: "citext",
                maxLength: 100,
                nullable: true,
                comment: "Суміжний підрозділ (для координації завдань)");

            migrationBuilder.AddColumn<Guid>(
                name: "adjacted_type_id",
                schema: "history",
                table: "units_task_hist",
                type: "uuid",
                nullable: true,
                comment: "Тип суміжного підрозділу");

            migrationBuilder.AddColumn<Guid>(
                name: "adjacted_unit_id",
                schema: "history",
                table: "units_task_hist",
                type: "uuid",
                nullable: true,
                comment: "Суміжний підрозділ (для координації завдань)");

            migrationBuilder.AlterColumn<string>(
                name: "parent_short_name",
                schema: "docs",
                table: "units_task",
                type: "citext",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "citext",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<Guid>(
                name: "adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                type: "uuid",
                nullable: true,
                comment: "Суміжний підрозділ (для координації завдань)",
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "adjacted_short_name",
                schema: "docs",
                table: "units_task",
                type: "citext",
                maxLength: 100,
                nullable: true,
                comment: "Суміжний підрозділ (для координації завдань)",
                oldClrType: typeof(string),
                oldType: "character varying(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "adjacted_type_id",
                schema: "docs",
                table: "units_task",
                type: "uuid",
                nullable: true,
                comment: "Тип суміжного підрозділу");

            migrationBuilder.CreateIndex(
                name: "ix_units_task_adjacted_type_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_type_id");

            migrationBuilder.AddForeignKey(
                name: "fk_units_task_dict_unit_type_adjacted_type_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_type_id",
                principalSchema: "dict",
                principalTable: "dict_unit_type",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_unit_id",
                principalSchema: "core",
                principalTable: "units",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_units_task_dict_unit_type_adjacted_type_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropIndex(
                name: "ix_units_task_adjacted_type_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.DropColumn(
                name: "adjacted_short_name",
                schema: "history",
                table: "units_task_hist");

            migrationBuilder.DropColumn(
                name: "adjacted_type_id",
                schema: "history",
                table: "units_task_hist");

            migrationBuilder.DropColumn(
                name: "adjacted_unit_id",
                schema: "history",
                table: "units_task_hist");

            migrationBuilder.DropColumn(
                name: "adjacted_type_id",
                schema: "docs",
                table: "units_task");

            migrationBuilder.AlterColumn<string>(
                name: "parent_short_name",
                schema: "docs",
                table: "units_task",
                type: "citext",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "citext",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true,
                oldComment: "Суміжний підрозділ (для координації завдань)");

            migrationBuilder.AlterColumn<string>(
                name: "adjacted_short_name",
                schema: "docs",
                table: "units_task",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "citext",
                oldMaxLength: 100,
                oldNullable: true,
                oldComment: "Суміжний підрозділ (для координації завдань)");

            migrationBuilder.AddForeignKey(
                name: "fk_units_task_units_adjacted_unit_id",
                schema: "docs",
                table: "units_task",
                column: "adjacted_unit_id",
                principalSchema: "core",
                principalTable: "units",
                principalColumn: "id");
        }
    }
}
