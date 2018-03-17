import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  //token: string;

  constructor(private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          /*firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => { this.token = token; console.log(token); }
            )*/
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

  getIdToken() {
    //return firebase.auth().currentUser.getIdToken();
      /*.then(
        (token: string) => { console.log(token); return token; }
      )*/
      const tokenKey = Object.keys(window.localStorage)
        .filter(it => it.startsWith('firebase:authUser'))[0];
      const accessToken = JSON.parse(localStorage.getItem(tokenKey))['stsTokenManager']['accessToken'];
      
      return accessToken;
  }

  getUserUid() {
    const uid = firebase.auth().currentUser.uid;
    //console.log(uid);
    //console.log(uid);
    /*const tokenKey = Object.keys(window.localStorage)
      .filter(it => it.startsWith('firebase:authUser'))[0];
    const uid = JSON.parse(localStorage.getItem(tokenKey))['providerData'][0]['uid'];
    console.log("storage: "+uid);*/
    
    return uid;
  }

  isAuthenticated() {
    return firebase.auth().currentUser != null;
    //return firebase.auth().currentUser != null;

    /*if(user != null) {
      //console.log("true");
      return true;
    } else return false;*/
  }
  /*isAuthenticated(){
    return Observable.create(
      (observer: Observer<boolean>) => {
        const bool = firebase.auth().currentUser != null ? true : false;
        console.log("sono in observable:"+bool);
        observer.next(bool);
      }
    )
  }*/
    /*let bool = false;
    firebase.auth().onAuthStateChanged(
      user => {
        if (user) { bool = true; }
        else { bool = false; }
        }
      );*/

  /*isAuthenticated(): Observable<boolean> {
    const state = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log (user.email);
            state.next(true);
        } else {
          console.log ('No user.email');
            state.next(false);
        }
    });
    return state.asObservable();
  }*/
  
}