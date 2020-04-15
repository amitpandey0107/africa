import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { newemailverifyDialogComponent } from '../../dialogs/newemailverify/newemailverify.dialog.component';
import { Router, CanActivate } from '@angular/router';
import { ComponentCanDeactivate } from '../../pendig-guard-service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-seller',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss', '../../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [ApiService, LoginService]
})
export class NewComponent implements ComponentCanDeactivate {
  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (this.newDeal != {} && this.newDeal.AmountofCoin != "" && this.newDeal.AmountofCoin != undefined) {
      return false;
    } else {
      return true;
    }

    // insert logic to check if there are pending changes here;
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away

  }
  constructor(@Inject(AppStorage) private appStorage: Storage, private router: Router, private apiService: ApiService, private loginService: LoginService, private _fb: FormBuilder, public dialog: MatDialog) {




  }

  matchesRemaining = this.appStorage.getItem('matchesRemaining');
  step1: any = false;
  step2: any = false;
  step3: any = false;
  step4: any = false;
  newDeal: any = {};
  IsValidate = false;
  newDealLists: any = {};
  selectedCountry = { name: '', code: '' };
  SelectCryptoType = { name: '', code: '' };
  currentStep: any;
  loader: boolean | false;
  currentDeal;
  overlayDisplay = false;
  newDealModal = false;
  viewDealModal = false;
  p: number = 1;
  collectionDeals: any[] = [];
  listingsRemaining: any;
  newDealinvalid: any = {};

  backlist() {
    console.log('Backlist');
  }

  getUserInfo(id) {
    this.showUserInfo = true;
    this.apiService.getUserInfo(id).subscribe(res => {
      this.currentUserInfo = res;
      console.log(res);
    }, (err) => {
      console.log('Err', err)
      if (err) {
        console.log('Some error occured');
      }
    });
  }

  currentUserInfo = {};
  showUserInfo = false;

  goBack() {
    this.showUserInfo = false;
    this.currentUserInfo = {};
  }


  onCryptoChange(data) {
    this.newDealLists.cryptolist.forEach(CryptoCurrency => {
      if (CryptoCurrency.code == data) {
        this.newDeal.SelectCrypto = CryptoCurrency;
        this.newDeal.SelectCryptoType = CryptoCurrency.code;
        this.SelectCryptoType.code = CryptoCurrency.code;
        this.SelectCryptoType.name = CryptoCurrency.name;
      }
    });
  }

  onFlagChange(countryCode) {
    this.newDeal.SelectCrypto = countryCode;
  }

  getUrlCrypto(type) {
    var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/" + type.toLowerCase() + ".svg";
    return newUrl
  }

  getFlag(code) {
    var newUrl = "https://s3.amazonaws.com/zalate/public/flags/" + code.toLowerCase() + ".svg";
    return newUrl;
  }

  back() {
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.currentStep = this.currentStep - 1;
      this.checkValidation(this.currentStep);
    }, 1000);
  }

  onCountryChange(countryCode) {
    this.newDealLists.countries.forEach(country => {
      if (country.code == countryCode) {
        this.selectedCountry.code = country.code;
        this.selectedCountry.name = country.name;
        this.newDeal.countryRequest = country.code + ':' + country.name;
      }
    });
  }

  getPositionTypes() {
    this.newDealLists.positions = [
      {
        "name": "Seller Mandate"
      },
      {
        "name": "Direct-to-Seller"
      },
      {
        "name": "Seller"
      },
      {
        "name": "POA"
      },
      {
        "name": "Intermediary"
      },
    ]
    this.newDeal.YourPosition = this.newDealLists.positions[0].name;

  };



  getProofs() {
    this.newDealLists.proofs = [
      {
        "name": "Yes"
      },
      {
        "name": "No"
      },
      {
        "name": "To Be Determined"
      }
    ]
    this.newDeal.YourProof = this.newDealLists.proofs[0].name;

  };

  toggleemailverify() {
    const dialogRef = this.dialog.open(newemailverifyDialogComponent, {
      data: { data: {} }
    });
  };
  getCryptoCurrency() {
    this.apiService.getCryptoCurrency().subscribe(res => {
      if (res && res.length) {
        this.newDealLists.cryptolist = res;
        this.newDeal.SelectCryptoType = res[0].code;
        this.SelectCryptoType.code = res[0].code;
        this.SelectCryptoType.name = res[0].name;
        this.newDeal.SelectCrypto = res[0];
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
  
  continue(currentStep) {
    if (currentStep == 1 && !this.newDeal.AmountofCoin) {
      this.step1 = true;
      this.newDealinvalid.coinAmount = true;
      return;
    } else if (this.newDeal.AmountofCoin) {
      this.step1 = false;
      this.newDealinvalid.coinAmount = false;
    }

    if (currentStep == 2 && !this.newDeal.PreferredEscrow) {
      this.step2 = true;
      this.newDealinvalid.PreferredEscrow = true;
      return;
    } else if (this.newDeal.PreferredEscrow) {
      this.step2 = false;
      this.newDealinvalid.PreferredEscrow = false;
    }

    if (currentStep == 3 && !this.newDeal.Description) {
      this.step3 = true;
      this.newDealinvalid.Description = true;
      return;
    } else if (this.newDeal.Description) {
      this.step3 = false;
      this.newDealinvalid.Description = false;
    }
    this.loader = true;
    setTimeout(() => {
      this.loader = false;
      this.currentStep = this.currentStep + 1;
      this.checkValidation(this.currentStep);
    }, 1000);
  }

  viewMyDeal() {
    this.router.navigateByUrl('/view-deal/' + this.id);
  }
  getNetList() {
    this.newDealLists.net = [
      {
        key: "> +2",
        value: "Over 2% Net Premium"
      },
      {
        key: "+2",
        value: "2% Net Premium"
      },
      {
        key: "+1",
        value: "1% Net Premium"
      },
      {
        key: "0",
        value: "0% Net Discount"
      },
      {
        key: "1",
        value: "1% Net Discount"
      },
      {
        key: "2",
        value: "2% Net Discount"
      },
      {
        key: "3",
        value: "3% Net Discount"
      },
      {
        key: "4",
        value: "4% Net Discount"
      },
      {
        key: "5",
        value: "5% Net Discount"
      },
      {
        key: "6",
        value: "6% Net Discount"
      },
      {
        key: "7",
        value: "7% Net Discount"
      },
      {
        key: "8",
        value: "8% Net Discount"
      },
      {
        key: "9",
        value: "9% Net Discount"
      },
      {
        key: "10",
        value: "10% Net Discount"
      },
      {
        key: "> 10",
        value: "Over 10% Net Discount"
      }
    ]

    this.newDeal.net = this.newDealLists.net[3].key;
  }
  getGrossList() {
    this.newDealLists.GrossList = [
      {
        key: "> +2",
        value: "Over 2% Gross Premium"
      },
      {
        key: "+2",
        value: "2% Gross Premium"
      },
      {
        key: "+1",
        value: "1% Gross Premium"
      },
      {
        key: "0",
        value: "0% Gross Discount"
      },
      {
        key: "1",
        value: "1% Gross Discount"
      },
      {
        key: "2",
        value: "2% Gross Discount"
      },
      {
        key: "3",
        value: "3% Gross Discount"
      },
      {
        key: "4",
        value: "4% Gross Discount"
      },
      {
        key: "5",
        value: "5% Gross Discount"
      },
      {
        key: "6",
        value: "6% Gross Discount"
      },
      {
        key: "7",
        value: "7% Gross Discount"
      },
      {
        key: "8",
        value: "8% Gross Discount"
      },
      {
        key: "9",
        value: "9% Gross Discount"
      },
      {
        key: "10",
        value: "10% Gross Discount"
      },
      {
        key: "> 10",
        value: "Over 10% Gross Discount"
      }
    ]


    this.newDeal.Discount = this.newDealLists.GrossList[3].key;

  };



  getCountries() {
    this.apiService.getCountries().subscribe(res => {
      if (res && res.length) {
        this.newDealLists.countries = res;
        this.selectedCountry.code = res[0].code;
        this.selectedCountry.name = res[0].name;
        this.newDeal.countryRequest = res[0].code + ':' + res[0].name;
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

  submitted = false;
  id;

  submit() {
    if (this.submitted == false) {
      this.loader = true;
      this.submitted = true;
      let request = {
        "cryptoCurrency": this.newDeal.SelectCrypto.name,
        "symbol": this.newDeal.SelectCrypto.code,
        "status": 0,
        "type": "sell",
        "country": this.newDeal.countryRequest,
        "description": this.newDeal.Description,
        "position": this.newDeal.YourPosition,
        "quantity": this.newDeal.AmountofCoin,
        "gross": this.newDeal.Discount,
        "net": this.newDeal.net,
        "escrow": this.newDeal.PreferredEscrow,
        "proof": this.newDeal.YourProof
      };
      this.apiService.postDeal(request).subscribe(res => {
        this.loader = false;
        console.log(res);
        if (res.message) {
          if (res.message == 'Successfully completed adding deal') {
            this.newDeal = {};
            this.collectionDeals = [];
            this.step3 = false;
            this.step4 = true;
            this.currentStep = 4;
            this.id = res.id;
          }
          else {
            console.log('Error posting deal');
          }
        }

        if (res.errors) {
          console.log('error', res.message);
        }

      }, (err) => {
        console.log('Err', err)
        if (err) {
          console.log('Add deal failed');
        }
      });
    }

  };
  checkValidation(currentStep){
    console.log(currentStep,this.newDeal);
    if (currentStep == 1) 
    {   
      if(this.newDeal.AmountofCoin){  
        this.IsValidate=true;
      } 
      else if(!this.newDeal.AmountofCoin) {   
        this.IsValidate=false;
      }
    }
  if(currentStep == 2)
  {
      if (currentStep == 2 && this.newDeal.PreferredEscrow) {
        this.IsValidate=true;
      } else if (!this.newDeal.PreferredEscrow) {
        this.IsValidate = false;      
      }
  }
  if (currentStep == 3)
  {
    if (currentStep == 3 && this.newDeal.Description) {
      this.IsValidate=true;
    } else if (!this.newDeal.Description) {
      this.IsValidate = false;  
    }
    //console.log(this.IsValidate);
  }
}
  ngOnInit(): void {
    this.getGrossList();
    this.getNetList();
    this.getCountries();
    this.getPositionTypes();
    this.getCryptoCurrency();
    this.getProofs();
    this.currentStep = 1;

  }
}
