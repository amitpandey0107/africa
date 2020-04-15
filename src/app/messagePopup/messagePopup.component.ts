import { Component, OnInit, NgModule,Inject } from '@angular/core';
import { SharedMaterialModule } from '../shared-material.module';
import {ActivatedRoute,Router} from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';
import {CommonVar} from '../CommonVar';
@Component({
  selector: 'app-messagePopup',
  templateUrl: './messagePopup.component.html',
  styleUrls: ['./messagePopup.component.scss']
})
export class MessagePopUpComponent implements OnInit {

  constructor(public Router:Router,@Inject(AppStorage) public appStorage:Storage,public CommonVar:CommonVar) { }
  // public imgSrc:any="https://s3.amazonaws.com/zalate/public/crypto/btc.svg";
  // public MessageTitle:any="100,000 BTC-Volantis";
  // public Message:any="Yes that will work for me, but how will we account";
  // public selectedItem:any;
  // public posterId:any;
  ngOnInit() {   
    
  }
  changeMessage(msg){
    this.CommonVar.Message=msg;
    this.CommonVar.MessageTitle=msg;   
  }
  Goto()
  {
    this.appStorage.setItem('OtherUserId', this.CommonVar.posterId);
    this.Router.navigate(['/chat'],{ queryParams: { chat: true, dealID: this.CommonVar.selectedItem } });
  }
}
@NgModule({
  imports: [SharedMaterialModule],
  declarations: [MessagePopUpComponent],
  exports: [MessagePopUpComponent]
})
export class MessagePopUpComponentModule {
 
  constructor(){
 
  }

 }