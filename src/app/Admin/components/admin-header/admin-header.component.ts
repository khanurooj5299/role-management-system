import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../Auth/services/auth.service';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [MatIcon, MatButton, RouterLink],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {

  constructor(private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();
  }
}
