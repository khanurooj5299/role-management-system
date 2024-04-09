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

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService
      .login({ email: this.email, password: this.password })
      .subscribe({
        next: (res: LoginResponseModel) => {},
        error: (err) => {},
      });
  }
}
