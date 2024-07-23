import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface StateUi {
  isLoading: boolean;
}

export const initialState: StateUi = {
  isLoading: false,
};

const _uiReducer = createReducer<StateUi, Action>(
  initialState,
  on(isLoading, (state) => ({ ...state, isLoading: true })),
  on(stopLoading, (state) => ({ ...state, isLoading: false }))
);

export function uiReducer(state: StateUi | undefined, action: Action) {
  return _uiReducer(state, action);
}
