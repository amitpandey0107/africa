import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessagePopUpComponentModule } from 'app/messagePopup/messagePopup.component';
import { ApiService } from 'app/services/api.service';
import { SharedMaterialModule } from '../../shared-material.module';
import { FooterComponent } from './footer/footer.component';
import { LanguageComponent } from './language/language.component';
import { LeftPanelComponent } from './leftpanel/leftpanel.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { WrapperComponent } from './wrapper/wrapper.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule,
    FlexLayoutModule,
    MessagePopUpComponentModule,
    TranslateModule.forChild({
      isolate: true
  })
  ],
  declarations: [
    FooterComponent,
    SidebarComponent,
    ToolbarComponent,
    WrapperComponent,
    LeftPanelComponent,
    LanguageComponent
    
  ],
  providers:[ApiService]
})
export class LayoutsModule {
}
