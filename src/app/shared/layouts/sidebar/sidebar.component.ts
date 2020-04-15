import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { ApiService } from 'app/services/api.service';
import { ChatService } from 'app/services/chat.service';
import _ from "lodash";
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [LoginService],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})


export class SidebarComponent implements OnInit {
  public links: any[] = [];
  displayMenu = false;
  innerWidth;
  role;
  userId: string;
  token: string;
  count: number;
  notifyCount: number;


  constructor(private router: Router, private loginService: LoginService, 
    private chatService: ChatService, @Inject(AppStorage) private appStorage: Storage,
    private _service: ApiService) {
    this.getSize();
    this.userId = this.appStorage.getItem('id');
    this.token = this.appStorage.getItem('token');
    if(this.appStorage.getItem('token') != undefined && this.appStorage.getItem('token') != null && this.appStorage.getItem('token') != ''){
      this.loggedIn = true;
    }
    else{
      this.loggedIn = false;
    }
    this.unReadNotificationCount();
    this.unReadCount()

    this.chatService.updateCount().subscribe(message => { 
      this.calcalueCount()
     });
     this.chatService.notificationCount().subscribe(count => { 
      this.notifyCount = count;
     });
  }

  loggedIn = false;

  ngOnInit(): void {
    this.role = this.appStorage.getItem('role');
  }

  unReadCount(){
    this._service.getUnreadMessageCount(this.userId).subscribe(
      res => {
        let msgcount = {};
        res.Data.forEach(element => {
            _.forIn(element, function(value, key) {
              msgcount[key] = value
            });
          });
        localStorage.setItem('msgcount', JSON.stringify(msgcount))
        this.chatService.setUpdateCount(msgcount)
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }
  unReadNotificationCount(){
    this._service.getUnreadNotificationCount(this.userId).subscribe(
      res => {
        localStorage.setItem('NotificationCount', JSON.stringify(res.Data))
        this.chatService.setNotificationCount(res.Data)
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }

  
   calcalueCount() {
    let messages = JSON.parse(localStorage.getItem('msgcount'));
    let c = 0
    if(messages){
        _.forIn(messages, function(value, key) {
          c = c + messages[key];
        });
    }
      this.count = c;
}
  

  onLogout(){
    this.chatService.logoutUser(this.userId,this.token);
    this.loginService.logout();
  }


  onCollapse(){
    this.displayMenu = !this.displayMenu;
  }


  getSize(){
    this.innerWidth = window.innerWidth;
    if(this.innerWidth >= 600){
      this.displayMenu = true;
    }
  }

  checkCollapse(){
    if(this.innerWidth <= 600){
      this.displayMenu = false;
    }
  }


onResize(event){  
  this.innerWidth = event.target.innerWidth;
  if(this.innerWidth <= 600){
    this.displayMenu = false;
  }
  if(this.innerWidth > 600){
    this.displayMenu = true;
  }
}

}
