import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../Model/user.model';
import { ToasterService } from './toaster.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private users: user[] = [];
  private usersUpdated = new Subject<user[]>();
  postUserApi = `${environment.apiKey}addUser`;
  getUsersApi = `${environment.apiKey}users`;

  constructor(private ts: ToasterService, private http: HttpClient, private router: Router) { }

  updatedUsers() {
    return this.usersUpdated.asObservable();
  }

  login(postForm: any) {

  }

  addUser(formData: any) {
    return this.http.post<{ message: string }>(this.postUserApi, formData);
  }

  getUsers() {
    this.http.get<{ message: string, users: user }>(this.getUsersApi)
      .subscribe(
        (response: any) => {
          this.users = response.users;
          console.log("User List is ", response);
          this.usersUpdated.next([...this.users]);
        }
      )
  }



}
