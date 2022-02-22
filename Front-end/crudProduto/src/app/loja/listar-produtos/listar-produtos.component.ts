import { ProdutoService } from './../../produto/produto.service';
import { Produto } from './../../produto/produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styles: [
  ]
})
export class ListarProdutosComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(public produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.obterTodos().subscribe((response: any) => {
      this.produtos = response.data;
    })
  }
}
