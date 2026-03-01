using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPasswordChangeMonitoring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "last_password_change_date",
                schema: "identity",
                table: "users",
                type: "timestamp with time zone",
                nullable: true,
                comment: "Дата/Час останньої зміни пароля (для моніторингу та безпеки)");

            migrationBuilder.AddColumn<bool>(
                name: "require_password_change",
                schema: "identity",
                table: "users",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                comment: "При наступному вході вимагати зміну пароля (наприклад, після адміністративного скидання)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "last_password_change_date",
                schema: "identity",
                table: "users");

            migrationBuilder.DropColumn(
                name: "require_password_change",
                schema: "identity",
                table: "users");
        }
    }
}
