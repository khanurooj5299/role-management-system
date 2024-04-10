import { Injectable } from '@angular/core';
import { UserModel } from '../../Shared/models/user.model';
import { CreateUserModel } from '../models/create-user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private user!: UserModel;
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  setUser(user: UserModel) {
    this.user = user;
  }

  getUser() {
    return { ...this.user };
  }

  addUser(user: CreateUserModel) {
    return this.http.post(`${this.apiUrl}/admin/add-user`, user);
  }
}
