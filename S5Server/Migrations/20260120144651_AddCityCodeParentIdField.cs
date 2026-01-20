using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCityCodeParentIdField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ParentId",
                table: "dict_city_code",
                type: "TEXT(36)",
                maxLength: 36,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_ParentId",
                table: "dict_city_code",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_ParentId",
                table: "dict_city_code",
                column: "ParentId",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_ParentId",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_ParentId",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "dict_city_code");
        }
    }
}
