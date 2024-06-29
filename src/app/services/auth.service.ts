import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs';
import { User } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}
  initAuthListener() {
    authState(this.auth).subscribe((fUser) => {
      console.log(fUser);
      console.log(fUser?.uid);
      console.log(fUser?.email);
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
