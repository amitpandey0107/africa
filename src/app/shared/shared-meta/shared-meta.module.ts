import { NgModule } from '@angular/core';
import { MetaLoader, MetaModule, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { Observable } from 'rxjs';

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'App Universal',
    defaults: {
      title: 'Default page title',
      description: 'Default description',
      'og:site_name': 'App site Universal',
      'og:type': 'website',
      'og:locale': 'ru_RU',
      'og:locale:alternate': [
        { 'code': 'en', 'name': 'English', 'culture': 'en-US' },
        { 'code': 'ru', 'name': 'Русский', 'culture': 'ru-RU' },
      ].map((lang: any) => lang.culture).toString()
    }
  });
}

@NgModule({
  imports: [
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: metaFactory
    })
  ]
})
export class SharedMetaModule {
}
