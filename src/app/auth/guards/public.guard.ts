import { inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';



const checkAuthStatus = (): boolean | Observable<boolean> => {
  //se inyectan el AuthService y el Router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication().pipe(

    tap( isAuthenticated => console.log({ 'Authenticated': isAuthenticated }) ),
    tap( ( isAuthenticated ) => {
      if ( isAuthenticated ) {
        router.navigate(['./'])
      }
    }),
    map( isAuthenticated => !isAuthenticated )

  )
}



export const canMatchGuardPublic: CanMatchFn = ( route: Route, segments: UrlSegment[] ) => {

  return checkAuthStatus();
};


export const canActivateGuardPublic: CanActivateFn = ( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) => {


  return checkAuthStatus();
}


