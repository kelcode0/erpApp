import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import * as actions from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubs!: Subscription;
  constructor(
    private fb: FormBuilder,
    private inOut: IngresoEgresoService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.loadingSubs = this.store
      .select('ui')
      .subscribe((ui) => (this.cargando = ui.isLoading));
    this.ingresoForm = this.fb.group({
      descripcion: ['', [Validators.required]],
      monto: ['', [Validators.required]],
    });
  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe();
  }

  guardar() {
    this.store.dispatch(actions.isLoading());

    console.log(this.ingresoForm.value);
    console.log(this.tipo);
    const { descripcion, monto } = this.ingresoForm.value;
    const ingresoEgreso: IngresoEgreso = new IngresoEgreso(
      descripcion,
      monto,
      this.tipo
    );

    this.inOut
      .ingresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Registro creado', descripcion, 'success');
      })
      .catch((err) => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
