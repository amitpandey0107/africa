import { JoinComponent } from './join.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: JoinComponent,
    data: {
      meta: {
        title: 'join.title',
        description: 'join.text',
        override: true
      }
    },
  },
];

export const JoinRoutes = RouterModule.forChild(routes);
