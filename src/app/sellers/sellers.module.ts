import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { SellersRoutes } from './sellers.routing';
import { SellersComponent } from './sellers.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TruncatePipeModule } from 'app/filters/limitTo.pipe';
import { LoaderComponentModule } from 'app/loader/loader.component';
import { NumberOnlyDirectiveModule } from 'app/_.directives/numberOnly';
import { filtercryptoPipeModule} from '../filters/filtercrypto.pipe';
import { orderByPipeModule} from '../filters/orderBy.pipe';
import { ClickOutsideDirectiveModule } from 'app/_.directives/clickouside';
import { NewComponent } from './new-deal/new.component';

@NgModule({
  imports: [
    CommonModule,
    SellersRoutes,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    TruncatePipeModule,
    LoaderComponentModule,
    NumberOnlyDirectiveModule,
    filtercryptoPipeModule,
    orderByPipeModule,
    ClickOutsideDirectiveModule
  ],
  declarations: [SellersComponent, NewComponent]
})
export class SellersModule { }
