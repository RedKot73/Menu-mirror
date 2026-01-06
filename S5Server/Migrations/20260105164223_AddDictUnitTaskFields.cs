using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddDictUnitTaskFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_drone_model_dict_drone_type_DroneTypeId",
                table: "dict_drone_model");

            migrationBuilder.DropForeignKey(
                name: "FK_document_templates_template_data_sets_DefaultDataSetId",
                table: "document_templates");

            migrationBuilder.DropForeignKey(
                name: "FK_soldiers_units_OperationalUnitId",
                table: "soldiers");

            migrationBuilder.DropForeignKey(
                name: "FK_template_data_sets_document_templates_TemplateId",
                table: "template_data_sets");
            /*
            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_TemplateId_Name",
                table: "template_data_sets");
            

            migrationBuilder.DropIndex(
                name: "IX_document_templates_ContentHash",
                table: "document_templates");

            migrationBuilder.DropIndex(
                name: "IX_document_templates_DefaultDataSetId",
                table: "document_templates");
            
            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "template_data_sets");

            migrationBuilder.DropColumn(
                name: "ContentHash",
                table: "document_templates");

            migrationBuilder.DropColumn(
                name: "DefaultDataSetId",
                table: "document_templates");

            migrationBuilder.DropColumn(
                name: "Format",
                table: "document_templates");
            */
            migrationBuilder.RenameColumn(
                name: "OperationalUnitId",
                table: "soldiers",
                newName: "InvolvedUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_soldiers_OperationalUnitId",
                table: "soldiers",
                newName: "IX_soldiers_InvolvedUnitId");

            migrationBuilder.AddColumn<string>(
                name: "AreaId",
                table: "units",
                type: "TEXT(36)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAtUtc",
                table: "template_data_sets",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "TEXT");

            migrationBuilder.CreateTable(
                name: "dict_unit_task",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Value = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", maxLength: 250, nullable: true),
                    Amount = table.Column<decimal>(type: "REAL", nullable: false),
                    WithMeans = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    AtPermanentPoint = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dict_unit_task", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_units_AreaId",
                table: "units",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_dict_unit_task_Value",
                table: "dict_unit_task",
                column: "Value",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_dict_drone_model_dict_drone_type_DroneTypeId",
                table: "dict_drone_model",
                column: "DroneTypeId",
                principalTable: "dict_drone_type",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_soldiers_units_InvolvedUnitId",
                table: "soldiers",
                column: "InvolvedUnitId",
                principalTable: "units",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_units_dict_area_AreaId",
                table: "units",
                column: "AreaId",
                principalTable: "dict_area",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_dict_drone_model_dict_drone_type_DroneTypeId",
                table: "dict_drone_model");

            migrationBuilder.DropForeignKey(
                name: "FK_soldiers_units_InvolvedUnitId",
                table: "soldiers");

            migrationBuilder.DropForeignKey(
                name: "FK_units_dict_area_AreaId",
                table: "units");

            migrationBuilder.DropTable(
                name: "dict_unit_task");

            migrationBuilder.DropIndex(
                name: "IX_units_AreaId",
                table: "units");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "units");

            migrationBuilder.RenameColumn(
                name: "InvolvedUnitId",
                table: "soldiers",
                newName: "OperationalUnitId");

            migrationBuilder.RenameIndex(
                name: "IX_soldiers_InvolvedUnitId",
                table: "soldiers",
                newName: "IX_soldiers_OperationalUnitId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UpdatedAtUtc",
                table: "template_data_sets",
                type: "TEXT",
                nullable: true,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "TEXT",
                oldNullable: true);
            /*
            migrationBuilder.AddColumn<string>(
                name: "TemplateId",
                table: "template_data_sets",
                type: "TEXT(36)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentHash",
                table: "document_templates",
                type: "TEXT(64)",
                maxLength: 64,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DefaultDataSetId",
                table: "document_templates",
                type: "TEXT(36)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Format",
                table: "document_templates",
                type: "TEXT(10)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_TemplateId_Name",
                table: "template_data_sets",
                columns: new[] { "TemplateId", "Name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_ContentHash",
                table: "document_templates",
                column: "ContentHash");

            migrationBuilder.CreateIndex(
                name: "IX_document_templates_DefaultDataSetId",
                table: "document_templates",
                column: "DefaultDataSetId");
            */
            migrationBuilder.AddForeignKey(
                name: "FK_dict_drone_model_dict_drone_type_DroneTypeId",
                table: "dict_drone_model",
                column: "DroneTypeId",
                principalTable: "dict_drone_type",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            /*
            migrationBuilder.AddForeignKey(
                name: "FK_document_templates_template_data_sets_DefaultDataSetId",
                table: "document_templates",
                column: "DefaultDataSetId",
                principalTable: "template_data_sets",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
            */
            migrationBuilder.AddForeignKey(
                name: "FK_soldiers_units_OperationalUnitId",
                table: "soldiers",
                column: "OperationalUnitId",
                principalTable: "units",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
            /*
            migrationBuilder.AddForeignKey(
                name: "FK_template_data_sets_document_templates_TemplateId",
                table: "template_data_sets",
                column: "TemplateId",
                principalTable: "document_templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
            */
        }
    }
}
