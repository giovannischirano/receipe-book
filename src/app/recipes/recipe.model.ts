import { RecipeDB } from './recipe-db.model';
import { Ingredient } from '../shared/ingredient.model';

export class Recipe{
    public id: string;
    public name: string;
    public description: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public uid: string;

    constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[], uid: string, id?: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.uid = uid;
    }

    setRecipe(recipeDB: RecipeDB) {
        this.name = recipeDB.name;
        this.description = recipeDB.description;
        this.imagePath = recipeDB.imagePath;
        this.ingredients = recipeDB.ingredients;
        this.uid = recipeDB.uid;
    }
}