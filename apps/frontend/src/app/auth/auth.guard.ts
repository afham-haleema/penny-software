import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { Auth } from "../services/auth";

@Injectable({
    providedIn:'root'
})

export class AuthGuard implements CanActivate{
    constructor(private auth :Auth, private route:Router){}

    canActivate():boolean  {
        if(!this.auth.isLoggedIn()){
            this.route.navigate(['/auth'])
            return false
        }
        return true
    }
}