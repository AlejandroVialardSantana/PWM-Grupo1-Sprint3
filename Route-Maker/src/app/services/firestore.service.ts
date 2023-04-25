import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private db: AngularFirestore) { }

  getDestinies() {
    return new Promise<any>((resolve)=>{
      this.db.collection('destinos').valueChanges({idField: 'id'}).subscribe(destinies => resolve(destinies));
    })
  }
}