import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Message } from '../mesage.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnDestroy {
  @Output() public editMsg: EventEmitter<Message> = new EventEmitter();
  public messages: Message[];
  public chatSubscription: Subscription;

  constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this.chatSubscription = this.chatService
      .currentMessages()
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  public editMessage(msg: Message): void {
    this.editMsg.emit(msg);
  }

  public ngOnDestroy(): void {
    // Clean subscription when component is unmounted
    this.chatSubscription.unsubscribe();
    this.chatSubscription = null;
  }
}
