import { Subject } from 'rxjs/Subject';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { delay } from 'q';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  subscription: Subscription;
  afterLogin = true;
  technicalError = false;
  loadingImage = true;

  constructor(private router: Router, private recipeService: RecipeService, private authService: AuthService) { }

  ngOnInit() {
    
    this.recipeService.getRecipesFromDB()
      .subscribe(
        (recipes: Recipe[]) => {
          console.log("Call to get recipes completed!.. Recipes #:" + recipes.length);
          console.log(recipes);
          this.loadingImage = false;
          this.recipeService.setRecipes(recipes);
        },
        (error) => {
          console.log("Technical Error :(");
          this.loadingImage = false;
          this.technicalError = true;
        }
      );
    
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        //this.router.navigate(['/recipes']);
      }
    );
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
  }

}
