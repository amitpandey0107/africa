import { FaqComponent } from './faq.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: FaqComponent,
    data: {
      meta: {
        title: 'faq.title',
        description: 'faq.text',
        override: true
      }
    },
  },
];

export const FaqRoutes = RouterModule.forChild(routes);
