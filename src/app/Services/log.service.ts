import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
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
    return this.http.post(this.postUserApi, formData);
  }

  getUsers() {
    this.http.get<{ message: string, users: user }>(this.getUsersApi)
      .pipe(map(
        (response: any) => {
          return response.users.map((user: any) => {
            return {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              imageName: user.imageName,
              imageBase64: user.imageBase64,
            }
          })
        }
      ))
      .subscribe(
        (mappedUsers: any) => {
          this.users = mappedUsers;
          console.log("User List is ", mappedUsers);
          this.usersUpdated.next([...this.users]);
        }
      )
  }



}
