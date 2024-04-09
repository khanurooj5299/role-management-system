import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { ErrorComponent } from './Shared/components/error/error.component';
import { AdminDashboardComponent } from './Admin/components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
