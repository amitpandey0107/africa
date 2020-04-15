import { Component, OnInit, Inject, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { AppStorage } from '@shared/for-storage/universal.inject';


@Component({
    selector: 'app-leftpanel',
    templateUrl: './leftpanel.component.html',
    styleUrls: ['./leftpanel.component.scss'],
    providers: []
  })

  export class LeftPanelComponent{

  	constructor(private router: Router, @Inject(AppStorage) public appStorage: Storage){
  		this.checkPath(this.router.url);
  		router.events.forEach((event) => {
		    if(event instanceof NavigationEnd) {
		    	console.log(this.router.url);
		    	this.checkPath(this.router.url)
		    }
		    // NavigationEnd
		    // NavigationCancel
		    // NavigationError
		    // RoutesRecognized
		  });
  	}



  	checkPath(path){
  				if(path == '/chat'){
  					this.showBackButton = true;
  				}
		    	if(path == '/buyers'){
		    		this.showBackButton = false;
		    	}
		    	if(path == '/sellers'){
		    		this.showBackButton = false;
		    	}
		    	if(path == '/account'){
		    		this.showBackButton = false;
		    	}
		    	if(path.substring(0,10) == '/view-deal'){
		    		this.showBackButton = true;
		    	}
  	}

  	showBackButton = false;

  	loggedIn = true;
  	slideHeight: boolean = false;



  	pressedBack(){
  		console.log(this.router.url);
  		if(this.router.url == '/chat'){
  			location.reload();
  		}
  		if(this.router.url.substring(0,10) == '/view-deal'){
		    		this.router.navigateByUrl('/buyers');
		    	}
  	}

  }