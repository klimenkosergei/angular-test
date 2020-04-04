import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionLike } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { Message } from '../mesage.model';
import { ChatService } from '../chat.service';
import { DeleteMessageComponent } from './delete-message.component';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
})
export class MessageItemComponent implements OnInit, OnDestroy {
  private authSubscription: SubscriptionLike;

  @Input() public message: Message;
  @Output() public editMessage: EventEmitter<Message> = new EventEmitter();
  public isAuthor: boolean;

  constructor(
    private authService: AuthService,
    private chatService: ChatService,
    public dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.authSubscription = this.authService.current().subscribe((user) => {
      this.isAuthor = user?.name === this.message.user;
    });
  }

  public onEdit(): void {
    this.editMessage.emit(this.message);
  }

  public onDelete(): void {
    // Get a reference to delete message dialog
    const deleteMessageRef = this.dialog.open(DeleteMessageComponent, {
      data: {
        message: this.message.text,
      },
    });
    deleteMessageRef.afterClosed().subscribe((result) => {
      if (result) {
        // If dialog was closed with 'yes' delete message
        this.chatService.removeMessage(this.message.id);
      }
    });
  }

  public ngOnDestroy(): void {
    // Clean subscription when component is unmounted
    this.authSubscription.unsubscribe();
    this.authSubscription = null;
  }
}
