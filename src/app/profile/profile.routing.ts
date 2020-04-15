import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    data: {
      meta: {
        title: 'profile.title',
        description: 'profile.text',
        override: true
      }
    },
  },
];

export const ProfileRoutes = RouterModule.forChild(routes);