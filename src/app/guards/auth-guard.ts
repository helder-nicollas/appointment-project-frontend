import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const protectedRoutes = ['/appointments'];
  const isProtectedRoute = protectedRoutes.includes(state.url);

  if (isProtectedRoute) {
    return authService.me().pipe(
      map(() => true),
      catchError(() => {
        router.navigate(['login']);
        return of(false);
      }),
    );
  }

  return true;
};
