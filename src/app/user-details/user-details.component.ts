import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss', '../user-enroll/user-enroll.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm: FormGroup;
  imageUrl: any = '';


  get fc() {
    return this.userDetailsForm.controls
  }

  constructor(public fb: FormBuilder,
    private router: Router
  ) {
  }

  logout() {
    this.router.navigate(['']);
  }

  showPreview(event: any) {
    const file = (event.target as HTMLInputElement).files[0];

    //File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      this.fc['imgBase64'].patchValue(this.imageUrl);
      // this.postData(this.mortgageApplication, () => {
      //   //this.router.navigate(['']);
      //   //console.log("Img Url in Preview", this.imageUrlBack);
      //   this.spinWheel = false;
      // });
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


  ngOnInit(): void {
    this.initForm();
  }
}
