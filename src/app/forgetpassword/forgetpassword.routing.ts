import { ForgetpasswordComponent } from './forgetpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { NewPasswordComponent } from './new/newpassword.component';

const routes: Routes = [
  {
    path: '', component: ForgetpasswordComponent,
    data: {
      meta: {
        title: 'Zalte - Login',
        description: 'login.text',
      }
    },
    
  },
  {
        path: 'new/:email/:uid',
        component: NewPasswordComponent,
      },
];

export const ForgetpasswordRoutes = RouterModule.forChild(routes);
