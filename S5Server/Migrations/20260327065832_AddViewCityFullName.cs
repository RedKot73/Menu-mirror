using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace S5Server.Migrations
{
    /// <inheritdoc />
    public partial class AddViewCityFullName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"drop view if exists dict.v_city_full_name;
CREATE OR REPLACE VIEW dict.v_city_full_name
AS WITH city_names AS (
         SELECT dcc.id,
            (dcc.value::text || ' '::text) || dccat.short_value::text AS formatted_name,
            dcc.level1id,
            dcc.level2id,
            dcc.level3id,
            dcc.level4id,
            dcc.level_ext_id
           FROM dict.dict_city_code dcc
             JOIN dict.dict_city_category dccat ON dccat.id = dcc.category_id
        )
 SELECT base.id,
    TRIM(BOTH FROM concat_ws(', '::text, c1.formatted_name,
		c2.formatted_name, c3.formatted_name,
		c4.formatted_name, ce.formatted_name)) AS value
   FROM city_names base
     LEFT JOIN city_names c1 ON c1.id::text = base.level1id::text
     LEFT JOIN city_names c2 ON c2.id::text = base.level2id::text
     LEFT JOIN city_names c3 ON c3.id::text = base.level3id::text
     LEFT JOIN city_names c4 ON c4.id::text = base.level4id::text
     LEFT JOIN city_names ce ON ce.id::text = base.level_ext_id::text;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"drop view if exists dict.v_city_full_name;");
        }
    }
}
