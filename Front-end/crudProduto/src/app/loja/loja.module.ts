import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LojaRoutingModule } from './loja-routing.module';
import { ListarProdutosComponent } from './listar-produtos/listar-produtos.component';
import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { LOCALE_ID } from '@angular/core';


@NgModule({
  declarations: [
    ListarProdutosComponent,
    DetalhesProdutoComponent
  ],
  imports: [
    CommonModule,
    LojaRoutingModule
  ]
})
export class LojaModule { }
