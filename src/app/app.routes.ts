import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { ErrorComponent } from './Shared/components/error/error.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
