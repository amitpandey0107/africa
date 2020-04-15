import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-accountedit',
  templateUrl: './accountedit.component.html',
  styleUrls: ['./accountedit.component.scss','../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers:[LoginService, ApiService]
})
export class AccountEditComponent implements OnInit {
  slideHeight: boolean = false;
  public editForm: FormGroup;
  submitted = false;
  countries:any;
  countryCode:any;
  countryRequest:any;
  selectedCountry= {name: '', code: ''};
 
  constructor(private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder,private router: Router,private loginService: LoginService,private apiService: ApiService) {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
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
    if (this.editForm.invalid) {
      return;
    }
    this.loading = !this.loading;
    this.router.navigate(['/account']);
  }
  onLogout(){
    this.loginService.logout();
  };
  onCountryChange(countryCode) {
    this.countries.forEach(country => {
      if (country.code == countryCode) {
        this.selectedCountry.code = country.code;
        this.selectedCountry.name = country.name;
        this.countryRequest = country.code + ':' + country.name;
      }
    });
  }
  getCountries() {
    this.apiService.getCountries().subscribe(res => {
      if (res && res.length) {
        this.countries = res;
        this.selectedCountry.code = res[0].code;
        this.selectedCountry.name = res[0].name;
        this.countryRequest = res[0].code + ':' + res[0].name;
      }
      if (res.message) {
        if (res.message == 'jwt expired') { console.log('Error fetching profile') }
        else { console.log('This popped up error:', res.message) }
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  };

  ngOnInit(): void {
    const t = window;
    const t1 = document;
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
      location: [''],
      WhatsApp: ['', Validators.required],
      telegram:['', Validators.required]
    });
    this.getCountries();
  }
}
