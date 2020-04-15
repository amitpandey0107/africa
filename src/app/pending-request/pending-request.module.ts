import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TruncatePipeModule } from 'app/filters/limitTo.pipe';
import { LoaderComponentModule } from 'app/loader/loader.component';
import { MessagePopUpComponentModule } from 'app/messagePopup/messagePopup.component';
import { PendingRequestComponent } from './pending-request.component';
import { PendingRequestRoutes } from './pending-request.routing'

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      SharedMaterialModule,
      FlexLayoutModule,
      LoaderComponentModule,
      PendingRequestRoutes
    ],
    declarations: [PendingRequestComponent]
  })
  export class PendingRequestModule { }