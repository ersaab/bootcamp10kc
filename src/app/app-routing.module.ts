import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Shared/login/login.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEnrollComponent } from './user-enroll/user-enroll.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: UserEnrollComponent,
    // canActivate: [AuthGuard],
  },

  // {
  //   path: 'details',
  //   component: UserDetailsComponent,
  //   // canActivate: [Auth],
  // },
  {
    path: ':id/details',
    component: UserDetailsComponent,
    // canActivate: [Auth],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
