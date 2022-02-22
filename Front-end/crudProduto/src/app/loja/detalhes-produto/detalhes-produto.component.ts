import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from './../../produto/produto.service';
import { Produto } from './../../produto/produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styles: [
  ]
})

export class DetalhesProdutoComponent implements OnInit {

  produto: Produto = {} as Produto;
  id: string;

  constructor(public produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.produtoService.obterPorId(this.id).subscribe((response: any) => {
      this.produto = response.data;
    })
  }
}
