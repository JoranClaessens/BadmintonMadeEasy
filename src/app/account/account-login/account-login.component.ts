import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-account-login',
  templateUrl: './account-login.component.html',
  styleUrls: ['./account-login.component.css']
})
export class AccountLoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage: HttpErrorResponse;
  customErrorMessage: string;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  login() {
    this._userService.login(this.email, this.password)
      .subscribe(
        user => {
          if (user) {
            this._userService.setUser(user);
            this._router.navigate(['/home']);
          } else {
            this.customErrorMessage = 'Email of wachtwoord is fout!';
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
