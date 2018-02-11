import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('Pasta', 'Pasta buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg'),
    new Recipe('Riso', 'Riso buono', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg'),
    new Recipe('Carne', 'Carne buona', 'http://www.seriouseats.com/recipes/assets_c/2016/08/20160827-cherry-tomato-pasta-13-thumb-1500xauto-433876.jpg')
  ];

  constructor() { }

  getReceipes() {
    return this.recipes.slice();
  }

}
