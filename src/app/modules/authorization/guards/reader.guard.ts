import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReaderGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthorizationService,
  ) { }

  checkIsReader() {
    return this.authService.getCurrentUser().pipe(map(user => {
      if (!user || user.roleId !== 4) return false;
      return true
    }))
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsReader();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkIsReader();
  }
}
