import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PrivateGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.current().pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['/']);
        }
      }),
      catchError((err) => {
        this.router.navigate(['/']);
        return of(false);
      })
    );
  }
}
