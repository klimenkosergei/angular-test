import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Message } from './mesage.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private messages = new BehaviorSubject<Message[]>([]);

  constructor() {
    this.loadMessages();
    this.saveMessages();
  }

  private loadMessages(): void {
    // Load messages from local storage
    const messages = JSON.parse(localStorage.getItem('messages'));
    if (messages) {
      this.messages.next(messages);
    }
  }

  private saveMessages(): void {
    // Subscribe to messages change and update local storage
    this.messages.subscribe((_messages) => {
      localStorage.setItem('messages', JSON.stringify(_messages));
    });
  }

  public currentMessages(): Observable<Message[]> {
    return this.messages.asObservable();
  }

  public sendMessage(msg: Message): void {
    // Add new message to the array
    this.messages.next([...this.messages.value, msg]);
  }

  public updateMessage(msg: Message): void {
    // Map through messages and replace the edited message
    const updatedMessages = this.messages.value.map((message) =>
      message.id === msg.id ? msg : message
    );
    this.messages.next(updatedMessages);
  }

  public removeMessage(id: string): void {
    // Filter through messages and return all that don't match id
    const filteredMessages = this.messages.value.filter((msg) => msg.id !== id);
    this.messages.next(filteredMessages);
  }
}
