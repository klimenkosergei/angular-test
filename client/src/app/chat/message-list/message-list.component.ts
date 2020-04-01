import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../mesage.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit {
  messages: Message[];
  messagesSubscription: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = this.chatService.getMessages();
    this.messagesSubscription = this.chatService.msgsChange.subscribe(
      updatedMessages => {
        console.log('subscription update');
        this.messages = updatedMessages;
      }
    );
  }
}
