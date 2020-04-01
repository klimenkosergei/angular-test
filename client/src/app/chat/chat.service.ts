import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './mesage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  msgsChange = new Subject<Message[]>();
  messages: Message[];
  constructor() {}

  getMessages(): Message[] {
    const _messages = JSON.parse(localStorage.getItem('messages'));
    if (_messages) {
      this.messages = _messages;
    } else {
      this.messages = [];
      // If there are no messages object in local storage create it
      localStorage.setItem('messages', '[]');
    }
    return [...this.messages];
  }

  sendMessage(msg: Message): void {
    // Add new message to the array
    this.messages = [...this.messages, msg];
    localStorage.setItem('messages', JSON.stringify([...this.messages]));
    this.msgsChange.next(this.messages);
  }
}
