import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserModel } from '../../../Shared/models/user.model';
import { MatCardModule } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { UserManagementService } from '../../services/user-management.service';

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
  users: UserModel[] = [];
  faEye = faEye;
  faUserEdit = faUserEdit;
  faTrash = faTrash;
  pageSize = 10;
  pageIndex = 0;
  totalUserCount = 0;
  displayedColumns: string[] = ['name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<UserModel>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private userManagementService: UserManagementService
  ) {}

  ngOnInit(): void {
    this.getUserCount();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getUserCount() {
    this.adminService.getUserCount().subscribe({
      next: (res) => {
        this.totalUserCount = res.count;
        this.getUsers();
      },
    });
  }

  getUsers() {
    this.adminService.getUsers(this.pageIndex, this.pageSize).subscribe({
      next: (res: UserModel[]) => {
        this.users = res;
      },
    });
  }

  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  onUserManage(mode: 'view' | 'edit', user: UserModel) {
    this.userManagementService.setUser({...user});
    this.router.navigate(['admin/user-management'], {
      queryParams: { mode },
    });
  }

  onDelete(id: string) {
    
  }
}
