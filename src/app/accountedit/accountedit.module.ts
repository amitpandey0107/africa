import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountEditRoutes } from './accountedit.routing';
import { AccountEditComponent } from './accountedit.component';
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
    AccountEditRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
    NumberOnlyDirectiveModule,
    TruncatePipeModule
  ],
  declarations: [AccountEditComponent]
})
export class AccountEditModule { }
