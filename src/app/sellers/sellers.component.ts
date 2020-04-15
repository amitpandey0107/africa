import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { ChatService } from 'app/services/chat.service';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { CommonVar } from 'app/CommonVar';

@Component({
  selector: 'app-sellers',
  templateUrl: './sellers.component.html',
  styleUrls: ['./sellers.component.scss', '../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [ApiService, LoginService]
})
export class SellersComponent implements OnInit{
  notifications: any = [];
  pageSize: number | 10;
  pageNumber: number | 1;
  loader: boolean | false;
  onNewMessageReceived: Function;

  constructor(@Inject(AppStorage) private appStorage: Storage, private apiService: ApiService,
   public dialog: MatDialog, private _router: Router,
   private _chat: ChatService, public CommonVar: CommonVar) {

   // this.notifications = JSON.parse(localStorage.getItem('notification'))
  }

  ngOnInit() {
    this.refreshListings();
    this.CommonVar.isNotificationScreen = true;
    this._chat.setNotificationCount(0);
  }
  
  ngOnDestroy() {
    this.CommonVar.isNotificationScreen = false;
  }
  setNotifyCount(id) {
    const reqData = {
      'userID': this.appStorage.getItem('id'),
      'notificationID': id
    }
    this.apiService.setReadNotification(reqData).subscribe(res => {
      this._chat.setNotificationCount(0);
      this._router.navigate(['/chat']);
    });
  }

  
  refreshListings() {
    this.loader = true;
    let url = 'userID='+this.appStorage.getItem('id');
    this.apiService.getNotifications(url).subscribe(res => {
      this.loader = false;
      this.notifications = res.Data;
      console.log(res.Data)
    }, (err) => {
      console.log('Err', err)
      if (err) {
        this.loader = false;
        console.log('Some error occured');
      }
    });
  }

        }
