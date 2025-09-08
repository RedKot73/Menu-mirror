using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace S5Server.Models
{
    /// <summary>
    /// Довідник Військове звання
    /// </summary>
    [Table("dict_rank"), Display(Name = Caption),
     Comment("Військове звання")]
    public class DictRank
    {
        public const string Caption = "Звання";
        public readonly string cnstCaption = Caption;

        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [StringLength(100), Display(Name = Caption), Required(ErrorMessage = UIConstant.RequiredMsg)]
        public string Value { get; set; } = UIConstant.NotSetValue;

        [StringLength(50), Display(Name = $"{Caption} скороч.")]
        public virtual string? ShortValue { get; set; }

        [Display(Name = UIConstant.CommentCaption)]
        public string? Comment { get; set; }

        [Display(Name = "Відповідник НАТО")]
        public string? NATOCode { get; set; }

        [Display(Name = "Категорія")]
        public string? Category { get; set; }

        [Display(Name = "Під категорія")]
        public string? SubCategory { get; set; }

        [Display(Name = "Порядок сортування")]
        public int OrderVal { get; set; } = 1;
    }
}
