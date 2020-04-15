import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';
import { VerificationComponent } from './emailVerification/verification.component';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routing';


@NgModule({
  imports: [
    CommonModule,
    LoginRoutes,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
    
  ],
  declarations: [LoginComponent, VerificationComponent]
})
export class LoginModule { }
