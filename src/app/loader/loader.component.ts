import { Component, OnInit, NgModule } from '@angular/core';
import { SpinnerComponent } from '@shared/spinner/spinner.component';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [],
  declarations: [LoaderComponent,SpinnerComponent],
  exports: [LoaderComponent,SpinnerComponent]
})
export class LoaderComponentModule { }