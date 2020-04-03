import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Message } from './mesage.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public msgsChange = new Subject<Message[]>();
  public messages: Message[];
  constructor() {}

  public getMessages(): Message[] {
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

  public sendMessage(msg: Message): void {
    // Add new message to the array
    this.messages = [...this.messages, msg];
    localStorage.setItem('messages', JSON.stringify([...this.messages]));
    this.msgsChange.next(this.messages);
  }

  public updateMessage(msg: Message): void {
    this.messages = this.messages.map(message =>
      message.id === msg.id ? msg : message
    );
    localStorage.setItem('messages', JSON.stringify([...this.messages]));
    this.msgsChange.next(this.messages);
  }

  public removeMessage(id: string): void {
    this.messages = this.messages.filter(msg => msg.id !== id);
    localStorage.setItem('messages', JSON.stringify([...this.messages]));
    this.msgsChange.next(this.messages);
  }
}
