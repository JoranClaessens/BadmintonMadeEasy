import { Component, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { User } from './account/user';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './account/user.service';
import { AccountCreateComponent } from './account/account-create/account-create.component';

@Component({
  selector: 'bme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User;

  title = 'app';

  constructor(private _userService: UserService, private router: Router) {
    router.events.subscribe((val) => {
      this.user = this._userService.getUser();
    });
  }

  ngOnInit() {
    this.user = this._userService.getUser();
    console.log(this.user);
  }
}
