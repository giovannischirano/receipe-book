import { Injectable, EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model'
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppinglistService {

  ingredientsChanged = new EventEmitter<boolean>();
  editIngredientIndex = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 15)
  ];

  constructor() { }

  getIngredients(){
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  updateIngredient(index: number, ingredient: Ingredient){
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.emit(true);
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.ingredientsChanged.emit(true);
  }

  addIngredients(ings: Ingredient[]){
    //console.log(ings);
    this.ingredients.push(...ings);
    this.ingredientsChanged.emit(true);
  }
  
  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.emit(true);
  }
}
