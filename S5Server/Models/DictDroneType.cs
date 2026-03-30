using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace S5Server.Models
{
    /// <summary>
    /// Типи БПЛА
    /// </summary>
    [Table("dict_drone_type")]
    public class DictDroneType : ShortDictBase, IShortDictBase
    {
        /// <summary>
        /// Список моделей БПЛА, що відносяться до цього типу.
        /// </summary>
        public List<DictDroneModel>? DroneModels { get; set; }
    }
}
