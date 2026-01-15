using System.ComponentModel.DataAnnotations.Schema;

namespace S5Server.Models
{

    [Table("units_task")]
    public class UnitTask : Unit
    {
        public string UnitTaskId { get; set; } = default!;
        public DictUnitTask Task { get; set; } = default!;

        public List<DictDroneModel>? Drones { get; set; }
    }

}
