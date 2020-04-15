import { Component,Inject } from '@angular/core';

import { MetaService } from '@ngx-meta/core';
import { ChatService } from 'app/services/chat.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { MessageService } from './services/message/message.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonVar } from './CommonVar';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  template: '<span class="d-none">{{ message | async | json }}</span>  <ngx-loading-bar color="#633a5a" includeSpinner="false" height="2.5px" ></ngx-loading-bar><router-outlet></router-outlet>        <notifier-container></notifier-container>',
  providers: [ ChatService, TranslateService]
})

export class AppComponent {
  onNewMessageReceived: Function;
  onAcceptInvite: Function;

  constructor(private chatService: ChatService,
    private _snackBar: MatSnackBar,
     @Inject(AppStorage) private appStorage: Storage,
     private readonly meta: MetaService,
     private messageService: MessageService,
     private _translate: TranslateService,
     public CommonVar: CommonVar) {
       if(localStorage.getItem('lan')){
        this._translate.setDefaultLang(localStorage.getItem('lan'));
       } else{
        this._translate.setDefaultLang('en');
       }
    this.meta.setTag('og:title', 'home ctor');
    this.messageService.requestPermission()
    this.messageService.receiveMessage()
    this.message = this.messageService.currentMessage
    this.chatService.initSocket(this.appStorage.getItem('id'));
    let vm = this
    vm.onNewMessageReceived = vm._onNewMessageReceived.bind(this);
    vm.onNewMessageReceived = vm._onNewMessageReceived.bind(this);
    vm.chatService.onNewNotification().subscribe(vm.onNewMessageReceived);
    vm.onAcceptInvite = vm._onAcceptInvite.bind(this);
    vm.onAcceptInvite = vm._onAcceptInvite.bind(this);
    vm.chatService.onAcceptInvite().subscribe(vm.onAcceptInvite);
  } 
  deviceInfo = null;
  eventstatus(){
    if(this.appStorage.getItem('id')){
    this.chatService.eventStatus(this.appStorage.getItem('id'),'sample_browser_version');
    this.chatService.onHandshake().subscribe(data => {
      if(data && data.users){
        data.users.filter(userId => {
          return userId != this.appStorage.getItem("id");
        }).forEach(userId => {
          this.chatService.getUserChatStatus(userId, data._id).subscribe();
        });
      }
      //  else {
      //   this.chatService.initSocket(this.appStorage.getItem('id'));
      // }

    });
    }
  }

  _onNewMessageReceived(msg) {
    let id = this.appStorage.getItem('id')
    if(!this.CommonVar.isNotificationScreen && msg.userID != id && id === msg.otherUserID){
      let count  = this.chatService.notifiyCount + 1;
      this.chatService.setNotificationCount(count);
      this._snackBar.open('New Interest', msg.userName+' have shown interest on request', {
        duration: 10000,
      });
    }
    console.log('got a msg: ', msg);
  }
  _onAcceptInvite(msg) {
    let id = this.appStorage.getItem('id')
    if(!this.CommonVar.isNotificationScreen && msg.userID != id && id === msg.to){
      let count  = this.chatService.notifiyCount + 1;
      this.chatService.setNotificationCount(count);
      this._snackBar.open('Request Accepted', 'Someone accepted your request', {
        duration: 10000,
      });
    }
    console.log('got a msg: ', msg);
  }
  eventping(){
    this.chatService.onpingPong();
  //  
  }
  message;

ngOnInit(): void {
  setInterval(()=> {
    this.eventstatus(); },30000); 
  
  setInterval(()=> {
    this.eventping(); },5000); 
}
}
