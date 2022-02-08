import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(private _cookie: CookieService, private storage: StorageService, private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.auth.getToken();

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ` + token),
    });

    return next.handle(req1);
  }

}
