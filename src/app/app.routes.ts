import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';
import { ErrorComponent } from './Shared/components/error/error.component';
import { AdminDashboardComponent } from './Admin/components/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './Auth/guards/auth.guard';
import { AdminMainLayoutComponent } from './Admin/components/admin-main-layout/admin-main-layout.component';
import { Roles } from './Shared/models/roles';
import { UserManagementComponent } from './Admin/components/user-management/user-management.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'admin',
    component: AdminMainLayoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [Roles.Admin, Roles.Super_admin] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'user-management', component: UserManagementComponent },
    ],
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: 'error' },
];
