import { Component, OnInit, Inject } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, } from '@angular/router';
import { LoginService } from '../services/login.service';
import { ApiService } from '../services/api.service';
import { DealsService } from 'app/services/deals.service';

@Component({
  selector: 'app-dealedit',
  templateUrl: './dealedit.component.html',
  styleUrls: ['./dealedit.component.scss', '../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [LoginService, ApiService, DealsService]
})
export class DealEditComponent implements OnInit {
  slideHeight: boolean = false;
  public editForm: FormGroup;
  submitted = false;
  countries: any;
  countryCode: any;
  countryRequest: any;
  selectedCountry = { name: '', code: '' };
  SelectCryptoType = { name: '', code: '' };
  selectedGross = { key: '', value: ''}
  data: string[];
  constructor(private dealService: DealsService, private route: ActivatedRoute, private http: TransferHttpService, @Inject(AppStorage) private appStorage: Storage, private formBuilder: FormBuilder, private router: Router, private loginService: LoginService, private apiService: ApiService) {

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }
  loading = false;
  error = false;
  errorText = '';
  newDeal: any = {};

  newDealLists: any = {};
  onBack() {
    this.router.navigate(['/account']);
  }

  onSubmit() {
    this.submitted = true;
    //this.notifier.notify( 'success', 'You are awesome! I mean it!' );
    console.log(this.editForm.value);
    /*if (this.editForm.invalid) {
      return;
    }*/
    this.loading = !this.loading;
    this.apiService.updateDeal(JSON.stringify(this.editForm.value), this.route.snapshot.params.id).subscribe(res=>{
      console.log(res);
      if(res.message == 'Deal updated successfully'){
        this.router.navigateByUrl('/view-deal/'+this.route.snapshot.params.id)
      }
    })
    //this.router.navigate(['/account']);
  }


  onLogout() {
    this.loginService.logout();
  };


  onCountryChange(countryCode) {
    this.countries.forEach(country => {
      if (country.code == countryCode) {
        this.selectedCountry.code = country.code;
        this.selectedCountry.name = country.name;
        this.countryRequest = country.code + ':' + country.name;
        this.editForm.controls.country.setValue(this.countryRequest);
      }
    });
  }
  onCryptoChange(data) {
    this.newDealLists.cryptolist.forEach(CryptoCurrency => {
      if (CryptoCurrency.code == data) {
        this.newDeal.SelectCrypto = CryptoCurrency;
        this.newDeal.SelectCryptoType = CryptoCurrency.code;
        this.SelectCryptoType.code = CryptoCurrency.code;
        this.SelectCryptoType.name = CryptoCurrency.name;
        this.editForm.controls.symbol.setValue(CryptoCurrency.code);
        this.editForm.controls.cryptoCurrency.setValue(CryptoCurrency.name);
      }
    });
  }





  getCountries() {
    this.apiService.getCountries().subscribe(res => {
      if (res && res.length) {
        this.countries = res;
        this.selectedCountry.code = res[0].code;
        this.selectedCountry.name = res[0].name;
        this.countryRequest = res[0].code + ':' + res[0].name;
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


  getPositionTypes(type) {
    if(type == 'buy'){
      this.newDealLists.positions = [
    {
      "name": "Buyer Mandate"
    },
    {
      "name": "Direct-to-Buyer"
    },
    {
      "name": "Buyer"
    },
    {
      "name": "POA"
    },
    {
      "name": "Intermediary"
    },
    ]
    }
      if(type == 'sell'){
        this.newDealLists.positions = [
    {
      "name": "Seller Mandate"
    },
    {
      "name": "Direct-to-seller"
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
      }
    
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


  getUrlCrypto(type) {
    var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/" + type.toLowerCase() + ".svg";
    return newUrl
  }

  ngOnInit(): void {



    const t = window;
    const t1 = document;
    this.editForm = this.formBuilder.group({
      cryptoCurrency: ['', Validators.required],
      symbol: ['', Validators.required],
      type: ['', Validators.required],
      country: ['', Validators.required],
      description: ['', Validators.required],
      position: ['', Validators.required],
      quantity: ['', Validators.required],
      gross: ['', Validators.required],
      escrow: ['', Validators.required],
      proof: ['', Validators.required]
    });

    this.getGrossList();
    this.getCountries();
    
    this.getCryptoCurrency();
    this.getProofs();
    //   this.data = this.dealService.getDealData();

    this.apiService.fetchDeal(this.route.snapshot.params.id).subscribe(res=>{
      console.log('Edit deal info: ',  res);
      if(res.country != null && res.country != undefined && res.country != ''){
        this.editForm.controls.quantity.setValue(res.quantity);
        this.editForm.controls.description.setValue(res.description);
        this.editForm.controls.escrow.setValue(res.escrow);
        this.editForm.controls.position.setValue(res.position);
        this.editForm.controls.proof.setValue(res.proof);
        this.editForm.controls.gross.setValue(res.gross);
        this.editForm.controls.country.setValue(res.country);
        this.editForm.controls.cryptoCurrency.setValue(res.cryptoCurrency);
        this.editForm.controls.symbol.setValue(res.symbol);
        this.editForm.controls.type.setValue(res.type);
        this.selectedCountry = res.country;
        var country = res.country.split(':');
        this.selectedCountry = { 'code': country[0].toLowerCase(), 'name': country[1] }
        this.SelectCryptoType.code = res.symbol;
        this.SelectCryptoType.name = res.cryptoCurrency;
        this.getPositionTypes(res.type);
      }
    })



  }
}
