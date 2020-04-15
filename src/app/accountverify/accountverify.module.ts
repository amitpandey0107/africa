import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountverifyRoutes } from './accountverify.routing';
import { AccountverifyComponent } from './accountverify.component';
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
    AccountverifyRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
    NumberOnlyDirectiveModule,
    TruncatePipeModule
  ],
  declarations: [AccountverifyComponent]
})
export class AccountverifyModule { }
