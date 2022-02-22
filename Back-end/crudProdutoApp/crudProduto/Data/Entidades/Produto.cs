namespace crudProduto.Data.Entidades
{
    public class Produto
    {
        public Produto()
        {
            Id = new Guid();
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public byte[] Img { get; set; }
        public string Descricao { get; set; }
        public int Estoque { get; set; }
        public bool Status { get; set; }
        public decimal Preco { get; set; }
    }
}
