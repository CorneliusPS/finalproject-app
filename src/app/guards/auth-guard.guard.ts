import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
export const AuthGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticate()) {
    return true;
  }
  router.navigate(['']);
  return false;
};

export const PreventGuard = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (!userService.isAuthenticate()) {
    return true;
  }
  router.navigate(['/barang']);
  return false;
}