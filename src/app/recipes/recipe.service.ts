import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeDB } from './recipe-db.model';

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
    return this.dataStorageService.getRecipes()
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(idRecipe: number) {
    if(confirm("Are you sure to delete this recipe?")) {
      const keyRecipe = this.recipes[idRecipe].id;
      this.dataStorageService.deleteRecipe(keyRecipe)
      .subscribe(
        (response: Response) => {
          this.recipes.splice(idRecipe, 1);
          console.log("Recipe deleted!");
          this.recipesChanged.next(this.recipes.slice());
        }
      );
    }
  }

  storeRecipe(recipeDB: RecipeDB) {
    this.dataStorageService.storeRecipe(recipeDB)
      .subscribe(
        (response: Response) => {
          const recipe: Recipe = new Recipe(recipeDB.name, recipeDB.description, recipeDB.imagePath, recipeDB.ingredients, recipeDB.uid, response.json()['name']);
          this.recipes.push(recipe);
          console.log("New Recipe saved!");
          this.recipesChanged.next(this.recipes.slice());
        }
      );
  }

  editRecipe(idRecipe: number, recipeDB: RecipeDB) {
    const keyRecipe = this.recipes[idRecipe].id;
    this.dataStorageService.editRecipe(keyRecipe, recipeDB)
      .subscribe(
        (response: Response) => {
          this.recipes[idRecipe].setRecipe(recipeDB);
          console.log("Recipe edited!");
          this.recipesChanged.next(this.recipes.slice());
        }
      );
  }

  /*storeRecipes() {
    this.dataStorageService.storeRecipes(this.recipes)
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }*/

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

}
