import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: HttpErrorResponse;
  customErrorMessage: string;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  createAccount() {
    this._userService.getUserByEmail(this.email)
      .subscribe(
        user => {
          if (!user) {
            this.createUser();
          } else {
            this.customErrorMessage = 'Email bestaat al!';
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  createUser() {
    this._userService.createUser(new User(this.email, this.password))
      .subscribe(
        user => {
          if (user) {
            this._userService.setUser(user);
            this._router.navigate(['/home']);
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearCustomErrorMessage() {
    this.customErrorMessage = null;
  }
}
