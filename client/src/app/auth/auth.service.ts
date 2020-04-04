import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User>(null);

  constructor(private router: Router) {}

  public loginUser(name: string): void {
    this.user.next({ name });
    // Save authentication to local storage
    localStorage.setItem('user', name);
    this.router.navigate(['/chat']);
  }

  public loadUser(): void {
    // Get user from local storage (if authenticated)
    const name = localStorage.getItem('user');
    if (name) {
      this.user.next({ name });
    }
  }

  public current(): Observable<User> {
    return this.user.asObservable();
  }

  public logout(): void {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}
