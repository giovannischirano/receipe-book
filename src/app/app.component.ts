import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //loadedFeature = 'recipe';

  /*onNavigate(feature: string) {
    this.loadedFeature = feature;
  }*/

  ngOnInit() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: "AIzaSyAEfN4C3vJoORMNXLEM-fzNeFaaBnBq8oo",
      authDomain: "giovanni-ngrecipes.firebaseapp.com",
      databaseURL: "https://giovanni-ngrecipes.firebaseio.com",
      projectId: "giovanni-ngrecipes",
    });
  }
}