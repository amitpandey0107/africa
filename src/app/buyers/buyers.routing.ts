import { BuyersComponent } from './buyers.component';
import { Routes, RouterModule } from '@angular/router';
import { NewComponent } from './new-deal/new.component';
import { AuthGuard } from '../guards/auth.guard';
import { PendingChangesGuard } from '../pendig-guard-service';
import { DeatilsComponent } from './deatils/deatils.component';
const routes: Routes = [
  {
    path: '', component: BuyersComponent,
    data: {
      meta: {
        title: 'buyers.title',
        description: 'buyers.text',
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
      {
        path: 'deatils',
        component: DeatilsComponent,
        canActivate: [AuthGuard],
        canDeactivate:[PendingChangesGuard]
      },
];

export const BuyersRoutes = RouterModule.forChild(routes);

