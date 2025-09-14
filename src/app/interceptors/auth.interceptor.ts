import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();
  let headers = req.headers;

  if (authToken) {
    headers = headers.set('Authorization', `Bearer ${authToken}`)
  }

  if (!(req.body instanceof FormData)) {
    headers = headers.set('Content-Type', 'application/json');
  }

  const cloneReq = req.clone({ headers });

  return next(cloneReq);
};
