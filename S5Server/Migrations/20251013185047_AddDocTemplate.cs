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
                name: "dict_template_category",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true),
                    ShortValue = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_template_category", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "document_templates",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Name = table.Column<string>(type: "TEXT(150)", maxLength: 150, nullable: false),
                    Description = table.Column<string>(type: "TEXT(300)", maxLength: 300, nullable: true),
                    Format = table.Column<string>(type: "TEXT(10)", maxLength: 10, nullable: false),
                    Content = table.Column<byte[]>(type: "BLOB", nullable: false),
                    TemplateCategoryId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    ContentHash = table.Column<string>(type: "TEXT(64)", maxLength: 64, nullable: true),
                    IsPublished = table.Column<bool>(type: "INTEGER", nullable: false),
                    PublishedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    DefaultDataSetId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_document_templates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_document_templates_dict_template_category_TemplateCategoryId",
                        column: x => x.TemplateCategoryId,
                        principalTable: "dict_template_category",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "template_data_sets",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", nullable: false),
                    TemplateId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    Name = table.Column<string>(type: "TEXT(150)", maxLength: 150, nullable: false),
                    DataJson = table.Column<string>(type: "TEXT", nullable: false),
                    IsPublished = table.Column<bool>(type: "INTEGER", nullable: false),
                    PublishedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CreatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: false)
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
                name: "IX_dict_template_category_Value",
                table: "dict_template_category",
                column: "Value",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_ContentHash",
                table: "document_templates",
                column: "ContentHash");

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_DefaultDataSetId",
                table: "document_templates",
                column: "DefaultDataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_IsPublished",
                table: "document_templates",
                column: "IsPublished");

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_Name",
                table: "document_templates",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_TemplateCategoryId",
                table: "document_templates",
                column: "TemplateCategoryId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_document_templates_template_data_sets_DefaultDataSetId",
                table: "document_templates",
                column: "DefaultDataSetId",
                principalTable: "template_data_sets",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TVezhaUser<string>_soldiers_SoldierId",
                table: "TVezhaUser<string>");

            migrationBuilder.DropForeignKey(
                name: "FK_document_templates_dict_template_category_TemplateCategoryId",
                table: "document_templates");

            migrationBuilder.DropForeignKey(
                name: "FK_document_templates_template_data_sets_DefaultDataSetId",
                table: "document_templates");

            migrationBuilder.DropTable(
                name: "dict_template_category");

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
