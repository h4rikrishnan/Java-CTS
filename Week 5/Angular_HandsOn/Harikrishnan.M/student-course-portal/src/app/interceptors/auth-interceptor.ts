import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Step 88: AuthInterceptor clones outgoing HTTP requests and injects Authorization bearer token.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};

export { authInterceptor as AuthInterceptor };
