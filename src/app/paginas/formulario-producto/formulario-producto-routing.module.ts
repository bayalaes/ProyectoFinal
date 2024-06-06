import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioProductoPage } from './formulario-producto.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioProductoPageRoutingModule {}
