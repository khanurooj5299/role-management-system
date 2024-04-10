import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [UserListComponent, MatButton],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  onAddUser() {
    this.router.navigate(['admin/user-management'], {
      queryParams: {
        mode: 'add',
      },
    });
  }
}
