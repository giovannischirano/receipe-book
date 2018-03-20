import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';
import 'rxjs/Rx';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { Ingredient } from './ingredient.model';
import { RecipeDB } from '../recipes/recipe-db.model';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private authService: AuthService, private afDb: AngularFireDatabase) { }

  /*storeRecipes(recipes: Recipe[]): Observable<any> {
    const token = this.authService.getIdToken();
    const authURL = '&auth=' + token;

    return this.http.put('https://giovanni-ngrecipes.firebaseio.com/recipes.json?auth=' + token, recipes);
  }*/

  getRecipes() {
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
          //console.log(data);
          const recipes: Recipe[] = [];
          
          for (const r in data) {
            const recipe = new Recipe(data[r]['name'], data[r]['description'], data[r]['imagePath'], data[r]['ingredients'], data[r]['uid'], r);
            recipes.push(recipe);
          }
          return recipes;
        }
      )
  }

  storeRecipe(recipeToStore: RecipeDB): Observable<any> {

    const dbURL = 'https://giovanni-ngrecipes.firebaseio.com/recipes';
    const token = this.authService.getIdToken();
    const uid = this.authService.getUserUid();
    recipeToStore.uid = uid;
    const authURL = '&auth=' + token;

    const urlPutRecipe = dbURL + '.json?' + authURL;
    
    return this.http.post(urlPutRecipe, recipeToStore);
  }

  editRecipe(id: string, recipeToEdit: RecipeDB): Observable<any> {
    
    const dbURL = 'https://giovanni-ngrecipes.firebaseio.com/recipes/';
    const token = this.authService.getIdToken();
    const uid = this.authService.getUserUid();
    recipeToEdit.uid = uid;

    const authURL = '&auth=' + token;

    const urlPutRecipe = dbURL + id + '.json?' + authURL;
    
    return this.http.put(urlPutRecipe, recipeToEdit);
  }

  deleteRecipe(id: string): Observable<any> {
    const dbURL = 'https://giovanni-ngrecipes.firebaseio.com/recipes/';
    const token = this.authService.getIdToken();
    const uid = this.authService.getUserUid();

    const authURL = '&auth=' + token;

    const urlPutRecipe = dbURL + id + '.json?' + authURL;
    
    return this.http.delete(urlPutRecipe);
  }

  

}
