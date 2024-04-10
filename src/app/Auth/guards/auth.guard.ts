import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../Shared/services/snackbar.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  //injecting required services
  const router = inject(Router);
  const authService = inject(AuthService);
  const snackbarservice = inject(SnackbarService);

  /*getting the token. In this implementation a user might be able to bypass this guard by setting some dummy token in localStorage.
  The protect against this one option is to always confirm the validity of the token using backend in this guard. But that is just too expensive
  and not that important as even if user navigates to routes that he shouldn't, the apis for fetching data and doing some real action on
  backend won't work because token is not valid
  */
  const token = authService.getToken();

  if (token) {
    console.log(token)
    return true;
  } else {
    router.navigate(['auth/login']);
    snackbarservice.show('center', 'top', 'You need to login first');
    return false;
  }
};
