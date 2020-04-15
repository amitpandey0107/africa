import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountRoutes } from './account.routing';
import { AccountComponent } from './account.component';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TruncatePipeModule } from 'app/filters/limitTo.pipe';
import { LoaderComponentModule } from 'app/loader/loader.component';
import { MessagePopUpComponentModule } from 'app/messagePopup/messagePopup.component';
import { filtercryptoPipeModule} from '../filters/filtercrypto.pipe';
import { orderByPipeModule} from '../filters/orderBy.pipe';

@NgModule({
  imports: [
    CommonModule,
    AccountRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    TruncatePipeModule,
    LoaderComponentModule,
    filtercryptoPipeModule,
    orderByPipeModule,
    MessagePopUpComponentModule
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
