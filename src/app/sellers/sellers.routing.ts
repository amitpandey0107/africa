import { SellersComponent } from './sellers.component';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new-deal/new.component';
import { AuthGuard } from '../guards/auth.guard';
import { PendingChangesGuard } from '../pendig-guard-service';
const routes: Routes = [
  {
    path: '', component: SellersComponent,
    data: {
      meta: {
        title: 'sellers.title',
        description: 'sellers.text',
        override: true
      }
    },
  },
    {
        path: 'new',
        component: NewComponent,
        canActivate: [AuthGuard],
        canDeactivate:[PendingChangesGuard]
      },
];

export const SellersRoutes = RouterModule.forChild(routes);
