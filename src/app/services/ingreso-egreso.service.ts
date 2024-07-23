import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import {
  collection,
  collectionChanges,
  collectionSnapshots,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
  setDoc,
} from '@angular/fire/firestore';
import { map } from 'rxjs';

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

  initIngresoEgresoListener(uid: string) {
    return collectionSnapshots(
      collection(this.firestore, `${uid}/ingreso-egreso/items`)
    ).pipe(
      map((items) => {
        return items.map((_document) => {
          const data = _document.data();
          return { ...data, uid: _document.id };
        });
      })
    );
  }

  borrarIngresoEgreso(uidItem: string) {
    const uid = this.auth.user?.uid;
    const db = getFirestore(this.firestore.app);
    return deleteDoc(
      doc(db, `${uid}`, 'ingreso-egreso', 'items', `${uidItem}`)
    );
  }
}
