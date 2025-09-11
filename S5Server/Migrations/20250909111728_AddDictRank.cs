using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictRank : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "dict_rank",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT(36)", nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    NATOCode = table.Column<string>(type: "TEXT", nullable: true),
                    Category = table.Column<string>(type: "TEXT", nullable: true),
                    SubCategory = table.Column<string>(type: "TEXT", nullable: true),
                    OrderVal = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_rank", x => x.Id);
                },
                comment: "Військове звання");

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_type_Value",
                table: "dict_unit_type",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_soldier_state_Value",
                table: "dict_soldier_state",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_position_Value",
                table: "dict_position",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_forces_type_Value",
                table: "dict_forces_type",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_area_Value",
                table: "dict_area",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_dict_rank_Value",
                table: "dict_rank",
                column: "Value",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "dict_rank");

            migrationBuilder.DropIndex(
                name: "IX_dict_unit_type_Value",
                table: "dict_unit_type");

            migrationBuilder.DropIndex(
                name: "IX_dict_soldier_state_Value",
                table: "dict_soldier_state");

            migrationBuilder.DropIndex(
                name: "IX_dict_position_Value",
                table: "dict_position");

            migrationBuilder.DropIndex(
                name: "IX_dict_forces_type_Value",
                table: "dict_forces_type");

            migrationBuilder.DropIndex(
                name: "IX_dict_area_Value",
                table: "dict_area");
        }
    }
}
