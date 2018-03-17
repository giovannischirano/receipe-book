import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import 'rxjs/Rx';
import * as firebase from 'firebase';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private authService: AuthService) { }

  storeRecipes(recipes: Recipe[]): Observable<any> {
    const token = this.authService.getIdToken();
    
    return this.http.put('https://giovanni-ngrecipes.firebaseio.com/recipes.json?auth=' + token, recipes);
  }

  getRecipes() {
    
    //console.log("firebase query: " + firebase.database().ref("recipes"));
    /*const ref = firebase.database().ref("recipes");
    ref.on("value", function(data) {
      console.log(data.val());
    });*/
    const dbURL = 'https://giovanni-ngrecipes.firebaseio.com/recipes';
    const token = this.authService.getIdToken();
    const uid = this.authService.getUserUid();
    const authURL = '&auth=' + token;

    const urlByUser = dbURL + '.json?orderBy="uid"&equalTo="'+uid+'"' + authURL;

    //const urlByKey = dbURL + '.json?orderBy="$key"&equalTo="0"' + authURL;

    return this.http.get(urlByUser)
      .timeout(1000)
      .map(
        (response: Response) => {
          const data = response.json();
          console.log(data);
          const recipes: Recipe[] = [];
          
          for (const r in data) {
            recipes.push(data[r]);
          }
          return recipes;
        }
      )
  }

}
