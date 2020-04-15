import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordRoutes } from './forgetpassword.routing';
import { ForgetpasswordComponent } from './forgetpassword.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

import { NewPasswordComponent } from './new/newpassword.component';

@NgModule({
  imports: [
    CommonModule,
    ForgetpasswordRoutes,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule
    
  ],
  declarations: [ForgetpasswordComponent, NewPasswordComponent]
})
export class ForgetpasswordModule { }
