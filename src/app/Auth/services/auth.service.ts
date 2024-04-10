import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(authModel: LoginRequestModel) {
    return this.http.post<LoginResponseModel>(
      `${this.apiUrl}/auth/login`,
      authModel
    );
  }

  logout() {
    this.deleteUserandToken();
    this.router.navigate(['auth/login']);
  }

  setUserAndToken(loginResponse: LoginResponseModel) {
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
    localStorage.setItem('token', loginResponse.token);
  }

  deleteUserandToken() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
