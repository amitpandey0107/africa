import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { ChatService } from 'app/services/chat.service';
import { newmsglimitDialogComponent } from '../dialogs/newmsglimit/newmsglimit.dialog.component';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';


@Component({
  selector: 'app-dealdetail',
  templateUrl: './dealdetail.component.html',
  styleUrls: ['./dealdetail.component.scss','../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [ApiService, ChatService]
})
export class DealdetailComponent implements OnInit {
  public selectedItem: any;
  document
  constructor(private chatService: ChatService, private router: Router, 
  @Inject(AppStorage) public appStorage: Storage, public dialog: MatDialog) {
  }

  goBack() {
    window.history.back();
  };





  ngOnInit(): void {
   // this.refreshListing();
   this.selectedItem = JSON.parse(localStorage.getItem('selected'));
   this.document = "http://dev.gdsoftwares.com:3001/"+this.selectedItem.document
  }

  getUrlCrypto(type) {
    if (type)
      var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/" + type.toLowerCase() + ".svg";
    return newUrl
  }

  getFlag(code) {
    if (code)
      var newUrl = "https://s3.amazonaws.com/zalate/public/flags/" + code.toLowerCase() + ".svg";
    return newUrl;
  }
}
