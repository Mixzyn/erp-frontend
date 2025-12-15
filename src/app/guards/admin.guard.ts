import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = async () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const isAdmin = await userService.isAdmin()

  if (isAdmin) {
    return true;
  }
  
  router.navigateByUrl('home');
  return false;
}
