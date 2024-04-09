import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {
    //Overwrite errorMessage if passed in state
    const errorMessage =
      router.getCurrentNavigation()?.extras?.state?.['errorMessage'];

    if (errorMessage) {
      this.errorMessage = errorMessage;
    }
  }
}
