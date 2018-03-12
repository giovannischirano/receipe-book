import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getIdToken();

    return this.http.put('https://giovanni-ngrecipes.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getReceipes());
  }

  getRecipes() {
    const token = this.authService.getIdToken();

    return this.http.get('https://giovanni-ngrecipes.firebaseio.com/recipes.json?auth' + token)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        }
      )
  }

}
