import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

import { LoginRequestModel } from '../models/login-request.model';
import { LoginResponseModel } from '../models/login-response.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(authModel: LoginRequestModel) {
    return this.http.post<LoginResponseModel>(`${this.apiUrl}/auth/login`, authModel);
  }
}
