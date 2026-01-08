using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDictUnitTaskAddCaption : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            /*
            migrationBuilder.RenameColumn(
                name: "IsOperational",
                table: "units",
                newName: "IsInvolved");
            */

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "dict_unit_task",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "Caption",
                table: "dict_unit_task",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Caption",
                table: "dict_unit_task");
            /*
            migrationBuilder.RenameColumn(
                name: "IsInvolved",
                table: "units",
                newName: "IsOperational");
            */

            migrationBuilder.AlterColumn<string>(
                name: "Value",
                table: "dict_unit_task",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
