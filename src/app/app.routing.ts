import { Routes, RouterModule } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { WrapperComponent } from '@shared/layouts/wrapper/wrapper.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { PendingChangesGuard } from './pendig-guard-service';
export const routes: Routes = [
  
  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: '',
    loadChildren: './home/home.module#HomeModule',
  },
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
  },
  {
    path: 'join',
    loadChildren: './join/join.module#JoinModule',
  },
  {
    path: 'forgot-password',
    loadChildren: './forgetpassword/forgetpassword.module#ForgetpasswordModule',
  },
  {
    path: 'terms',
    loadChildren: './terms/terms.module#TermsModule',
  },
  {
    path: '',
    component: WrapperComponent,
    children: [
      {
        path: 'buyers',
        loadChildren: './buyers/buyers.module#BuyersModule',      
        canDeactivate:[PendingChangesGuard]
      },
      {
        path: 'sellers',
        loadChildren: './sellers/sellers.module#SellersModule',        
        canDeactivate:[PendingChangesGuard]
      },
      {
        path: 'chat',
        loadChildren: './chat/chat.module#ChatModule',
        canActivate: [AuthGuard],        
        canDeactivate:[PendingChangesGuard]
      },
      {
        path: 'faq',
        loadChildren: './faq/faq.module#FaqModule',      
        canDeactivate:[PendingChangesGuard]
      },
      {
        path: 'account',
        loadChildren: './account/account.module#AccountModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'view-request',
        loadChildren: './dealdetail/dealdetail.module#DealdetailModule',
      },
      {
        path: 'edit-account',
        loadChildren: './accountedit/accountedit.module#AccountEditModule',
        canActivate: [AuthGuard],
      }, 
      {
        path: 'edit-deal/:id',
        loadChildren: './dealedit/dealedit.module#DealEditModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'accountverify',
        loadChildren: './accountverify/accountverify.module#AccountverifyModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'refferalreward',
        loadChildren: './refferalreward/refferalreward.module#RefferalrewardModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfileModule',
        canActivate: [AuthGuard],
      },
      {
        path: 'pending-request',
        loadChildren: './pending-request/pending-request.module#PendingRequestModule',
        canActivate: [AuthGuard],
      }
    ]
  },
  {
    path: '**',
    loadChildren: './home/home.module#HomeModule',
  },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes, {
    useHash: true
    }) ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})
export class AppRoutingModule {}