import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountLoginComponent } from './account-login/account-login.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    AccountLoginComponent,
    AccountCreateComponent
  ],
  providers: [
    UserService
  ]
})
export class AccountModule { }
