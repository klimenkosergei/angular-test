import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { User } from '../../models/user.model';
import { Message } from '../../models/mesage.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  private authSubscription: SubscriptionLike;
  private chatSubscription: SubscriptionLike;

  public messageForm = new FormGroup({
    message: new FormControl(''),
  });

  @ViewChild('messageInput') public messageInput: ElementRef;
  @ViewChild('messageList', { read: ElementRef })
  public messageList: ElementRef;

  public user: User;
  public message: Message;

  constructor(
    private authService: AuthService,
    private chatService: ChatService
  ) {}

  public ngOnInit(): void {
    this.authSubscription = this.authService.current().subscribe((user) => {
      this.user = user;
    });
    this.chatSubscription = this.chatService.currentMessages().subscribe(() => {
      // Wrap in setTimeout to delay execution from call stack
      setTimeout(() => {
        // Scroll to bottom on new messages
        this.messageList.nativeElement.scrollTop = this.messageList.nativeElement.scrollHeight;
      }, 0);
    });
  }

  public onEdit(msg: Message): void {
    // Set current message, update form values and focus input
    this.message = msg;
    this.messageForm.patchValue({
      message: this.message.text,
    });
    this.messageInput.nativeElement.focus();
  }

  public onSubmit(): void {
    // Get the value from form input
    const text: string = this.messageForm.value.message;
    if (text.length > 0) {
      const date: Date = new Date();
      if (this.message) {
        // If we are editing message update it
        this.chatService.updateMessage({
          ...this.message,
          text,
        });
        // Set current message back to null
        this.message = null;
      } else {
        this.chatService.sendMessage({
          id: uuidv4(),
          user: this.user.name,
          timestamp: date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          text,
        });
      }
      // Reset form inputs
      this.messageForm.reset();
    }
  }

  public ngOnDestroy(): void {
    // Clean subscriptions when component is unmounted
    this.authSubscription.unsubscribe();
    this.authSubscription = null;
    this.chatSubscription.unsubscribe();
    this.chatSubscription = null;
  }
}
