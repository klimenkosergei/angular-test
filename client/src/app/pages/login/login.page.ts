import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(private authService: AuthService) {}

  public ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.loginUser(form.value.username);
    }
  }
}
