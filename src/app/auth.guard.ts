import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs/operators';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) {
      if (state.url.includes('/signin') || state.url.includes('/register')) {
        return this.router.parseUrl('/');
      } else {
        return true;
      }
    } else {
      if (state.url.includes('/admin')) {
        return this.router.parseUrl('/signin');
      } else {
        return true;
      }
    }
  }
}
