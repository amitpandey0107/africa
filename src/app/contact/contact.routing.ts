import { ContactComponent } from './contact.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ContactComponent,
    data: {
      meta: {
        title: 'account.title',
        description: 'account.text',
        override: true
      }
    },
  },
];

export const ContactRoutes = RouterModule.forChild(routes);
