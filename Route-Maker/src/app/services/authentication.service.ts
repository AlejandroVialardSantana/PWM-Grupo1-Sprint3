import { Injectable } from '@angular/core';
import {  Auth, authState, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { from, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  login(email: string, password: string): Observable<any>{
   return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp(email: string, password: string){
    return from(createUserWithEmailAndPassword(this.auth, email, password))
  }
  logout(){
    return from(this.auth.signOut());
  }
}
