import { createReducer, on, Action } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as actions from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgreso[];
}

export interface AppStateWhitInOut extends AppState {
  ingresosEgresos: State;
}

export const initialState: State = {
  items: [],
};

const _ingresoEgresoReducer = createReducer<State, Action>(
  initialState,
  on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(actions.unsetItems, (state) => ({ ...state, items: [] }))
);

export function ingresoEgresoReducer(state: State | undefined, action: Action) {
  return _ingresoEgresoReducer(state, action);
}
