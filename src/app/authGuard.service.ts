// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable, of, Subject, throwError } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { LoggedInUser } from './LoggedInUser';
// import { StorageService } from './Services/storage.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService {

//   constructor(private http: HttpClient, private storage: StorageService) { }
//   public userDataUpdated: Subject<LoggedInUser> = new Subject<LoggedInUser>();

//   // api: string = `${environment.host}api/Auth/LoginStatus`;
//   // logoutApi: string = `${environment.host}api/Auth/Logout`;

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


// }
