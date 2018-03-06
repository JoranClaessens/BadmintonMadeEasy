import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../account/user.service';

@Component({
  selector: 'bme-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showNotLoggedIn: boolean;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
  }

  startMatch() {
    if (this._userService.getUser()) {
      this._router.navigate(['/matches/create']);
    } else {
      this.showNotLoggedIn = true;
    }
  }

  searchMatch() {
    this._router.navigate(['/matches']);
  }

  startTournament() {
    if (this._userService.getUser()) {
      this._router.navigate(['/tournaments/create']);
    } else {
      this.showNotLoggedIn = true;
    }
  }

  searchTournament() {
    this._router.navigate(['/tournaments']);
  }

  searchCompetition() {
    this._router.navigate(['/competitions']);
  }

  clearWarningMessage() {
    this.showNotLoggedIn = false;
  }
}
