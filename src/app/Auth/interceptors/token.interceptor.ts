import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../Shared/services/snackbar.service';

//Interceptor for attaching token if it exists
export default function tokenInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const snackbarservice = inject(SnackbarService);

  const token = authService.getToken();

  //attach token only if it exists
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  //if token is an invalid token. we clear the bad data in localStorage and log out the user
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      //if token is an invalid token, is missing or is not of right permission, clear the bad data in localStorage, if any
      // and log out the user
      if (err instanceof HttpErrorResponse && err.status == 401 && err.error!="Invalid email/password") {
        authService.logout();
        snackbarservice.show('right', 'top', err.error);
        //return an observable that does nothing
        return new Observable<HttpEvent<unknown>>();
      }
      //for other errors pass it along
      return throwError(() => err);
    })
  );
}
