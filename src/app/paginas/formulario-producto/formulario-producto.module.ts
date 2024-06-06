import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioProductoPageRoutingModule } from './formulario-producto-routing.module';

import { FormularioProductoPage } from './formulario-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormularioProductoPageRoutingModule
  ],
  declarations: [FormularioProductoPage]
})
export class FormularioProductoPageModule {}
