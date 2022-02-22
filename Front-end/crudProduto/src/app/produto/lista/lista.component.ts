import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-root',
  templateUrl: './lista.component.html',
  styles: [
  ]
})

export class ListaComponent implements OnInit {

  produtos: Produto[] = [];

  constructor(public produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.obterTodos().subscribe((response: any) => {
      this.produtos = response.data;
    })
  }

  excluir(id: string) {
    Swal.fire({
      title: 'Deseja excluir esse produto',
      text: 'Essa operação não pedera ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'excluir',
      cancelButtonText: 'cancelar'
    }).then((result) => {
      if (result.value) {
        this.produtoService.excluir(id).subscribe((response: any) => {

          this.produtos.forEach((produto: Produto, index) => {
            if (produto.id == id) this.produtos.splice(index, 1);
          });

          Swal.fire('', 'Produto excluido com sucesso.', 'success')

        }, (erro: any) => {
          Swal.fire('', 'Erro ao excluir produto.', 'error')
        })
      }
    })
  }
}
