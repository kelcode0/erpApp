import { Component, OnDestroy, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/shared/ui.actions';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  cargando: boolean = false;
  storeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.storeSubscription = this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
      console.log('Cargando', ui.isLoading);
    });
  }
  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  crearUsuario() {
    console.log(this.formGroup.value);
    if (this.formGroup.invalid) {
      return;
    }
    this.store.dispatch(actions.isLoading());

    // Swal.fire({
    //   title: 'Espere por favor...',
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });
    const { nombre, email, password } = this.formGroup.value;
    this.authService
      .createUser(nombre, email, password)
      .then((response) => {
        // Swal.close();
        console.log('Usuario creado', response);
        this.store.dispatch(actions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Contraseña incorrecta',
          text: error.message,
        });
      });
  }
}
