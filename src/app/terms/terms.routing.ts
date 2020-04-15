import { TermsComponent } from './terms.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: TermsComponent,
    data: {
      meta: {
        title: 'terms.title',
        description: 'terms.text',
        override: true
      }
    },
  },
];

export const TermsRoutes = RouterModule.forChild(routes);
