import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  updatePhoneForm: FormGroup;
  applicantDob: string;
  changedMessage: string;
  errorMessage: string;

  get fc() {
    return this.updatePhoneForm.controls
  }

  constructor(public fb: FormBuilder,
    //private authO: AuthService,
    // private ts: Title,
    // private getApi: GetAllApplicationsService,
    private router: Router
  ) {
  }

  setPreviousPhone() {
    // this.fc['phoneNumber'].patchValue(this.authO.getCurrentUserData().PhoneNumber);
    // this.changedMessage = "";
    // this.errorMessage = "Not Updated";
    // this.fc['phoneNumber'].disable();
  }
  editMode() {
    this.fc['phoneNumber'].enable();
  }

  updateNumber() {
    //console.log(this.updatePhoneForm.value);
    // if (this.fc['phoneNumber'].value.length === 14) {
    //   this.getApi.updateUserById(this.appId, this.updatePhoneForm.value).subscribe(
    //     (res: LoggedInUser) => (
    //       this.fc['phoneNumber'].disable(),
    //       this.changedMessage = "Updated Successfully",
    //       this.errorMessage = "",
    //       console.log("Success")),
    //     (err: any) => (this.fc['phoneNumber'].disable(),
    //       this.fc['phoneNumber'].patchValue(this.authO.getCurrentUserData().PhoneNumber),
    //       this.errorMessage = "Not Updated",
    //       this.changedMessage = "",
    //       console.log("error is ", err))
    //   );
    // } else { };
  }
  appId: any;
  ngOnInit(): void {

    //this.appId = this.authO.getCurrentUserData().Id;

    this.updatePhoneForm = this.fb.group({
      //id: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      // password: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(14)]],
      // isAdmin: ["", [Validators.required]],
      dateOfBirth: ["", []],
    });

    //this.fc['id'].patchValue(this.authO.getCurrentUserData().Id);
    // this.fc['firstName'].patchValue(this.authO.getCurrentUserData().FirstName);
    // this.fc['lastName'].patchValue(this.authO.getCurrentUserData().LastName);
    // this.fc['email'].patchValue(this.authO.getCurrentUserData().Email);
    // this.fc['phoneNumber'].patchValue(this.authO.getCurrentUserData().PhoneNumber);
    // //console.log("dob", this.authO.getCurrentUserData().DateOfBirth)
    // if (this.authO.getCurrentUserData().DateOfBirth) {
    //   this.fc['dateOfBirth'].patchValue(this.authO.getCurrentUserData().DateOfBirth);
    //   var dobValue = new Date(this.authO.getCurrentUserData().DateOfBirth).toDateString();
    //   //console.log("dob ", dobValue)
    //   let fpart = dobValue.substring(4, 8);
    //   let spart = dobValue.substring(11, 16)
    //   this.applicantDob = fpart + " ** " + spart;
    // }
    // else {
    //   this.applicantDob = 'Not Found';
    // }


    this.fc['phoneNumber'].disable();

  }


}
