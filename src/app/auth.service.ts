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

    constructor(private http: HttpClient, private storage: StorageService, private _cookie: CookieService) { }

    getToken() {
        return this._cookie.get('access');
        //  return this.token;
    }


    login(email: string, password: string, captcha: boolean): Observable<any[]> {
        const authData: AuthData = { email: email, password: password, captcha: captcha };
        return this.http.post<{ token: string }>(this.loginApi, authData)
            .pipe(map((response) => {
                return response as any;
            }));
    }

    //   logout() {
    //     this.http.get(this.logoutApi);
    //     this.storage.clear();
    //     this.storage.clearSession();
    //     window.location.href = '';
    //     //console.log('logout clicked');
    //   }


}
