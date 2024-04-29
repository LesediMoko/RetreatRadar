import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { UserState } from '../store/Types/states';
import { selectIsAuthenticated } from '../store/Selectors/user.selector';
import { tap } from 'rxjs';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const userStore = inject(Store<UserState>);
  const router = inject(Router);
  return userStore.pipe(
    select(selectIsAuthenticated),
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['login']);
      }
      return isAuthenticated;
    }),
  );
};
