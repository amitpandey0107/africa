import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers:[LoginService]
})
export class ContactComponent implements OnInit {
  slideHeight: boolean = false;
  public contactForm: FormGroup;
  submitted = false;
  mode = 'email';
 
  constructor(private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder,private router: Router,private loginService: LoginService) {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.contactForm.controls;
  }
  loading = false;
  error = false;
  errorText = '';
  onBack() {
    this.router.navigate(['/account']);
  }

  onSubmit() {
    this.submitted = true;
    //this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    if (this.contactForm.invalid) {
      return;
    }
    this.loading = !this.loading;
    this.router.navigate(['/account'],{ queryParams: { contact: true } });
  }
  onLogout(){
    this.loginService.logout();
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      message: ['', Validators.required]
    });
  }
}
