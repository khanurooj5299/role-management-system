import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { UserModel } from '../../../Shared/models/user.model';
import { AdminService } from '../../services/admin.service';
import { UserManagementService } from '../../services/user-management.service';
import { ConfirmDialogComponent } from '../../../Shared/components/confirm-dialog/confirm-dialog.component';
import { SnackbarService } from '../../../Shared/services/snackbar.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    MatCardModule,
    MatDivider,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users!: UserModel[];
  faEye = faEye;
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  pageSize = 10;
  pageIndex = 0;
  totalUserCount = 0;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private userManagementService: UserManagementService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.getUserCount();
  }

  getUserCount() {
    this.adminService.getUserCount().subscribe({
      next: (res) => {
        this.totalUserCount = res.count;
        this.getUsers();
      },
      error: (err: HttpErrorResponse) => {
        this.snackbarService.show(
          'center',
          'top',
          'Total user count not available!'
        );
        //still try to load the users
        this.getUsers();
      },
    });
  }

  getUsers() {
    this.adminService.getUsers(this.pageIndex, this.pageSize).subscribe({
      next: (res: UserModel[]) => {
        this.users = res;
      },
      error: (err: HttpErrorResponse) => {
        this.snackbarService.show(
          'center',
          'top',
          err.error + " Please try again later!"
        );
      },
    });
  }

  //remember that we don't need to use a MatTableDataSource because that is required for 
  //frontend pagination i-e., when we have all data avilable on frontend and want to paginate
  //here we are using backend pagination
  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  onUserManage(mode: 'view' | 'edit', user: UserModel) {
    this.userManagementService.setUser({ ...user });
    this.router.navigate(['admin/user-management'], {
      queryParams: { mode },
    });
  }

  onDelete(id: string, rowIndex: number) {
    // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    //   data: 'Are you sure you want to delete this user?',
    // });
    // dialogRef.afterClosed().subscribe((confirmed) => {
    //   if (confirmed) {
    //     this.adminService.deleteUser(id).subscribe({
    //       next: (res) => {
    //         this.snackbarService.show('right', 'top', res.message);
    //         //we dont fetch data from backend again but update the frontend state only
    //         this.totalUserCount--;
    //         this.dataSource = new MatTableDataSource(this.dataSource.data.splice(rowIndex, 1));
    //         this.dataSource.paginator = this.paginator;
    //       },
    //       error: (err: HttpErrorResponse) => {
    //         this.snackbarService.show('center', 'top', err.error);
    //       },
    //     });
    //   }
    // });
  }
}
