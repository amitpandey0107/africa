import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { Router} from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';

@Injectable()
export class LoginService {
    public token: string;

    constructor(@Inject(AppStorage) private appStorage: Storage, private router: Router) { }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.appStorage.removeItem('token');
        this.appStorage.removeItem('email');
        this.appStorage.removeItem('role');
        this.appStorage.removeItem('UserId');
        this.router.navigate(['/']);
       window.open('http://dev.gdsoftwares.com/africa/index.html', '_self')
    }
}
