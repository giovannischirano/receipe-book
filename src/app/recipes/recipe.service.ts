import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];/*[
    new Recipe(0, 'Pasta', 'Pasta buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Pasta', 1)
    ],'DPBPpimt67O7QaIKSurtufQpgG52'),
    new Recipe(1, 'Riso', 'Riso buono', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Riso', 1),
      new Ingredient('buono', 1)
    ],'DPBPpimt67O7QaIKSurtufQpgG52'),
    new Recipe(2, 'Carne', 'Carne buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Carne', 1),
      new Ingredient('Sale', 1)
    ],'OrrsuQbrm3X5kKFhPx5EMzoe7LP2')
  ];*/

  constructor(private dataStorageService: DataStorageService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipesFromDB() {
    return this.dataStorageService.getRecipes();
      // .subscribe(
      //   (recipes: Recipe[]) => {
      //     console.log("Call to get recipes completed!.. Recipes #:" + recipes.length);
      //     this.recipes = recipes;
      //     this.recipesChanged.next(this.recipes.slice());
      //   },
      //   (error) => {console.log("Errore tecnico");}
      // );
  }

  getRecipesFromDB2() {
    return this.dataStorageService.getRecipes()
      .subscribe(
        (recipes: Recipe[]) => {
          console.log("Call to get recipes completed!.. Recipes #:" + recipes.length);
          this.setRecipes(recipes);
        },
        (error) => {
          console.log("Technical Error :(");
        }
      );
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  storeRecipes() {
    this.dataStorageService.storeRecipes(this.recipes)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

}
