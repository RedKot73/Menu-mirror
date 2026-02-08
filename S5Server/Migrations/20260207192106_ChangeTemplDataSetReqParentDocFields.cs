using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTemplDataSetReqParentDocFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "AreaId",
                table: "units_task",
                type: "TEXT(36)",
                maxLength: 36,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "ParentDocNumber",
                table: "template_data_sets",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ParentDocDate",
                table: "template_data_sets",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPublished",
                table: "document_templates",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_AreaId",
                table: "units_task",
                column: "AreaId");

            migrationBuilder.AddForeignKey(
                name: "FK_units_task_dict_area_AreaId",
                table: "units_task",
                column: "AreaId",
                principalTable: "dict_area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_units_task_dict_area_AreaId",
                table: "units_task");

            migrationBuilder.DropIndex(
                name: "IX_units_task_AreaId",
                table: "units_task");

            migrationBuilder.AlterColumn<string>(
                name: "AreaId",
                table: "units_task",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT(36)",
                oldMaxLength: 36);

            migrationBuilder.AlterColumn<string>(
                name: "ParentDocNumber",
                table: "template_data_sets",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT(100)",
                oldMaxLength: 100,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "ParentDocDate",
                table: "template_data_sets",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "IsPublished",
                table: "document_templates",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER",
                oldDefaultValue: false);
        }
    }
}
