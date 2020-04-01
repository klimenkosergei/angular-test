import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { ChatComponent } from './chat/chat.component';
import { PublicGuard } from './auth/public.guard';
import { PrivateGuard } from './auth/private.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [PublicGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [PrivateGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
