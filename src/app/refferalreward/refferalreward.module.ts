import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefferalrewardRoutes } from './refferalreward.routing';
import { RefferalrewardComponent } from './refferalreward.component';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RefferalrewardRoutes,
    SharedMaterialModule,
    FlexLayoutModule,
  ],
  declarations: [RefferalrewardComponent]
})
export class RefferalrewardModule { }
