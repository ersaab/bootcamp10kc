// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { AuthService } from './auth.service';

// @Injectable({
//     providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//     constructor(
//         private auth: AuthService,
//         private router: Router
//     ) { }

//     canActivate(
//         route: ActivatedRouteSnapshot,
//         state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//         // return this.auth.isAuthenticated().pipe(
//         //     map((authenticated: boolean) => {
//         //         if (authenticated) {
//         //             return true;
//         //         }
//         //         else {
//         //             this.router.navigate(['']);
//         //             // const redirectURI = encodeURIComponent(state.url);
//         //             // window.location .href = '/login' + redirectURI;
//         //             return false;
//         //         }
//         //     })
//         // );
//     }
// }