import { CurrencyMaskModule } from 'ng2-currency-mask';
import { EditarComponet } from './editar/editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ListaComponent } from './lista/lista.component';
import {  AdicionarComponent } from './adicionar/adicionar.component';


@NgModule({
  declarations: [
    ListaComponent,
    AdicionarComponent,
    EditarComponet
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ]
})
export class ProdutoModule { }
