import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutes } from './contact.routing';
import { ContactComponent } from './contact.component';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirectiveModule } from 'app/_.directives/numberOnly';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ContactRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
    NumberOnlyDirectiveModule
  ],
  declarations: [ContactComponent]
})
export class ContactModule { }
