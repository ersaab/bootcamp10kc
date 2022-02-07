import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm: FormGroup;

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

  ngOnInit(): void {

    this.userDetailsForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.maxLength(14)]],
    });
  }
}
