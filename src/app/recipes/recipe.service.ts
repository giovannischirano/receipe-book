import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {

  //recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(0, 'Pasta', 'Pasta buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Meat', 1),
      new Ingredient('Pasta', 1)
    ]),
    new Recipe(1, 'Riso', 'Riso buono', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Riso', 1),
      new Ingredient('buono', 1)
    ]),
    new Recipe(2, 'Carne', 'Carne buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg',
    [
      new Ingredient('Carne', 1),
      new Ingredient('Sale', 1)
    ])
  ];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getReceipes() {
    return this.recipes.slice();
  }

  getReceipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
