import { ModuleWithProviders, NgModule } from '@angular/core';


import { LayoutsModule } from './layouts/layouts.module';
import { SharedMetaModule } from './shared-meta';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations:[],
  exports: [
    LayoutsModule,
    SharedMetaModule,
  ],
  providers: []
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: SharedModule };
  }
}
