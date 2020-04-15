import { ChatComponent } from './chat.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ChatComponent,
    data: {
      meta: {
        title: 'chat.title',
        description: 'chat.text',
        override: true
      }
    },
  },
];

export const ChatRoutes = RouterModule.forChild(routes);
