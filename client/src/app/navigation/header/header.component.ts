import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isAuth: boolean;
  public userSubscription: Subscription;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.userSubscription = this.authService
      .current()
      .pipe(map((user) => !!user))
      .subscribe((authStatus) => {
        this.isAuth = authStatus;
      });
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public ngOnDestroy(): void {
    // Clean subscription when component is unmounted
    this.userSubscription.unsubscribe();
    this.userSubscription = null;
  }
}
