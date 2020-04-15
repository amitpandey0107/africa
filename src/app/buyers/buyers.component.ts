import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { AppStorage } from '@shared/for-storage/universal.inject'
import _ from "lodash"
import { newemailverifyDialogComponent } from '../dialogs/newemailverify/newemailverify.dialog.component'
import { onboardingDialogComponent } from '../dialogs/onboarding/onboarding.dialog.component'
import { ApiService } from '../services/api.service'
import { LoginService } from '../services/login.service'
import { ChatService } from 'app/services/chat.service'

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: [
    './buyers.component.scss',
    '../../../node_modules/flag-icon-css/css/flag-icon.css',
  ],
  providers: [ApiService, LoginService, ChatService],
})
@HostListener('window:resize', ['$event'])
export class BuyersComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(AppStorage) private appStorage: Storage,
    private apiService: ApiService,
    private loginService: LoginService,
    private _fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private chatService: ChatService,
    private _snack: MatSnackBar
  ) {}
  provideData: any = []
  loader: boolean | false
  dropOpenCaret: boolean | false
  posts: any[]
  orignalData: any[]
  slideHeight: boolean = false
  newDeal: any = {}
  newDealLists: any = {}
  selectedCountry = { name: '', code: '' }
  SelectCryptoType = { name: '', code: '' }
  currentStep: any
  openNewDeal: boolean | false
  CryptoCurrencyList: any = []
  listingsRemaining: any
  p: number = 1 // This is the page of the pagination
  serviceType = 1;
  newDealinvalid: any = {}

  public queryParam = {
    pageSize: 10,
    pageNum: 1,
    serviceType: null,
    businessCat: null,
    businessSubCat: null,
    country: null
  }
  public listOfCategories: any;
  public listOfSubCategories: any;
  public listOfCountries: any;
  public listOfServices: any;
  purchasedDeal = []
  totalCount: number;
  getData() {
    this.loader = false
    this.orignalData = this.posts
    this.provideData = this.posts.slice(0, 10)
  }

  selectedItem = {}
  filterCat = 'Category'
  businessSubCat = 'Sub Category'
  language = 'Language'
  languageCode: string
  filterCryptoCode: string
  filterCountry = 'Country/Region'
  filterService = 'Request Type'
  filterCountryCode: string

  Sortby = 'Sort by'
  SortbyOptions: any = [
    { id: 1, name: 'Most Recent', sortby: 'dateCreated', sorttype: 'asc' },
    { id: 2, name: 'Oldest', sortby: 'dateCreated', sorttype: 'desc' },
    { id: 3, name: 'Most Coin', sortby: 'quantity', sorttype: 'asc' },
    { id: 4, name: 'Least Coin', sortby: 'quantity', sorttype: 'desc' },
    { id: 5, name: 'Highest Discount', sortby: 'gross', sorttype: 'asc' },
    { id: 6, name: 'Lowest Discount', sortby: 'gross', sorttype: 'desc' },
  ]
  sortOrder: any = this.SortbyOptions[0]

  SortOrder(item, name) {
    console.log(item, name)
    this.Sortby = name
    this.sortOrder = item
  }
  isHover:string = '';
  hoverIndex = null
  changeStyle($event,i){
    this.hoverIndex = $event.type == 'mouseover' ? i : null; 
    this.isHover = $event.type == 'mouseover' ? 'grid-list-sponser' : '';
  }
  
  languageChange(code, name) {
    this.language = name
    this.languageCode = code
    // this.filterCountryCode = 'all';
    // this.filterCountry = 'Country'
  }

  filterCountryType(code, name) {
    this.filterCountry = name
    this.filterCountryCode = code
    this.filterCryptoCode = 'all'
  }
  breakpoint: any = window.innerWidth <= 600 ? 5 : 7
  isMobile: any = window.innerWidth <= 600 ? true : false
  onResize(event?) {
    this.breakpoint = event.target.innerWidth <= 600 ? 5 : 7
    this.isMobile = window.innerWidth <= 600 ? true : false
    console.log('Resizing: ', this.innerWidth, 'x', this.innerHeight)
  }
  viewDetails: any = false

  viewSellDetails(item) {
    this.selectedItem = item
    this.viewDetails = true
  }

  backDtails() {
    this.selectedItem = {}
    this.viewDetails = false
  }

  getUserInfo(id) {
    this.showUserInfo = true
    this.apiService.getUserInfo(id).subscribe(
      res => {
        this.currentUserInfo = res
        console.log(res)
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }

  currentUserInfo = {}
  showUserInfo = false

  onLogout() {
    this.loginService.logout()
  }

  sortListings(listings) {
    let length = listings.length
    for (let i = 0; i < length; i++) {
      if (listings[i].type == 'buy') {
        this.collectionDeals.push(listings[i])
      }
      if (i == length - 1) {
        for (let i = 0; i < length; i++) {}
        console.log('Last one is: ', i)
      }
    }
  }

  getUrlCrypto(type) {
    var newUrl =
      'https://s3.amazonaws.com/zalate/public/crypto/' +
      type.toLowerCase() +
      '.svg'
    return newUrl
  }

  getFlag(code) {
    var newUrl =
      'https://s3.amazonaws.com/zalate/public/flags/' +
      code.toLowerCase() +
      '.svg'
    return newUrl
  }

  toggleNewDeal() {
    this.loader = true;

    if (
      this.appStorage.getItem('token') != null &&
      this.appStorage.getItem('token') != undefined
    ) {
    }
    this.router.navigateByUrl('/buyers/new')
  }

  getCountries() {
    this.apiService.getCountries().subscribe(
      res => {
        if (res && res.length) {
          this.newDealLists.countries = res
          this.selectedCountry.code = res[0].code
          this.selectedCountry.name = res[0].name
          this.newDeal.countryRequest = res[0].code + ':' + res[0].name
        }
        if (res.message) {
          if (res.message == 'jwt expired') {
            console.log('Error fetching profile')
          } else {
            console.log('This popped up error:', res.message)
          }
        }
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }

  getCryptoCurrency() {
    this.apiService.getCryptoCurrency().subscribe(
      res => {
        if (res && res.length) {
          this.newDealLists.cryptolist = res
          this.newDeal.SelectCryptoType = res[0].code
          this.SelectCryptoType.code = res[0].code
          this.SelectCryptoType.name = res[0].name
          this.newDeal.SelectCrypto = res[0]
        }
        if (res.message) {
          if (res.message == 'jwt expired') {
            console.log('Error fetching profile')
          } else {
            console.log('This popped up error:', res.message)
          }
        }
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }

  currentDeal
  overlayDisplay = false
  newDealModal = false
  viewDealModal = false
  collectionDeals: any[] = []

  toggleemailverify() {
    const dialogRef = this.dialog.open(newemailverifyDialogComponent, {
      data: { data: {} },
    })
  }

  toggleOnboarding() {
    console.log('Toggled onboarding')
    const dialogRef = this.dialog.open(onboardingDialogComponent, {
      data: {
        innerWidth: this.innerWidth,
        innerHeight: this.innerHeight,
      },
    })
  }

  toggleDisplay(id) {
    console.log('New id is: ', id)
    this.overlayDisplay = true
    this.viewDealModal = true
    for (let i = 0; i < this.collectionDeals.length; i++) {
      if (this.collectionDeals[i].id == id) {
        this.currentDeal = this.collectionDeals[i]
      }
    }
  }

  innerWidth
  innerHeight

  ngOnInit(): void {
   // this.getConvo();
    this.initlization();
   
    this.getRequestList();

    // this.getCountries()

    // this.getCryptoCurrency()
  }

  ngOnDestroy(): void {
    console.log('On destroy called buy')
    this.collectionDeals = []
    this.posts = null
    this.orignalData = null
    this.provideData = []
  }
  /**
   * getRequestList
   */
  
  getRequestList() {
    let url = 'sortDate=descending&userID='+this.appStorage.getItem('id');
    this.loader = true
    _.forIn(this.queryParam, function(value, key) {
      if(value || value === 0){
        url = url ? url +'&'+ key+'='+value : key+'='+value
      }
    });
    this.apiService.fetchDeals(url).subscribe(
      res => {
        console.log('refresh list', res)
        if (res) {
          this.loader = false
          this.totalCount = res.DataCount;
          this.posts = 
          _.sortBy(res.Data, [function(o) { return !o.dateCreated; }]);

          this.orignalData = this.posts
          this.provideData = [];
          if (this.posts.length > 0) {
            this.posts.forEach(post => {
              console.log("post" +post);
              if (post.country && !post.country.name  && !post.country.code) {
                var country = post.country.split(':')
                post.country = {
                  code: country[0].toLowerCase(),
                  name: country[1],
                }
              }
              // if (post.status == 0) {
              //   var postStatus = post.status
              //   post.status = { key: postStatus, value: 'Available' }
              // } else if (post.status == 1) {
              //   var postStatus = post.status
              //   post.status = { key: postStatus, value: 'Expired' }
              // } else if (post.status == 2) {
              //   var postStatus = post.status
              //   post.status = { key: postStatus, value: 'Deal Closed' }
              // } else if (post.status == 3) {
              //   var postStatus = post.status
              //   post.status = { key: postStatus, value: 'In Negotation' }
              // }
              // if (post.serviceType == 0 && post.status.key != 1) {
              //   this.provideData.push(post)
              // }
              this.provideData.push(post)
            })
            console.log("provideData"+ this.provideData);
            // for (let x = 0; x < this.provideData.length; x++) {
            //   if (this.provideData[x].sponsered == true) {
            //     let sponsoredItem = this.provideData[x]
            //     this.provideData.splice(x, 1)
            //     this.purchasedDeal.push(sponsoredItem)
            //     console.log('Moving sponsored to front', this.provideData)
            //   }
            // }
          }
          this.SortOrder(this.SortbyOptions[0], 'Most Recent')
          console.log('all data', this.provideData)
        }
        if (res.message) {
          if (res.message == 'jwt expired') {
            this.onLogout()
          }
        } else {
          this.listingsRemaining = this.appStorage.getItem('listingsRemaining')
          this.sortListings(res)
        }
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }
  /**
   * getNext
   */
  getPaginationData(type){
    this.queryParam.pageNum = type === 'next'? this.queryParam.pageNum + 1 : this.queryParam.pageNum - 1; 
    this.getRequestList();
  }
  /**
   * filter
   */
  filter(type, val){
    this.queryParam[type] = val;
    this.queryParam.pageNum = 1;
    this.getRequestList();
  }
  /**
   * initlization
   */
  initlization(){
    this.collectionDeals = []
    this.posts = null
    this.orignalData = null
    this.provideData = []
    const resultCookie = this.appStorage.getItem('test')
    const t = window
    this.totalCount = 0;
    const t1 = document
    this.getCategoryList();
    this.listOfSubCategories = [
    ]
    this.listOfCountries = [
      {
        'name': 'ALL',
        'value': null
      },
      {
        'name': 'INDIA',
        'value': 'india'
      },
      {
        'name': 'America',
        'value': 'America'
      },
      {
        'name': 'Norway',
        'value': 'nor'
      }
    ]
    this.listOfServices = [
      {
        'name': 'ALL',
        'value': null
      },
      {
        'name': 'Purchase Service',
        'value': 0
      },
      {
        'name': 'Provide Service',
        'value': 1
      }
    ]
    this.innerWidth = window.innerWidth
    this.innerHeight = window.innerHeight

    if (
      this.appStorage.getItem('emailVerified') == 'false' &&
      this.appStorage.getItem('emailVerifiedtoggle') == 'false'
    ) {
      //this.toggleemailverify();
      //this.appStorage.setItem('emailVerifiedtoggle', 'true');
    }

    if (
      this.appStorage.getItem('viewedOnboarding') == 'false' &&
      this.appStorage.getItem('viewedOnboardingtoggle') == 'false'
    ) {
      this.toggleOnboarding()
      console.log('Just called onboarding')
    }

  }

  /**
   * nextButton
   * use for show hide next  and  previous button
   */
  public get nextButton() : boolean {
    if(this.totalCount > this.queryParam.pageSize * this.queryParam.pageNum){
      return true;
    }
    return false;
  }
  
  public get prevButton() : boolean {
    if(this.queryParam.pageNum > 1){
      return true;
    }
    return false;
  }
  openDeatils(item){
    localStorage.setItem('selected', JSON.stringify(item));
    this.router.navigate(['/view-request'])
  }
  categoryList: any[];
  getCategoryList(){
    this.apiService
    .getCategoryList()
    .subscribe(
      res => {
        this.listOfCategories = res.Data
        console.log(this.categoryList)
      }
    )
  }
  subCategoryList: any[];
  getSubCategoryList(code){
    this.apiService
    .getSubCategoryList(code)
    .subscribe(
      res => {
        this.listOfSubCategories = res.Data
        console.log(this.categoryList)
      }
    )
  }
  count: number;
  sentMessage(event) {
    if(event.ConvoCreated){
   //   this.router.navigate(['/chat']);
   this._snack.open('Already Converation Created', '', {
    duration: 2000,
  });
    } else{
      const reqData = {
        "from": this.appStorage.getItem('id'),
        "to": event.userID,
        "convoName": event.description,
        "dealID": event._id,
        "userName": this.appStorage.getItem('name')
        }
        this.loader = true
    this.apiService.sendConversationRequest(reqData).subscribe((res) => {
      this.provideData.forEach(element => {
        if(element._id === event._id){
          element.ConvoCreated = true;
        }
      });
       this.loader = false
       this._snack.open('Converation Created. Waiting for acceptance', '', {
        duration: 2000,
      });
     //  this.router.navigate(['/chat']);
  }); 
    }
   
    // let data = {
      //   from: this.appStorage.getItem('id'),
      //   to: event.userID,
      //   message: 'newRequest',
      //   conversationID: null,
      //   email: this.appStorage.getItem('email'),
      //   newchat: true,
      //   userID: this.appStorage.getItem('id'),
      //   dealID: event._id,
      //   type: 0
      // };

      //   data['dealID'] = event._id;
      //   data['convoName'] = JSON.stringify(event.description);
      //   data['otherUserID'] = event.userID;
      //   this.chatService.sendMessage(data, this.appStorage.getItem('token'));
      //   this.chatService.stopTyping(data);
      //   this.chatService.chatStart(data, this.appStorage.getItem('token'));
      //   this.router.navigate(['/chat']);
      // this.chatService.onchatAck().subscribe(data => {
      //     console.log('chat start ack', data);
      //     if (data.adminID) {
      //       this.chatService.convoId = data._id;
      //       this.appStorage.setItem('convoId', data._id);
      //     }
      // });
     //this.message = '';
    }


    conversations = [];  
  getConvo() {
    let userID = this.appStorage.getItem('id'),
      query = "?userID=" + userID + "&limit=20&page=1&data=" + Math.random();
    this.apiService.getConversations(query).subscribe((res) => {
       this.conversations = res.Data;
    });
  }
  isChat(id){
  let index =  _.findIndex(this.conversations, function(o) { return o.convoID.dealID == id; });
  if(index != -1){
    return true;
  }
  return false;
  }

  
  public get userId() : string {
    return this.appStorage.getItem('id');
  }
  
}
