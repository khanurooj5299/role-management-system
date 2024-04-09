import { Component } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
  //default error message
  errorMessage = "Can't find what you're looking for!";
  constructor(){}
}
