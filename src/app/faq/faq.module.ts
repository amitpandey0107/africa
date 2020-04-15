import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaqRoutes } from './faq.routing';
import { FaqComponent } from './faq.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipe} from '../filters/filter.pipe';
import { HighlightPipe} from '../filters/highlight.pipe';
import { LoaderComponentModule } from 'app/loader/loader.component';


@NgModule({
  imports: [
    CommonModule,
    FaqRoutes,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    LoaderComponentModule
  ],
  declarations: [FaqComponent, FilterPipe, HighlightPipe]
})
export class FaqModule { }
