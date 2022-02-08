import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/auth.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ToasterService } from 'src/app/Services/toaster.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  tokenId: any;
  spin: boolean = false;
  errorMessage: string = '';
  details: any;

  constructor(private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private cookie: CookieService,
    private storage: StorageService,
    private toast: ToasterService
  ) { }

  captchaKey: string = `${environment.captchaKey}`;
  public captchaIsLoaded = false;
  public captchaSuccess = false;
  public captchaIsExpired = false;
  public captchaResponse?: string;

  public theme: 'light' | 'dark' = 'light';
  public size: 'compact' | 'normal' = 'normal';
  public lang = 'en';
  public type: 'image' | 'audio';

  handleSuccess(e: any) {
    //  console.log("ReCaptcha", e);
  }

  navigate() {
    this.router.navigate(['/register']);
  }

  signedIn(id: string) {
    this.router.navigate([id + '/details']);
  }

  login() {
    if (this.loginForm.valid) {
      this.spin = true;

      this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value, true).subscribe(
        (response: any) => {
          this.spin = false;
          console.log("login Done", response)
          this.cookie.set("access", response.token);
          this.signedIn(response.userId);
        },
        (error: any) => {
          this.spin = false;
          this.errorMessage = "";
          switch (error.status) {
            case 400:
              this.errorMessage = "Email/Password incorrect!";
              break;
            case 401:
              this.errorMessage = "Unauthorized user!";
              break;
            case 404:
              this.errorMessage = "Url not found.";
              break;
            case 500:
              this.errorMessage = "Email/Password incomplete!";
              break;
          }
        }
      )

      // this.router.navigate(['details']);

      //   this._ls.login(this.loginForm.value).subscribe(
      //     (response: any) => {
      //       this.spin = false;
      //       this.details = response;
      //       this.storage.setSessionItem('access', response.token);
      //       // this.toast.showSuccess('Welcome to 10kc Bootcamp', '');
      //       // this.router.navigate(['backOffice']);
      //       this.redirect();
      //     },
      //     (error: any) => {
      //       this.spin = false;
      //       this.errorMessage = "";
      //       switch (error.status) {
      //         case 400:
      //           this.errorMessage = "Email/Password incorrect!";
      //           break;
      //         case 401:
      //           this.errorMessage = "Unauthorized user!";
      //           break;
      //         case 404:
      //           this.errorMessage = "Url not found.";
      //           break;
      //         case 500:
      //           this.errorMessage = "Email/Password incomplete!";
      //           break;
      //       }
      //     }
      //   )
    }
  }

  // Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      recaptcha: [null, [Validators.required]],

    });
  }

  redirect() {

  }

  callBack() {
    // this._ls.check(this.cookie.get('access')).subscribe(
    //   (response: any) => {

    //     // this.router.navigate(['']);
    //     //  console.log("Success", response);
    //     this.details = response;
    //     this.redirect();
    //   },
    //   (error: any) => {
    //     //   console.log("Error", error);
    //   }
    // )
  }



  ngOnInit(): void {
    // this.callBack();
    this.initLoginForm();
    // this.callBack();
  }
}
