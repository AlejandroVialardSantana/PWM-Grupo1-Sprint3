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
import { HotToastService } from '@ngneat/hot-toast';
import { AbstractControl } from '@angular/forms';


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
    private toast: HotToastService
  ) {}

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

  changePassword(user: ProfileUser): Observable<any> {
    var ref = doc(this.firestore, `users/${user.uid}`);
    return from(updateDoc(ref, { ...user }));
  }
}
