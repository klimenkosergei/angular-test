import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router) {}

  public loginUser(name: string): void {
    this.user = {
      name
    };
    // Save authentication to local storage
    localStorage.setItem('user', JSON.stringify(this.user));
    this.authChange.next(true);
    this.router.navigate(['/chat']);
  }

  public isAuth(): boolean {
    return this.user != null;
  }

  public loadUser(): void {
    const _user = JSON.parse(localStorage.getItem('user'));
    if (_user) {
      this.user = _user;
    }
  }

  public getUser(): User {
    return { ...this.user };
  }

  public logout(): void {
    this.user = null;
    localStorage.removeItem('user');
    this.authChange.next(false);
    this.router.navigate(['/']);
  }
}
