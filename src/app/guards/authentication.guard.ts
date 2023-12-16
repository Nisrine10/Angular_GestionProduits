import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {AppStateService} from "../services/app-state.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard{
  constructor(private appStateService:AppStateService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appStateService.authState.isAuthenticated==true){
      return true;
    }else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
}
