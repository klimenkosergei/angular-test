import { Component, OnInit, Input } from '@angular/core';

import { AuthService } from 'src/app/auth/auth.service';
import { Message } from '../mesage.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  isAuthor: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuthor = this.authService.getUser().name === this.message.user;
  }
}
