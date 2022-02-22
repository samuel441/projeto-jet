import { ProdutoService } from './../produto.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReplaySubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './adicionar.component.html',
  styles: [
  ]
})
export class AdicionarComponent implements OnInit {

  form: FormGroup;

  submetido = false;
  imagemSrc: string = '';
  nomeImg: string = '';

  constructor(
    private formBuilder: FormBuilder,
    public produtoService: ProdutoService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      nome: new FormControl('', [Validators.required]),
      descricao: new FormControl('', Validators.required),
      preco: new FormControl('', Validators.required),
      estoque: new FormControl('', Validators.required),
      status: new FormControl(true),
      fileSource: new FormControl('', [Validators.required]),
      img: new FormControl('', [Validators.required])
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  submit() {

    const formData = new FormData();
    formData.append('file', this.form.get('fileSource')?.value);
    formData.append('nome', this.form.get('nome')?.value);
    formData.append('descricao', this.form.get('descricao')?.value);
    formData.append('preco', this.form.get('preco')?.value);
    formData.append('estoque', this.form.get('estoque')?.value);
    formData.append('status', this.form.get('status')?.value);

    console.log(this.form.get('nome')?.value);
    this.produtoService.adicionar(formData).subscribe((response: any) => {
      this.processarSucesso(response);
    }, (erro: any) => {
      this.processarFalha(erro.error.errors);
    })
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      // this.converterImagem(event.target.files[0]).subscribe(base64 => {
      //   this.imagemBase64 = base64;
      // });

      this.nomeImg = event.currentTarget.files[0].name;

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

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      this.form.reset();

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
