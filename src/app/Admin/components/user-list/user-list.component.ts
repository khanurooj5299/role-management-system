import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { UserModel } from '../../../Shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit{
  users: UserModel[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.adminService.getUsers().subscribe({
      next: (res: UserModel[])=>{
        this.users = res;
      },
      error: (err: HttpErrorResponse)=>{
        //??
      }
    });
  }

}
