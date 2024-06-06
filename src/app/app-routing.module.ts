import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'lista-productos',
    pathMatch: 'full'
  },
  {
    path: 'lista-productos',
    loadChildren: () => import('./paginas/lista-productos/lista-productos.module').then( m => m.ListaProductosPageModule)
  },
  {
    path: 'formulario-producto',
    loadChildren: () => import('./paginas/formulario-producto/formulario-producto.module').then( m => m.FormularioProductoPageModule)
  },
  {
    path: 'formulario-producto/:id',
    loadChildren: () => import('./paginas/formulario-producto/formulario-producto.module').then( m => m.FormularioProductoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
