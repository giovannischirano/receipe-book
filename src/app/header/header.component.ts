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
    //console.log("header init");
    /*this.subscription = this.authService.isAuthenticated()
      .subscribe(
        (bool: boolean) => { 
          this.isAuthent = bool;
          console.log("header"+bool);
        }
      )*/
      /*this.isAuthent = this.authService.isAuthenticated();
      console.log(this.isAuthent);*/
      /*console.log("onInit isAuth() richiamato");
    this.isAuthent = this.authService.isAuthenticated();
    console.log("onInit: " + this.isAuthent);
    */}

  /*isAuth() {
    console.log("isAuth() richiamato");
    this.isAuthent = this.authService.isAuthenticated();
    return this.isAuthent;
  }*/

  /*onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/
  
  saveData() {
    this.recipeService.storeRecipes();
  }

  onFetchData() {
    console.log("click");
    console.log("stop");
    this.recipeService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    //if(this.subscription) this.subscription.unsubscribe();
  }
}