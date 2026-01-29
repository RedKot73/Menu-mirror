using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameUnitAreaToPersistLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_units_dict_area_AreaId",
                table: "units");

            migrationBuilder.RenameColumn(
                name: "AreaId",
                table: "units",
                newName: "PersistentLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_units_AreaId",
                table: "units",
                newName: "IX_units_PersistentLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_units_dict_area_PersistentLocationId",
                table: "units",
                column: "PersistentLocationId",
                principalTable: "dict_area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_units_dict_area_PersistentLocationId",
                table: "units");

            migrationBuilder.RenameColumn(
                name: "PersistentLocationId",
                table: "units",
                newName: "AreaId");

            migrationBuilder.RenameIndex(
                name: "IX_units_PersistentLocationId",
                table: "units",
                newName: "IX_units_AreaId");

            migrationBuilder.AddForeignKey(
                name: "FK_units_dict_area_AreaId",
                table: "units",
                column: "AreaId",
                principalTable: "dict_area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
