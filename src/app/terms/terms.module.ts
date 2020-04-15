import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TermsRoutes } from './terms.routing';
import { TermsComponent } from './terms.component';
import { NumberOnlyDirectiveModule } from 'app/_.directives/numberOnly';


@NgModule({
  imports: [
    CommonModule,
    TermsRoutes,
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [TermsComponent]
})
export class TermsModule { }
