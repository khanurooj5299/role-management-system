import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

//Interceptor for network errors
export default function networkErrorInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      //for network error route to error page
      if (err instanceof HttpErrorResponse && err.status == 0) {
        router.navigate(['/error']);
        //return an observable that does nothing
        return new Observable<HttpEvent<unknown>>();
      }
      //for other errors pass it along
      return throwError(() => err);
    })
  );
}
