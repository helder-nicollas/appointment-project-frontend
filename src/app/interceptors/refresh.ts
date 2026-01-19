import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service';

export function refreshInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (req.url.includes('/refresh')) {
        authService.logout();
        localStorage.removeItem('authenticated');
        return throwError(() => error);
      }

      return authService.refresh().pipe(switchMap(() => next(req)));
    }),
  );
}
