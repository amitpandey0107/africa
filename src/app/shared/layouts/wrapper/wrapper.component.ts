import { Component } from '@angular/core';
import {MessagePopUpComponent} from '../../../messagePopup/messagePopup.component';
// import { LanguageComponent } from '../language/language.component';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  // styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {
  displayMenu = false;
 public messagePopup=false;
  innerWidth;
  getSize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth >= 600) {
      this.displayMenu = true;
    }
  }
  // isMobile: any = (window.innerWidth <= 600) ? true : false;
  onResize(event) {
    console.log(event.target.innerWidth);
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth <= 600) {
      this.displayMenu = false;
    }
    if (this.innerWidth > 600) {
      this.displayMenu = true;
    }
  }
  constructor(public MessagePopUpComponent:MessagePopUpComponent) {
    this.getSize();
  }
  
  
  
}
