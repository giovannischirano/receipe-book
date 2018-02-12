import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'

@Injectable()
export class ShoppinglistService {

  ingredientsChanged = new EventEmitter<boolean>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 15)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.emit(true);
  }
}
