import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { ChatPage } from './pages/chat/chat.page';
import { PublicGuard } from './auth/public.guard';
import { PrivateGuard } from './auth/private.guard';

const routes: Routes = [
  { path: '', component: LoginPage, canActivate: [PublicGuard] },
  { path: 'chat', component: ChatPage, canActivate: [PrivateGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
