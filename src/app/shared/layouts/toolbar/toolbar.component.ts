import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent implements OnInit {

  public currentLang: string;

  constructor() {
  }

  ngOnInit(): void {
    
  }

  public changeLang(code: string): void {
 
  }
}
