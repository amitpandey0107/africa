import { PendingRequestComponent } from './pending-request.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { PendingChangesGuard } from '../pendig-guard-service';

const routes: Routes = [
    {
      path: '', component: PendingRequestComponent,
      data: {
        meta: {
          title: 'pendingrequest.title',
          description: 'pendingrequest.text',
          override: true
        }
      },
    },
  ];
  
  export const PendingRequestRoutes = RouterModule.forChild(routes);