import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private isAuth : boolean = false;

  constructor(private authService : AuthService, private router : Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.isAuthStatus.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
    if(this.isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
