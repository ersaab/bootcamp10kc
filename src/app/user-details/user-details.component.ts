import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { user } from '../Model/user.model';
import { LogService } from '../Services/log.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss', '../user-enroll/user-enroll.component.scss']
})
export class UserDetailsComponent implements OnInit {

  users: user[] = [];
  userDetailsForm: FormGroup;
  imageUrl: any = '';

  get fc() {
    return this.userDetailsForm.controls
  }

  constructor(public fb: FormBuilder,
    private router: Router,
    private ls: LogService,
  ) {
  }

  logout() {
    this.router.navigate(['']);
  }

  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files[0];

    //File Preview
    const reader = new FileReader();
    const fileName = file.name;
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.fc['imgBase64'].patchValue(this.imageUrl);
      this.fc['imgName'].patchValue(fileName);
    }
    reader.readAsDataURL(file);
  }

  initForm() {
    this.userDetailsForm = this.fb.group({
      imgName: ["", [Validators.required]],
      imgBase64: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(14)]],
    });
  }

  submit() {
    if (this.userDetailsForm.valid) {
      this.ls.addUser(this.userDetailsForm.value);
    }
    else {
      this.ls.addUser(this.userDetailsForm.value);
    }
  }


  ngOnInit(): void {
    this.initForm();
    this.ls.getUsers();
    this.ls.updatedUsers().subscribe(
      (users: user[]) => {
        this.users = users;
      }
    )

  }

}
