import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private Auth: AuthenticationService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
       
        return this.checkLogin(url);
    }
    checkLogin(url: string): boolean {
        if (this.Auth.loggedIn) {
            //this.router.navigate(['/order']);
            return true;
        }
        
        
            // Navigate to the login page with extras
        this.router.navigate(['/login']);
            return false;
       
    }
}
