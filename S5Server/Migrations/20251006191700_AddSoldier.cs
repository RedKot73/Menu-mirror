using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddSoldier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrderVal",
                table: "units",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "soldiers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    MidleName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    NickName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    UnitId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    RankId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    PositionId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    StateId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_soldiers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_soldiers_dict_position_PositionId",
                        column: x => x.PositionId,
                        principalTable: "dict_position",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_soldiers_dict_rank_RankId",
                        column: x => x.RankId,
                        principalTable: "dict_rank",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_soldiers_dict_soldier_state_StateId",
                        column: x => x.StateId,
                        principalTable: "dict_soldier_state",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_soldiers_units_AssignedUnitId",
                        column: x => x.AssignedUnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_soldiers_units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TVezhaUser<string>",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    SoldierId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    LastLoginDate = table.Column<DateTime>(type: "TEXT", nullable: true),
                    UserName = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "TEXT", nullable: true),
                    Email = table.Column<string>(type: "TEXT", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "TEXT", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    PasswordHash = table.Column<string>(type: "TEXT", nullable: true),
                    SecurityStamp = table.Column<string>(type: "TEXT", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumber = table.Column<string>(type: "TEXT", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "INTEGER", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "TEXT", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TVezhaUser<string>", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                        column: x => x.SoldierId,
                        principalTable: "soldiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_AssignedUnitId",
                table: "soldiers",
                column: "AssignedUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_PositionId",
                table: "soldiers",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_RankId",
                table: "soldiers",
                column: "RankId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_StateId",
                table: "soldiers",
                column: "StateId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_UnitId",
                table: "soldiers",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_TVezhaUser<string>_SoldierId",
                table: "TVezhaUser<string>",
                column: "SoldierId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TVezhaUser<string>");

            migrationBuilder.DropTable(
                name: "soldiers");

            migrationBuilder.DropColumn(
                name: "OrderVal",
                table: "units");
        }
    }
}
