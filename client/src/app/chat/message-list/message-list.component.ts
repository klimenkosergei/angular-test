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
  @Output() public editMsg: EventEmitter<Message> = new EventEmitter();
  public messages: Message[];
  public messagesSubscription: Subscription;

  constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this.messages = this.chatService.getMessages();
    this.messagesSubscription = this.chatService.msgsChange.subscribe(
      updatedMessages => {
        this.messages = updatedMessages;
      }
    );
  }

  public editMessage(msg: Message): void {
    this.editMsg.emit(msg);
  }

  public ngOnDestroy(): void {
    this.messagesSubscription.unsubscribe();
    this.messagesSubscription = null;
  }
}
