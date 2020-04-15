import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JoinRoutes } from './join.routing';
import { JoinComponent } from './join.component';
import { NumberOnlyDirectiveModule } from 'app/_.directives/numberOnly';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { SharedMaterialModule } from 'app/shared-material.module';
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  imports: [
    CommonModule,
    JoinRoutes, 
    FormsModule,
    ReactiveFormsModule,
    NumberOnlyDirectiveModule,
    RecaptchaModule,
    NgxExtendedPdfViewerModule,
    SharedMaterialModule,
    PdfViewerModule  
  ],
  declarations: [JoinComponent]
})
export class JoinModule { }
