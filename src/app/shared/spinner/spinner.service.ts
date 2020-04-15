import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SpinnerState{
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerSubject = new Subject<SpinnerState>();

    spinnerState = this.spinnerSubject.asObservable();
  
    constructor() { }
  
    /********************************************
     * Name: show
     * Purpose: show spinner when content load
     ********************************************/
    show() {
      this.spinnerSubject.next(<SpinnerState>{ show: true });
    }
  
    /********************************************
      * Name: hide
      * Purpose: hide spinner after content load
      ********************************************/
    hide() {
      this.spinnerSubject.next(<SpinnerState>{ show: false });
    }
  }
