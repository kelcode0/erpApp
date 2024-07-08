import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer<AuthState, Action>(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unSetUser, (state) => ({ ...state, user: null }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
