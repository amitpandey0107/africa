import { Injectable, Inject } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';
import { AppStorage } from '@shared/for-storage/universal.inject';

@Injectable()
export class ChatService {
  public socket: SocketIOClient.Socket;

  public convoId: string;

  public mobileViewing = false;
  public msgCountUpdate = new Subject <any>();
  public notificationCountUpdate = new Subject <number>();
  nCount: number;




  constructor(@Inject(AppStorage) public appStorage: Storage) {
  //  this.socket = io('http://localhost:3001');
    this.socket = io('http://dev.gdsoftwares.com:3001');
    let userID = this.appStorage.getItem('id')
    let email = this.appStorage.getItem('email')
    let token = this.appStorage.getItem('token')
    let deviceId = this.appStorage.getItem('deviceId')
   // this.initSocket(userID);
 
    // this.onpingPong();
     this.onNewping();

  }


  //socketconnect

  socketconect() {
    this.socket.on('disconnect', () => {
     // this.socket.open();
     console.log('disconnedted')
    });
  }

  //init socket
  initSocket(userID) {
    this.socket.emit('init', { userID: userID},
    function () {
      console.log('done initlization')
    }
    );
    this.socket.on('connect', function () {
      console.log('connectedd')
    });
    this.onNewNotification();
  }

  //init socket
  onHandshake() {
    return Observable.create(observer => {
      this.socket.on('connect', data => {
        observer.next(data);
      });
    });
  }


  logoutUser(userID, token) {
    this.socket.emit('logout_user', { userID: userID, token: token })
  }

  //notify when someone is typing
  typingStatus(data) {
    this.socket.emit('typing', { conversationID: data.conversationID, from: data.from, to: data.to, email: data.email, newchat: data.newchat, token: data.token }
    );
  }

  //notify when someone is typing
  stopTyping(data) {
    this.socket.emit('stop_typing', { conversationID: data.conversationID, from: data.from, to: data.to, email: data.email, newchat: data.newchat }
    );
  }

  //user statusses
  eventStatus(userID, uid) {
    this.socket.emit('status', { userID: userID, uid: uid });
  }

  //chat start
  chatStart(data, token) {
    this.socket.emit('chat_start', {
      userID: data.userID,
      otherUserID: data.otherUserID,
      convoName: data.convoName,
      dealID: data.dealID,
      token: token
    });

  }

  // HANDLER
  onchatAck() {
    return Observable.create(observer => {
      this.socket.on('chat_start_ack', data => {
        console.log('chat-created');
        observer.next(data);
      });
    });
  }


  // send file message
  sendFileMessage(data, token) {
    console.log('Send file message');
    this.socket.emit('message', { userID: data.userID, token: token, 
      conversationID: data.conversationID, 
      from: data.from, to: data.to, type: 8, 
      email: data.email, newchat: data.newchat, 
      mediaUrl: data.mediaUrl, 
      mediaSize: data.mediaSize, 
      mediaType: 'data.mediaType', 
      mediaName: 'data.mediaName',
    });
  }

  // send message
  sendMessage(data, token) {
    if (data.conversationID === null) {
      this.socket.emit('message', {
        token: token,
        userID: data.userID,
        message: data.message,
        conversationID: data.conversationID,
        from: data.from,
        to: data.to,
        type: 0,
        email: data.email,
        newchat: data.newchat,
        dealID: data.dealID,
        convoName: data.convoName,
        otherUserID: data.otherUserID
      }
      );
    } else {
      this.socket.emit('message', {
        token: token,
        userID: data.userID,
        message: data.message,
        conversationID: data.conversationID,
        from: data.from,
        to: data.to,
        type: 0,
        email: data.email,
        newchat: data.newchat
      }
      );
    }
  }

  // ping
  onNewping() {
    return Observable.create(observer => {
      this.socket.on('ping', data => {
        console.log('pingack');
        observer.next(data);
      });
    });
  }

  // ping
  onpingPong() {
    this.socket.emit('ping', {}, data => {
      console.log('pingpong');
    });
  }

  // HANDLER
  onNewMessage() {
    return Observable.create(observer => {
      this.socket.on('messageAck', msg => {
        observer.next(msg);
      });
    });
  }

  onNewNotification() {
    return Observable.create(observer => {
      this.socket.on('DEAL_INTEREST', msg => {
        observer.next(msg);
      });
    });
  }
  onAcceptInvite() {
    return Observable.create(observer => {
      this.socket.on('INTEREST_ACCEPTED', msg => {
        observer.next(msg);
      });
    });
  }
  
  //Typing HANDLER
  onTyping() {
    return Observable.create(observer => {
      this.socket.on('typing', data => {
        observer.next(data);
      });
    });
  }


  //Typing HANDLER
  onStopTyping() {
    return Observable.create(observer => {
      this.socket.on('stop_typing', data => {
        observer.next(data);
      });
    });
  }

  // HANDLER ERROR
  onsocketError() {
    return Observable.create(observer => {
      this.socket.on('socket_erros', error => {
        observer.next(error);
      });
    });
  }

  /* set message status */
  sendMessageStatus(data, token) {
    this.socket.emit('send_status', {
      token: token,
      lastMsgID: data.lastMsgID || null,
      status: data.status,
      messageID: data.messageID,
      to: data.to,
      conversationID: data.conversationID,
      convoID: data.conversationID
    });
  }
 /* set message status */
 sendUserStatus(id) {
  this.socket.emit('status', {
    userID: id
  });
}
  /* get message status */
  getMessageStatus() {
    return Observable.create(observer => {
      this.socket.on('send_status', data => {
        console.log('send_status');
        observer.next(data);
      });
    });
  }

  // get user statusses
  getUserStatus() {
    return Observable.create(observer => {
      this.socket.on('status', data => {
        observer.next(data);
      });
    });
  }
  getUserChatStatus(userID, convoId) {
    return Observable.create(observer => {
      this.socket.emit('status', { userID: userID, convoId: convoId });
    })
  }

  getUserOnlineStatus() {
    return Observable.create(observer => {
      this.socket.on('status', data => {
        observer.next(data);
      });
    });
  }

  //chatcount for user who is outside chat page

  public messagecount = {};
  setCount(id, msgcount) {
    this.messagecount[id] = msgcount;
  }

  getCount(id) {
    return this.messagecount[id];
  }
  updateCount(): Observable<any>{
    return this.msgCountUpdate.asObservable();
    }
  setUpdateCount(count){
    this.msgCountUpdate.next(count)
  }
  notificationCount(): Observable<any>{
    return this.notificationCountUpdate.asObservable();
    }
  setNotificationCount(count){
    this.nCount = count;
    this.notificationCountUpdate.next(count)
  }

  
  public get notifiyCount() : number {
    if(this.nCount){
      return this.nCount;
    }
    return 0
  }
  
  
}
