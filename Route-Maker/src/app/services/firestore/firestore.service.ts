import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Destino } from '../../models/interfaces/destinos';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  getDestinies(): Observable<any[]> {
    return this.firestore.collection('destinos').valueChanges().pipe(
      map((destinos: any[]) => {
        return destinos[0].destinos;
      })
    );
  }

  getActivities(): Observable<any[]> {
    return this.firestore.collection('actividades').valueChanges().pipe(
      map((actividades: any[]) => {
        return actividades[0].actividades;
      })
    );
  }
}
