using crudProduto.Data.Entidades;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace crudProduto.Data.MapeamentoEntidades
{
    public class ProdutoValidator : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Nome)
                 .IsRequired()
                 .HasColumnType("varchar(150)");

            builder.Property(p => p.Descricao)
           .IsRequired()
           .HasColumnType("varchar(2000)");

            builder.Property(p => p.Status);
            builder.Property(p => p.Preco).HasColumnType("decimal(18,2)");
            builder.Property(p => p.Estoque);
        }
    }
}
