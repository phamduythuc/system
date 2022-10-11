import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree
} from '@angular/router';
import {Observable, of, switchMap, map} from 'rxjs';
import {AuthService} from 'app/core/auth/auth.service';
import {AccountService} from "../account.service";
import {environment} from "../../../../environments/environment";
import {tick} from "@angular/core/testing";
import {trigger} from "@angular/animations";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private accountService: AccountService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._authService.getUserInfoSSO()
          .pipe(map((acc) => {
            if (acc) {
              const authorities = route.data['authorities'];
              if (!authorities) {
                return true;
              }
              const auth = acc.permissions;
              const found = authorities.some(r => auth.indexOf(r) >= 0)
              if (!found) {
                this._router.navigateByUrl('/dashboards');
              }
              // if(auth){
              //     return true;
              // }
              return true;
            } else {
              window.location.href = environment.redirectUrl;
              return false;
            }
          }));
        // return true;
        // return this.accountService.identity().pipe(
        //     map(account => {
        //         if (account) {
        //             const authorities = route.data['authorities'];
        //             console.log(authorities)
        //             if (!authorities || authorities.length === 0 || this.accountService.hasAnyAuthority(authorities)) {
        //                 return true;
        //             }
        //
        //             // if (isDevMode()) {
        //             //     console.error('User has not any of required authorities: ', authorities);
        //             // }
        //             this._router.navigate(['accessdenied']);
        //             return false;
        //         }
        //         this._router.navigate(['/sign-in']);
        //         return false;
        //     })
        // );
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const redirectUrl = state.url === '/sign-out' ? '/' : state.url;
        return this._check(redirectUrl);
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this._check('/');
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @param redirectURL
     * @private
     */
    private _check(redirectURL: string): Observable<boolean> {
        // Check the authentication status
        return of(true);
        // return this._authService.check()
        //            .pipe(
        //                switchMap((authenticated) => {
        //
        //                    // If the user is not authenticated...
        //                    if ( !authenticated )
        //                    {
        //                        // Redirect to the sign-in page
        //                        this._router.navigate(['sign-in'], {queryParams: {redirectURL}});
        //
        //                        // Prevent the access
        //                        return of(false);
        //                    }
        //
        //                    // Allow the access
        //                    return of(true);
        //                })
        //            );
    }
}
