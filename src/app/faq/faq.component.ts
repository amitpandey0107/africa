import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Inject } from '@angular/core';
import { NgZone, EventEmitter, Input } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { CanActivate } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [LoginService]
})
export class FaqComponent implements OnInit {
  loader:boolean|false;
  faqsData: any = [];
  panelOpenState: any = {};
  slideHeight:boolean = false;
  searchText: any;
  setPanelState(datas, panelState) {
    datas.forEach((item, index) => {
      this.panelOpenState.index = false;
    });
  }
  getData(){
    this.loader=false;
    this.faqsData = [
      { 'title': 'What is Zalate?', 'description': 'Zalate is the world’s largest peer-to-peer OTC platform where buyers, sellers, mandates and intermediaries can post their buy and sell orders. Users can inquire about a certain deal using Zalate’s instant messaging. ' },
      { 'title': 'Is Zalate free to use?', 'description': 'Messaging about deals & posting buy/sell orders on Zalate is 100% free.' },
      { 'title': 'What is OTC Trading?', 'description': 'OTC stands for the Over the Counter trading of Bitcoin and other assets of cryptocurrencies without inflating or deflating the price, large volumes of trading typically occur under OTC trading.' },
      { 'title': 'How do I post my own deal?', 'description': 'In order to post your own buy and sell orders you must verify your identity in the “My Account” tab. Once verified, you may create a deal from the Buy or Sell Orders page.' },
      { 'title': 'What is a verified deal?', 'description': 'Once Zalate confirms Proof of funds or Proof of Coin, a deal will show a verified tag. Verified deals receive 5X more serious inquiries than non-verified deals.' },
      { 'title': 'How many new chats can I open per day?', 'description': 'Note: You must confirm your email in order to send a messages on Zalate. Upon email confirmation users will be able able to open 3 new chats a day. Users may increase their daily chat limits by verifying their identity or partaking in Zalate’s Referal Rewards Program.' },
      { 'title': 'What are Deal Slots?', 'description': 'Users can post up to 3 deals at once. In order to post another buy/sell order, users will need to delete a live deal in the “My Account” Tab.' },
      { 'title': 'How do I edit my deal?', 'description': 'Users may edit their deal from the “My Account” tab.' },
      { 'title': 'Why Should I Sponsor my deal?', 'description': 'Sponsor your deal on Zalate and receive optimal exposure for your buy/sell orders. Sponsored deals stay on top of the page and receive significantly more inquiries than non-sponsored deals. Schedule your sponsored deal & learn more in the sponsorship tab.' }
    ];
  }
  

  constructor(private router: Router, private http: TransferHttpService, private loginService: LoginService) {

  }
  ngOnInit(): void {
    this.loader=true;
    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  onLogout() {
    this.loginService.logout();
  }
}
