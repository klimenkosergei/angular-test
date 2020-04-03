import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean;
  public authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.isAuth = this.authService.isAuth();
    this.authSubscription = this.authService.authChange.subscribe(
      authStatus => {
        this.isAuth = authStatus;
      }
    );
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.authSubscription = null;
  }
}
