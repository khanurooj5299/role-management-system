import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../../Shared/models/user.model';
import { UserManagementService } from '../../services/user-management.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css',
})
//This component is used for Adding, Updating and Viewing User Details
export class UserManagementComponent implements OnInit {
  mode = 'view';
  user!: UserModel;

  constructor(private route: ActivatedRoute, private userManagementService: UserManagementService) {}

  ngOnInit(): void {
    const mode = this.route.snapshot.queryParams['mode'];
    this.mode = mode ? mode : this.mode;
    this.user = this.userManagementService.getUser();
  }
}
