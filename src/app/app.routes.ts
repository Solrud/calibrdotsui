import { Routes } from '@angular/router';
import {Main} from './pages/main/main';
import {AccessDenied} from './shared/auth/page/access-denied/access-denied';
import {authGuard} from './shared/auth/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Main,
    canActivate: [authGuard]
  },
  {
    path: 'access-denied',
    component: AccessDenied
  },
  {
    path: '**',
    redirectTo: ''
  }
];
