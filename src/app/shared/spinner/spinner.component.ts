import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService, SpinnerState } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  visible: Boolean = false;

  private spinnerStateChanged: Subscription;

  constructor(
    private spinnerService: SpinnerService
  ) { }

  ngOnInit() {
    this.spinnerStateChanged = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.visible = state.show;
      });
  }

  ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe();
  }

}
