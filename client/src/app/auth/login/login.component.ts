import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public ngOnInit(): void {}

  public onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.loginUser(form.value.username);
    }
  }
}
