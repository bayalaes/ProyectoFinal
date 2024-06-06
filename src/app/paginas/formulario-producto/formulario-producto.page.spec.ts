import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioProductoPage } from './formulario-producto.page';

describe('FormularioProductoPage', () => {
  let component: FormularioProductoPage;
  let fixture: ComponentFixture<FormularioProductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
