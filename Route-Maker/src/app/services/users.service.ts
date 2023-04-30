import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData } from '@angular/fire/firestore';
import { ProfileUSer } from '../models/user-profile';
import { from, Observable, switchMap, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  get currentUserProfile$(): Observable<ProfileUSer | null>{
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if(!user?.uid){
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUSer>;
      })
    )
  }

  constructor(private firestore: Firestore, private authService: AuthenticationService) { }

  addUser(user: ProfileUSer ): Observable<any>{
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }
}
