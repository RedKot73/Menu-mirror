using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDictCityCodeWithLevelNavigation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level1",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level2",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level3",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level4",
                table: "dict_city_code");

            migrationBuilder.RenameColumn(
                name: "LevelExt",
                table: "dict_city_code",
                newName: "Level1Id");

            migrationBuilder.AddColumn<string>(
                name: "Level2Id",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Level3Id",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Level4Id",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelExtId",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_Level1Id",
                table: "dict_city_code",
                column: "Level1Id");

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_Level2Id",
                table: "dict_city_code",
                column: "Level2Id");

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_Level3Id",
                table: "dict_city_code",
                column: "Level3Id");

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_Level4Id",
                table: "dict_city_code",
                column: "Level4Id");

            migrationBuilder.CreateIndex(
                name: "IX_dict_city_code_LevelExtId",
                table: "dict_city_code",
                column: "LevelExtId");

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level1Id",
                table: "dict_city_code",
                column: "Level1Id",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level2Id",
                table: "dict_city_code",
                column: "Level2Id",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level3Id",
                table: "dict_city_code",
                column: "Level3Id",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level4Id",
                table: "dict_city_code",
                column: "Level4Id",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_city_code_dict_city_code_LevelExtId",
                table: "dict_city_code",
                column: "LevelExtId",
                principalTable: "dict_city_code",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level1Id",
                table: "dict_city_code");

            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level2Id",
                table: "dict_city_code");

            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level3Id",
                table: "dict_city_code");

            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_Level4Id",
                table: "dict_city_code");

            migrationBuilder.DropForeignKey(
                name: "FK_dict_city_code_dict_city_code_LevelExtId",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_Level1Id",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_Level2Id",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_Level3Id",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_Level4Id",
                table: "dict_city_code");

            migrationBuilder.DropIndex(
                name: "IX_dict_city_code_LevelExtId",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level2Id",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level3Id",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "Level4Id",
                table: "dict_city_code");

            migrationBuilder.DropColumn(
                name: "LevelExtId",
                table: "dict_city_code");

            migrationBuilder.RenameColumn(
                name: "Level1Id",
                table: "dict_city_code",
                newName: "LevelExt");

            migrationBuilder.AddColumn<string>(
                name: "Level1",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Level2",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Level3",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Level4",
                table: "dict_city_code",
                type: "TEXT(20)",
                nullable: false,
                defaultValue: "");
        }
    }
}
