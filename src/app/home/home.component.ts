import { Component, OnInit, OnDestroy, Inject, ElementRef, } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval ,  Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators'
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements  OnDestroy {
  constructor(@Inject(AppStorage) private appStorage: Storage, elm: ElementRef, private router: Router, meta: Meta, title: Title) {

    title.setTitle('Africa SMB Business Deals');
    meta.addTag({ name: 'description', content: 'Find, negotiate & close OTC Bitcoin and Cryptocurrency deals on Zalate! Search our listings of large OTC Bitcoin buyers and sellers. OTC Brokers, Mandates, PoAs, Buyers and Sellers welcome. ' });
    meta.addTag({ name: 'keywords', content: 'bitcoin otc, bitcoin otc buyers, bitcoin otc sellers, bitcoin over the counter, crypto otc, cryptocurrency otc, otc, bitcoin, zalate otc, otc matchmaking, find otc buyers, find otc sellers, find bitcoin otc buyers, find bitcoin otc sellers, btc buyers, btc sellers, btx otc buyers, btc otc sellers' });
    
    //For Google
    meta.addTag({ name: 'author', content: 'Zalate, LLC' });
    meta.addTag({ name: 'copyright', content: 'Zalate, LLC' });
    meta.addTag({ name: 'application-name', content: 'Zalate' });

    //For Facebook
    meta.addTag({ name: 'og:title', content: 'Africa SMB - Business Deals' });
    meta.addTag({ name: 'og:type', content: 'website' });
    meta.addTag({ name: 'og:image', content: 'http://s3.amazonaws.com/zalate/public/ogimage.png' });
    meta.addTag({ name: 'og:url', content: 'http://localhost' });
    meta.addTag({ name: 'og:description', content: 'Find, Negotiate & Close Africa SMB Business Deals' });
    meta.addTag({ name: 'og:image:secure_url', content: 'https://s3.amazonaws.com/zalate/public/ogimage.png' });
    meta.addTag({ name: 'og:image:width', content: '1200' });
    meta.addTag({ name: 'g:image:height', content: '630' });

    //For Twitter
    meta.addTag({ name: 'twitter:card', content: 'summary' });
    meta.addTag({ name: 'twitter:title', content: 'Zalate - OTC Bitcoin Matchmaking' });
    meta.addTag({ name: 'twitter:description', content: 'Find, Negotiate & Close Africa SMB Business Deals' });
    meta.addTag({ name: 'twitter:image', content: 'https://s3.amazonaws.com/zalate/public/ogimage.png' });





  	if(this.appStorage.getItem('token') != undefined && this.appStorage.getItem('token') != null && this.appStorage.getItem('token') != ''){
  		this.router.navigateByUrl('/buyers');
  	}
  }



  ngOnDestroy(){
  }
}
