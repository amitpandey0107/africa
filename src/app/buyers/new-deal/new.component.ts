import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from '../../pendig-guard-service';
import { ApiService } from '../../services/api.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-buyers',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss', '../../../../node_modules/flag-icon-css/css/flag-icon.css'],
  providers: [ApiService, LoginService]
})
export class NewComponent implements ComponentCanDeactivate {
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if(this.newDeal!={} && this.newDeal.AmountofCoin !="" && this.newDeal.AmountofCoin !=undefined){
      return false;
    }else{
      return true;
    }
  }
  constructor(@Inject(AppStorage) private appStorage: Storage, private router: Router,
   private apiService: ApiService, private loginService: LoginService, private _fb: FormBuilder,
    public dialog: MatDialog, private _snackBar: MatSnackBar) {
  this.getCategoryList();
  }
  
  matchesRemaining = this.appStorage.getItem('matchesRemaining');
  step1: any = false;
  step2: any = false;
  step3: any = false;
  step4: any = false;
  newDeal: any = {};
  IsValidate=false;
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
  autoExpire: boolean
language ="Language"
languageCode: string;
categoryCheck: string;
categoryList = [];
subCategoryList=[];
languageChange(code, name) {
  this.language = name;
  this.languageCode = code;
  // this.filterCountryCode = 'all';
  // this.filterCountry = 'Country'
} 

//post deal variables
serviceType: string;
onServiceTypeChange(value){
  this.serviceType = value.value;
  console.log(this.serviceType);
}

category = "Business Category";
CategoryCode: string;
categoaryChange(code, name){
  this.category = name;
  this.CategoryCode = code;
  // console.log(this.category);
this.getSubCategoryList(code);

}
subCategory = "Business Sub Category";
subCategoryCode: string;
subCategoaryChange(code, name){
  this.subCategory = name;
  this.subCategoryCode = code;
  // console.log(this.subCategory);
}
businessType = "Select Business"
businessCode: string;
businessTypeChange(code, name){
  this.businessType = name;
  this.businessCode = code;
  // console.log(this.businessType);
}
Summary : string;
OnInput(event: any) {
  this.Summary = event.target.value;
}
Description: string;
OnDescInput(value){
 this.Description = value; 
}
fileBase64: any;
mimeType: string;
@ViewChild('documentInput', {static: false}) fileInput: ElementRef
  onFileChange(event) {
    console.log(event)
    this.uploadFile()
  }

  uploadFile() {
    let inputEl: HTMLInputElement = this.fileInput.nativeElement
    let image = inputEl.files.item(0)
    let reader = new FileReader()
    let that = this
    reader.readAsDataURL(image)
    reader.onload = (e) =>{
      // console.log(reader.result);
      this.fileBase64 = reader.result;
    }
    reader.onerror = (error)=>{
      this.ErrorText = error
      
    }
  }
  base64MimeType(encoded) {
    var result = null;
    var resultMime = null;
    if (typeof encoded !== 'string') {
      return result;
    }
    var mime = encoded.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
    if (mime && mime.length) {
      resultMime = mime[1];
      let type = resultMime.split("/");
      result = type[1];
    }
    return result;
  }
targatedAudience = "Select targated Audience";
targatedAudienceCode: string;
audienceChange(code, name){
  this.targatedAudience = name;
  this.targatedAudienceCode = code;
  // console.log(this.subCategory);
}

backlist(){
  console.log('Backlist');
}

  

back() {
  if(this.currentStep === 1 ){
    this.router.navigate(['/buyers'])
  } else{
    this.currentStep = this.currentStep - 1;

  }
  // this.loader = true;
  // setTimeout(() => {
  //   this.loader = false;
  //   this.currentStep = this.currentStep - 1;
  //   this.checkValidation(this.currentStep);
  // }, 1000);
}
  continue(currentStep) {
    this.currentStep = this.currentStep + 1;

  }

  viewMyDeal(){
    this.router.navigateByUrl('/buyers');
  }

  submitted = false;
  id;
  ErrorText : any;
  submit() {
    // console.log(this.fileBase64);
    this.mimeType = this.base64MimeType(this.fileBase64);
    // console.log(this.mimeType);
    // console.log("test");
    let userID = '';
    this.loader = true;
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;
    let token = '';
    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.includes('token')) {
           token = c.split('=')[1]
        }
        if (c.split('=')[0] === 'id') {
          userID = c.split('=')[1]
       }
    }
    this.loader = true;

    if(this.submitted == false){
  //    this.loader = true;
  //    this.submitted = true;
      let request = {
        "userID" : userID,
        "serviceType": Number(this.serviceType),
        "businessCat": this.CategoryCode,
        "businessSubCat": this.subCategory,
        "business": this.businessCode,
        "description":  this.Summary+'  '+this.Description,
        "region": "oakret",
        "subRegion": "in",
        "broadcastTO[0]":2,
        "broadcastTO[1]": 3,
        "document": this.fileBase64,
        "targetedAudience": this.targatedAudienceCode,
        "autoExpire": this.autoExpire,
        "country": "india",
      };
      console.log(request);
      // debugger;
      this.apiService.postDeal(request).subscribe(res => {
         this.loader = false;
        console.log(res);
        // debugger;
        if (res.Message) {
          if (res.Status == 1 ) {
            this.loader = false;
            this.router.navigate(['/buyers'])
            // this.newDeal = {};
            // this.collectionDeals = [];
            this.step3 = false;
            this.step4 = true;
            this.currentStep = 4;
            this.id = res.id;
          }
          else{
            this.loader = false;
            this.ErrorText = "There is some Issue in Data";
          }
          this._snackBar.open(res.Message, '', {
            duration: 2000,
          });
        }

        if (res.errors) {
          this.loader = false;
          this.ErrorText = res.Message;
        }

      }, (err) => {
        // console.log('Err', err)
        if (err) {
          this.ErrorText = 'Sorry someting went wrong';
        }
      });
    }
    
  };
  checkValidation(currentStep){
    // console.log(currentStep);
    if (currentStep == 1) 
    {   
      // if(this.serviceType){  
        this.IsValidate=true;
        this.currentStep = 2;
      // }else if(!this.serviceType) {   
      //   this.IsValidate=false;
      // }
    }
    if(currentStep == 2){
      console.log("summary"+this.Summary);
      if (currentStep == 2 && this.Summary) {
        this.IsValidate=true;
        this.currentStep = 3;
        // console.log("aage badh")
      } else if (!this.Summary) {
          this.IsValidate = false;      
      }
    }
    // if (currentStep == 3){
    //   // if (currentStep == 3 && this.Description) {
    //     this.IsValidate=true;
    //     this.currentStep = 4;
    //   // } else if (!this.Description) {
    //   //   this.IsValidate = false;  
    //   // }
    //   //console.log(this.IsValidate);
    // }
      // if(this.category){
      //   this.IsValidate=true;
      // }else if(!this.category){
      //   this.IsValidate = false;
      // }
      // if(this.category){
      //   this.IsValidate=true;
      // }else if(!this.category){
      //   this.IsValidate = false;
      // }
      // if(this.category){
      //   this.IsValidate=true;
      // }else if(!this.category){
      //   this.IsValidate = false;
      // }

    
  }
ngOnInit(): void {
  // this.getGrossList();
  // this.getNetList();
  // this.getCountries();
  // this.getPositionTypes();
  // this.getCryptoCurrency();
  // this.getProofs();
  this.currentStep = 1;
  
}
// getNetList() {
  //   this.newDealLists.net = [
  //     {
  //       key: "> +2",
  //       value: "Over 2% Net Premium"
  //     },
  //     {
  //       key: "+2",
  //       value: "2% Net Premium"
  //     },
  //     {
  //       key: "+1",
  //       value: "1% Net Premium"
  //     },
  //     {
  //       key: "0",
  //       value: "0% Net Discount"
  //     },
  //     {
  //       key: "1",
  //       value: "1% Net Discount"
  //     },
  //     {
  //       key: "2",
  //       value: "2% Net Discount"
  //     },
  //     {
  //       key: "3",
  //       value: "3% Net Discount"
  //     },
  //     {
  //       key: "4",
  //       value: "4% Net Discount"
  //     },
  //     {
  //       key: "5",
  //       value: "5% Net Discount"
  //     },
  //     {
  //       key: "6",
  //       value: "6% Net Discount"
  //     },
  //     {
  //       key: "7",
  //       value: "7% Net Discount"
  //     },
  //     {
  //       key: "8",
  //       value: "8% Net Discount"
  //     },
  //     {
  //       key: "9",
  //       value: "9% Net Discount"
  //     },
  //     {
  //       key: "10",
  //       value: "10% Net Discount"
  //     },
  //     {
  //       key: "> 10",
  //       value: "Over 10% Net Discount"
  //     }
  //   ]

  //   this.newDeal.net = this.newDealLists.net[3].key;
  // }
  // getGrossList() {
  //   this.newDealLists.GrossList = [
  //   {
  //     key: "> +2",
  //     value: "Over 2% Gross Premium"
  //   },
  //   {
  //     key: "+2",
  //     value: "2% Gross Premium"
  //   },
  //   {
  //     key: "+1",
  //     value: "1% Gross Premium"
  //   },
  //   {
  //     key: "0",
  //     value: "0% Gross Discount"
  //   },
  //   {
  //     key: "1",
  //     value: "1% Gross Discount"
  //   },
  //   {
  //     key: "2",
  //     value: "2% Gross Discount"
  //   },
  //   {
  //     key: "3",
  //     value: "3% Gross Discount"
  //   },
  //   {
  //     key: "4",
  //     value: "4% Gross Discount"
  //   },
  //   {
  //     key: "5",
  //     value: "5% Gross Discount"
  //   },
  //   {
  //     key: "6",
  //     value: "6% Gross Discount"
  //   },
  //   {
  //     key: "7",
  //     value: "7% Gross Discount"
  //   },
  //   {
  //     key: "8",
  //     value: "8% Gross Discount"
  //   },
  //   {
  //     key: "9",
  //     value: "9% Gross Discount"
  //   },
  //   {
  //     key: "10",
  //     value: "10% Gross Discount"
  //   },
  //   {
  //     key: "> 10",
  //     value: "Over 10% Gross Discount"
  //   }
  //   ]

  //   this.newDeal.Discount = this.newDealLists.GrossList[3].key;
    
  // };



  // getCountries() {
  //   this.apiService.getCountries().subscribe(res => {
  //     if (res && res.length) {
  //       this.newDealLists.countries = res;
  //       this.selectedCountry.code = res[0].code;
  //       this.selectedCountry.name = res[0].name;
  //       this.newDeal.countryRequest = res[0].code + ':' + res[0].name;
  //     }
  //     if (res.message) {
  //       if (res.message == 'jwt expired') { console.log('Error fetching profile') }
  //         else { console.log('This popped up error:', res.message) }
  //       }
  //   }, (err) => {
  //     console.log('Err', err)
  //     if (err) {
  //       console.log('Some error occured');
  //     }
  //   });
  // };
// getUserInfo(id) {
  //   this.showUserInfo = true;
  //   this.apiService.getUserInfo(id).subscribe(res => {
  //     this.currentUserInfo = res;
  //     console.log(res);
  //   }, (err) => {
  //     console.log('Err', err)
  //     if (err) {
  //       console.log('Some error occured');
  //     }
  //   });
  // }

  // currentUserInfo = {};
  // showUserInfo = false;

  // goBack() {
  //   this.showUserInfo = false;
  //   this.currentUserInfo = {};
  // }


  // onCryptoChange(data) {
  //   this.newDealLists.cryptolist.forEach(CryptoCurrency => {
  //     if (CryptoCurrency.code == data) {
  //       this.newDeal.SelectCrypto = CryptoCurrency;
  //       this.newDeal.SelectCryptoType = CryptoCurrency.code;
  //       this.SelectCryptoType.code = CryptoCurrency.code;
  //       this.SelectCryptoType.name = CryptoCurrency.name;
  //     }
  //   });
  // }

  // onFlagChange(countryCode) {
  //   this.newDeal.SelectCrypto = countryCode;
  // }

  // getUrlCrypto(type) {
  //   var newUrl = "https://s3.amazonaws.com/zalate/public/crypto/" + type.toLowerCase() + ".svg";
  //   return newUrl
  // }

  // getFlag(code) {
  //   var newUrl = "https://s3.amazonaws.com/zalate/public/flags/" + code.toLowerCase() + ".svg";
  //   return newUrl;
  // }
  // onCountryChange(countryCode) {
  //   this.newDealLists.countries.forEach(country => {
  //     if (country.code == countryCode) {
  //       this.selectedCountry.code = country.code;
  //       this.selectedCountry.name = country.name;
  //       this.newDeal.countryRequest = country.code + ':' + country.name;
  //     }
  //   });
  // }

  // getPositionTypes() {
  //   this.newDealLists.positions = [
  //   {
  //     "name": "Buyer Mandate"
  //   },
  //   {
  //     "name": "Direct-to-Buyer"
  //   },
  //   {
  //     "name": "Buyer"
  //   },
  //   {
  //     "name": "POA"
  //   },
  //   {
  //     "name": "Intermediary"
  //   },
  //   ]
  //   this.newDeal.YourPosition = this.newDealLists.positions[0].name;
    
  // };



  //  getProofs() {
  //   this.newDealLists.proofs = [
  //   {
  //     "name": "Yes"
  //   },
  //   {
  //     "name": "No"
  //   },
  //   {
  //     "name": "To Be Determined"
  //   }
  //   ]
  //   this.newDeal.YourProof = this.newDealLists.proofs[0].name;
    
  // };

  // toggleemailverify() {
  //   const dialogRef = this.dialog.open(newemailverifyDialogComponent, {
  //     data: { data: {} }
  //   });
  // };
  // getCryptoCurrency() {
  //   this.apiService.getCryptoCurrency().subscribe(res => {
  //     if (res && res.length) {
  //       this.newDealLists.cryptolist = res;
  //       this.newDeal.SelectCryptoType = res[0].code;
  //       this.SelectCryptoType.code = res[0].code;
  //       this.SelectCryptoType.name = res[0].name;
  //       this.newDeal.SelectCrypto = res[0];
  //     }
  //     if (res.message) {
  //       if (res.message == 'jwt expired') { console.log('Error fetching profile') }
  //         else { console.log('This popped up error:', res.message) }
  //       }
  //   }, (err) => {
  //     console.log('Err', err)
  //     if (err) {
  //       console.log('Some error occured');
  //     }
  //   });
  // };
  

  
  public get isValid() : boolean {
    if(this.currentStep === 1){
      if(this.serviceType && this.CategoryCode && this.subCategoryCode && this.businessCode){
        return false;
      }
    }
    if(this.currentStep === 2){
      if(this.Summary && this.targatedAudienceCode && this.fileBase64 ){
        return false;
      }
    }
    if(this.currentStep === 3 && this.Description 
      && this.Description.trim().length>0){
      return false;
    }
    return true;
  }
  
  getCategoryList(){
    this.apiService
    .getCategoryList()
    .subscribe(
      res => {
        this.categoryList = res.Data
        console.log(this.categoryList)
      }
    )
  }
  
  getSubCategoryList(code){
    this.apiService
    .getSubCategoryList(code)
    .subscribe(
      res => {
        this.subCategoryList = res.Data
        console.log(this.categoryList)
      }
    )
  }






}
