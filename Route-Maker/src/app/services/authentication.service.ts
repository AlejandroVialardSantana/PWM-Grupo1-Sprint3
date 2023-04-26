import { Injectable } from '@angular/core';
import {  Auth, authState, signInWithEmailAndPassword } from '@angular/fire/auth';
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

  logout(){
    return from(this.auth.signOut());
  }
}
