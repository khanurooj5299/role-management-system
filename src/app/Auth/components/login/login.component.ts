import { Component } from '@angular/core';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { LoginResponseModel } from '../../models/login-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormField,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: LoginResponseModel) => {
          /*on successful login user data and token is stored in local storage
          Decided against storing in code memory because if user is logged in and refreshes the page
          code memory is wiped and user will have to login again. In this implementation user is
          logged in indefinitely even when browser is closed because right now backend does not set
          an expiration date on the token. Change this later*/
          this.authService.setUserAndToken(res);
          this.router.navigate(['admin/dashboard']);
        },
        error: (err) => {
          
        },
      });
  }
}
