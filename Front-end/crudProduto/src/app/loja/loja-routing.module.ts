import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'loja/listar-produtos',component: ListarProdutosComponent},
  {path: 'loja/detalhes-produto/:id',component: DetalhesProdutoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LojaRoutingModule { }
