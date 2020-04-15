import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './emailVerification/verification.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    data: {
      meta: {
        title: 'Zalate - Login',
        description: 'login.text',
      }
    },
  },
  {
        path: 'email-verification/:token',
        component: VerificationComponent,
      },
];

export const LoginRoutes = RouterModule.forChild(routes);
