import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { NgZone, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { ApiService } from '../services/api.service';
import { ChatService } from 'app/services/chat.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [LoginService, ApiService]
})

export class ForgetpasswordComponent {
  public forgetpasswordForm: FormGroup;
  submitted = false;
  constructor(private chatService: ChatService, private router: Router, private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder, private loginService: LoginService, private apiService: ApiService, ) {
  }

  ngOnInit() {
    this.forgetpasswordForm = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.forgetpasswordForm.controls;
  }

  loading = false;
  error = false;
  errorText = '';

  emailSent = false;




  onSubmit() {
    this.submitted = true;
    this.loading = true;
    //this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    if(!this.forgetpasswordForm.invalid){
      console.log('It is valid');
      this.apiService.forgotPassword({
        email: this.forgetpasswordForm.controls.email.value
      }).subscribe(res=>{
        console.log(res);
        this.error = false;
        if(res.message == 'Successfully sent'){
          this.loading = false;
          this.error = false;
          this.emailSent = true;
        }
        if(res.message == 'No user found with that email'){
          this.error = true;
          this.loading = false;
          this.errorText = 'No user found with that email address';
        }

      })
    }
    
    if (this.forgetpasswordForm.invalid) {
      this.error = true;
      this.errorText = 'Invalid email entered';
      this.loading = false;
      return;
    }
    
    /*
    this.loading = !this.loading;
    this.router.navigate(['/login']);
    */

  }



}
