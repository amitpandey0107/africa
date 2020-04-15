import { DealEditComponent } from './dealedit.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DealEditComponent,
    data: {
      meta: {
        title: 'dealedit.title',
        description: 'dealedit.text',
        override: true
      }
    },
  },
];

export const DealEditRoutes = RouterModule.forChild(routes);
