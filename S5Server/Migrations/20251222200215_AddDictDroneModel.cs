using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictDroneModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_drone_model",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    DroneTypeId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_drone_model", x => x.Id);
                    table.ForeignKey(
                        name: "FK_dict_drone_model_dict_drone_type_DroneTypeId",
                        column: x => x.DroneTypeId,
                        principalTable: "dict_drone_type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_dict_drone_model_DroneTypeId",
                table: "dict_drone_model",
                column: "DroneTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_dict_drone_model_Value",
                table: "dict_drone_model",
                column: "Value",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_drone_model");
        }
    }
}
