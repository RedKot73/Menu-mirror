using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDictUnitTaskAmountType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "with_means",
                schema: "dict",
                table: "dict_unit_task",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                comment: "Чи використовуються в завданні засоби ураження",
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldDefaultValue: false);

            migrationBuilder.AlterColumn<Guid>(
                name: "area_type_id",
                schema: "dict",
                table: "dict_unit_task",
                type: "uuid",
                nullable: false,
                comment: "Тип Напрямку ЛБЗ",
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                schema: "dict",
                table: "dict_unit_task",
                type: "numeric(18,2)",
                nullable: false,
                comment: "Тариф в грн. за завдання",
                oldClrType: typeof(decimal),
                oldType: "money");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<bool>(
                name: "with_means",
                schema: "dict",
                table: "dict_unit_task",
                type: "boolean",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "boolean",
                oldDefaultValue: false,
                oldComment: "Чи використовуються в завданні засоби ураження");

            migrationBuilder.AlterColumn<Guid>(
                name: "area_type_id",
                schema: "dict",
                table: "dict_unit_task",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldComment: "Тип Напрямку ЛБЗ");

            migrationBuilder.AlterColumn<decimal>(
                name: "amount",
                schema: "dict",
                table: "dict_unit_task",
                type: "money",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(18,2)",
                oldComment: "Тариф в грн. за завдання");
        }
    }
}
