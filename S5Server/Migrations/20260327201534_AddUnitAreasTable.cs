using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUnitAreasTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "unit_areas",
                schema: "core",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    unit_id = table.Column<Guid>(type: "uuid", nullable: false),
                    area_id = table.Column<Guid>(type: "uuid", nullable: false),
                    changed_by = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    valid_from = table.Column<DateTime>(type: "timestamp with time zone", nullable: false, defaultValueSql: "CURRENT_TIMESTAMP")
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_unit_areas", x => x.id);
                    table.ForeignKey(
                        name: "fk_unit_areas_dict_area_area_id",
                        column: x => x.area_id,
                        principalSchema: "dict",
                        principalTable: "dict_area",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_unit_areas_units_unit_id",
                        column: x => x.unit_id,
                        principalSchema: "core",
                        principalTable: "units",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                },
                comment: "Зв'язок багато-до-багатьох між підрозділами та РВЗ");

            migrationBuilder.CreateIndex(
                name: "ix_unit_areas_area_id",
                schema: "core",
                table: "unit_areas",
                column: "area_id");

            migrationBuilder.CreateIndex(
                name: "ix_unit_areas_unit_id_area_id",
                schema: "core",
                table: "unit_areas",
                columns: new[] { "unit_id", "area_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "unit_areas",
                schema: "core");
        }
    }
}
