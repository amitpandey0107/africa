import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatRoutes } from './chat.routing';
import { ChatComponent } from './chat.component';
import { SharedMaterialModule } from '../shared-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChatService } from 'app/services/chat.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { LoaderComponentModule } from 'app/loader/loader.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import {FileSizeModule} from 'ngx-filesize';
import { TransferHttpService } from '@gorniv/ngx-transfer-http';
import { ApiService } from 'app/services/api.service';

@NgModule({
  imports: [
    CommonModule,
    ChatRoutes,
    FormsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    LoaderComponentModule,
    AngularFileUploaderModule,
    FileSizeModule
  ],
  declarations: [ChatComponent, TimeAgoPipe],
  providers:[ChatService, TransferHttpService, ApiService]
})
export class ChatModule { }
