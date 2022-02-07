import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogService } from '../Services/log.service';

@Component({
  selector: 'app-user-enroll',
  templateUrl: './user-enroll.component.html',
  styleUrls: ['./user-enroll.component.scss']
})
export class UserEnrollComponent implements OnInit {

  userAddForm: FormGroup;
  imageUrl: any = '';
  btnSpin: boolean = false;

  get fc() {
    return this.userAddForm.controls
  }

  constructor(public fb: FormBuilder,
    private router: Router,
    private ls: LogService
  ) {
  }

  login() {
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
    this.userAddForm = this.fb.group({
      imgName: ["", [Validators.required]],
      imgBase64: ["", [Validators.required]],
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(10)]],
      password: ["", [Validators.required, Validators.maxLength(8)]],
    });
  }

  submit() {
    this.btnSpin = true;
    if (this.userAddForm.valid) {
      this.ls.addUser(this.userAddForm.value);
      this.btnSpin = false;

    }
    else {
      this.ls.addUser(this.userAddForm.value);
      this.btnSpin = false;

    }
  }



  ngOnInit(): void {
    this.initForm();
  }
}
