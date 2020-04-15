import { AccountEditComponent } from './accountedit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AccountEditComponent,
    data: {
      meta: {
        title: 'account.title',
        description: 'account.text',
        override: true
      }
    },
  },
];

export const AccountEditRoutes = RouterModule.forChild(routes);
