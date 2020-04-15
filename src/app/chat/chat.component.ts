import { Component, OnInit, ViewChild, ElementRef, Inject } from "@angular/core";
import { AdminService } from "app/services/admin.service";
import { LoginService } from "app/services/login.service";
import { ApiService } from "app/services/api.service";
import { AngularFileUploaderComponent } from "angular-file-uploader";
import { HttpHeaders } from "@angular/common/http";
import { CommonVar } from "app/CommonVar";
import { WrapperComponent } from "@shared/layouts/wrapper/wrapper.component";
import { ActivatedRoute, Router } from "@angular/router";
import { TransferHttpService } from "@gorniv/ngx-transfer-http";
import { AppStorage } from "@shared/for-storage/universal.inject";
import { FormBuilder } from "@angular/forms";
import { ChatService } from "app/services/chat.service";
import _ from "lodash"


 const BASE_PATH = "http://localhost:3000";
//const BASE_PATH = "http://dev.gdsoftwares.com:3001";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss', '../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [AdminService, ApiService, LoginService],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})

export class ChatComponent implements OnInit {
  message = "";
  messagesList = {};
  oldMsgTimestamp = "";
  OtherUserId: string;
  msgcount = {};
  cryptolist = [];
  loader: boolean | false;
  NewChatStarted: boolean;
  isUploading: boolean = false;
  selectedDealId: string;
  dealDetail = {};
  copyConvoName: any;
  filteredConversations = [];
  onUpdateUserStatus: Function;
  onNewMessageReceived: Function;
  onNewNotificationReceived: Function;
  onUpdateMessageStatus: Function;
  onUserOnlineStatus: Function;
  senderDetails = [];
  //Variables needed for SSR
  searchText;
  slideHeight;
  chatOpen;
  IsDesktop = true;
  innerWidth;


  ngOnInit() {
    this.appStorage.setItem('viewingChat', 'false');
    this.CommonVar.isChatScreen = true;
    this.getDealList();
    this.beginChat()
    //this.getCryptoCurrency();
    this.getConvo();
    this.msgcount = JSON.parse(localStorage.getItem('msgcount')) || {};
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.NewChatStarted = params['chat'] || false;
        this.selectedDealId = params['dealID'] || 0;
      });
    if (window.outerWidth > 768) {
      this.IsDesktop = true;
    }
    else {
      this.IsDesktop = false;
    }

  }


  ngOnDestroy() {
    this.CommonVar.isChatScreen = false;
    
  }
  public get myUsername() : string {
    return this.appStorage.getItem('id');
  }
  

  @ViewChild('fileUpload1', { static : false})
  private fileUpload1: AngularFileUploaderComponent;


  mobileFileUpload(event) {
    console.log(event);
    console.log('Photo ios');
    this.upload();
  }

  getFileImage(type) {
    if (type == 'image/png') {
      return 'https://s3.amazonaws.com/zalate/public/fileIcons/png.svg'
    }
    if (type == 'application/pdf') {
      return 'https://s3.amazonaws.com/zalate/public/fileIcons/pdf.svg'
    }
    if (type == 'image/jpeg' || type == 'image/jpg') {
      return 'https://s3.amazonaws.com/zalate/public/fileIcons/jpg.svg'
    }
    if (type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'https://s3.amazonaws.com/zalate/public/fileIcons/doc.svg'
    }
    else {
      return 'https://s3.amazonaws.com/zalate/public/fileIcons/file.svg'
    }
  }

  getShortImage(type) {
    if (type == 'image/png') {
      return 'PNG'
    }
    if (type == 'application/pdf') {
      return 'PDF'
    }
    if (type == 'image/jpeg' || type == 'image/jpg') {
      return 'JPEG'
    }
    if (type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return 'DOCX'
    }
    else {
      return 'File'
    }
  }

  @ViewChild('fileInput', { static : false}) inputEl: ElementRef;

  upload() {
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        formData.append('file[]', inputEl.files.item(i));
      }
      const httpOptions = {
        headers: new HttpHeaders({
          'token': this.appStorage.getItem('token')
        })
      };
      this.http.post(BASE_PATH + '/message/uploadFilesMobile', formData, httpOptions)
        .subscribe(res => {
          console.log('Upload res: ', res);
          if (res['message']) {
            if (res['message'] == 'Successfully uploaded the file') {
              this.finishedMobileUpload(res);
            }
          }
        })
    }
  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.JPG,.PNG,.pdf,.PDF,.xml,.XML,.jpeg,.JPEG,.gif,.GIF,.doc,.DOC,.docx,.DOCX,.ppt,.PPT,.pptx,.PPTX ",
    maxSize: "50",
    uploadAPI: {
      url: BASE_PATH + "/api/v1/sendFiles",
      headers: {
        "authorization": this.appStorage.getItem('token')
      }
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: ' '
  };

  finishedUpload(event) {
    this.isUploading = true;
    // if (event.response == 'Bad Request') {
    //   console.log('BAD REQUEST WHEN UPLOADING');
    //   this.isUploading = false;
    //   this.fileUpload1.resetFileUpload();
    //   return;
    // }
    // console.log('Finished', event);
    // console.log('File url: ', event.response);
    // var response = JSON.parse(event.response);
    // console.log('Response: ', response);
    let file = this.fileUpload1.selectedFiles[0];
    const fd = new FormData();
    fd.append('file', file)
    fd.append("from", this.appStorage.getItem('id'));
    fd.append("to", this.OtherUserId);
    fd.append("convoID", this.convoId);
    this.ApiService.uploadMessageMedia(fd).subscribe(
      res => {
        this.loader = false;
        
    let data =
    {
      from: this.appStorage.getItem('id'),
      to: this.OtherUserId || this.appStorage.getItem('OtherUserId'),
      convoID: (this.convoId || this.appStorage.getItem('convoId'))
    };
    console.log('Sending with data: ', data);
    this.chatService.sendFileMessage(data, this.appStorage.getItem('token'));
    this.fileUpload1.resetFileUpload();
    setTimeout(() => {
      this.isUploading = false;
    }, 2000);
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
    // let reader = new FileReader()
    // reader.readAsDataURL(file)
    // reader.onload = (e) => {
    //   let url = 'from='+this.appStorage.getItem('id')+'&to=5e9060d50487201458a8ea1e&convoID=5e93841efe473c15342a4673&file='+reader.result;
       
    // }
   
    
    
    

  }


  finishedMobileUpload(response) {
    this.isUploading = true;
    if (response == 'Bad Request') {
      console.log('BAD REQUEST WHEN UPLOADING');
      this.isUploading = false;
      this.fileUpload1.resetFileUpload();
      return;
    }
    console.log('Response: ', response);
    let data =
    {
      from: this.appStorage.getItem('id'),
      to: this.OtherUserId || this.appStorage.getItem('OtherUserId'),
      mediaUrl: response.path,
      mediaType: response.type,
      mediaName: response.name,
      mediaSize: response.size,
      conversationID: (this.convoId || this.appStorage.getItem('convoId')),
      email: this.appStorage.getItem('email'),
      newchat: this.NewChatStarted,
      userID: this.appStorage.getItem('id')
    };
    console.log('Sending with data: ', data);
    this.chatService.sendFileMessage(data, this.appStorage.getItem('token'));
    this.fileUpload1.resetFileUpload();
    setTimeout(() => {
      this.isUploading = false;
    }, 2000);

  }




  constructor(public CommonVar: CommonVar, 
    public WrapperComponent: WrapperComponent, private _router: Router,
     private route: ActivatedRoute, private http: TransferHttpService,
      private ApiService: ApiService, @Inject(AppStorage) public appStorage: Storage,
       private adminService: AdminService,
       private _fb: FormBuilder, private loginService: LoginService,
        private chatService: ChatService) {
        

  }

  beginChat() {
    let vm = this
    let userID = this.appStorage.getItem('id');
    vm.onUpdateUserStatus = vm._onUpdateUserStatus.bind(this);
    vm.onNewMessageReceived = vm._onNewMessageReceived.bind(this);
    vm.onNewNotificationReceived = vm._onNewNotificationReceived.bind(this);
    vm.onUpdateMessageStatus = vm._onUpdateMessageStatus.bind(this);
    vm.onUserOnlineStatus = vm._onUserOnlineStatus.bind(this);

    //vm.chatService.initSocket(userID);
    this.chatService.sendUserStatus(userID);
    vm.chatService.getUserStatus().subscribe(vm.onUpdateUserStatus);
    vm.chatService.onNewMessage().subscribe(vm.onNewMessageReceived);
    vm.chatService.onNewNotification().subscribe(vm.onNewNotificationReceived);
    vm.chatService.getMessageStatus().subscribe(vm.onUpdateMessageStatus);
    vm.chatService.getUserOnlineStatus().subscribe(vm.onUserOnlineStatus);
    
    vm.chatService.onStopTyping().subscribe(data => {
      if (data.to == userID) {
        vm.displayTyping = false;
      }
    });
    vm.chatService.onTyping().subscribe(data => {
      if (data.to == userID) {
        clearTimeout(vm.timer);
        vm.displayTyping = true;
        vm.timer = setTimeout(() => {
          vm.displayTyping = false;
        }, 3000)
      }
    });

  }

  getDealDetails(DealId, message) {
    this.ApiService.fetchDeal(DealId).subscribe(post => {
      console.log("fetch Data", post)
      if (post.message != "No deal or err") {
        this.CommonVar.selectedItem = DealId;
        this.CommonVar.Message = message;
        this.CommonVar.MessageTitle = post.quantity + " - " + post.symbol;
        this.CommonVar.imgSrc = "https://s3.amazonaws.com/zalate/public/crypto/" + post.symbol.toLowerCase() + ".svg";
        if (!this.CommonVar.isChatScreen) {
          this.WrapperComponent.messagePopup = true;
        }
        setTimeout(() => {
          this.WrapperComponent.messagePopup = false;
        }, 3000);
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }
  _onNewMessageReceived(msg) {
    console.log('got a msg: ', msg, this.CommonVar.isChatScreen);
    if (!this.CommonVar.isChatScreen) {
      let count = this.chatService.getCount(msg.convoID);
      count = count > 1 ? count + 1 : 1;
      this.chatService.setCount(msg.convoID, count);
      let temp = JSON.parse(localStorage.getItem('msgcount'));
      temp[msg.conversationID] = count;
      localStorage.setItem('msgcount', JSON.stringify(temp));
      let notification = JSON.parse(localStorage.getItem('notification'));
      if(!this.CommonVar.isNotificationScreen){
        let c = this.chatService.notifiyCount + 1;
        this.chatService.setNotificationCount(c)
      } 
    //this.getDealDetails(msg.dealID, msg.message);
    }
    let vm = this,
    alreadyMsg = true;
    vm.messagesList[msg.conversationID] = vm.messagesList[msg.conversationID] ? vm.messagesList[msg.conversationID] : (vm.messagesList[msg.conversationID] = []);
    vm.messagesList[msg.conversationID].filter(message => {
      if (message._id != msg.newMessage._id) {
        alreadyMsg = true;
        vm.displayTyping = false;
      }
      else {
        alreadyMsg = false;
        vm.displayTyping = false;
      }
    });
    if (alreadyMsg) {
      vm.messagesList[msg.conversationID].push({
        _id: msg.newMessage._id,
        convoID: msg.conversationID,
        date: msg.newMessage.date,
        from: msg.newMessage.from,
        mediaUrl: msg.newMessage.mediaUrl,
        mediaSize: msg.newMessage.mediaSize,
        mediaName: msg.newMessage.mediaName,
        mediaType: msg.newMessage.mediaType,
        message: msg.newMessage.message,
        readers: msg.newMessage.readers,
        status: msg.newMessage.status,
        to: msg.newMessage.to,
        type: msg.newMessage.type
      });
      if (!vm.msgcount[msg.conversationID]) {
        vm.msgcount[msg.conversationID] = 0;
      }
      if (vm.convoId == msg.conversationID) {
        vm.sendUpdatedMessageStatus();
      }
      if (vm.appStorage.getItem('id') != msg.newMessage.from && vm.convoId != msg.conversationID) {
        vm.msgcount[msg.conversationID] = parseInt(vm.msgcount[msg.conversationID], 10) + 1;
        vm.chatService.setCount(msg.conversationID, vm.msgcount[msg.conversationID]);
        vm.count = vm.chatService.getCount(msg.conversationID);
        localStorage.setItem('msgcount', JSON.stringify(vm.msgcount));
      }
      vm.updateConversationLastTime(msg.conversationID, msg.newMessage.date);
    }
    if (msg.newchat) {
      vm.getConvo(true);
      vm.chatService.convoId = msg.conversationID;
      vm.convoId = msg.conversationID;
      vm.appStorage.setItem('convoId', msg.conversationID);
      //vm.location.replaceState('chat');
      vm.NewChatStarted = false;
    }
    if (vm.appStorage.getItem('id') != msg.newMessage.from) {

      var audio = new Audio();
      audio.src = "assets/messageTune/messagenotification.mp3";
      audio.load();
      audio.play();
    }
    // If message is outgoing then scroll
    if (msg.newMessage.from === vm.appStorage.getItem('id')) {
      vm.scroll('bottom-message-mobile-view');
    }
    this.chatService.setUpdateCount('notification')

  }
  _onNewNotificationReceived(msg) {
    console.log('got a notification: ', msg, this.CommonVar.isChatScreen);
    this.chatService.setUpdateCount('notification')

  }

  _onUpdateUserStatus(data) {
    let vm = this;
    vm.filteredConversations = vm.filteredConversations.map(conversation => {
      conversation.status = data.status;
      return conversation;
    });
  }



  _onUpdateMessageStatus(data) {
    console.log('Update the message status', data);
    let vm = this;
    if (vm.messagesList[data.convoID]) {
      vm.messagesList[data.convoID] = vm.messagesList[data.convoID].map((message) => {
        if (message._id === data.messageID) {
          message.status = data.status;
        }
        return message;
      });

    }
  }

  _onUserOnlineStatus(data) {
    const convoIndex = this.filteredConversations.findIndex(convo => convo._id == data.convoId);
    if (convoIndex != -1) {
      this.filteredConversations[convoIndex].online = data.currentlyOnline == true;
    }
  }

  sendUpdatedMessageStatus() {
    let receivedMsgs = this.messagesList[this.convoId]
      && this.messagesList[this.convoId].filter(message => message.from !== this.appStorage.getItem('id'));
    let numOfMsg = receivedMsgs.length;
    if (numOfMsg > 0) {
      let msg = receivedMsgs[numOfMsg - 1];
      this.chatService.sendMessageStatus({
        conversationID: (this.convoId || this.appStorage.getItem('convoId')),
        to: msg.to,
        lastMsgID: msg._id,
        messageID: msg._id,
        status: 5
      }, this.appStorage.getItem('token'));
    }
  }



  updateConversationLastTime(conversationID, timeStamp) {
    this.filteredConversations = this.filteredConversations.map(conversation => {
      if (conversation.convoID._id === conversationID) {
        conversation.lastDate = timeStamp;
      }
      return conversation;
    });
  }

  displayTyping = false;
  timer;

  count: number;
  sendMessage(event) {
    if ((event.keyCode && event.keyCode == 13) || event == true) {
      let conversationID = this.convoId || this.appStorage.getItem('convoId');
      let data = {
        from: this.appStorage.getItem('id'),
        to: this.messagesList[conversationID][0].from,
        message: this.message,
        conversationID: conversationID === 'null' ? null : conversationID,
        email: this.appStorage.getItem('email'),
        newchat: true,
        userID: this.appStorage.getItem('id'),
        dealID: this.DealId
      };

      if (conversationID === 'null') {
        data['dealID'] = this.selectedDealId;
        data['convoName'] = JSON.stringify(this.dealDetail);
        data['otherUserID'] = this.appStorage.getItem('OtherUserId');
      }

      if (this.message) {
        console.log('sending the', data, this.DealId);
        this.chatService.sendMessage(data, this.appStorage.getItem('token'));
        this.chatService.stopTyping(data);
      }
      // this.chatService.chatStart(data, this.appStorage.getItem('token'));
      // this.chatService.onchatAck().subscribe(data => {
      //     console.log('chat start ack', data);
      //     if (data.adminID) {
      //       this.chatService.convoId = data._id;
      //       this.convoId = data._id;
      //       this.appStorage.setItem('convoId', data._id);
      //       this.getConvo(true);
      //     }
      // });
      this.message = '';
    }
  }

  onKeydown(event) {
    console.log('Typing...');
    this.chatService.typingStatus({
      conversationID: (this.convoId || this.appStorage.getItem('convoId')),
      from: this.appStorage.getItem('id'),
      to: this.OtherUserId || this.appStorage.getItem('OtherUserId'),
      email: this.appStorage.getItem('email'),
      newchat: this.NewChatStarted,
      token: this.appStorage.getItem('token')
    });
  }

  resizeTextBox(event) {
    // textAreaAutoExpand Logic
    let textarea = window.document.querySelector("textarea");
    if (this.message.length < 30) {
      textarea.style.height = "50px";
    } else {
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }

  searchConversations() {
    if (this.searchText) {
      let searchText = this.searchText.toLocaleLowerCase();
      // let cryptoSearch = this.cryptolist.filter(crypto => {
      //   return crypto.name && !!(crypto.name.toLocaleLowerCase()).match(searchText);
      // });
      // this.filteredConversations = this.conversations.filter(conversation => {
      //   let dealDetail = JSON.parse(conversation.convoID.convoName),
      //     crypto = !!(dealDetail.crypto.toLocaleLowerCase()).match(searchText),
      //     quantity = dealDetail.quantity && !!(dealDetail.quantity.toString().toLocaleLowerCase()).match(searchText),
      //     escrow = dealDetail.escrow && !!(dealDetail.escrow.toLocaleLowerCase()).match(searchText),
      //     country = dealDetail.country && dealDetail.country.name && !!(dealDetail.country.name.toLocaleLowerCase()).match(searchText),
      //     cryptoList = cryptoSearch[0] && cryptoSearch[0].code === dealDetail.crypto;

      //   return crypto || quantity || escrow || country || cryptoList;
      // });
      this.filteredConversations =  this.conversations.filter(conversation => {
        return conversation.convoID.convoName && !!(conversation.convoID.convoName.toLocaleLowerCase()).match(searchText);
      });
    } else {
      this.filteredConversations = this.conversations;
    }
  }

  getCryptoCurrency() {
    this.CommonVar.isChatScreen = true;
    this.WrapperComponent.messagePopup = false;
    this.ApiService.getCryptoCurrency().subscribe(res => {
      if (res && res.length) {
        this.cryptolist = res;
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  /* Logic is based on assumtion Msg timestamps are incremental */
  calculateDateBubbleValue(newMsgTimestamp) {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Conversation Start Scenario
    if (!this.oldMsgTimestamp) {
      let newDate = new Date(newMsgTimestamp)
      // Storing the Current Msg Timestamp as old
      this.oldMsgTimestamp = newMsgTimestamp;

      return 'Conversation created: ' + newDate.toLocaleString();
    } else {
      let newDate = new Date(newMsgTimestamp),
        oldDate = new Date(this.oldMsgTimestamp),
        now = new Date();

      // Storing the Current Msg Timestamp as old
      this.oldMsgTimestamp = newMsgTimestamp;
      if (newDate.getDate() !== oldDate.getDate()) {
        // Today Scenario
        if (newDate.getDate() === now.getDate()) {
          return 'Today';
        } else {
          return newDate.getDate() + ' ' + monthNames[newDate.getMonth()];
        }
      }
      return '';
    }
  }

  updateWithSummaryTimestamp(msgs) {
    let updatedMsgs = msgs.map(msg => {
      msg['summaryTimeText'] = this.calculateDateBubbleValue(msg.date);
      return msg;
    });
    return updatedMsgs;
  }

  ConvoName = {};
  getUrlCrypto(type, id) {
    if (typeof type == "string") {
      type = JSON.parse(type);
    }
    this.ConvoName[id] = type;
    var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/dash.svg";
    return newUrl
  }
  convoId: string;
  DealId: string;
  conversations: any[];
  convName: string;
  newChat: boolean;
  requestedUser: boolean;
  getMessagesList(data) {
    try {
      console.log("msg", data);
      this.senderDetails = [];
      this.senderDetails.push(data);
      console.log("msg sender", this.senderDetails);
      this.DealId = data.convoID.dealID;
      this.convName = typeof data.convoID.convoName === 'string' ? data.convoID.convoName : JSON.parse(data.convoID.convoName);
      this.newChat = false;
      this.requestedUser = false;
     // this.getDealDetail();
      // this.OtherUserId = data.convoID.users.filter(id =>
      //   id != this.appStorage.getItem('id')
      // )[0];
      // console.log('this.OtherUserId', this.OtherUserId, this.appStorage.getItem('UserId'));
      this.convoId = data.convoID._id;
      this.OtherUserId = data.userID._id
      // Show Loader only first time
      if (!this.messagesList[this.convoId]) {
        this.loader = true;
      }

      let query = "?userID=" + this.appStorage.getItem('id') + "&convoID=" + this.convoId + "&pageNo=1&limit=200&ttl=" + (new Date()).getTime();
//      let res = {"Status":1,"Message":"successfully retrieved","Data":[{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"Hi","_id":"5bdd7541051a5f6aab91cde6","readers":[],"from":"5e3c5d1be337a36e217c278e","to":"dso1537802850790","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541240129590,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"yest","_id":"5bdd94ae051a5f6aab91cdfb","readers":[],"from":"dso1537802850790","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541248174089,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"dfsdf","_id":"5bdd94af051a5f6aab91cdfc","readers":[],"from":"dso1537802850790","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541248175201,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"sfsdf","_id":"5bdd94af051a5f6aab91cdfd","readers":[],"from":"5e3c5d1be337a36e217c278e","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541248175887,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"sdf","_id":"5bdd94b0051a5f6aab91cdfe","readers":[],"from":"dso1537802850790","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541248176255,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"sfsd","_id":"5bdd94b0051a5f6aab91cdff","readers":[],"from":"dso1537802850790","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541248176560,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"hi","_id":"5bddb6f9051a5f6aab91ce30","readers":[],"from":"ri91537468903367","to":"dso1537802850790","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541256953885,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"hi","_id":"5bddb887051a5f6aab91ce35","readers":[],"from":"ri91537468903367","to":"dso1537802850790","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541257351555,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"hello","_id":"5bdeb4ccba255470dd7e9865","readers":[],"from":"ri91537468903367","to":"dso1537802850790","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1541321932696,"status":5,"__v":0},{"mediaUrl":"","mediaPreview":"","mediaName":"","mediaType":"","mediaSize":"","message":"hi","_id":"5e595bd4f53efc5179c16af6","readers":[],"from":"dso1537802850790","to":"ri91537468903367","convoID":"5bdd7541051a5f6aab91cde3","type":0,"date":1582914516910,"status":5,"__v":0}],"DataCount":10,"Limit":200} 
      // this.messagesList[this.convoId] = this.updateWithSummaryTimestamp(res.Data);
      // this.loader = false;
      // this.msgcount[this.convoId] = 0;
      // localStorage.setItem('msgcount', JSON.stringify(this.msgcount));
      // this.sendUpdatedMessageStatus();
      // this.scroll('bottom-message-mobile-view');

      this.ApiService.getMessages(query).subscribe((res) => {
        console.log('Messages: ', res);
        this.loader = false;
        if(data.status === 0){
          this.newChat = true;
          this.requestedUser = res.Data[0].from === this.appStorage.getItem('id') ? true : false
        }
        else{
          this.messagesList[this.convoId] = this.updateWithSummaryTimestamp(res.Data);
          this.msgcount[this.convoId] = 0;
          localStorage.setItem('msgcount', JSON.stringify(this.msgcount));
          this.chatService.setUpdateCount(this.msgcount);
          this.sendUpdatedMessageStatus();
          this.scroll('bottom-message-mobile-view');
  
        }
      }, (err) => {
        this.messagesList[this.convoId] = [];
        this.loader = false;
          if (err.status == 401) {
            this.appStorage.clear();
            localStorage.clear();
            this._router.navigate(['/login'])
          }
      });
    }
    catch (ex) {
      console.log('ex', ex);
      this.messagesList[this.convoId] = [];
      this.loader = false;
    }
  }
  getDealDetail() {
    this.loader = true;
    this.ApiService.fetchDeal(this.DealId).subscribe(post => {
      if (post.message != "No deal or err") {
        // this.senderDetails[0].position = post.position;
        // this.senderDetails[0].gross = post.gross;
        // this.senderDetails[0].net = post.net;
        // this.senderDetails[0].country = post.country.substring(post.country.indexOf(":") + 1);
        // this.senderDetails[0].countryCode = post.country.substring(0, post.country.indexOf(":")).toLowerCase();
        this.loader = false;
      }
      else {
        this.senderDetails[0].position = "";
        this.senderDetails[0].gross = 0;
        this.senderDetails[0].net = 0;
        this.loader = false;
      }

    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }
  getFlag(code) {
    if (code)
      var newUrl = "https://s3.amazonaws.com/zalate/public/flags/" + code.toLowerCase() + ".svg";
    return newUrl;
  }
  noConversations = false;
  conversationLoader = true;

  getConvo(newconvo?: boolean) {
    let userID = this.appStorage.getItem('id'),
      query = "?userID=" + userID + "&limit=20&page=1&data=" + Math.random();

    this.conversationLoader = true;
    this.ApiService.getConversations(query).subscribe((res) => {
      console.log('RES: ', res);
      if (res.Message == 'No Convo found!' || !res.Data || res.Data.length < 1) {
        this.noConversations = true;
        this.conversationLoader = false;
      }
       this.conversations = res.Data;
      // this.conversations = res.Data.filter(convo => {
      //   return convo.userID.indexOf(this.appStorage.getItem('id')) > -1;
      // });

      // Removing additional Wrapper Added from Backend
      // this.conversations = this.conversations.map(conversation => {
      //   // Move status inside the convoID
      //   conversation.convoID.online = conversation.online;
      //   return conversation.convoID;
      // });

      this.filteredConversations = this.conversations || [];
      this.filteredConversations.forEach(convo => {
        if (convo.convoName) {
          this.copyConvoName = JSON.parse(convo.convoName);
          if (this.copyConvoName.country) {
            if (!this.copyConvoName.country.name && !this.copyConvoName.country.code) {
              this.copyConvoName.country = {
                code: this.copyConvoName.country.substring(0, this.copyConvoName.country.indexOf(":")).toLowerCase(),
                name: this.copyConvoName.country.substring(this.copyConvoName.country.indexOf(":") + 1)
              };
            }
          }
        }
        convo.convoName = JSON.stringify(this.copyConvoName);
        // convo.convoID.users.filter(userId => {
        //   return userId != this.appStorage.getItem("id");
        // }).forEach(userId => {
        //   this.chatService.getUserChatStatus(userId, convo._id).subscribe();
        // });
      });

      if (this.filteredConversations.length > 0 && !this.NewChatStarted) {
        this.noConversations = false;
        this.conversationLoader = false;
        this.getMessagesList(this.filteredConversations[0]);

      } else if (this.NewChatStarted || this.selectedDealId) {
        // For Handling Message Seller flow
        this.noConversations = false;
        this.conversationLoader = false;
        // Check if conversation present or not
        let checkPresentConv = this.filteredConversations.filter(conversation => conversation.dealID === this.selectedDealId);

        if (checkPresentConv.length > 0) {
          // Resume the normal flow
          this.getMessagesList(checkPresentConv[0]);
        } else {
          // Get Deal Details & create new conversation
          this.ApiService.fetchDeal(this.selectedDealId).subscribe(res => {
            console.log('Deal info: ', res);
            let nowDate = new Date();
            this.dealDetail = {
              crypto: res.symbol,
              description: res.description,
              quantity: res.quantity,
              escrow: res.escrow,
              country: res.country,
              _id: 'null'
            };
            this.OtherUserId = this.appStorage.getItem('OtherUserId');
            this.messagesList['null'] = [];
            this.convoId = "null";
            this.msgcount["null"] = 0;
            this.conversations.splice(0, 0, {
              actaulusers: [userID, this.OtherUserId],
              adminID: userID,
              chatType: 0,
              convoName: JSON.stringify(this.dealDetail),
              dealID: res.id,
              initDate: nowDate.getTime(),
              lastDate: nowDate.getTime(),
              users: [userID, this.OtherUserId],
              __v: 0,
              _id: "null"
            });
          });
        }

      } else {
        this.conversationLoader = false;
      }
    }, err => {
      if (err.status == 401) {
        this.appStorage.clear();
        localStorage.clear();
        this._router.navigate(['/login'])
      }
    });
  }

  onLogout() {
    this.loginService.logout();
  }

  getSummaryDate(date, status) {
    let timeStamp = new Date(date),
      hours = timeStamp.getHours() % 12 || 12,
      minute = timeStamp.getMinutes(),
      suffix = hours < 12 ? 'AM' : 'PM';

    return hours + ':' + (minute < 10 ? '0' : '') + minute + ' ' + suffix;
  }

  scroll(id) {
    let el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: 'smooth' });
  }

  sortByDate(a, b) {
    return b.lastDate - a.lastDate;
  }
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth <= 767) {
      this.IsDesktop = false;
    }
    if (this.innerWidth > 767) {
      this.IsDesktop = true;
    }
  }
  
  public  conversationName(input) : string {
    if (typeof input === 'string')
{
  return input;
}
    return JSON.parse(input);
  }
   
  dealList
  getDealList() {
    this.ApiService.fetchDeal(this.DealId).subscribe(post => {
      if (post.message != "No deal or err") {
        this.dealList = post.Data
      }

    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }


  getIndex(id){
    let index = _.findIndex(this.dealList, function(o) { return o._id == id; })
    if(index =! -1){
      return index;
    }
    return 0;
  }

  viewDeatils(id){
    id =  this.DealId;
    let index = _.findIndex(this.dealList, function(o) { return o._id == id; })
    localStorage.setItem('selected', JSON.stringify(this.dealList[index]))
    this._router.navigate(['/view-request'])
  }
  setMessageStatus(conId,status){
    const reqData = {
      "userID": this.appStorage.getItem('id'),
      "convoID": conId,
      "status": status ? 1 : 5
    }
    // let url = '';
    // _.forIn(reqData, function(value, key) {
    //   if(value || value === 0){
    //     url = url ? url +'&'+ key+'='+value : key+'='+value
    //   }
    // });
    this.loader = true;
  this.ApiService.acceptDeclineRequest(reqData).subscribe((res) => {
    this.loader = false;
    this.getConvo();
    //  if(status){
    //    this.newChat = false;
    //    this.getMessagesList(this.filteredConversations[conId]);
    //  } else{
    //   var temp = this.filteredConversations;
    //   var temp2 = _.remove(temp, function(n) {
    //     return n.convoID._id !== conId;
    //   });
    //   this.filteredConversations = temp2;
    //   this.getMessagesList(this.filteredConversations[0]);
    //  }
}); 
  }
  delete(conId){
    const reqData = {
      "userID": this.appStorage.getItem('id'),
      "convoID": conId,
      "status": 2
    }
    this.loader = true;
  this.ApiService.deleteConvo(reqData).subscribe((res) => {
    this.loader = false;
    this.newChat = false;
      var temp = this.filteredConversations;
      var temp2 = _.remove(temp, function(n) {
        return n.convoID._id !== conId;
      });
      this.filteredConversations = temp2;
      if(this.filteredConversations.length == 0){
        this.noConversations = true;
      }
      else{
        this.getMessagesList(this.filteredConversations[0]);
      }
}); 
  }

  // messageCountList = [];
  // updateCount(){
  //   this.messageCountList = JSON.parse(localStorage.getItem('unreadMessage'));
  //   let id = this.convoId;
  //   let newMess = []
  //   this.messageCountList.forEach(element => {
  //     _.forIn(element, function(value, key) {
  //       if(key != id){
  //       newMess.push(element)  
  //       }
  //     });
  //   });
  // }
}
