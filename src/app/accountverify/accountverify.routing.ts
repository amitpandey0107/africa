import { AccountverifyComponent } from './accountverify.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AccountverifyComponent,
    data: {
      meta: {
        title: 'account.title',
        description: 'account.text',
        override: true
      }
    },
  },
];

export const AccountverifyRoutes = RouterModule.forChild(routes);
