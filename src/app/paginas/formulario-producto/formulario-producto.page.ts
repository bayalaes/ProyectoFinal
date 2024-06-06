import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ProductoService, Producto } from '../../servicios/producto.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.page.html',
  styleUrls: ['./formulario-producto.page.scss'],
})
export class FormularioProductoPage implements OnInit {
  productoForm: FormGroup = new FormGroup({});
  errorMessage: string = '';
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.inicializarFormulario();
    if (this.id) {
      this.obtenerProductoParaEditar();
    }
  }

  inicializarFormulario() {
    this.productoForm = this.fb.group(
      {
        presupuesto: ['', [Validators.required, Validators.min(0)]],
        unidad: ['', Validators.required],
        producto: ['', Validators.required],
        cantidad: ['', [Validators.required, Validators.min(1)]],
        valorUnitario: ['', [Validators.required, Validators.min(0)]],
        valorTotal: [{ value: 0, disabled: true }],
        fechaAdquisicion: ['', [Validators.required, this.fechaValida]],
        proveedor: ['', Validators.required],
      },
      { validators: this.presupuestoMenorValorTotal }
    );
    this.productoForm.get('cantidad')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });

    this.productoForm.get('valorUnitario')?.valueChanges.subscribe(() => {
      this.calcularValorTotal();
    });
  }

  obtenerProductoParaEditar() {
    this.productoService.obtenerProducto(this.id).subscribe((producto) => {
      this.productoForm.patchValue(producto);
    });
  }

  getErrorMessage() {
    if (this.productoForm.hasError('presupuestoInvalido')) {
      return 'El valor total excede el límite de presupuesto';
    }
    if (this.productoForm.hasError('fechaInvalida')) {
      return 'La fecha de adquisición no puede ser anterior a la fecha actual';
    }
    return '';
  }

  calcularValorTotal() {
    const cantidad = this.productoForm.get('cantidad')?.value;
    const valorUnitario = this.productoForm.get('valorUnitario')?.value;
    if (cantidad && valorUnitario) {
      const valorTotal = cantidad * valorUnitario;
      this.productoForm.patchValue({ valorTotal: valorTotal });
    }
  }

  presupuestoMenorValorTotal(
    control: AbstractControl
  ): ValidationErrors | null {
    const presupuesto = control.get('presupuesto').value;
    const valorTotal = control.get('valorTotal').value;
    if (presupuesto < valorTotal) {
      return { presupuestoInvalido: true };
    }
    return null;
  }

  fechaValida(control: AbstractControl): ValidationErrors | null {
    const fechaIngresada = new Date(control.value);
    fechaIngresada.setDate(fechaIngresada.getDate() + 1); // Suma un día
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0);
    fechaIngresada.setHours(0, 0, 0, 0);
    if (fechaIngresada.getTime() < fechaActual.getTime()) {
      return { fechaInvalida: true };
    }
    return null;
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto: Producto = {
        ...this.productoForm.value,
        valorTotal: this.productoForm.get('valorTotal')?.value // Incluir valorTotal manualmente
      };// Deshabilitar nuevamente después de obtener el valor
      if (this.id) {
        // Actualizar producto existente
        this.productoService
          .actualizarProducto(this.id, producto)
          .then(() => {
            this.navCtrl.back();
          })
          .catch((error) => {
            this.errorMessage = `Error al actualizar el producto: ${error.message}`;
          });
      } else {
        // Crear nuevo producto
        this.productoService
          .crearProducto(producto)
          .then(() => {
            this.navCtrl.back();
          })
          .catch((error) => {
            this.errorMessage = `Error al guardar el producto: ${error.message}`;
          });
      }
    } else {
      this.errorMessage =
        'El formulario contiene errores. Por favor, revisa los campos.';
    }
  }
  regresar() {
    this.router.navigate(['/lista-productos']);
  }
}
