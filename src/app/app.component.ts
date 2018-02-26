import { Component } from '@angular/core';
import { User } from './account/user';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './account/user.service';

@Component({
  selector: 'bme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  title = 'app';

  constructor(private _userService: UserService, private router: Router) {
    router.events.subscribe((val) => {
      this.user = this._userService.getUser();
    });
  }
}
