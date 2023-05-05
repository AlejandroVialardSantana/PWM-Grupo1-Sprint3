import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  setDoc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { ProfileUser } from '../models/user-profile';
import { from, Observable, switchMap, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { deleteDoc } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get currentUserProfile$(): Observable<ProfileUser | null> {
    return this.authService.currentUser$.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }

        const ref = doc(this.firestore, 'users', user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }

  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService,
    private db: AngularFirestore
  ) {}

  getAllUsers() {
    return new Promise<any>((resolve) => {
      this.db
        .collection('users')
        .valueChanges({ idField: 'id' })
        .subscribe((users) => resolve(users));
    });
  }

  addUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, 'users', user?.uid);
    return from(setDoc(ref, user));
  }

  updateUser(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }

  deleteUser(user: ProfileUser): Observable<any> {
    const ref = doc(this.firestore, `users/${user.uid}`);
    return from(deleteDoc(ref));
  }

  changePassword(user: ProfileUser): Observable<void> {
    const ref = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(ref, { user: user.password }));
  }
}
