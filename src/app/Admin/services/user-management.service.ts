import { Injectable } from '@angular/core';
import { UserModel } from '../../Shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private user!: UserModel;

  setUser(user: UserModel) {
    this.user = user;
  }

  getUser() {
    return {...this.user};
  }
}
