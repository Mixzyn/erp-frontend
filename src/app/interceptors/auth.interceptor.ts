import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  if (authToken) {
    const cloneReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    });
    
    return next(cloneReq);
  }

  const cloneReq = req.clone({
    setHeaders: {
      "Content-Type": "application/json",
    }
  });

  return next(cloneReq);
};
