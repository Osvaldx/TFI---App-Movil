import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);
  
  return auth.user$.pipe(map(user => user ? true : router.createUrlTree(["auth"])), take(1));
};
