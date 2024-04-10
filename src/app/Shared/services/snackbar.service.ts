import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  show(
    horizontalPosition: MatSnackBarHorizontalPosition = 'start',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
    message: string,
    duration: number = 3000
  ) {
    return this.snackBar.open(message, undefined, {
      horizontalPosition,
      verticalPosition,
      duration,
    });
  }
}
