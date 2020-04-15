import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { NgZone, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { ApiService } from '../../services/api.service';
import { ChatService } from 'app/services/chat.service';



@Component({
	selector: 'app-newpassword',
	templateUrl: './newpassword.component.html',
	styleUrls: ['./newpassword.component.css'],
	providers: [LoginService, ApiService]
})

export class NewPasswordComponent implements OnInit{

	constructor( private router: Router, private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {

		this.route.params.subscribe(params => {
			this.email = params.email;
			this.uid = params.uid;
			console.log('Email:', this.email, ' UID:', this.uid);
		});

	}

	uid;
	email;
	loading = true;
	realUID = false;
	public fbForm: FormGroup;
	error = false;
	errorText = '';
	resetSuccessful = false;

	resetLoading = false;

	resetError = false;


	showBlocked(){
		this.loading = false;
		this.realUID = false;
	}

	showForm(){
		this.realUID = true;
		this.loading = false;
	}

	ngOnInit(){
		this.fbForm = this.formBuilder.group({
			password: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
			repeatPassword: ['', Validators.required],
		});
		this.loading = true;
		this.apiService.checkForgotPassword(this.email, this.uid).subscribe(res=>{
			console.log(res);
			if(res.message == 'No user or error'){
				console.log('Not a real UID');
				let this2 = this;
				setTimeout(function(){
					this2.showBlocked()
				}, 2000)
				return;
			}
			if(res.message == 'No UID found in user database'){
				console.log('Not a real UID');
				let this2 = this;
				setTimeout(function(){
					this2.showBlocked()
				}, 2000)
				return;
			}

			if(res.message = 'User with id exists'){
				console.log('Real UID');
				let this2 = this;
				setTimeout(function(){
					this2.showForm()
				}, 2000)
				return;
			}

		})
	}



	submitPassword(){
		this.resetLoading = true;
		if(this.fbForm.controls.password.value == this.fbForm.controls.repeatPassword.value){
			this.error = false;
			if(this.fbForm.controls.password.valid){
				console.log('It is valid');
				this.apiService.enterForgotPassword(this.email, this.uid, {
					"password": this.fbForm.controls.password.value
				}).subscribe(res=>{
					this.resetLoading = false;
					console.log(res);
					if(res.message == 'Password successfully changed'){
						this.resetSuccessful = true;
						return;
					}
					if(res.message != 'Password successfully changed'){
						this.resetError = true;
						return;
					}
				})
			}
		}
		else{
			this.error = true;
			this.errorText = 'Passwords must match'
		}
	}



}
