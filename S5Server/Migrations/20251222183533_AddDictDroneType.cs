using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictDroneType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_drone_type",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true),
                    ShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_drone_type", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dict_drone_type_Value",
                table: "dict_drone_type",
                column: "Value",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_drone_type");
        }
    }
}
