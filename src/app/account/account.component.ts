import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { contactSuccessDialogComponent } from '../dialogs/contactSuccess/contactsuccess.dialog.component';
import { state } from '@angular/animations';
import { DealsService } from 'app/services/deals.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss', '../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [AdminService, ApiService, LoginService, DealsService]
})
export class AccountComponent implements OnInit {
  sellData: any = [];
  buyData: any = [];
  watchlistData: any = [];
  loader: boolean | false;
  slideHeight: boolean = false;
  filterlist: any = {};
  showSuccessPopup: boolean;
  userData: any
  breakpoint: any = (window.innerWidth <= 600) ? 5 : 7;
  isMobile: any = (window.innerWidth <= 600) ? true : false;
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 5 : 7;
    this.isMobile = (window.innerWidth <= 600) ? true : false;
  }

  constructor(private dealService: DealsService, private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private adminService: AdminService, private _fb: FormBuilder, private apiService: ApiService, private loginService: LoginService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private location: Location) {

    this.editSellForm = this._fb.group({
      id: [''],
      type: ['sell', Validators.required],
      country: ['Location of Buyer', Validators.required],
      flag: ['', Validators.required],
      description: ['', Validators.required],
      position: ['Select Your Position', Validators.required],
      gross: ['Gross Discount/Premium', Validators.required],
      net: ['0', Validators.required],
      escrow: ['', Validators.required],
      quantity: ['', Validators.required],
      cryptocurrency: ['Select a Cryptocurrency', Validators.required],
      symbol: ['', Validators.required],
      proof: ['Proof of Coins Available?', Validators.required],
    });

    this.editBuyForm = this._fb.group({
      id: [''],
      type: ['buy', Validators.required],
      country: ['Location of Buyer', Validators.required],
      flag: ['', Validators.required],
      description: ['', Validators.required],
      position: ['Select Your Position', Validators.required],
      gross: ['Gross Discount/Premium', Validators.required],
      net: ['0', Validators.required],
      escrow: ['', Validators.required],
      quantity: ['', Validators.required],
      cryptocurrency: ['Select a Cryptocurrency', Validators.required],
      symbol: ['', Validators.required],
      proof: ['Proof of Coins Available?', Validators.required],
    });
  // this.userData =  JSON.parse(this.appStorage.getItem('UserData'));
  }

  public editSellForm: FormGroup;
  collectionDeals: any[] = [];
  public editBuyForm: FormGroup;
  editSell = false;
  overlayDisplay = false;
  editBuy = false;
  selectedItem = {};
  filterCrypto = 'Coin Type';
  filterCryptoCode: string;
  filterCountry = 'Country';
  filterCountryCode: string;

  Sortby = "Sort by";
  SortbyOptions: any = [
    { id: 1, name: 'Most Recent', sortby: 'dateCreated', sorttype: 'asc' },
    { id: 2, name: 'Oldest', sortby: 'dateCreated', sorttype: 'desc' },
    { id: 3, name: 'Most Coin', sortby: 'quantity', sorttype: 'asc' },
    { id: 4, name: 'Least Coin', sortby: 'quantity', sorttype: 'desc' },
    { id: 5, name: 'Highest Discount', sortby: 'gross', sorttype: 'asc' },
    { id: 6, name: 'Lowest Discount', sortby: 'gross', sorttype: 'desc' }
  ];
  sortOrder: any = this.SortbyOptions[0];

  SortOrder(item, name) {
    this.Sortby = name;
    this.sortOrder = item;
  }

  filterCryptoType(code, name) {
    this.filterCrypto = name;
    this.filterCryptoCode = code;
    this.filterCountryCode = 'all';
    this.filterCountry = 'Country'
  }

  filterCountryType(code, name) {
    this.filterCountry = name;
    this.filterCountryCode = code;
    this.filterCryptoCode = 'all';
    this.filterCrypto = 'Coin Type'
  }

  getUrlCrypto(type) {
    var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/" + type.toLowerCase() + ".svg";
    return newUrl
  }

  getFlag(code) {
    var newUrl = "https://s3.amazonaws.com/zalate/public/flags/" + code.toLowerCase() + ".svg";
    return newUrl;
  }

  userdealListings() {
    this.collectionDeals = [];
    this.loader = true;
    this.apiService.fetchDeals('').subscribe(res => {
      if (res) {
        this.loader = false;
        this.collectionDeals = res.Data;
        this.collectionDeals.forEach(post => {
          if (post.country && !post.country.code) {
            var country = post.country.split(':');
            post.country = { 'code': country[0].toLowerCase(), 'name': country[1] }
          }
          if (post.status == 0) {
            var postStatus = post.status;
            post.status = { 'key': postStatus, 'value': 'Available' };
          } else if (post.status == 1) {
            var postStatus = post.status;
            post.status = { 'key': postStatus, 'value': 'Expired' };
          } else if (post.status == 2) {
            var postStatus = post.status;
            post.status = { 'key': postStatus, 'value': 'Deal Closed' };
          } else if (post.status == 3) {
            var postStatus = post.status;
            post.status = { 'key': postStatus, 'value': 'In Negotation' };
          }
        
            this.sellData.push(post);
        
        });
      }
      if (res.message) {
        if (res.message == 'jwt expired') {
          this.onLogout();
        }
      }
      else {
        this.sortListings(res);
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  sortListings(listings) {
    let length = listings.length;
    console.log('Local id is: ', this.appStorage.getItem('id'));
    for (let i = 0; i < length; i++) {
      if (listings[i].posterId == this.appStorage.getItem('id') && listings[i].type == 'buy') {
        this.collectionDeals.push(listings[i]);
      }
      if (i == (length - 1)) {
        console.log('Last one is: ', i);
        this.collectionDeals = this.collectionDeals.reverse();
      }
    }
  }

  refreshSellListings() {
    this.collectionDealsSell = [];
    let url = 'pageNum=1&pageSize=10'
    this.apiService.fetchDeals(url).subscribe(res => {
      console.log(res);
      if (res.message) {
        if (res.message == 'jwt expired') {
          console.log('jwt expired');
        }
      }
      else {
        console.log('else');
        this.sortSellListings(res);
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  collectionDealsSell = [];

  sortSellListings(listings) {
    let length = listings.length;
    console.log('Local id is: ', this.appStorage.getItem('id'));
    for (let i = 0; i < length; i++) {
      if (listings[i].posterId == this.appStorage.getItem('id') && listings[i].type == 'sell') {
        this.collectionDealsSell.push(listings[i]);
      }
      if (i == (length - 1)) {
        console.log('Last one is: ', i);
        this.collectionDealsSell = this.collectionDealsSell.reverse();
      }
    }
  }

  deleteListing(id) {
    let token = this.appStorage.getItem('token');
    this.adminService.deleteListing(token, id).subscribe(res => {
      this.userdealListings();
      this.refreshSellListings();
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  toggleEditBuy(item) {
    //this.dealService.setDealData(item);
    this.router.navigate(['/edit-deal', item.id]);
  }

  toggleEditSell(item) {
    // this.dealService.setDealData(item);
    this.router.navigate(['/edit-deal', item.id]);

  }

  deleteWatchlist(id, type) {
    console.log('hit remove watchlist');
    if (type) {

    } else {
      this.router.navigate(['/view-deal', id]);
    }
  }

  removeDisplay() {
    this.overlayDisplay = false;
    this.editSell = false;
    this.editBuy = false;
  }

  onCryptoChange() {
    let crypto = this.editBuyForm.controls.cryptocurrency.value;
    console.log(crypto);

    if (crypto == 'Bitcoin') {
      this.editBuyForm.controls.symbol.setValue('btc');
    }
    if (crypto == 'Litecoin') {
      this.editBuyForm.controls.symbol.setValue('ltc');
    }
    if (crypto == 'Ethereum') {
      this.editBuyForm.controls.symbol.setValue('eth');
    }
    if (crypto == 'Dash') {
      this.editBuyForm.controls.symbol.setValue('dash');
    }
    if (crypto == 'Dogecoin') {
      this.editBuyForm.controls.symbol.setValue('doge');
    }
    if (crypto == 'Bitcoin Cash') {
      this.editBuyForm.controls.symbol.setValue('bch');
    }

  }

  onFlagChange() {
    console.log('Flag changed buy');
    let country = this.editBuyForm.controls.country.value;

    if (country == 'USA') {
      this.editBuyForm.controls.flag.setValue('226-united-states');
    }
    if (country == 'France') {
      this.editBuyForm.controls.flag.setValue('195-france');
    }
    if (country == 'Russia') {
      this.editBuyForm.controls.flag.setValue('248-russia');
    }

    //New row 


  }

  onCryptoChangeSell() {
    let crypto = this.editSellForm.controls.cryptocurrency.value;
    console.log(crypto);

    if (crypto == 'Bitcoin') {
      this.editSellForm.controls.symbol.setValue('btc');
    }
    if (crypto == 'Litecoin') {
      this.editSellForm.controls.symbol.setValue('ltc');
    }
    if (crypto == 'Ethereum') {
      this.editSellForm.controls.symbol.setValue('eth');
    }
    if (crypto == 'Dash') {
      this.editSellForm.controls.symbol.setValue('dash');
    }
    if (crypto == 'Dogecoin') {
      this.editSellForm.controls.symbol.setValue('doge');
    }
    if (crypto == 'Bitcoin Cash') {
      this.editSellForm.controls.symbol.setValue('bch');
    }

  }

  onFlagChangeSell() {
    console.log('Flag changed sell');
    let country = this.editSellForm.controls.country.value;

    if (country == 'USA') {
      this.editSellForm.controls.flag.setValue('226-united-states');
    }
    if (country == 'France') {
      this.editSellForm.controls.flag.setValue('195-france');
    }
    if (country == 'Russia') {
      this.editSellForm.controls.flag.setValue('248-russia');
    }

  }

  updateForm(id, type) {

    if (type == 'sell') {
      for (let i = 0; i < this.collectionDealsSell.length; i++) {
        if (this.collectionDealsSell[i].id == id) {
          this.editSellForm.controls.id.setValue(id);
          this.editSellForm.controls.type.setValue(this.collectionDealsSell[i].type);
          this.editSellForm.controls.flag.setValue(this.collectionDealsSell[i].flag);
          this.editSellForm.controls.description.setValue(this.collectionDealsSell[i].description);
          this.editSellForm.controls.position.setValue(this.collectionDealsSell[i].position);
          this.editSellForm.controls.country.setValue(this.collectionDealsSell[i].country);
          this.editSellForm.controls.gross.setValue(this.collectionDealsSell[i].gross);
          this.editSellForm.controls.net.setValue(this.collectionDealsSell[i].net);
          this.editSellForm.controls.escrow.setValue(this.collectionDealsSell[i].escrow);
          this.editSellForm.controls.quantity.setValue(this.collectionDealsSell[i].quantity);
          this.editSellForm.controls.cryptocurrency.setValue(this.collectionDealsSell[i].cryptocurrency);
          this.editSellForm.controls.symbol.setValue(this.collectionDealsSell[i].symbol);
          this.editSellForm.controls.proof.setValue(this.collectionDealsSell[i].proof);
        }
      }
    }


    if (type == 'buy') {
      for (let i = 0; i < this.collectionDeals.length; i++) {
        if (this.collectionDeals[i].id == id) {
          this.editBuyForm.controls.id.setValue(id);
          this.editBuyForm.controls.type.setValue(this.collectionDeals[i].type);
          this.editBuyForm.controls.flag.setValue(this.collectionDeals[i].flag);
          this.editBuyForm.controls.description.setValue(this.collectionDeals[i].description);
          this.editBuyForm.controls.position.setValue(this.collectionDeals[i].position);
          this.editBuyForm.controls.country.setValue(this.collectionDeals[i].country);
          this.editBuyForm.controls.gross.setValue(this.collectionDeals[i].gross);
          this.editBuyForm.controls.net.setValue(this.collectionDeals[i].net);
          this.editBuyForm.controls.escrow.setValue(this.collectionDeals[i].escrow);
          this.editBuyForm.controls.quantity.setValue(this.collectionDeals[i].quantity);
          this.editBuyForm.controls.cryptocurrency.setValue(this.collectionDeals[i].cryptocurrency);
          this.editBuyForm.controls.symbol.setValue(this.collectionDeals[i].symbol);
          this.editBuyForm.controls.proof.setValue(this.collectionDeals[i].proof);
        }
      }
    }

  }

  updateDealBuy() {
    let token = this.appStorage.getItem('token');
    this.adminService.updateDeal(token, this.editBuyForm.controls.id.value, {
      "type": this.editBuyForm.controls.type.value,
      "country": this.editBuyForm.controls.country.value,
      "flag": this.editBuyForm.controls.flag.value,
      "description": this.editBuyForm.controls.description.value,
      "position": this.editBuyForm.controls.position.value,
      "gross": this.editBuyForm.controls.gross.value,
      "net": this.editBuyForm.controls.net.value,
      "escrow": this.editBuyForm.controls.escrow.value,
      "quantity": this.editBuyForm.controls.quantity.value,
      "cryptocurrency": this.editBuyForm.controls.cryptocurrency.value,
      "symbol": this.editBuyForm.controls.symbol.value,
      "proof": this.editBuyForm.controls.proof.value
    }).subscribe(res => {
      console.log(res);
      this.userdealListings();
      this.removeDisplay();
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  updateDealSell() {
    let token = this.appStorage.getItem('token');
    this.adminService.updateDeal(token, this.editSellForm.controls.id.value, {
      "type": this.editSellForm.controls.type.value,
      "country": this.editSellForm.controls.country.value,
      "flag": this.editSellForm.controls.flag.value,
      "description": this.editSellForm.controls.description.value,
      "position": this.editSellForm.controls.position.value,
      "gross": this.editSellForm.controls.gross.value,
      "net": this.editSellForm.controls.net.value,
      "escrow": this.editSellForm.controls.escrow.value,
      "quantity": this.editSellForm.controls.quantity.value,
      "cryptocurrency": this.editSellForm.controls.cryptocurrency.value,
      "symbol": this.editSellForm.controls.symbol.value,
      "proof": this.editSellForm.controls.proof.value
    }).subscribe(res => {
      console.log(res);
      this.refreshSellListings();
      this.removeDisplay();
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  onLogout() {
    this.loginService.logout();
  }

  getCountries() {
    this.apiService.getCountries().subscribe(res => {
      if (res && res.length) {
        this.filterlist.countries = res;
        this.filterlist.countries.forEach(country => {
          country.code = country.code.toLowerCase();
        });
      }
      if (res.message) {
        if (res.message == 'jwt expired') { console.log('Error fetching profile') }
        else { console.log('This popped up error:', res.message) }
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  };

  getCryptoCurrency() {
    this.apiService.getCryptoCurrency().subscribe(res => {
      if (res && res.length) {
        this.filterlist.cryptolist = res;
      }
      if (res.message) {
        if (res.message == 'jwt expired') { console.log('Error fetching profile') }
        else { console.log('This popped up error:', res.message) }
      }
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  };

  accountinfoedit() {
    this.router.navigate(['/accountedit']);
  }

  accountverify() {
    this.router.navigate(['/accountverify']);
  }

  Refferalreward() {
    this.router.navigate(['/refferalreward']);
  };

  togglecontactSuccess() {
    const dialogRef = this.dialog.open(contactSuccessDialogComponent, {
      data: { data: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.location.replaceState('account', '', '');
    });
  }

  ngOnInit(): void {
     this.userdealListings();
    // this.getCountries();
    // this.getCryptoCurrency();
    //this.refreshSellListings();
    this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.showSuccessPopup = params['contact'] || false;
    });
    if (this.showSuccessPopup) {
      this.togglecontactSuccess();
    }
  }
  toggleDeleteSell(item) {
    console.log("Deleting", item, item.id);
    if (confirm("Are you sure to delete this deal")) {
      this.loader = true;
      let token = this.appStorage.getItem('token');
      this.adminService.DeleteDeal(token, { id: item.id }).subscribe(res => {
        console.log("delete Succes", res);
        var index = this.sellData.indexOf(item);
        item.status = {
          key: 1,
          value: "Expired"
        };
        this.sellData[index] = item;
        this.loader = false;
      }, (err) => {
        this.loader = false;
        console.log('Err', err)
        if (err) {
          console.log('Some error occured');
        }
      });
    }

  }
  toggleDeleteBuy(item) {
    console.log("Deleting", item, item.id,this.buyData);
    if (confirm("Are you sure to delete this deal")) {
      this.loader = true;
      let token = this.appStorage.getItem('token');
      this.adminService.DeleteDeal(token, { id: item.id }).subscribe(res => {
        console.log("delete Succes", res);
        var index = this.buyData.indexOf(item);
        item.status = {
          key: 1,
          value: "Expired"
        };
        this.buyData[index] = item;        
        this.loader = false;
      }, (err) => {
        this.loader = false;
        console.log('Err', err)
        if (err) {
          console.log('Some error occured');
        }
      });
    }

  }
}
