using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCityCodeTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_city_category",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_city_category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "dict_city_code",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Level1 = table.Column<string>(type: "TEXT(20)", nullable: false),
                    Level2 = table.Column<string>(type: "TEXT(20)", nullable: false),
                    Level3 = table.Column<string>(type: "TEXT(20)", nullable: false),
                    Level4 = table.Column<string>(type: "TEXT(20)", nullable: false),
                    LevelExt = table.Column<string>(type: "TEXT(20)", nullable: false),
                    CityCategoryId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_city_code", x => x.Id);
                    table.ForeignKey(
                        name: "FK_dict_city_code_dict_city_category_CityCategoryId",
                        column: x => x.CityCategoryId,
                        principalTable: "dict_city_category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_category_ShortValue",
                table: "dict_city_category",
                column: "ShortValue",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_category_Value",
                table: "dict_city_category",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_CityCategoryId",
                table: "dict_city_code",
                column: "CityCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_city_code");

            migrationBuilder.DropTable(
                name: "dict_city_category");
        }
    }
}
