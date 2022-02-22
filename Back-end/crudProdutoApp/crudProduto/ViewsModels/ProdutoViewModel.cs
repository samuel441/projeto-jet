using crudProduto.Config;
using System.ComponentModel.DataAnnotations;

namespace crudProduto.ViewsModels
{
    public class ProdutoViewModel
    {
        public IFormFile File { get; set; }
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(150, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 2)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [StringLength(2000, ErrorMessage = "O campo {0} precisa ter entre {2} e {1} caracteres", MinimumLength = 10)]
        public string Descricao { get; set; } = string.Empty;
        public int Estoque { get; set; }
        public bool Status { get; set; }
        public string Preco { get; set; }
        public string Img { get; set; } = string.Empty;
}
}
