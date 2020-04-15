import { Component, OnInit, OnDestroy, Inject, ElementRef, } from '@angular/core';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { interval ,  Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})


export class HomeComponent implements OnInit, OnDestroy {

  constructor(elm: ElementRef) {
     
  }






  ngOnInit() {

  }

  ngOnDestroy(){

  }




}
