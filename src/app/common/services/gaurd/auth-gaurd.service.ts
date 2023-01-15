import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(public router: Router,
    public accountService: AccountService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    console.log('test')
    if (!this.accountService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returl: route.url } });
      return false;
    }
    return true
  }
}
