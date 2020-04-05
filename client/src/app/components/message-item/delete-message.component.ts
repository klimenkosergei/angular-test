import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-message',
  template: `
    <h2 mat-dialog-title>Удалить сообщение</h2>
    <mat-dialog-content>
      {{ data.message }}
    </mat-dialog-content>
    <mat-dialog-actions style="margin-top: 1rem">
      <button mat-button [mat-dialog-close]="true">Удалить</button>
      <button mat-button [mat-dialog-close]="false">Отменить</button>
    </mat-dialog-actions>
  `
})
export class DeleteMessageComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
