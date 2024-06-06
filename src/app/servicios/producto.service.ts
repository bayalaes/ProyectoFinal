import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

export interface Producto {
  id?: string;
  presupuesto: number;
  unidad: string;
  producto: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  fechaAdquisicion: string;
  proveedor: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private dbPath = 'productos';

  constructor(private db: AngularFirestore) {}

  crearProducto(producto: Producto): any {
    return this.db.collection<Producto>(this.dbPath).add(producto);
  }

  obtenerListaProductos(): Observable<Producto[]> {
    return this.db.collection<Producto>(this.dbPath).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Producto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

obtenerProducto(id: string): Observable<Producto> {
    return this.db.doc<Producto>(`${this.dbPath}/${id}`).valueChanges() as Observable<Producto>;
  }

  actualizarProducto(id: string, producto: Producto): Promise<void> {
    return this.db.doc(`${this.dbPath}/${id}`).update(producto);
  }

  eliminarProducto(id: string): Promise<void> {
    return this.db.doc(`${this.dbPath}/${id}`).delete();
  }
}
