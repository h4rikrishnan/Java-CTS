import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

/**
 * Step 75: AuthGuard checks if user is logged in via AuthService.
 * Returns true if authenticated, otherwise redirects to home '/' and returns false.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }

  console.warn('AuthGuard: Access denied. Redirecting to home.');
  router.navigate(['/']);
  return false;
};

export { authGuard as AuthGuard };
