using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddOperationalUnitToSoldier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOperational",
                table: "units",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "OperationalUnitId",
                table: "soldiers",
                type: "TEXT(36)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_OperationalUnitId",
                table: "soldiers",
                column: "OperationalUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_soldiers_units_OperationalUnitId",
                table: "soldiers",
                column: "OperationalUnitId",
                principalTable: "units",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_soldiers_units_OperationalUnitId",
                table: "soldiers");

            migrationBuilder.DropIndex(
                name: "IX_soldiers_OperationalUnitId",
                table: "soldiers");

            migrationBuilder.DropColumn(
                name: "IsOperational",
                table: "units");

            migrationBuilder.DropColumn(
                name: "OperationalUnitId",
                table: "soldiers");
        }
    }
}
