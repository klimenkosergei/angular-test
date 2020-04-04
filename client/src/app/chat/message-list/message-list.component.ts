import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { Message } from '../mesage.model';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  @Output() public editMsg: EventEmitter<Message> = new EventEmitter();
  public messages: Observable<Message[]>;

  constructor(private chatService: ChatService) {}

  public ngOnInit(): void {
    this.messages = this.chatService.currentMessages();
  }

  public editMessage(msg: Message): void {
    this.editMsg.emit(msg);
  }
}
