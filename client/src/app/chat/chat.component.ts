import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { ChatService } from './chat.service';
import { Message } from './mesage.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  messageForm = new FormGroup({
    message: new FormControl('')
  });
  @ViewChild('messageInput') messageInput: ElementRef;
  user: User;
  message: Message;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  onEdit(msg: Message): void {
    // Set current message, update form values and focus input
    this.message = msg;
    this.messageForm.patchValue({
      message: this.message.text
    });
    this.messageInput.nativeElement.focus();
  }

  onSubmit(): void {
    // Get the value from form input
    const text: string = this.messageForm.value.message;
    if (text.length > 0) {
      const date: Date = new Date();
      if (this.message) {
        // If we are editing message update it
        this.chatService.updateMessage({
          ...this.message,
          text
        });
        // Set current message back to null
        this.message = null;
      } else {
        this.chatService.sendMessage({
          id: uuidv4(),
          user: this.user.name,
          timestamp: date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          text
        });
      }
      // Reset form inputs
      this.messageForm.reset();
    }
  }
}
