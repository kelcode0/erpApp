import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import {
  Firestore,
  Unsubscribe,
  doc,
  onSnapshot,
  setDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userUnsubscribe!: Unsubscribe;
  user!: User;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) {}
  initAuthListener() {
    authState(this.auth).subscribe((fUser) => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);

      if (fUser) {
        this.userUnsubscribe = onSnapshot(
          doc(this.firestore, `${fUser.uid}/user`),
          (docUser: any) => {
            let data: any = docUser.data();
            console.log('data', data);
            let user = User.fromFirebase(data);
            this.user = user;

            this.store.dispatch(authActions.setUser({ user }));
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.userUnsubscribe ? this.userUnsubscribe() : null;
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  isAuth() {
    return authState(this.auth).pipe(map((fUser) => fUser !== null));
  }

  // createUser(nombre: string, email: string, password: string) {
  //   return createUserWithEmailAndPassword(this.auth, email, password).then(
  //     ({ user }) => {
  //       const newUser = new Usuario(user.uid, nombre, email);
  //       return setDoc(doc(this.firestore, user.uid, 'user'), { ...newUser });
  //     }
  //   );
  // }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  createUser(name: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      ({ user }) => {
        const newUser = new User(user.uid, name, email);
        return setDoc(doc(this.firestore, user.uid, 'user'), { ...newUser });
      }
    );
  }
}
