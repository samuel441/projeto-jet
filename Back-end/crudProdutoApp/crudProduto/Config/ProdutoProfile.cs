using AutoMapper;
using crudProduto.Data.Entidades;
using crudProduto.ViewsModels;
using System.Globalization;
using System.Text;

namespace crudProduto.Config
{
    public class ProdutoProfile : Profile
    {
        public ProdutoProfile()
        {
            CreateMap<Produto, ProdutoViewModel>()
                .ForMember(x => x.Img, map => map.MapFrom(src => Convert.ToBase64String(src.Img)));

            CreateMap<ProdutoViewModel, Produto>()
               .ForMember(x => x.Img, map => map.MapFrom(src => ObterBytes(src)))
               .ForMember(x => x.Preco, map => map.MapFrom(src => Math.Round(Convert.ToDecimal(src.Preco, CultureInfo.CurrentCulture), 2)));

        }

        private static byte[] ObterBytes(ProdutoViewModel src) => string.IsNullOrEmpty(src.Img) ? src.File.GetBytes().Result : Convert.FromBase64String(src.Img);
    }
}
