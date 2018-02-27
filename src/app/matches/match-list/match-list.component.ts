import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { BadmintonMatch } from '../badminton-match';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';

@Component({
  selector: 'bme-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  // isActive = 'active';
  loggedIn = false;
  selectedMatchTab: number;
  matches: BadmintonMatch[];
  errorMessage: HttpErrorResponse;

  constructor(private _userService: UserService, private _matchService: MatchService) { }

  ngOnInit() {
    if (this._userService.getUser()) {
      this.loggedIn = true;
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
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.matches = null;
    }

  }

  /*changeStyle($event) {
    this.isActive = $event.type === 'mouseover' ? 'active' : 'none';
  }*/

}
