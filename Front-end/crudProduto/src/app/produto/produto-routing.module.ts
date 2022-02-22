import { EditarComponet } from './editar/editar.component';
import { AdicionarComponent } from './adicionar/adicionar.component';
import { ListaComponent } from './lista/lista.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo:'produto/lista', pathMatch:'full'},
  {path: 'produto/lista',component: ListaComponent},
  {path: 'produto/adicionar',component: AdicionarComponent},
  {path: 'produto/editar/:id',component: EditarComponet},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
