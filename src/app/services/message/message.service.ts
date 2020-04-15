import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from '../chat.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  currentMessage = new BehaviorSubject(null);
  deviceId:string;
  constructor(private angularFireMessaging: AngularFireMessaging,
    private _service: ChatService) {
  this.angularFireMessaging.messaging.subscribe(
  (_messaging) => {
    console.log('let  me  test'+ _messaging)
  _messaging.onMessage = _messaging.onMessage.bind(_messaging);
  _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  }
  )
  }
  requestPermission() {
  this.angularFireMessaging.requestToken.subscribe(
  (token) => {
    this.deviceId = token;
  console.log(token);
  },
  (err) => {
  console.error('Unable to get permission to notify.', err);
  }
  );
  }
  receiveMessage() {
  this.angularFireMessaging.messages.subscribe(
  (payload) => {
  console.log("new message received. ", payload);
  this.currentMessage.next(payload);
  let c  = Number(this._service.notificationCount());
  c = c > 0 ? c+1 : 1;
  this._service.setNotificationCount(c);
  }, 
  (err) => {
    console.log('found some error'+ err)
  })
  }

  
  public get token() : string {
    if(this.deviceId){
      return this.deviceId
    }
    return null;
  }
  
}
