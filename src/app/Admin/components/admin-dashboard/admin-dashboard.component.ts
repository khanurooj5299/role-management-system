import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [UserListComponent, MatButton],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
