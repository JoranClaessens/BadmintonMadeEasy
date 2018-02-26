import { Component, OnInit, Input } from '@angular/core';
import { User } from '../account/user';
import { UserService } from '../account/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() user: User;

  websiteTitle = 'Badminton Made Easy';
  websiteIcon = 'assets/img/badminton-shuttle-icon1.png';

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.user = null;
    this._userService.setUser(null);
    this._router.navigate(['/home']);
  }

}
