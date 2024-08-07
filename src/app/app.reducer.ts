import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducers';
import * as auth from './auth/auth.reducer';
import * as ingresoEgreso from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
  ui: ui.StateUi;
  user: auth.AuthState;
  //ingresosEgresos: ingresoEgreso.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  user: auth.authReducer,
  //ingresosEgresos: ingresoEgreso.ingresoEgresoReducer,
};
