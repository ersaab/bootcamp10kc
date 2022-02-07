import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { user } from '../Model/user.model';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private users: user[] = [];
  private usersUpdated = new Subject<user[]>();
  postUserApi = `${environment.apiKey}addUser`;
  getUsersApi = `${environment.apiKey}users`;

  constructor(private ts: ToasterService, private http: HttpClient) { }

  updatedUsers() {
    return this.usersUpdated.asObservable();
  }

  login(postForm: any) {

  }

  addUser(formData: any) {
    return this.http.post<{ message: string }>(this.postUserApi, formData)
      .subscribe((response: any) => {
        console.log(response.message);
      })
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
