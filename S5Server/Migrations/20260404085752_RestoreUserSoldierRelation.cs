using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class RestoreUserSoldierRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "soldier_id",
                schema: "identity",
                table: "users",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_users_soldier_id",
                schema: "identity",
                table: "users",
                column: "soldier_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_users_soldiers_soldier_id",
                schema: "identity",
                table: "users",
                column: "soldier_id",
                principalSchema: "core",
                principalTable: "soldiers",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_users_soldiers_soldier_id",
                schema: "identity",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_users_soldier_id",
                schema: "identity",
                table: "users");

            migrationBuilder.DropColumn(
                name: "soldier_id",
                schema: "identity",
                table: "users");
        }
    }
}
