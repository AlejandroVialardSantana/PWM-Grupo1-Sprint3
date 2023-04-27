import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Destino } from '../../models/interfaces/destinos';
import { Actividad } from 'src/app/models/interfaces/actividades';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getDestinies(): Observable<Destino[]> {
    const booksRef = collection(this.firestore, 'destinos');
    return collectionData(booksRef, { idField: 'id' }) as Observable<Destino[]>;
  }

  getActivities(): Observable<Actividad[]> {
    const activitiesRef = collection(this.firestore, 'actividades');
    return collectionData(activitiesRef, { idField: 'id' }) as Observable<any[]>;
  }
}
