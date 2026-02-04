using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUnitsTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DataJson",
                table: "template_data_sets",
                newName: "DocDate");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPublished",
                table: "template_data_sets",
                type: "INTEGER",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<string>(
                name: "DocNumber",
                table: "template_data_sets",
                type: "TEXT(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "units_task",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    DataSetId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    UnitId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    UnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ParentId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    ParentShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    AssignedShortName = table.Column<string>(type: "TEXT(100)", nullable: true),
                    UnitTypeId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    UnitTypeName = table.Column<string>(type: "TEXT(100)", nullable: true),
                    IsInvolved = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    PersistentLocationId = table.Column<string>(type: "TEXT(36)", nullable: true),
                    PersistentLocationValue = table.Column<string>(type: "TEXT(100)", nullable: true),
                    TaskId = table.Column<string>(type: "TEXT(36)", nullable: false),
                    TaskValue = table.Column<string>(type: "TEXT(100)", nullable: false),
                    IsPublished = table.Column<bool>(type: "INTEGER", nullable: false, defaultValue: false),
                    PublishedAtUtc = table.Column<DateTime>(type: "TEXT", nullable: true),
                    ChangedBy = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_units_task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_units_task_dict_area_PersistentLocationId",
                        column: x => x.PersistentLocationId,
                        principalTable: "dict_area",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_task_dict_unit_task_TaskId",
                        column: x => x.TaskId,
                        principalTable: "dict_unit_task",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_task_dict_unit_type_UnitTypeId",
                        column: x => x.UnitTypeId,
                        principalTable: "dict_unit_type",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_task_template_data_sets_DataSetId",
                        column: x => x.DataSetId,
                        principalTable: "template_data_sets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_units_task_units_AssignedUnitId",
                        column: x => x.AssignedUnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_units_task_units_ParentId",
                        column: x => x.ParentId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_units_task_units_UnitId",
                        column: x => x.UnitId,
                        principalTable: "units",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "soldiers_task",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    UnitTaskId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    SoldierId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    ExternId = table.Column<int>(type: "INTEGER", nullable: true),
                    FirstName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    MidleName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    LastName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    NickName = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: true),
                    UnitId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    UnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    AssignedUnitId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    AssignedUnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    InvolvedUnitId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: true),
                    InvolvedUnitShortName = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: true),
                    RankId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    RankShortValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    PositionId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    PositionValue = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    StateId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    StateValue = table.Column<string>(type: "TEXT(50)", maxLength: 50, nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: true),
                    ChangedBy = table.Column<string>(type: "TEXT(100)", maxLength: 100, nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_soldiers_task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_soldiers_task_soldiers_SoldierId",
                        column: x => x.SoldierId,
                        principalTable: "soldiers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_soldiers_task_units_task_UnitTaskId",
                        column: x => x.UnitTaskId,
                        principalTable: "units_task",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_DocDate_IsPublished",
                table: "template_data_sets",
                columns: ["DocDate", "IsPublished"]);

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_DocNumber",
                table: "template_data_sets",
                column: "DocNumber");

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_IsPublished",
                table: "template_data_sets",
                column: "IsPublished");

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_Name",
                table: "template_data_sets",
                column: "Name");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_task_SoldierId",
                table: "soldiers_task",
                column: "SoldierId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_task_UnitTaskId",
                table: "soldiers_task",
                column: "UnitTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_task_UnitTaskId_SoldierId",
                table: "soldiers_task",
                columns: ["UnitTaskId", "SoldierId"]);

            migrationBuilder.CreateIndex(
                name: "IX_units_task_AssignedUnitId",
                table: "units_task",
                column: "AssignedUnitId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_DataSetId",
                table: "units_task",
                column: "DataSetId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_IsPublished",
                table: "units_task",
                column: "IsPublished");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_ParentId",
                table: "units_task",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_PersistentLocationId",
                table: "units_task",
                column: "PersistentLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_TaskId",
                table: "units_task",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_UnitId",
                table: "units_task",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_UnitId_PublishedAtUtc",
                table: "units_task",
                columns: ["UnitId", "PublishedAtUtc"]);

            migrationBuilder.CreateIndex(
                name: "IX_units_task_UnitTypeId",
                table: "units_task",
                column: "UnitTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "soldiers_task");

            migrationBuilder.DropTable(
                name: "units_task");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_DocDate_IsPublished",
                table: "template_data_sets");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_DocNumber",
                table: "template_data_sets");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_IsPublished",
                table: "template_data_sets");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_Name",
                table: "template_data_sets");

            migrationBuilder.DropColumn(
                name: "DocNumber",
                table: "template_data_sets");

            migrationBuilder.RenameColumn(
                name: "DocDate",
                table: "template_data_sets",
                newName: "DataJson");

            migrationBuilder.AlterColumn<bool>(
                name: "IsPublished",
                table: "template_data_sets",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "INTEGER",
                oldDefaultValue: false);
        }
    }
}
