import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserModel } from '../../../Shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatCardModule, MatDivider, MatTableModule, FontAwesomeModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  pageIndex = 0;
  pageSize = 10;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  faEye = faEye;
  faTrash = faTrash;
  faUserEdit = faUserEdit;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: UserModel[]) => {
        this.users = res;
      },
      error: (err: HttpErrorResponse) => {
        //??
      },
    });
  }
}
