import { Routes } from '@angular/router';
import {AuthGuard} from '../user-profile/guards/auth.guard';


export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'organisation',
    canActivate: [AuthGuard],
    pathMatch: 'full',
  },
  {
    path: 'organisation',
    canActivate: [AuthGuard],
    loadChildren: '../organisation/organisation.module#OrganisationModule'
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: '../users/users.module#UsersModule'
  },
  {
    path: 'style-guide',
    canActivate: [AuthGuard],
    loadChildren: '../style-guide/style-guide.module#StyleGuideModule'
  },
  {
    path: 'register-org',
    canActivate: [AuthGuard],
    loadChildren: '../register/register.module#RegisterModule'
  },
  {
    path: '**',
    redirectTo: '/organisation',
    pathMatch: 'full'
  }
];

