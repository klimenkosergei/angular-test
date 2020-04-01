import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  user: User;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onSubmit(form: NgForm): void {
    if (form.value.message.length > 0) {
      const date = new Date();
      this.chatService.sendMessage({
        id: uuidv4(),
        user: this.user.name,
        timestamp: date.toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        text: form.value.message
      });
      form.reset();
    }
  }
}
