import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponentModule } from 'app/loader/loader.component';
import { ApiService } from 'app/services/api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedMaterialModule } from '../shared-material.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from '@shared/shared.module';
import { MatVideoModule } from 'mat-video';

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutes,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    MatVideoModule,
    LoaderComponentModule  ],
  declarations: [ProfileComponent],
  providers:[ApiService]
})
export class ProfileModule { }