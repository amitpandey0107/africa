import { Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Meta, Title } from '@angular/platform-browser'
import { Router } from '@angular/router'
import { AppStorage } from '@shared/for-storage/universal.inject'
import { AngularFileUploaderComponent } from 'angular-file-uploader'
import { ChatService } from 'app/services/chat.service'
import { ApiService } from '../services/api.service'
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  providers: [ApiService],
  styleUrls: ['./join.component.css'],
})
export class JoinComponent implements OnInit, OnDestroy {
  step1
  step2
  step3
  step4
  step5
  step6
  step7
  step8
  step5_1
  signedUp = false
  signedUpError = false
  notLoadedPdf = true
  termsAccepted = false
  affilliatedToGroup = false
  memberOfProfOrganization = false
  IsValidate = false
  captchaKey: string;
   pdfSrc = 'assets/images/terms.pdf'
  pdfSrc2 = 'assets/images/terms.pdf'
  regionList = [];
  subRegionList = [];
  countryList = []
  // pdfSrc = {
  //   url: 'http://dev.gdsoftwares.com/africa_smb/pdfs/terms.pdf',
  //   withCredentials: false,
  //   httpHeaders: {
  //     'Access-Control-Allow-Origin': 'http://localhost',
  //   },
  // }

  // pdfSrc2 = {
  //   url: 'http://dev.gdsoftwares.com/africa_smb/pdfs/terms.pdf',
  //   withCredentials: false,
  //   httpHeaders: {
  //     'Access-Control-Allow-Origin': 'http://localhost',
  //   },
  // }
  resolved(captchaResponse: string) {
    this.captchaKey = captchaResponse;
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}
  ngOnDestroy() {
    this.signedUp = false
    this.signedUpError = false
    this.notLoadedPdf = true
    this.step1 = false
    this.step2 = false
    this.step3 = false
    this.step4 = false
    this.step5 = true
    this.step6 = false
    this.step7 = false
    this.step8 = false
  }


  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight
    this.screenWidth = window.innerWidth
    console.log('Width: ', this.screenWidth, '  Height: ', this.screenHeight)

    if (this.screenWidth >= 720) {
      console.log('Large width')
      this.resizeTouchPad(600, 150)
    }
    if (this.screenWidth < 720) {
      console.log('Small width')
      this.resizeTouchPad(this.screenWidth - 75, 150)
    }
  }

  constructor(
    private router: Router,
    private ChatService: ChatService,
    @Inject(AppStorage) private appStorage: Storage,
    private _fb: FormBuilder,
    private apiService: ApiService,
    meta: Meta,
    title: Title,
  ) {
    this.onResize()
    this.fbForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ]),
      ],
      repeatPassword: ['', Validators.required],
      companyRegion: ['', Validators.required],
      companySubRegion: ['', Validators.required],
      companyCountry: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyAdminId: ['', Validators.required],
      companyFiscal: ['', Validators.required],
      companyVideoLink: ['', Validators.required],
      companyWebpage: ['', Validators.required],
      funtionOfContacts: ['', Validators.required],
      memberOfProfOrganization: [false],
      typeOfProfOrganization: [''],
      affilliatedToGroup: [false],
      groupName: [''],
      groupAddress: [''],
      groupRegion: [''],
      groupSubRegion: [''],
      groupCountry: [''],
      businessDenomination: ['', Validators.required],
      businessCategory: ['', Validators.required],
      businessSubcategory: ['', Validators.required],
      companyProfile: ['', Validators.required],
      subscriptionCategory: ['', Validators.required],
      fileUpload: ['', Validators.required],
      profileURl: [''],
    })

    title.setTitle('Sign Up for Africa SMB')
    meta.addTag({
      name: 'description',
      content:
        'Find, negotiate & close OTC Bitcoin and Cryptocurrency deals on Zalate! Search our listings of large OTC Bitcoin buyers and sellers. OTC Brokers, Mandates, PoAs, Buyers and Sellers welcome. ',
    })
    meta.addTag({
      name: 'keywords',
      content:
        'bitcoin otc, bitcoin otc buyers, bitcoin otc sellers, bitcoin over the counter, crypto otc, cryptocurrency otc, otc, bitcoin, zalate otc, otc matchmaking, find otc buyers, find otc sellers, find bitcoin otc buyers, find bitcoin otc sellers, btc buyers, btc sellers, btx otc buyers, btc otc sellers',
    })

    //For Google
    meta.addTag({ name: 'author', content: 'Zalate, LLC' })
    meta.addTag({ name: 'copyright', content: 'Zalate, LLC' })
    meta.addTag({ name: 'application-name', content: 'Zalate' })

    //For Facebook
    meta.addTag({
      name: 'og:title',
      content: 'Zalate - OTC Bitcoin Matchmaking',
    })
    meta.addTag({ name: 'og:type', content: 'website' })
    meta.addTag({
      name: 'og:image',
      content: 'http://s3.amazonaws.com/zalate/public/ogimage.png',
    })
    meta.addTag({ name: 'og:url', content: 'http://localhost' })
    meta.addTag({
      name: 'og:description',
      content: 'Find, Negotiate & Close OTC Bitcoin Deals on Zalate!',
    })
    meta.addTag({
      name: 'og:image:secure_url',
      content: 'https://s3.amazonaws.com/zalate/public/ogimage.png',
    })
    meta.addTag({ name: 'og:image:width', content: '1200' })
    meta.addTag({ name: 'g:image:height', content: '630' })

    //For Twitter
    meta.addTag({ name: 'twitter:card', content: 'summary' })
    meta.addTag({
      name: 'twitter:title',
      content: 'Zalate - OTC Bitcoin Matchmaking',
    })
    meta.addTag({
      name: 'twitter:description',
      content: 'Find, Negotiate & Close OTC Bitcoin Deals on Zalate!',
    })
    meta.addTag({
      name: 'twitter:image',
      content: 'https://s3.amazonaws.com/zalate/public/ogimage.png',
    })
    this.getRegionList();
  }

  emailAvailable = false
  imagebase64
  searchingForEmail = false
  loading = false
  error = false
  errorText = ''
  screenHeight
  screenWidth

  resizeTouchPad(width, height) {
    this.signaturePadOptions = {
      // passed through to szimek/signature_pad constructor
      minWidth: 0.5,
      canvasWidth: width,
      canvasHeight: height,
      throttle: 0,
      class: 'canvas',
      backgroundColor: '#fff',
      penColor: 'black',
      dotSize: '0.5',
    }
  }

  // file upload function
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef
  private fileUpload1: AngularFileUploaderComponent

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
    reader.onload = function() {
      console.log('image56: ', reader.result)
      debugger
      that.apiService
      .uploadSignature({
        userID: that.appStorage.getItem('registerId'),
        firstName: 'vishwas',
        lastName: 'vaishnav',
        image: reader.result,
      })
      .subscribe(
        res => {
          console.log(res)
          debugger
        },
        err => {
          console.log(err)
          debugger
        },
      )
    }
    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
    
  
    
  }

  
    // file upload function
    @ViewChild('profileInput', {static: false}) profileInput: ElementRef
    private profileInput1: AngularFileUploaderComponent
  
    onProfileChange(event) {
      console.log(event)
      this.uploadPrifilePic()
    }

    
    uploadPrifilePic() {
    let inputEl: HTMLInputElement = this.profileInput.nativeElement
    let image = inputEl.files.item(0)
    let reader = new FileReader()
    let that = this
    reader.readAsDataURL(image)
    reader.onload = function() {
      console.log('image56: ', reader.result)
      debugger
      that.apiService
      .uploadProfile({
        userID: that.appStorage.getItem('registerId'),
        file: reader.result,
      })
      .subscribe(
        res => {
          console.log(res)
          debugger
        },
        err => {
          console.log(err)
          debugger
        },
      )
    }
    reader.onerror = function(error) {
      console.log('Error: ', error)
    }
    
  
    
  }
  afuConfig = {
    multiple: false,
    formatsAllowed:
      '.jpg,.png,.JPG,.PNG,.pdf,.PDF,.xml,.XML,.jpeg,.JPEG,.gif,.GIF,.doc,.DOC,.docx,.DOCX,.ppt,.PPT,.pptx,.PPTX ',
    maxSize: '50',
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: false,
    hideSelectBtn: false,
    attachPinText: ' ',
  }

  // }
  // onFileChange(event) {
  //   let reader = new FileReader();
  //   if(event.target.files && event.target.files.length > 0) {
  //     let formData = new FormData();
  //     let file = event.target.files[0];
  //     // console.log(file);
  //     // reader.readAsDataURL(file);
  //     formData.append('userID',this.appStorage.getItem('registerId'));
  //     formData.append('file',file);
  //     // console.log(formData);
  // debugger;
  // this.apiService.uploadSignature({
  //   formData
  // }).subscribe(
  //   Response =>{
  //     console.log(Response);
  //     debugger;
  //   },
  //   error => {
  //     console.log(error);
  //     debugger;
  //   }
  // );
  // reader.onload = () => {
  //   this.fbForm.get('sign-image').setValue({
  //     filename: file.name,
  //     filetype: file.type,
  //     value: reader.result,
  //   })
  // };

  //   }
  // }
  public signaturePadOptions

  // ngAfterViewInit() {
  //   // this.signaturePad is now available

  //   this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  // }

  callBackFn(pdf) {
    // do anything with "pdf"
    console.log('Loaded completely')
  }

  callBackFn1(pdf) {
    // do anything with "pdf"
    this.notLoadedPdf = false
    console.log('Loaded 1 completely')
  }

  drawingStarted = false

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing')
    this.drawingStarted = true
  }

  clear() {
    if (this.loading == false) {
      this.drawingStarted = false
    }
  }
  //member of organisation and affiliated to group
  setAdditionalValidation() {
    // const memberOfProfOrganization = this.fbForm.controls.memberOfProfOrganization;
    // const typeOfProfOrganization = this.fbForm.controls.typeOfProfOrganization;
    // const affilliatedToGroup = this.fbForm.controls.affilliatedToGroup;
    // const nameOfGroup = this.fbForm.controls.nameOfGroup;
    // const groupAddress = this.fbForm.controls.groupAddress;
    // const groupRegion = this.fbForm.controls.groupRegion;
    // const groupSubRegion = this.fbForm.controls.groupSubRegion;
    // const groupCountry = this.fbForm.controls.groupCountry;

    this.fbForm
      .get('memberOfProfOrganization')
      .valueChanges.subscribe(memberOfProfOrganization => {
        if (memberOfProfOrganization == true) {
          console.log('changed organisation')
          this.fbForm.controls.typeOfProfOrganization.setValidators([
            Validators.required,
          ])
        }
      })
    this.fbForm.controls.typeOfProfOrganization.updateValueAndValidity()

    this.fbForm
      .get('affilliatedToGroup')
      .valueChanges.subscribe(affilliatedToGroup => {
        if (affilliatedToGroup == true) {
          console.log('changed group')
          this.fbForm.controls.groupName.setValidators([Validators.required])
          this.fbForm.controls.groupAddress.setValidators([Validators.required])
          this.fbForm.controls.groupRegion.setValidators([Validators.required])
          this.fbForm.controls.groupSubRegion.setValidators([
            Validators.required,
          ])
          this.fbForm.controls.groupCountry.setValidators([Validators.required])
        }
      })
    this.fbForm.controls.groupName.updateValueAndValidity()
    this.fbForm.controls.groupAddress.updateValueAndValidity()
    this.fbForm.controls.groupRegion.updateValueAndValidity()
    this.fbForm.controls.groupSubRegion.updateValueAndValidity()
    this.fbForm.controls.groupCountry.updateValueAndValidity()
  }
  submitNcnda(data, callback) {
    this.apiService
      .sendNCNDA({
        firstName: this.fbForm.controls.firstName.value,
        lastName: this.fbForm.controls.lastName.value,
        email: this.fbForm.controls.email.value,
        password: this.fbForm.controls.password.value,
        location: 'India',
        role: 'admin',
        businessCat: 1,
        businessSubCat: 1,
      })
      .subscribe(res => {
        console.log('This is the res: ', res)
        if (res.message == 'Success') {
          console.log('')
          callback(null, res.fileLocation)
          return
        }
        if (res.message == 'error') {
          this.errorText = res.error
          console.log(res.error)
          callback(res.error, false)
          return
        } else {
          this.errorText = 'Unknown Error'
          console.log('Its unknown')
          callback('unknown', false)
          return
        }
      })
  }

  validateEmail() {
    console.log('Valid? ', this.fbForm.controls.email.valid)
    if (this.fbForm.controls.email.valid) {
      this.searchingForEmail = true
      this.apiService.verifyEmail(this.fbForm.controls.email.value).subscribe(
        res => {
          console.log('check email response ' + res.Message)
          if (res.Data == false) {
            this.searchingForEmail = false
            this.error = false
            this.emailAvailable = true
          } else {
            this.searchingForEmail = false
            this.emailAvailable = false
            this.error = true
            this.errorText = res.Message
          }
        },
        err => {
          console.log('Err', err)
          if (err) {
            this.error = true
            this.errorText = err.statusText
          }
        },
      )
    } else {
      this.IsValidate = false
      this.searchingForEmail = false
    }
    this.checkValidation()
  }
  validatePassword() {
    if (
      this.fbForm.controls.password.value !=
      this.fbForm.controls.repeatPassword.value
    ) {
      this.error = true
      this.errorText = 'Password not Match!'
    } else if (
      this.fbForm.controls.password.value.length < 5 ||
      this.fbForm.controls.repeatPassword.value.length < 5
    ) {
      this.error = true
      this.errorText = 'Password length should be atleast 5 letters.'
    } else {
      this.error = false
      this.errorText = undefined
    }
  }
  checkValidation() {
    if (this.step1 == true || this.step2 == true || this.step3 == true) {
      if (
        this.fbForm.controls.firstName.valid &&
        this.fbForm.controls.lastName.valid &&
        // this.fbForm.controls.email.valid &&
        this.emailAvailable &&
        this.fbForm.controls.password.valid &&
        this.fbForm.controls.repeatPassword.value ==
          this.fbForm.controls.password.value &&
        this.fbForm.controls.email.value != '' &&
        this.fbForm.controls.companyRegion.valid &&
        this.fbForm.controls.companySubRegion.valid &&
        this.fbForm.controls.companyCountry.valid &&
        this.fbForm.controls.companyName.valid &&
        this.fbForm.controls.companyAddress.valid &&
        this.fbForm.controls.companyAdminId.valid &&
        this.fbForm.controls.companyWebpage.valid &&
        this.fbForm.controls.companyFiscal.valid &&
        this.fbForm.controls.companyVideoLink.valid &&
        this.fbForm.controls.funtionOfContacts.valid
      ) {
        this.IsValidate = true
      } else {
        this.IsValidate = false
      }
      if (this.step2 == true) {
        if (
          this.fbForm.controls.typeOfProfOrganization.valid &&
          this.fbForm.controls.memberOfProfOrganization.valid &&
          this.fbForm.controls.affilliatedToGroup.valid &&
          this.fbForm.controls.groupName.valid &&
          this.fbForm.controls.groupAddress.valid &&
          this.fbForm.controls.groupSubRegion.valid &&
          this.fbForm.controls.groupCountry.valid &&
          this.fbForm.controls.businessDenomination.valid &&
          this.fbForm.controls.businessCategory.valid &&
          this.fbForm.controls.businessSubcategory.valid &&
          this.fbForm.controls.companyProfile.valid &&
          this.fbForm.controls.subscriptionCategory.valid
        ) {
          this.IsValidate = true
        } else {
          this.IsValidate = false
        }
      }
      if (this.step3 == true) {
        if (this.fbForm.controls.subscriptionCategory.valid) {
          this.IsValidate = true
        } else {
          this.IsValidate = false
        }
      }
    }
  }

  onSubmit() {
    if (this.loading == true) {
      return
    } else {
      if (this.step1 == true) {
        console.log('on step one')
        if (
          this.fbForm.controls.email.valid &&
          this.emailAvailable &&
          this.fbForm.controls.password.valid &&
          this.fbForm.controls.repeatPassword.value ==
            this.fbForm.controls.password.value &&
          this.fbForm.controls.email.valid &&
          this.fbForm.controls.password.valid &&
          this.fbForm.controls.repeatPassword.valid &&
          this.fbForm.controls.companyRegion.valid &&
          this.fbForm.controls.companySubRegion.valid &&
          this.fbForm.controls.companyCountry.valid &&
          this.fbForm.controls.companyName.valid &&
          this.fbForm.controls.companyAddress.valid &&
          this.fbForm.controls.companyAdminId.valid &&
          this.fbForm.controls.companyWebpage.valid &&
          this.fbForm.controls.companyFiscal.valid &&
          this.fbForm.controls.companyVideoLink.valid &&
          this.fbForm.controls.funtionOfContacts.valid
        ) {
          this.step1 = false
          this.step2 = true
          this.loading = false
          this.error = false
          this.errorText = undefined
          this.checkValidation()
          return
        }
        if (
          !this.fbForm.controls.email.valid ||
          !this.emailAvailable ||
          !this.fbForm.controls.password.valid ||
          !this.fbForm.controls.repeatPassword.valid ||
          this.fbForm.controls.repeatPassword.value ==
            this.fbForm.controls.password.value ||
          !this.fbForm.controls.companyRegion.valid ||
          !this.fbForm.controls.companySubRegion.valid ||
          !this.fbForm.controls.companyCountry.valid ||
          !this.fbForm.controls.companyName.valid ||
          !this.fbForm.controls.companyAddress.valid ||
          !this.fbForm.controls.companyAdminId.valid ||
          !this.fbForm.controls.companyWebpage.valid ||
          !this.fbForm.controls.companyFiscal.valid ||
          !this.fbForm.controls.companyVideoLink.valid ||
          !this.fbForm.controls.funtionOfContacts.valid
        ) {
          this.error = true
          this.errorText =
            'please check fields highlighted with Red color and fill them correctly.'

          return
        } else {
          this.validatePassword()
          return
        }
      }

      if (this.step2 == true) {
        this.setAdditionalValidation()
        if (
          this.fbForm.controls.typeOfProfOrganization.valid &&
          this.fbForm.controls.memberOfProfOrganization.valid &&
          this.fbForm.controls.affilliatedToGroup.valid &&
          this.fbForm.controls.groupName.valid &&
          this.fbForm.controls.groupAddress.valid &&
          this.fbForm.controls.groupSubRegion.valid &&
          this.fbForm.controls.groupCountry.valid &&
          this.fbForm.controls.businessDenomination.valid &&
          this.fbForm.controls.businessCategory.valid &&
          this.fbForm.controls.businessSubcategory.valid &&
          this.fbForm.controls.companyProfile.valid &&
          this.captchaKey &&
          // this.fbForm.controls.subscriptionCategory.valid &&
          this.termsAccepted == true
        ) {
          console.log(this.fbForm.controls.memberOfProfOrganization.value)
          this.step2 = false
          this.step3 = true
          this.loading = false
          this.error = false
          this.errorText = undefined
          this.checkValidation()
          return
        }
        if (
          !this.fbForm.controls.typeOfProfOrganization.valid ||
          !this.fbForm.controls.memberOfProfOrganization.valid ||
          !this.fbForm.controls.affilliatedToGroup.valid ||
          !this.fbForm.controls.groupName.valid ||
          !this.fbForm.controls.groupAddress.valid ||
          !this.fbForm.controls.groupSubRegion.valid ||
          !this.fbForm.controls.groupCountry.valid ||
          !this.fbForm.controls.businessDenomination.valid ||
          !this.fbForm.controls.businessCategory.valid ||
          !this.fbForm.controls.businessSubcategory.valid ||
          !this.fbForm.controls.companyProfile.valid ||
          !this.termsAccepted
        ) {
          this.error = true
          this.errorText =
            'Make sure you fill out all fields below marked with red color.'
          return
        } else {
          this.error = true
          this.errorText =
            'Please make sure you have entered your information correctly'
          return
        }
        // if (
        //   !this.fbForm.controls.firstName.valid ||
        //   !this.fbForm.controls.lastName.valid ||
        //   !this.fbForm.controls.phoneNumber.valid
        // ) {
        //   this.error = true
        //   this.errorText = 'Make sure you fill out all fields above'
        //   return
        // } else {
        //   this.error = true
        //   this.errorText =
        //     'Please make sure you have entered your information correctly'
        //   return
        // }
      }

      if (this.step3 == true) {
        console.log('Going to step 4')
        if (
          this.fbForm.controls.subscriptionCategory.valid &&
          this.fbForm.controls.subscriptionCategory.value == '0'
        ) {
          this.loading = true
          this.errorText = undefined
          this.apiService
            .signUp({
              firstName: this.fbForm.controls.firstName.value,
              lastName: this.fbForm.controls.lastName.value,
              email: this.fbForm.controls.email.value,
              password: this.fbForm.controls.password.value,
              location: 'india',
              businessCat: this.fbForm.controls.businessCategory.value,
              businessSubCat: this.fbForm.controls.businessSubcategory.value,
              companyName: this.fbForm.controls.companyName.value,
              companyAddress: this.fbForm.controls.companyAddress.value,
              companyAdminID: this.fbForm.controls.companyAdminId.value,
              companyRegion: this.fbForm.controls.companyRegion.value,
              companyCountry: this.fbForm.controls.companyCountry.value,
              companySubRegion: this.fbForm.controls.companySubRegion.value,
              companyFiscalNumber: this.fbForm.controls.companyFiscal.value,
              companyVideoLink: this.fbForm.controls.companyVideoLink.value,
              companyWebPage: this.fbForm.controls.companyWebpage.value,
              funtionOfContacts: this.fbForm.controls.funtionOfContacts.value,
              memberOfProfOrganization: this.fbForm.controls
                .memberOfProfOrganization.value,
              affilliatedToGroup: this.fbForm.controls.affilliatedToGroup.value,
              businessDenomination: this.fbForm.controls.businessDenomination
                .value,
              groupName: this.fbForm.controls.groupName.value,
              groupRegion: this.fbForm.controls.groupRegion.value,
              groupSubRegion: this.fbForm.controls.groupSubRegion.value,
              groupCountry: this.fbForm.controls.groupCountry.value,
              companyProfile: this.fbForm.controls.companyProfile.value,
            })
            .subscribe(
              res => {
                if (res.Message == 'Email already registered.') {
                  this.loading = false
                  this.step2 = false
                  this.step3 = true
                  this.error = false
                  this.signedUpError = true
                  this.errorText = 'User already Exists!'
                }
                if (res.Message == 'New User Registered Successfully') {
                  this.loading = false
                  this.step2 = false
                  this.error = false
                  this.signedUp = true
                  this.loading = true
                  localStorage.setItem('userInfo', JSON.stringify(res.Data))
                  this.apiService
                    .login({
                      email: this.fbForm.controls.email.value,
                      password: this.fbForm.controls.password.value,
                      deviceTokenID: '',
                      deviceName: '',
                      deviceFullName: '',
                      uid: '',
                      osVersion: '',
                      appVersion: '6.0.1',
                    })
                    .subscribe(
                      response => {
                        if (response.Status == 1) {
                          this.appStorage.setItem(
                            'token',
                            response.Data.loginToken,
                          )
                          this.appStorage.setItem('email', response.Data.email)
                          this.appStorage.setItem('name', response.Data.name)
                          this.appStorage.setItem('registerId', response.Data.userID)
                          this.router.navigate(['/buyers'])
                          // this.apiService
                          //   .getProfile(response.token)
                          //   .subscribe(res => {
                          //     console.log('Login API res: ', res)
                          //     if (res.message) {
                          //       if (res.message == 'jwt expired') {
                          //         console.log('Error fetching profile')
                          //       } else {
                          //         console.log(
                          //           'This popped up error:',
                          //           res.message,
                          //         )
                          //       }
                          //     } else {
                          //       this.appStorage.setItem(
                          //         'UserData',
                          //         JSON.stringify(res),
                          //       )
                          //       this.appStorage.setItem(
                          //         'listingsRemaining',
                          //         res.listingsRemaining,
                          //       )
                          //       this.appStorage.setItem(
                          //         'listingsUsed',
                          //         res.listingsUsed,
                          //       )
                          //       this.appStorage.setItem(
                          //         'firstName',
                          //         res.firstName,
                          //       )
                          //       this.appStorage.setItem('lastName', res.lastName)
                          //       this.appStorage.setItem(
                          //         'matchesRemaining',
                          //         res.matchesRemaining,
                          //       )
                          //       this.appStorage.setItem(
                          //         'matchesUsed',
                          //         res.matchesUsed,
                          //       )
                          //       this.appStorage.setItem('UserId', res.id)
                          //       this.appStorage.setItem(
                          //         'deviceID',
                          //         response.deviceID,
                          //       )
                          //       this.appStorage.setItem('email', res.email)
                          //       this.appStorage.setItem(
                          //         'emailVerified',
                          //         res.emailVerified,
                          //       )
                          //       this.appStorage.setItem(
                          //         'emailVerifiedtoggle',
                          //         res.emailVerified,
                          //       )
                          //       this.appStorage.setItem(
                          //         'viewedOnboarding',
                          //         res.viewedOnboarding,
                          //       )
                          //       this.appStorage.setItem(
                          //         'viewedOnboardingtoggle',
                          //         res.viewedOnboarding,
                          //       )
                          //       this.ChatService.initSocket(
                          //         res.id,
                          //         response.deviceID,
                          //         res.email,
                          //         response.token,
                          //       )
                          //       this.router.navigate(['/buyers'])
                          //     }
                          //   })
                        } else {
                          this.error = true
                          this.errorText =
                            'Your username or password is incorrect!'
                          this.loading = false
                        }
                      },
                      err => {
                        console.log('Err', err)
                        if (err) {
                          console.log('Login failed')
                          this.error = true
                          this.errorText =
                            'Your username or password is incorrect'
                          this.loading = false
                        }
                      },
                    )
                }
              },
              err => {
                console.log('Err', err)
                if (err) {
                  console.log('Some error occured')
                  this.errorText = 'An unknown error occured'
                }
              },
            )
          return
          // }
        } else if (
          (this.fbForm.controls.subscriptionCategory.valid &&
            this.fbForm.controls.subscriptionCategory.value == '1') ||
          this.fbForm.controls.subscriptionCategory.value == '2'
        ) {
          this.loading = true
          this.errorText = undefined
          this.apiService
            .signUp({
              firstName: this.fbForm.controls.firstName.value,
              lastName: this.fbForm.controls.lastName.value,
              email: this.fbForm.controls.email.value,
              password: this.fbForm.controls.password.value,
              location: 'india',
              businessCat: this.fbForm.controls.businessCategory.value,
              businessSubCat: this.fbForm.controls.businessSubcategory.value,
              companyName: this.fbForm.controls.companyName.value,
              companyAddress: this.fbForm.controls.companyAddress.value,
              companyAdminID: this.fbForm.controls.companyAdminId.value,
              companyRegion: this.fbForm.controls.companyRegion.value,
              companyCountry: this.fbForm.controls.companyCountry.value,
              companySubRegion: this.fbForm.controls.companySubRegion.value,
              companyFiscalNumber: this.fbForm.controls.companyFiscal.value,
              companyVideoLink: this.fbForm.controls.companyVideoLink.value,
              companyWebPage: this.fbForm.controls.companyWebpage.value,
              funtionOfContacts: this.fbForm.controls.funtionOfContacts.value,
              memberOfProfOrganization: this.fbForm.controls
                .memberOfProfOrganization.value,
              affilliatedToGroup: this.fbForm.controls.affilliatedToGroup.value,
              businessDenomination: this.fbForm.controls.businessDenomination
                .value,
              groupName: this.fbForm.controls.groupName.value,
              groupRegion: this.fbForm.controls.groupRegion.value,
              groupSubRegion: this.fbForm.controls.groupSubRegion.value,
              groupCountry: this.fbForm.controls.groupCountry.value,
              companyProfile: this.fbForm.controls.companyProfile.value,
            })
            .subscribe(
              res => {
                if (res.Message == 'Email already registered.') {
                  this.loading = false
                  this.step2 = false
                  this.step3 = true
                  this.error = false
                  this.signedUpError = true
                  this.errorText = 'User already Exists!'
                }
                if (res.Message == 'New User Registered Successfully') {
                  this.loading = false
                  this.error = false
                  this.signedUp = true
                  this.loading = true
                  localStorage.setItem('userInfo', JSON.stringify(res.Data))
               
                  // this.appStorage.setItem('token', res.Data.loginToken),
                  //   this.appStorage.setItem('email', res.Data.email)
                  // this.appStorage.setItem('name', res.Data.name)
                  // this.appStorage.setItem('registerId', res.Data.userID)
                  console.log('registred')
                  this.step3 = false
                  this.step4 = true
                  this.loading = false
                  this.error = false
                  this.errorText = undefined
                  // this.step5 = true;
                  // this.step3 =
                } else {
                  this.error = true
                  this.errorText = 'some error occured while registration!'
                  this.loading = false
                }
              },
              err => {
                console.log('Err', err)
                if (err) {
                  console.log('Some error occured')
                  this.errorText = 'An unknown error occured'
                }
              },
            )
          return
          // this.step3 = false
          // this.step4 = true
          // this.loading = false
          // this.error = false
          // this.errorText = undefined
          // this.checkValidation()
          // console.log('Step3 is: ', this.step3)
          // console.log('Step4 is: ', this.step4)
          // console.log('Step5 is: ', this.step5)
          // return
        }
        // if (
        //   !this.fbForm.controls.whatsApp.value &&
        //   !this.fbForm.controls.telegram.value &&
        //   !this.fbForm.controls.skype.value
        // ) {
        //   this.error = true
        //   this.loading = false
        //   this.errorText =
        //     'Please enter at least one of your messaging details(whatsapp/skype/telegram)'
        //   return
        // }
      }

      if (this.step4 == true) {
        this.step4 = false
        this.step5 = true
        this.loading = false
        this.error = false
        this.errorText = undefined
        return
      }
      if (this.step5 == true) {
        this.step5 = false
        this.step6 = true
        this.loading = false
        this.error = false
        this.errorText = undefined
        return
      }
      if (this.step5_1 == true) {
        this.step5_1 = false
        this.step6 = true
        this.loading = false
        this.error = false
        this.errorText = undefined
        return
      }
      if (this.step6 == true) {
        this.step6 = false
        this.step7 = true
        this.loading = false
        this.error = false
        this.errorText = undefined
        // //If there is indeed a signature, send it to the server
        // if (this.drawingStarted == true) {
        //   console.log('Drawing did start')
        //   this.errorText = undefined
        //   this.loading = true
        //   let this2 = this
        //   this.submitNcnda(this.signaturePad.toDataURL(), function(err, data) {
        //     if (err) {
        //       console.log('Ayyo err', err)
        //       return
        //     } else {
        //       console.log('Data is: ', data)
        //       this2.pdfSrc2 = data
        //       setTimeout(() => {
        //         //<<<---    using ()=> syntax
        //         this2.step5 = false
        //         this2.step6 = true
        //         this2.loading = false
        //         console.log('Moving forward with: ', this2.pdfSrc2)
        //       }, 3000)

        //       return
        //     }
        //   })
        // }

        // //If not, display an error and tell them to continue
        // if (this.drawingStarted == false) {
        //   this.errorText = 'Must Draw a Signature Below'
        //   return
        // }

        return
      }

      if (this.step7 == true) {
        this.step7 = false
        this.step8 = true
        this.loading = false
        this.error = false
        this.errorText = undefined
        return
      }
      if (this.step8 == true) {
        return
      }
    }
  }
  // this.step8 = false
  // this.step8 = true
  // this.loading = false
  // this.error = false
  // this.errorText = undefined
  // this.apiService
  // .login({
  //   email: this.fbForm.controls.email.value,
  //   password: this.fbForm.controls.password.value,
  //   deviceTokenID: '',
  //   deviceName: '',
  //   deviceFullName: '',
  //   uid: '',
  //   osVersion: '',
  //   appVersion: '6.0.1',
  // })
  // .subscribe(
  //   response => {
  //     if (response.Status == 1) {
  //       this.appStorage.setItem(
  //         'token',
  //         response.Data.loginToken,
  //       )
  //       this.appStorage.setItem('email', response.Data.email)
  //       this.appStorage.setItem('name', response.Data.name)
  //       this.appStorage.setItem('id', response.Data.userID)
  //       this.router.navigate(['/buyers'])

  //     } else {
  //       this.error = true
  //       this.errorText =
  //         'Your username or password is incorrect!'
  //       this.loading = false
  //     }
  //   },
  //   err => {
  //     console.log('Err', err)
  //     if (err) {
  //       console.log('Login failed')
  //       this.error = true
  //       this.errorText =
  //         'Your username or password is incorrect'
  //       this.loading = false
  //     }
  //   },
  // )
  onBack() {
    if (this.loading == false) {
      if (this.step2 == true) {
        this.step1 = true
        this.step2 = false
      }

      if (this.step3 == true) {
        this.step2 = true
        this.step3 = false
      }

      if (this.step4 == true) {
        this.step3 = true
        this.step4 = false
      }

      if (this.step5 == true) {
        this.step4 = true
        this.step5 = false
      }
      if (this.step6 == true) {
        ;(this.step5 = true), (this.step6 = false)
      }
      this.checkValidation()
    } else {
      console.log('Cannot go back while loading')
      return
    }
  }
  // @ViewChild('cardInfo', {static: false}) cardInfo: ElementRef;
  // card: any;
  // cardHandler = this.onChange.bind(this);
  // error: string;

  // constructor(private cd: ChangeDetectorRef) {}

  // ngAfterViewInit() {
  //   this.card = elements.create('card');
  //   this.card.mount(this.cardInfo.nativeElement);

  //   this.card.addEventListener('change', this.cardHandler);
  // }

  // ngOnDestroy() {
  //   this.card.removeEventListener('change', this.cardHandler);
  //   this.card.destroy();
  // }

  // onChange({ error }) {
  //   if (error) {
  //     this.error = error.message;
  //   } else {
  //     this.error = null;
  //   }
  //   this.cd.detectChanges();
  // }

  // async onSubmit(form: NgForm) {
  //   const { token, error } = await stripe.createToken(this.card);

  //   if (error) {
  //     console.log('Something is wrong:', error);
  //   } else {
  //     console.log('Success!', token);
  //     // ...send the token to the your backend to process the charge
  //   }
  // }
  ngOnInit() {
    this.step1 = true
    this.step2 = false
    this.step3 = false
    this.step4 = false
    this.step5 = false
    this.step6 = false
    this.step7 = false
    this.step8 = false
    this.setAdditionalValidation();
    this.getBusCatList();
  }
  // ngDocheck(){
  //   this.validatePassword();
  // }

  public fbForm: FormGroup

  getRegionList(){
    this.apiService
    .getRegionList()
    .subscribe(
      res => {
        this.regionList = res.Data
      }
    )
  }
  getsubRegionList(){
    const region = this.fbForm.controls['companyRegion'].value;
    this.apiService
    .getSubRegionList(region)
    .subscribe(
      res => {
        this.subRegionList = res.Data
      }
    )
  }
  getGroupSubRegionList(){
    const region = this.fbForm.controls['groupRegion'].value;
    this.apiService
    .getSubRegionList(region)
    .subscribe(
      res => {
        this.subRegionList = res.Data
      }
    )
  }
  getCountryList(){
    const region = this.fbForm.controls['companySubRegion'].value;
    this.apiService
    .getCountryList(region)
    .subscribe(
      res => {
        this.countryList = res.Data
      }
    )
  }
  categoryList: any[]
  getBusCatList(){
    this.apiService
    .getCategoryList()
    .subscribe(
      res => {
        this.categoryList = res.Data
      }
    )
  }
  listofSubCategories: any[]
  getSubBusList(){
    const region = this.fbForm.controls['businessCategory'].value;
    this.apiService
    .getSubCategoryList(region)
    .subscribe(
      res => {
        this.listofSubCategories = res.Data
      }
    )
  }
  selectedFile
  userSign
   uploadSign(event: any){
    this.selectedFile  = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile)
    fd.append("userID", JSON.parse(localStorage.getItem('userInfo')).userID);
    let reader = new FileReader()
    reader.readAsDataURL(event.srcElement.files[0])
     reader.onload = (e) =>{
       this.userSign = e.target['result'];
     }
    this.apiService.uploadSignature(fd).subscribe(
      res => {
        console.log(Response);
        
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
   }
   profileImage
   uploadProfileImage(event: any){
    this.selectedFile  = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile)
    fd.append("userID", JSON.parse(localStorage.getItem('userInfo')).userID);
    let reader = new FileReader()
    reader.readAsDataURL(event.srcElement.files[0])
     reader.onload = (e) =>{
       this.profileImage = e.target['result'];
     }
    this.apiService.uploadProfile(fd).subscribe(
      res => {
        console.log(Response);
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
   }
}
