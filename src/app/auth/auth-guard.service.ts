import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const isAuth = this.authService.isAuthGuard();
    
    if(!isAuth) {
      console.log("User not logged; please Login!");
      
      document.getElementById("alert_message").hidden = false;
      setTimeout(() => {
        document.getElementById("alert_message").hidden = true;
      }, 3000);
      
      this.router.navigate(['/signin']);
    }

    return isAuth;
  }

}