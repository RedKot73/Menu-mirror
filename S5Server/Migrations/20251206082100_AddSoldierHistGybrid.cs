using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddSoldierHistGybrid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "ArrivedAt",
                table: "soldiers",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "soldiers_hist",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    SoldierId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    ExternId = table.Column<int>(type: "INTEGER", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    MidleName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    BirthDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    NickName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    UnitId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    UnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    AssignedUnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    OperationalUnitId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    OperationalUnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    RankId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    RankShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    PositionId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    PositionValue = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    StateId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    StateValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    ArrivedAt = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    DepartedAt = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    ChangedBy = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Operation = table.Column<string>(type: "TEXT(10)", maxLength: 10, nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ValidTo = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_soldiers_hist", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_hist_Operation",
                table: "soldiers_hist",
                column: "Operation");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_hist_SoldierId",
                table: "soldiers_hist",
                column: "SoldierId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_hist_SoldierId_ValidFrom",
                table: "soldiers_hist",
                columns: new[] { "SoldierId", "ValidFrom" });

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_hist_UnitId",
                table: "soldiers_hist",
                column: "UnitId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "soldiers_hist");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ArrivedAt",
                table: "soldiers",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateOnly),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
