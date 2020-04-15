import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../shared-material.module';
import { DealdetailComponentRoutes } from './dealdetail.routing';
import { DealdetailComponent } from './dealdetail.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoaderComponentModule } from 'app/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    DealdetailComponentRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
    LoaderComponentModule
  ],
  declarations: [DealdetailComponent]
})
export class DealdetailModule { }
