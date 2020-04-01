import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  loginUser(name: string): void {
    this.user = {
      name
    };
    // Save authentication to local storage
    localStorage.setItem('user', JSON.stringify(this.user));
    this.authChange.next(true);
    this.router.navigate(['/chat']);
  }

  isAuth(): boolean {
    return this.user != null;
  }

  loadUser(): void {
    const _user = JSON.parse(localStorage.getItem('user'));
    if (_user) {
      this.user = _user;
    }
  }

  getUser(): User {
    return { ...this.user };
  }

  logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/']);
  }
}
