import { Component, OnInit } from '@angular/core';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-refferalreward',
  templateUrl: './refferalreward.component.html',
  styleUrls: ['./refferalreward.component.scss'],
  providers:[LoginService]
})
export class RefferalrewardComponent implements OnInit {
  slideHeight: boolean = false;
  RefferalCode:string = 'zalaterefferalcode404';
  constructor(private http: TransferHttpService, private router: Router,private loginService: LoginService) {}
  onBack() {
    this.router.navigate(['/account']);
  }
  onLogout(){
    this.loginService.logout();
  };

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('Submitted');
  }
}
