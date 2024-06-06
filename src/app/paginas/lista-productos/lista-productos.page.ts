import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../servicios/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.page.html',
  styleUrls: ['./lista-productos.page.scss'],
})
export class ListaProductosPage implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  toggleStates: { [key: string]: boolean } = {};

  constructor(
    private productoService: ProductoService,
  ) {}

  ngOnInit() {
    this.productoService.obtenerListaProductos().subscribe((data) => {
      this.productos = data;
      this.productosFiltrados = data;
      this.productos.forEach(producto => {
        if (producto.id) {
          this.toggleStates[producto.id] = false;
        }
      });
    });
  }

  toggleDetails(id: string) {
    this.toggleStates[id] = !this.toggleStates[id];
  }

  filtrarProductos(event: any) {
    const valor = event.target.value.toLowerCase();
    this.productosFiltrados = this.productos.filter(
      (producto) =>
        producto.producto.toLowerCase().includes(valor) ||
        producto.unidad.toLowerCase().includes(valor)
    );
  }

  eliminarProducto(id: string) {
    this.productoService.eliminarProducto(id)
      .then(() => {
        console.log('Producto eliminado con éxito');
        this.productos = this.productos.filter(producto => producto.id !== id);
        this.productosFiltrados = this.productosFiltrados.filter(producto => producto.id !== id);
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  }
}
