import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/components/login/login.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
    ],
  },
];
