import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { MatSnackBar } from '@angular/material';
import { SpinnerService } from '@shared/spinner/spinner.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public loader = false;
  public profileForm: FormGroup;
  userId: string;
  token: string;
  isVideo = true;
  edit;
  notifier: any;
  @ViewChild('videoPlayer', { static: false }) videoplayer: ElementRef;

//  baseUrl = 'http://dev.gdsoftwares.com:3001/'
  baseUrl = 'http://localhost:3000/'

  tiles = [
    { text: 'One', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
  ];
  constructor(private _service: ApiService, private _fb: FormBuilder,
    @Inject(AppStorage) private appStorage: Storage, private _router: Router,
    private _snackBar: MatSnackBar, private _spinner: SpinnerService,
    private http: HttpClient) {

  }
  @ViewChild('myInput', { static : false})
  myInputVariable: ElementRef;

  ngOnInit() {
    this.createForm();
    this.getProfile();
    this.edit = true;

    this.firstFormGroup = this._fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  /**
   * createForm
   */
  createForm() {
    this.profileForm = this._fb.group({
      userID: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      location: [''],
      companyRegion: ['', Validators.required],
      companySubRegion: ['', Validators.required],
      companyCountry: ['', Validators.required],
      companyName: ['', Validators.required],
      companyAddress: ['', Validators.required],
      companyAdminID: ['', Validators.required],
      companyFiscalNumber: ['', Validators.required],
      companyVideoLink: ['', Validators.required],
      companyWebpage: ['', Validators.required],
      password: [''],
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
      businessCat: ['', Validators.required],
      businessSubCat: ['', Validators.required],
      companyProfile: ['', Validators.required],
      subscriptionCategory: ['', Validators.required],
      fileUpload: ['', Validators.required],
      profileURl: [''],
      businessVision: ['']
    })

  }

  /**
   * getProfile
   */
  profile: any;
  profileImage
  getProfile() {
    let url = 'userID=';
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;
    let token = '';
    this.loader = true;
    for (let i: number = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.includes('token')) {
        token = c.split('=')[1]
        this.token = token;
      }
      if (c.split('=')[0] === 'id') {
        url = url + c.split('=')[1]
        this.userId = c.split('=')[1];
      }
    }
    this._service.getUserDeatils(token, url).subscribe(
      res => {
        this.profile = res.Data;
        this.profile.businessLogo = this.profile.businessLogo ? this.baseUrl + this.profile.businessLogo : null;
        this.profile.videoURL = this.profile.videoURL ? this.baseUrl + this.profile.videoURL : null;
        this.profileForm.patchValue(this.profile);
        if (this.profile.pictures) {
          const pics = [];
          this.profile.pictures.forEach(element => {
            element = this.baseUrl + element
            pics.push(element)
          });
          this.profile.pictures = pics
        }
        this.profileImage = this.baseUrl + this.profile.image;
        this.loader = false;

      },
      err => {
        console.log('Err', err)
        this.loader = false;
        if (err.status == 401) {
          this.appStorage.clear();
          localStorage.clear();
          this._router.navigate(['/login'])
        }
      },
    )
  }

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  public get name(): string {
    if (this.profileForm.value.firstName && this.profileForm.value.lastName) {
      return this.profileForm.value.firstName + ' ' + this.profileForm.value.lastName;
    }
    return '---'
  }


  public get aboutbusiness(): string {
    if (this.profileForm.value.businessDenomination) {
      return this.profileForm.value.businessDenomination;
    }
    return '-'
  }
  updateProfile() {

    this.profileForm.patchValue({
      userID: this.userId
    })
    let obj = this.profileForm.value;
    let reqData = ''
    Object.keys(obj).forEach(function (key) {
      reqData = reqData === '' ? key + '=' + obj[key] : reqData + '&' + key + '=' + obj[key]
    });
    this.loader = true;
    this._service.updateProfile(reqData, this.token).subscribe(
      res => {
        let profile = res.Data;
        this.loader = false;
        this._snackBar.open(res.Message, '', {
          duration: 2000,
        });
        this.profileForm.patchValue(profile
        );
      },
      err => {
        console.log('Err', err)
        if (err) {
          console.log('Some error occured')
        }
      },
    )
  }

  changeUploadFile(event) {
    this.loader = true;
    let reader = new FileReader()
    reader.readAsDataURL(event.srcElement.files[0])
    reader.onload = (e) => {
      this.profile.businessLogo = e.target['result'];
      const fd = new FormData();
      fd.append('file', <File>event.target.files[0])
      fd.append("userID", this.userId);

      // reqData = 'userID='+this.userId+'&image='+reader.result;
      this._service.uploadBusinessLogo(fd, this.token).subscribe(
        res => {
          this.loader = false;
          if (this.profile.pictures) {
            this.profile.pictures.push(res.Data)
          } else {
            this.profile.pictures = [res.Data];
          }

          this._snackBar.open(res.Message, '', {
            duration: 2000,
          });
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
  uploadProfile(event) {
    this.loader = true;
    let reader = new FileReader()
    reader.readAsDataURL(event.srcElement.files[0])
    reader.onload = (e) => {
      //  const reqData = 'userID='+this.userId+'&image='+reader.result;
      const fd = new FormData();
      fd.append('file', <File>event.target.files[0])
      fd.append("userID", this.userId);
      if (this.profile.pictures) {
        this.profile.pictures.push(e.target['result'])
      } else {
        this.profile.pictures = [e.target['result']];
      }
      this._service.uploadProfilePicture(fd, this.token).subscribe(
        res => {
          this.loader = false;
          //   this.profileImage = e.target['result'];
          this._snackBar.open(res.Message, '', {
            duration: 2000,
          });

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

  openProfile() {
    window.open('http://dev.gdsoftwares.com/public-profile/?userId=' + this.userId + '&token=' + this.token, '_blank')
  }
  editProfile() {
    this.edit = !this.edit;
  }

  public selectedVideo: File = null;
  fileUploadProgress = '0%';
  onselectVideo(event: any) {
    //this.loader = true;
    this.selectedVideo = <File>event.target.files[0];
    
    const file = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.profile.videoURL = (<FileReader>event.target).result;
      }
    }

    //  this._service.uploadUserVideo(fd,this.token)
    // .subscribe(
    //   res => {
    //     this.loader = false;
    //     this._snackBar.open(res.Message, '',{
    //       duration: 2000,
    //     });
    //   },
    //   err => {
    //     console.log('Err', err)
    //     if (err) {
    //       this.loader = false;
    //       console.log('Some error occured')
    //       this._snackBar.open(err.Message, '',{
    //         duration: 2000,
    //       });
    //     }
    //   },
    // )
  }
  uploadVideo(){
    this.loader = true;
    this.fileUploadProgress = '0%';
    const fd = new FormData();
    fd.append('file', this.selectedVideo, this.selectedVideo.name)
    fd.append("userID", this.userId);
    return this.http.post<any>(this.baseUrl + 'api/v1/uploadUserVideo', fd, {
      reportProgress: true,
      observe: 'events'
    }).subscribe(events => {
      if (events.type === HttpEventType.UploadProgress) {
        this.fileUploadProgress = Math.round(events.loaded / events.total * 100)+'%';
        console.log(this.fileUploadProgress);
      } else if (events.type === HttpEventType.Response) {
        this.fileUploadProgress = '0%';
        this.loader = false;
        this.selectedVideo=null;
        this.myInputVariable.nativeElement.value = "";
        console.log(events.body);
          this._snackBar.open(events.body.Message, '',{
            duration: 2000,
          });
  }

    });

  }
  toggleVideo() {
    this.videoplayer.nativeElement.play();
  }

  public get video(): string {
    if (this.profile && this.profile.videoURL) {
      return this.profile.videoURL;
    }
    return null;
  }


  public get uploaded(): string {
    return this.fileUploadProgress;
  }

  removeVideo(){
    this.myInputVariable.nativeElement.value = "";
  }
  selectedFile
  uploadProfileImage(event: any){
    this.selectedFile  = <File>event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.selectedFile)
    fd.append("userID", this.appStorage.getItem('id'))
    let reader = new FileReader()
    reader.readAsDataURL(event.srcElement.files[0])
     reader.onload = (e) =>{
       this.profileImage = e.target['result'];
     }
    this._service.uploadProfile(fd).subscribe(
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
