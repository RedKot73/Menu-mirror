using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class Add_Drone_Area_ToUnitTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_units_task_UnitId_PublishedAtUtc",
                table: "units_task");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_DocDate_IsPublished",
                table: "template_data_sets");

            migrationBuilder.DropIndex(
                name: "IX_soldiers_task_UnitTaskId_SoldierId",
                table: "soldiers_task");

            migrationBuilder.AddColumn<string>(
                name: "AreaId",
                table: "units_task",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "drone_model_task",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    UnitTaskId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    DroneModelId = table.Column<string>(type: "TEXT(36)", maxLength: 36, nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false, defaultValue: 1)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_drone_model_task", x => x.Id);
                    table.ForeignKey(
                        name: "FK_drone_model_task_dict_drone_model_DroneModelId",
                        column: x => x.DroneModelId,
                        principalTable: "dict_drone_model",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_drone_model_task_units_task_UnitTaskId",
                        column: x => x.UnitTaskId,
                        principalTable: "units_task",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_units_task_UnitId_TaskId",
                table: "units_task",
                columns: new[] { "UnitId", "TaskId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_DocDate_DocNumber",
                table: "template_data_sets",
                columns: new[] { "DocDate", "DocNumber" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_task_UnitTaskId_SoldierId",
                table: "soldiers_task",
                columns: new[] { "UnitTaskId", "SoldierId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_drone_model_task_DroneModelId",
                table: "drone_model_task",
                column: "DroneModelId");

            migrationBuilder.CreateIndex(
                name: "IX_drone_model_task_UnitTaskId",
                table: "drone_model_task",
                column: "UnitTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_drone_model_task_UnitTaskId_DroneModelId",
                table: "drone_model_task",
                columns: new[] { "UnitTaskId", "DroneModelId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "drone_model_task");

            migrationBuilder.DropIndex(
                name: "IX_units_task_UnitId_TaskId",
                table: "units_task");

            migrationBuilder.DropIndex(
                name: "IX_template_data_sets_DocDate_DocNumber",
                table: "template_data_sets");

            migrationBuilder.DropIndex(
                name: "IX_soldiers_task_UnitTaskId_SoldierId",
                table: "soldiers_task");

            migrationBuilder.DropColumn(
                name: "AreaId",
                table: "units_task");

            migrationBuilder.CreateIndex(
                name: "IX_units_task_UnitId_PublishedAtUtc",
                table: "units_task",
                columns: new[] { "UnitId", "PublishedAtUtc" });

            migrationBuilder.CreateIndex(
                name: "IX_template_data_sets_DocDate_IsPublished",
                table: "template_data_sets",
                columns: new[] { "DocDate", "IsPublished" });

            migrationBuilder.CreateIndex(
                name: "IX_soldiers_task_UnitTaskId_SoldierId",
                table: "soldiers_task",
                columns: new[] { "UnitTaskId", "SoldierId" });
        }
    }
}
