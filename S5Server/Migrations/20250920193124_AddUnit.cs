using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUnit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "units",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    Name = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    MilitaryNumber = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    ForceTypeId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    UnitTypeId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    Comment = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_units", x => x.Id);
                    table.ForeignKey(
                        name: "FK_units_dict_forces_type_ForceTypeId",
                        column: x => x.ForceTypeId,
                        principalTable: "dict_forces_type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_dict_unit_type_UnitTypeId",
                        column: x => x.UnitTypeId,
                        principalTable: "dict_unit_type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_units_AssignedUnitId",
                        column: x => x.AssignedUnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_units_units_ParentId",
                        column: x => x.ParentId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_units_AssignedUnitId",
                table: "units",
                column: "AssignedUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_units_ForceTypeId",
                table: "units",
                column: "ForceTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_units_ParentId",
                table: "units",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_units_UnitTypeId",
                table: "units",
                column: "UnitTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "units");
        }
    }
}
