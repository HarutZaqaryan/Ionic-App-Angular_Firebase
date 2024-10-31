import { inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';


export const canEnterTabsPageGuard: CanActivateFn = (route, state) => {

  const firebaseAuth = inject(Auth);
  const router = inject(Router)
  const user = firebaseAuth.currentUser;
  const isLoggedIn = !!user;


  if (!isLoggedIn) {
    router.navigate(['/'])

    return false
  } else {
    return true
  }

};
