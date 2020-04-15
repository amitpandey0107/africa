import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { LoginService } from 'app/services/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deatils',
  templateUrl: './deatils.component.html',
  styleUrls: ['./deatils.component.scss'],
  providers: [ApiService, LoginService]

})
export class DeatilsComponent implements OnInit {
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    return true;
  }
  deatils:any;
  constructor(
   private router: Router,
   public dialog: MatDialog) {
      this.deatils = JSON.parse(localStorage.getItem('selected'))
  }
  




  

back() {
  this.router.navigate(['/buyers'])
}

ngOnInit(): void {  
}

  
}
