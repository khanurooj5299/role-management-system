import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SnackbarService } from '../../Shared/services/snackbar.service';
import { UserModel } from '../../Shared/models/user.model';
import { Roles } from '../../Shared/models/roles';

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
  /*getting the allowed roles for the navigated route set by route object. Again in this implementation as well a user might be able to 
  bypass this guard by changing the role in localStorage. Cross-checking with backend is an option but expensive and not really necessary
  since the backend handles proper role checking based on JWT token*/
  const roles: string[] = next.data['roles'];

  if (token) {
    let user = localStorage.getItem('user');
    //maybe the user removed user from localstorage but token is still there. In that case we logout
    if (user) {
      const userObj: UserModel = JSON.parse(user);
      //the roles check is added because for some routes only being logged in might be enough and there might be no roles data set to check against
      if (roles) {
        const currentRole = userObj.role;
        if (roles.includes(currentRole)) {
          return true;
        } else {
          snackbarservice.show('center', 'top', 'Access denied');
          return false;
        }
      } else {
        //at this point the user is logged in so we add an extra check to see if navigation is for login page
        if (state.url == '/auth/login') {
          //handle cases for other users laters
          if (
            userObj.role == Roles.Admin ||
            userObj.role == Roles.Super_admin
          ) {
            router.navigate(['admin/dashboard']);
          }
        }
        //else simply allow navigation
        return true;
      }
    } else {
      authService.logout();
      return false;
    }
  } else {
    if (state.url !== '/auth/login') {
      router.navigate(['auth/login']);
      snackbarservice.show('center', 'top', 'You need to login first');
      return false;
    }
    //user is visiting the login page
    else {
      return true;
    }
  }
};
