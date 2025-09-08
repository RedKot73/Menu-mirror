using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictSoldierStateAndUnitType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_soldier_state",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_soldier_state", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "dict_unit_type",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    ShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_unit_type", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_soldier_state");

            migrationBuilder.DropTable(
                name: "dict_unit_type");
        }
    }
}
