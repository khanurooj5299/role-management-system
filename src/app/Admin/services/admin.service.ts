import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { UserModel } from '../../Shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number) {
    const params = new HttpParams()
      .set('pageIndex', pageIndex)
      .set('pageSize', pageSize);
    return this.http.get<UserModel[]>(`${this.apiUrl}/admin/get-users`, {
      params,
    });
  }

  getUserCount() {
    return this.http.get<{ count: number }>(
      `${this.apiUrl}/admin/get-user-count`
    );
  }
}
