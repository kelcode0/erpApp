import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription!: Subscription;
  ingresosSubs!: Subscription;
  constructor(
    private store: Store<AppState>,
    private inOut: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.store
      .select('user')
      .pipe(filter(({ user }) => user !== null))
      .subscribe(({ user }) => {
        if (user !== null) {
          this.ingresosSubs = this.inOut
            .initIngresoEgresoListener(user.uid)
            .subscribe((items) => {
              console.log(items, 'items');
              const formattedItems: IngresoEgreso[] = items.map((item) => ({
                descripcion: '',
                monto: 0,
                tipo: '',
                ...item,
              }));

              this.store.dispatch(setItems({ items: formattedItems }));
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
