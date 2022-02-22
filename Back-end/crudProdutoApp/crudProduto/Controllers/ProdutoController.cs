#nullable disable
using AutoMapper;
using crudProduto.Business;
using crudProduto.Data.Context;
using crudProduto.Data.Entidades;
using crudProduto.ViewsModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace crudProduto.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : BaseController
    {
        private readonly DbContextApp _context;
        public readonly IMapper _mapper;

        public ProdutoController(DbContextApp context, INotificador notificador, IMapper mapper) : base(notificador)
        {
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProdutoViewModel>>> GetProdutos()
        {
            return CustomResponse(_mapper.Map<IEnumerable<ProdutoViewModel>>(await _context.Produtos.ToListAsync()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(Guid id)
        {
            var produto = await _context.Produtos.FindAsync(id);

            if (produto == null)
            {
                Notificar("Produto não encotrado");
                return CustomResponse();
            }

            return CustomResponse(produto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduto(Guid id, [FromForm] ProdutoViewModel produto)
        {
            if (id != produto.Id)
            {
                Notificar("Erro ao atualizar produto");
                return CustomResponse();
            }

            var produtoAtualizacao = await ObterProduto(id);

            if (produto.File != null)
            {
                produtoAtualizacao.File = produto.File;
                produtoAtualizacao.Img = "";
            }

            produtoAtualizacao.Nome = produto.Nome;
            produtoAtualizacao.Status = produto.Status;
            produtoAtualizacao.Estoque = produto.Estoque;
            produtoAtualizacao.Descricao = produto.Descricao;
            produtoAtualizacao.Preco = produto.Preco;

            _context.Entry(_mapper.Map<Produto>(produtoAtualizacao)).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return CustomResponse();
        }

        [HttpPost]
        public async Task<ActionResult<ProdutoViewModel>> PostProduto([FromForm] ProdutoViewModel produto)
        {
            if (!ModelState.IsValid) return CustomResponse(ModelState);

            _context.Produtos.Add(_mapper.Map<Produto>(produto));

            await _context.SaveChangesAsync();

            return CustomResponse();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(Guid id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            _context.Produtos.Remove(produto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<ProdutoViewModel> ObterProduto(Guid id)
        {
            return _mapper.Map<ProdutoViewModel>(await _context.Produtos.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id));
        }
    }
}
