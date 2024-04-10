import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { ErrorComponent } from './Shared/components/error/error.component';
import { AdminDashboardComponent } from './Admin/components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './Auth/guards/auth.guard';

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
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
