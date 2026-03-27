using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class InsDefValueToDictUnitTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"INSERT INTO dict.dict_area_type (id, value, ""comment"", short_value)
VALUES ('00000000-0000-0000-0000-000000000002'::uuid, '---', 'Не вказано', 'Не вказано')
on conflict(id) do nothing;
INSERT INTO dict.dict_area (id, area_type_id, city_code_id, coords, value, ""comment"", shortvalue)
VALUES ('00000000-0000-0000-0000-000000000002'::uuid, '00000000-0000-0000-0000-000000000002'::uuid, NULL, NULL, '---', NULL, '---')
on conflict(id) do nothing;
INSERT INTO dict.dict_unit_task (id, value, ""comment"", amount, with_means, area_type_id)
VALUES ('00000000-0000-0000-0000-000000000002'::uuid, '---', NULL, 0.00, false, '00000000-0000-0000-0000-000000000002'::uuid)
on conflict(id) do nothing;
");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
