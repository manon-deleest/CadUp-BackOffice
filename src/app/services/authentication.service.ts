import { Injectable } from '@angular/core';
import { Auth, UserCredential } from '@angular/fire/auth';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from '@firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _utilisateur?: User;
  private _$estConnecteSubject = new BehaviorSubject<boolean>(false);

  get utilisateur(): User {
    if (!this.utilisateurEstConnecte) throw 'Utilisateur non connecté';
    return this._utilisateur!;
  }

  get utilisateurEstConnecte(): boolean {
    return this._$estConnecteSubject.value;
  }

  get utilisateurEstConnecteObservable(): Observable<boolean> {
    return this._$estConnecteSubject.asObservable();
  }

  constructor(private auth: Auth) {}

  loginUser(email: string, password: string): Promise<UserCredential> {
    const result = signInWithEmailAndPassword(this.auth, email, password);
    console.log(result);
    result.then((userCredential) => {
      const user = userCredential.user;
      this._utilisateur = new User(user.email!, user.uid);
      this._$estConnecteSubject.next(true);
      // localstorage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userEstConnecte', JSON.stringify(user));
    });
    return result;
  }

  sendResetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  getInfosUser() {
    const userEstConnecte = localStorage.getItem('userEstConnecte');
    const user = localStorage.getItem('user');
    if (userEstConnecte) {
      console.log(userEstConnecte);
      // this._utilisateur = new User(userEstConnecte.email!, userEstConnecte.uid);
      // this._$estConnecteSubject.next(true);
    }
  }

  signOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('userEstConnecte');
    this._utilisateur = undefined;
    this._$estConnecteSubject.next(false);
  }

  getEmail(): string | null {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      return userObj.email;
    }
    return null;
  }
}
