import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  
  private authState: Observable<firebase.User>;
  private currentUser: firebase.User = null;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  signupUser(email: string, password: string) {
    //firebase.auth().createUserWithEmailAndPassword(email, password)
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log("User registered!");
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => { 
          console.log("Something went wrong: " + error.message);
        }
      );
  }

  signinUser(email: string, password: string) {
    //firebase.auth().signInWithEmailAndPassword(email, password)
    this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log("User logged!");
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => { 
          console.log("Something went wrong: " + error.message);
        }
      );
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }

  getIdToken() {
      const tokenKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
      const accessToken = JSON.parse(localStorage.getItem(tokenKey))['stsTokenManager']['accessToken'];
      
      return accessToken;
  }

  getUserUid() {
    //const uid = firebase.auth().currentUser.uid;
    const uid = this.afAuth.auth.currentUser.uid;
    /*const tokenKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const uid = JSON.parse(localStorage.getItem(tokenKey))['providerData'][0]['uid'];*/
    
    return uid;
  }

  isAuthenticated() {
    return this.authState;
  }

  isAuthGuard() {
    return this.currentUser != null;
  }

  signWithGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        response => {
          console.log("User logged!");
          this.router.navigate(['/']);
        }
      )
      .catch(
        error => { 
          console.log("Something went wrong: " + error.message);
        }
      );
  }
  
}