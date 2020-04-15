import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  language ="LN"
  languageCode: string;
  
  languageChange(code, name) {
    this.language = name;
    this.languageCode = code;
    // this.filterCountryCode = 'all';
    // this.filterCountry = 'Country'
  }
  public get email() : string {
    let ca: Array<string> = document.cookie.split(';');
    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;
 
    for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.includes('email')) {
          let email = c.split('=')[1].replace('%40','@'); 
            return email;
        }
    }
     return ''
   }
}
