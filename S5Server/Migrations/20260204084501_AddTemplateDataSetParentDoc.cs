using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTemplateDataSetParentDoc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsParentDocUsed",
                table: "template_data_sets",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ParentDocDate",
                table: "template_data_sets",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ParentDocNumber",
                table: "template_data_sets",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsParentDocUsed",
                table: "template_data_sets");

            migrationBuilder.DropColumn(
                name: "ParentDocDate",
                table: "template_data_sets");

            migrationBuilder.DropColumn(
                name: "ParentDocNumber",
                table: "template_data_sets");
        }
    }
}
