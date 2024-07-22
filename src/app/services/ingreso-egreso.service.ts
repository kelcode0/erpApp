import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {
  constructor(private auth: AuthService, private firestore: Firestore) {}

  ingresoEgreso(ingresoEgreso: IngresoEgreso) {
    const uid = this.auth.user?.uid;
    const collectionIngresoEgreso = collection(
      this.firestore,
      `${uid}/ingreso-egreso/items`
    );
    const documentRef = doc(collectionIngresoEgreso);
    return setDoc(documentRef, { ...ingresoEgreso }).then(() =>
      console.log('documento insertado con exito', documentRef)
    );
  }
}
