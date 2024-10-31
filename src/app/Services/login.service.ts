import { inject, Injectable } from '@angular/core';
import { ILogin } from '../Models/ILogin';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  firebaseAuth = inject(Auth)

  login(credentials: ILogin): Observable<any> {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, credentials.email, credentials.password)
    return from(promise)
  }

  register(credentials: ILogin): Observable<any> {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, credentials.email, credentials.password)
    return from(promise)
  }

}
