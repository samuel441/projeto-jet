using crudProduto.Data.Entidades;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace crudProduto.Data.Context
{
    public class DbContextApp : DbContext
    {
        public DbContextApp(DbContextOptions<DbContextApp> dbContextOptions) : base(dbContextOptions)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        public DbSet<Produto> Produtos { get; set; }
    }
}
