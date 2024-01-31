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
    result.then((userCredential) => {
      const user = userCredential.user;
      this._utilisateur = new User(user.email!, user.uid);
      this._$estConnecteSubject.next(true);
      // localstorage
      localStorage.setItem('user', JSON.stringify(this._utilisateur));
      localStorage.setItem('userEstConnecte', JSON.stringify(true));
    });
    return result;
  }

  sendResetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  getInfosUser()  {
    const userEstConnecte = localStorage.getItem('userEstConnecte');
    const userStorage = localStorage.getItem('user');
    if (userEstConnecte && userStorage) {
      let user = JSON.parse(userStorage!) as User;
      this._utilisateur = user;
      this._$estConnecteSubject.next(true);
      return true; 
    }else{
      this._$estConnecteSubject.next(false);
      return false;
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
