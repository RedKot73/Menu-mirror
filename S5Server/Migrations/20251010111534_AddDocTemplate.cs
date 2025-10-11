using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDocTemplate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                table: "TVezhaUser<string>");

            migrationBuilder.CreateTable(
                name: "document_templates",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Name = table.Column<string>(type: "TEXT(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "TEXT(300)", maxLength: 300, nullable: true),
                    FileName = table.Column<string>(type: "TEXT(250)", maxLength: 250, nullable: false),
                    ContentType = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    Format = table.Column<string>(type: "TEXT(10)", maxLength: 10, nullable: false),
                    Content = table.Column<byte[]>(type: "BLOB", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_document_templates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "template_data_sets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    TemplateId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Name = table.Column<string>(type: "TEXT(150)", maxLength: 150, nullable: false),
                    DataJson = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_template_data_sets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_template_data_sets_document_templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "document_templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_TemplateId_Name",
                table: "template_data_sets",
                columns: new[] { "TemplateId", "Name" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                table: "TVezhaUser<string>",
                column: "SoldierId",
                principalTable: "soldiers",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                table: "TVezhaUser<string>");

            migrationBuilder.DropTable(
                name: "template_data_sets");

            migrationBuilder.DropTable(
                name: "document_templates");

            migrationBuilder.AddForeignKey(
                name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                table: "TVezhaUser<string>",
                column: "SoldierId",
                principalTable: "soldiers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
