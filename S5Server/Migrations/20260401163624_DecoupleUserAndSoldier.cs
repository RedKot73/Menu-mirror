using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class DecoupleUserAndSoldier : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "aspnetusers_soldiers_fk",
                schema: "identity",
                table: "users");

            migrationBuilder.DropIndex(
                name: "aspnetusers_un_soldier_id",
                schema: "identity",
                table: "users");

            migrationBuilder.DropColumn(
                name: "soldier_id",
                schema: "identity",
                table: "users");

            migrationBuilder.AlterColumn<bool>(
                name: "require_password_change",
                schema: "identity",
                table: "users",
                type: "boolean",
                nullable: false,
                comment: "При наступному вході вимагати зміну пароля (наприклад, после адміністративного скидання)",
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "При наступному вході вимагати зміну пароля (наприклад, після адміністративного скидання)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "require_password_change",
                schema: "identity",
                table: "users",
                type: "boolean",
                nullable: false,
                comment: "При наступному вході вимагати зміну пароля (наприклад, після адміністративного скидання)",
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldComment: "При наступному вході вимагати зміну пароля (наприклад, после адміністративного скидання)");

            migrationBuilder.AddColumn<Guid>(
                name: "soldier_id",
                schema: "identity",
                table: "users",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                comment: "Посилання на відповідного бійця");

            migrationBuilder.CreateIndex(
                name: "aspnetusers_un_soldier_id",
                schema: "identity",
                table: "users",
                column: "soldier_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "aspnetusers_soldiers_fk",
                schema: "identity",
                table: "users",
                column: "soldier_id",
                principalSchema: "core",
                principalTable: "soldiers",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
