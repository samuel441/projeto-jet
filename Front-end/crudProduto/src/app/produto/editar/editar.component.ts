import { ProdutoService } from '../produto.service';
import { Produto } from '../produto';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { decode, encode } from 'base64-arraybuffer';

@Component({
  selector: 'app-atualizar',
  templateUrl: './editar.component.html',
  styles: [
  ]
})
export class EditarComponet implements OnInit {

  id: string;
  produto: Produto;

  form: FormGroup;
  submetido = false;
  imagemSrc: string;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.produtoService.obterPorId(this.id).subscribe((response: any) => {
      this.produto = response.data;
      this.imagemSrc = 'data:image/png;base64,' + this.produto.img;

      this.form.setValue({
        nome: this.produto.nome,
        descricao: this.produto.descricao,
        preco: this.produto.preco,
        estoque: this.produto.estoque,
        status: this.produto.status,
        fileSource: '',
        id : this.produto.id
      });
    });

    this.form = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      fileSource: new FormControl(),
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit() {

    const formData = new FormData();
    formData.append('file', this.form.get('fileSource')?.value);
    formData.append('nome', this.form.get('nome')?.value);
    formData.append('id', this.form.get('id')?.value);
    formData.append('descricao', this.form.get('descricao')?.value);
    formData.append('preco', this.form.get('preco')?.value);
    formData.append('estoque', this.form.get('estoque')?.value);
    formData.append('status', this.form.get('status')?.value);


    console.log('aquiiii' + this.produto.img );

    this.produtoService.atualizar(this.id,formData).subscribe((response: any) => {
      this.processarSucesso(response);
    }, (erro: any) => {
      this.processarFalha(erro.error.errors);
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imagemSrc = reader.result as string;

        this.form.patchValue({
          fileSource: file
        });
      };
    }
  }

  processarSucesso(response: any) {

    let toast = this.toastr.success('Produto atualizado com sucesso!', 'Sucesso!');

    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produto/lista']);
      });
    }
  }
  
  processarFalha(erros: any) {
    erros.forEach((erro: any) => {
      this.toastr.error(erro, 'Erro');
    });
  }
}
