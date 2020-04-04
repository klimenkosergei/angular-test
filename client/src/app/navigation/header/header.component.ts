import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public user: Observable<User>;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.user = this.authService.current();
  }

  public onLogout(): void {
    this.authService.logout();
  }
}
