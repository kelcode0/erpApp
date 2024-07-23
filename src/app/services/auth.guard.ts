// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';
// import { AuthService } from './auth.service';
// import { tap } from 'rxjs';

// export const authGuard: CanActivateFn = (route, state) => {
//   //return true;
//   const router = inject(Router);
//   return inject(AuthService)
//     .isAuth()
//     .pipe(
//       tap((estado) => {
//         if (!estado) {
//           router.navigate(['/login']);
//         }
//       })
//     );
// };

import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, take, tap } from 'rxjs';

const isAuthenticated = (): Observable<boolean | UrlTree> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuth().pipe(
    tap((estado) => {
      if (!estado) {
        router.navigate(['/login']);
      }
    }),
    take(1)
  );
};

export const canActivate: CanActivateFn = isAuthenticated;
export const canMatch: CanMatchFn = isAuthenticated;
