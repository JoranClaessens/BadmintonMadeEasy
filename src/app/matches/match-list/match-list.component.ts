import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { BadmintonMatch } from '../badminton-match';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  loggedIn = false;
  selectedMatchTab: number;
  userMatchesCount = 0;
  matches: BadmintonMatch[];
  errorMessage: HttpErrorResponse;
  customWarningMessage: string;

  constructor(private _userService: UserService, private _matchService: MatchService, private _router: Router) { }

  ngOnInit() {
    if (this._userService.getUser()) {
      this.loggedIn = true;
      this.loadUserMatches();
    }
    this.loadAllMatches();
  }

  onMatchTabChanged() {
    if (this.selectedMatchTab === 1) {
      this.loadAllMatches();
    } else {
      this.loadUserMatches();
    }
  }

  loadAllMatches() {
    this.selectedMatchTab = 1;
    this._matchService.getMatches()
      .subscribe(
        badmintonMatches => {
          this.matches = badmintonMatches;
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  loadUserMatches() {
    if (this._userService.getUser()) {
      this._matchService.getMatchesByUser(this._userService.getUser().id)
        .subscribe(
          badmintonMatches => {
            this.matches = badmintonMatches;
            this.userMatchesCount = this.matches.length;
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.matches = null;
    }
  }

  createMatch() {
    if (this._userService.getUser()) {
      this._router.navigate(['/matches/create']);
    } else {
      this.customWarningMessage = 'U moet zich eerst aanmelden of registreren voordat u een wedstrijd kan aanmaken!';
    }
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearcustomWarningMessage() {
    this.customWarningMessage = null;
  }
}
