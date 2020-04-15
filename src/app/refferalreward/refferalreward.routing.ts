import { RefferalrewardComponent } from './refferalreward.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: RefferalrewardComponent,
    data: {
      meta: {
        title: 'account.title',
        description: 'account.text',
        override: true
      }
    },
  },
];

export const RefferalrewardRoutes = RouterModule.forChild(routes);
