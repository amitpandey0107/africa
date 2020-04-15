// angular
import { AsyncPipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
// shared
import { SharedModule } from '@shared/shared.module';
import { NotifierModule } from 'angular-notifier';
import { contactSuccessDialogComponent } from 'app/dialogs/contactSuccess/contactsuccess.dialog.component';
import { newemailverifyDialogComponent } from 'app/dialogs/newemailverify/newemailverify.dialog.component';
import { newmsglimitDialogComponent } from 'app/dialogs/newmsglimit/newmsglimit.dialog.component';
import { onboardingDialogComponent } from 'app/dialogs/onboarding/onboarding.dialog.component';
import { TruncatePipeModule } from 'app/filters/limitTo.pipe';
// libs
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
// components
import { AppRoutingModule } from './app.routing';
import { CommonVar } from './CommonVar';
import { AuthGuard } from './guards/auth.guard';
import { MessagePopUpComponent, MessagePopUpComponentModule } from './messagePopup/messagePopup.component';
import { PendingChangesGuard } from './pendig-guard-service';
import { MessageService } from './services/message/message.service';
import { SharedMaterialModule } from './shared-material.module';
import { environment } from 'environments/environment';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ChatService } from './services/chat.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}




// import { ProfileComponent } from './profile/profile.component';


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'universal-demo' }),
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    FormsModule,                               
    ReactiveFormsModule,
    SharedMaterialModule,
    FlexLayoutModule,
    NotifierModule,
    TruncatePipeModule,
    LoadingBarRouterModule,
    MessagePopUpComponentModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  })
  ],
  declarations: [AppComponent, contactSuccessDialogComponent, newemailverifyDialogComponent, 
    newmsglimitDialogComponent, onboardingDialogComponent],
  providers: [ {provide: LocationStrategy, useClass: PathLocationStrategy},
  AuthGuard,
  CookieService,
  PendingChangesGuard,MessagePopUpComponent,CommonVar,
  MessageService,AsyncPipe, TranslateService, ChatService
  ],
  bootstrap: [AppComponent],
  entryComponents:[contactSuccessDialogComponent, newemailverifyDialogComponent, newmsglimitDialogComponent, onboardingDialogComponent]
})
export class AppModule {
}
