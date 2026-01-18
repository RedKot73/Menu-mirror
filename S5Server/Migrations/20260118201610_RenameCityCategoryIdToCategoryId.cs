using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class RenameCityCategoryIdToCategoryId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_category_CityCategoryId",
                table: "dict_city_code");

            migrationBuilder.RenameColumn(
                name: "CityCategoryId",
                table: "dict_city_code",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_dict_city_code_CityCategoryId",
                table: "dict_city_code",
                newName: "IX_dict_city_code_CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_category_CategoryId",
                table: "dict_city_code",
                column: "CategoryId",
                principalTable: "dict_city_category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_category_CategoryId",
                table: "dict_city_code");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "dict_city_code",
                newName: "CityCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_dict_city_code_CategoryId",
                table: "dict_city_code",
                newName: "IX_dict_city_code_CityCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_category_CityCategoryId",
                table: "dict_city_code",
                column: "CityCategoryId",
                principalTable: "dict_city_category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
