import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { NotifierService } from 'angular-notifier';
import { ChatService } from 'app/services/chat.service';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { MessageService } from 'app/services/message/message.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService, NotifierService, ApiService, ChatService, TransferHttpService]
})

export class LoginComponent {
  private readonly notifier: NotifierService;
  public loginForm: FormGroup;
  submitted = false;
  deviceInfo = null;
  constructor(private chatService: ChatService, private router: Router, 
    private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage,
     private formBuilder: FormBuilder, private loginService: LoginService, 
     notifierService: NotifierService, private apiService: ApiService,
     private _messageService: MessageService,
     private _snackBar: MatSnackBar ) {
    this.notifier = notifierService;
     if (this.appStorage.getItem('token') != null && this.appStorage.getItem('token') != undefined && this.appStorage.getItem('token') != '') {
       this.router.navigate(['/buyers']);
     }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    console.log("logiin api"+this.deviceInfo);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  loading = false;
  error = false;
  errorText = '';

  onSubmit() {
    this.submitted = true;
    //this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = !this.loading;
    this.apiService.login({
      "email": this.loginForm.controls.email.value,
      "password": this.loginForm.controls.password.value,
      //"deviceTokenID": this._messageService.token,
      // "deviceName": '',
      // "deviceFullName": '',
      // "uid": '',
      // "osVersion": '',
      // "appVersion": "6.0.1"
      firebaseInstanceID: this._messageService.token ? this._messageService.token : 'not_allowd',
      uid:'',
      ipAddress:'',
      appVersion:'0.0.1',
      deviceFullName:'windows',
      osVersion:10
    }).subscribe(
      response => {
        if (response.Status == 1) {
          this.appStorage.setItem('token', response.Data.loginToken);
          this.appStorage.setItem('email', response.Data.email);
          this.appStorage.setItem('name', response.Data.name);
          this.appStorage.setItem('id', response.Data.userID);
          this.errorText = response.Message;
          this.router.navigate(['/buyers']);
          // this.apiService.getProfile(response.token).subscribe(res => {
          //   console.log('Login API res: ', res);
          //   console.log(res);
          //   if (res.message) {
          //     if (res.message == 'jwt expired') { 
          //       console.log('Error fetching profile') 
          //     }else { 
          //       console.log('This popped up error:', res.message) 
          //     }
          //   }else {
          //     this.appStorage.setItem('UserData', JSON.stringify(res));
          //     this.appStorage.setItem('listingsRemaining', res.listingsRemaining);
          //     this.appStorage.setItem('listingsUsed', res.listingsUsed);
          //     this.appStorage.setItem('firstName', res.firstName);
          //     this.appStorage.setItem('lastName', res.lastName);
          //     this.appStorage.setItem('matchesRemaining', res.matchesRemaining);
          //     this.appStorage.setItem('matchesUsed', res.matchesUsed);
          //     this.appStorage.setItem('UserId', res.id);
          //     this.appStorage.setItem('deviceID', response.deviceID);
          //     this.appStorage.setItem('email', res.email);
          //     this.appStorage.setItem('emailVerified', res.emailVerified);
          //     this.appStorage.setItem('emailVerifiedtoggle', res.emailVerified);
          //     this.appStorage.setItem('viewedOnboarding', res.viewedOnboarding);
          //     this.appStorage.setItem('viewedOnboardingtoggle', res.viewedOnboarding);
          //     this.chatService.initSocket(res.id,response.deviceID,res.email, response.token);
          //     this.router.navigate(['/buyers']);
          //   }
          // })
        }else {
          this.error = true;
          this._snackBar.open(response.Message, '', {
            duration: 2000,
          });
          this.errorText = 'Your username or password is incorrect';
          this.loading = false;
        }
      },(err) => {
        console.log('Err', err)
        if (err) {
          console.log('Login failed');
          this.error = true;
          this.errorText = 'Your username or password is incorrect';
          this.loading = false;
        }
      });
  }
}
