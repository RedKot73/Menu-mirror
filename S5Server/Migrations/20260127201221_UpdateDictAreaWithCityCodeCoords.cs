using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDictAreaWithCityCodeCoords : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CityCodeId",
                table: "dict_area",
                type: "TEXT(36)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Coords",
                table: "dict_area",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_area_CityCodeId",
                table: "dict_area",
                column: "CityCodeId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_area_dict_city_code_CityCodeId",
                table: "dict_area",
                column: "CityCodeId",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_area_dict_city_code_CityCodeId",
                table: "dict_area");

            migrationBuilder.DropIndex(
                name: "IX_dict_area_CityCodeId",
                table: "dict_area");

            migrationBuilder.DropColumn(
                name: "CityCodeId",
                table: "dict_area");

            migrationBuilder.DropColumn(
                name: "Coords",
                table: "dict_area");
        }
    }
}
