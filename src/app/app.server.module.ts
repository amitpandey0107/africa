// angular
import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// libs
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
// shared
import { UniversalStorage } from '@shared/for-storage/server.storage';
import { AppStorage } from '@shared/for-storage/universal.inject';
import { FlexLayoutServerModule } from '@angular/flex-layout/server';

// components
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    NoopAnimationsModule,
    ServerTransferStateModule,
    ServerModule,
    ModuleMapLoaderModule,
    FlexLayoutServerModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: AppStorage, useClass: UniversalStorage }
  ],
})
export class AppServerModule {
}
