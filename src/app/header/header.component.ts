import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from './../recipes/recipe.service';
import { Response } from '@angular/http';
import { AuthService } from './../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  //@Output() featureSelected = new EventEmitter<string>();

  subscription: Subscription;
  isAuthent : boolean;

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(
        (user) => {
          if(user) {
            this.isAuthent = true;
          } else {
            this.isAuthent = false;
          }
        }
      );
  }
  
  saveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    this.recipeService.getRecipesFromDB2();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    //if(this.subscription) this.subscription.unsubscribe();
  }
}