import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthData } from './auth-data.model';
import { user } from './Model/user.model';
import { StorageService } from './Services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    loggedInUser: user[] = [];
    private token: any;
    loginApi = `${environment.apiKey}login`;
    getUsersApi = `${environment.apiKey}users`;

    constructor(private http: HttpClient, private storage: StorageService, private _cookie: CookieService) { }

    getToken() {
        return this._cookie.get('access');
        //  return this.token;
    }

    login(email: string, password: string, captcha: boolean) {
        const authData: AuthData = { email: email, password: password, captcha: captcha };
        return this.http.post<{ token: string }>(this.loginApi, authData).subscribe((response: any) => {
            const token = response.token;
            this.token = token;
            this._cookie.set("access", token);
        })
    }









    //   public userDataUpdated: Subject<LoggedInUser> = new Subject<LoggedInUser>();
    //   data: LoggedInUser;
    //   isAuthenticated(): Observable<any> {
    //     return this.http.get(this.api).pipe(
    //       map(res => {
    //         // this.setCurrentUserData(res as any);
    //         this.setCurrentUserData(res as LoggedInUser);
    //         //this.data = res;
    //         return of(true);
    //       }),
    //       catchError((error: HttpErrorResponse) => {
    //         if (error.error instanceof ErrorEvent) {
    //           console.error('Frontend error:', error.error.message);
    //         }
    //         else {
    //           console.error('Backend error:', error.status, error.error); 
    //           this.setCurrentUserData(null);
    //           // // 401 unauthorized
    //           // if (error.status === 401) {
    //           //     return of(false); 
    //           // }
    //           return of(false);
    //         }

    //         return throwError('Please try again later.');
    //       })
    //     );
    //   }

    //   getCurrentUser(): Observable<any> {
    //     return this.http.get(this.api);
    //   }

    //   private setCurrentUserData(userData: LoggedInUser): void {
    //     this.data = {
    //       ...userData
    //     };
    //   }
    //   getCurrentUserData(): LoggedInUser {
    //     return this.data;
    //   }

    //   logout() {
    //     this.http.get(this.logoutApi);
    //     this.storage.clear();
    //     this.storage.clearSession();
    //     window.location.href = '';
    //     //console.log('logout clicked');
    //   }


}
