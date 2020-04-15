import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, NgZone, HostListener } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'onboarding.dialog',
  templateUrl: '../../dialogs/onboarding/onboarding.dialog.component.html',
  styleUrls: ['../../dialogs/onboarding/onboarding.dialog.component.scss'],
  providers: [ApiService]
})



export class onboardingDialogComponent implements OnInit {
  constructor(@Inject(AppStorage) private appStorage: Storage, private apiService: ApiService, public dialogRef: MatDialogRef<onboardingDialogComponent>) {
  
   }

   @HostListener('window:resize', ['$event'])




  onNoClick(): void {
    this.dialogRef.close();
  }

  editSize(width, height){
    if(height < 670 && width < 400){
      this.size = 'xs';
    }
  }


  step = 1;

  size = 'xl';

  pressContinue(){
  	if(this.step == 7){
  		this.pressFinish();
  		return;
  	}
  	if(this.step != 7){
  		this.step++;
  		return;
  	}
  	
  }
  innerWidth;
  innerHeight;
  breakpoint: any = (window.innerWidth <= 600) ? 5 : 7;
  isMobile: any = (window.innerWidth <= 600) ? true : false;
  onResize(event?) {

    /*this.breakpoint = (event.target.innerWidth <= 600) ? 5 : 7;
    this.isMobile = (window.innerWidth <= 600) ? true : false;*/
    console.log('For dialog, is it mobile?: ', this.isMobile);
  }

  pressFinish(){
    this.apiService.viewedOnboarding(this.appStorage.getItem('UserId'),this.appStorage.getItem('token')).subscribe(res=>{
      console.log('RES: ', res);
      if(res.message == 'Successfully updated viewed onboarding info'){
        this.dialogRef.close();
        this.appStorage.setItem('viewedOnboardingtoggle', 'true');
      }
      else{
        console.log('Error: ', res);
      }
    })
  	
  }

  ngOnInit() {

    const t = window;
    const t1 = document;
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
    console.log('Width onboarding: ', this.innerWidth, '  Height: ', this.innerHeight, ' IsMobile? ', this.isMobile);

  }
}
