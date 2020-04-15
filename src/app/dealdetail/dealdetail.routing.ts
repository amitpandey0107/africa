import { DealdetailComponent } from './dealdetail.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DealdetailComponent,
    data: {
      meta: {
        title: 'account.title',
        description: 'account.text',
        override: true
      }
    },
  },
];

export const DealdetailComponentRoutes = RouterModule.forChild(routes);
