import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../mesage.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss']
})
export class MessageListComponent implements OnInit, OnDestroy {
  @Output() editMsg: EventEmitter<Message> = new EventEmitter();
  messages: Message[];
  messagesSubscription: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messages = this.chatService.getMessages();
    this.messagesSubscription = this.chatService.msgsChange.subscribe(
      updatedMessages => {
        this.messages = updatedMessages;
      }
    );
  }

  editMessage(msg: Message): void {
    this.editMsg.emit(msg);
  }

  ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.messagesSubscription = null;
  }
}
