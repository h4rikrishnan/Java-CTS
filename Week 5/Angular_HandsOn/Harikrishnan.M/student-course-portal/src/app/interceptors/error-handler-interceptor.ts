import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Step 90: ErrorHandlerInterceptor globally handles 401 and 500 status codes.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.error('HTTP 401 Unauthorized: Redirecting to login/home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('HTTP 500 Server Error: Internal server error encountered');
      }
      return throwError(() => error);
    })
  );
};

export { errorHandlerInterceptor as ErrorHandlerInterceptor };
