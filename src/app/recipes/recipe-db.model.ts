import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeDB{
    public id: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public uid: string;

    constructor(recipe: Recipe){
        this.name = recipe.name;
        this.description = recipe.description;
        this.imagePath = recipe.imagePath;
        this.ingredients = recipe.ingredients;
        this.uid = recipe.uid;
    }
}