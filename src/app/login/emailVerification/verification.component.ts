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
	selector: 'email-verification',
	templateUrl: './verification.component.html',
	styleUrls: ['./verification.component.scss'],
	providers: [LoginService, ApiService]
})

export class VerificationComponent implements OnInit{

	constructor( private router: Router, private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute) {

		this.route.params.subscribe(params => {
			this.token = params.token;
		});

	}



	loading = true;
	token;
	resetError = false;
	resetSuccessful = false;


	ngOnInit(){
		console.log('Token: ', this.token);
		this.loading = true;
		this.apiService.emailVerification(this.token).subscribe(res=>{
			console.log(res);
			if(res.message == 'Account verified successfully'){
				this.resetSuccessful = true;
			}
			else{
				this.resetError = true;
			}	

		})
	}


	


}
