import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealEditRoutes } from './dealedit.routing';
import { DealEditComponent } from './dealedit.component';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from 'app/_.directives/numberOnly';
import { TruncatePipeModule } from 'app/filters/limitTo.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DealEditRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
    NumberOnlyDirectiveModule,
    TruncatePipeModule
  ],
  declarations: [DealEditComponent]
})
export class DealEditModule { }
