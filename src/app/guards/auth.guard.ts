import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router, @Inject(AppStorage) private appStorage: Storage,) { }

	canActivate() {
		if (this.appStorage.getItem('token') != null && this.appStorage.getItem('token') != undefined && this.appStorage.getItem('token') != '') {
			console.log('Token found, it is: ', this.appStorage.getItem('token'));
			return true;
		}
		if (this.appStorage.getItem('token') == null || this.appStorage.getItem('token') == undefined || this.appStorage.getItem('token') == '') {
			console.log('No token');
			this.router.navigate(['/login']);
			return false;
		}
	}
}