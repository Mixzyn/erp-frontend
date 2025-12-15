import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { User } from '../models/user';

export const userResolver: ResolveFn<User> = (route, state) => {
  const service = inject(UserService);
  const userId = route.paramMap.get('id')!;
  return service.getUser(userId);
};
