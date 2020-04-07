import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { ChatPage } from './pages/chat/chat.page';
import { HeaderComponent } from './components/header/header.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { DeleteMessageComponent } from './components/message-item/delete-message.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginPage,
    ChatPage,
    MessageListComponent,
    MessageItemComponent,
    DeleteMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DeleteMessageComponent],
})
export class AppModule {}
