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
  showFilter = false;
  keyBox = true;
  nameBox = true;
  titleBox = true;
  filterQuery: string;
  selectedMatchTab: number;
  userMatchesCount = 0;
  matches: BadmintonMatch[];
  errorMessage: HttpErrorResponse;
  customWarningMessage: string;
  currentDate: Date = new Date();

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
          this.convertToMinutes();
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
            this.convertToMinutes();
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.matches = null;
    }
  }

  filter() {
    if (this.selectedMatchTab === 1) {
      this._matchService.getMatches()
        .subscribe(
          badmintonMatches => {
            this.matches = badmintonMatches;
            this.convertToMinutes();
            this.filterInput();
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      if (this._userService.getUser()) {
        this._matchService.getMatchesByUser(this._userService.getUser().id)
          .subscribe(
            badmintonMatches => {
              this.matches = badmintonMatches;
              this.convertToMinutes();
              this.filterInput();
            },
            error => {
              this.errorMessage = <any>error;
            });
      } else {
        this.matches = null;
        this.filterInput();
      }
    }
  }

  filterInput() {
    const filterMatches = new Array<BadmintonMatch>();

    if (this.keyBox) {
      for (let i = 0; i < this.matches.length; i++) {
        if (this.matches[i].id === +this.filterQuery) {
          if (!filterMatches.includes(this.matches[i])) {
            filterMatches.push(this.matches[i]);
          }
        }
      }
    }

    if (this.nameBox) {
      for (let i = 0; i < this.matches.length; i++) {
        if ((this.matches[i].player1 && this.matches[i].player1.toLowerCase().includes(this.filterQuery.toLowerCase()))
          || (this.matches[i].player2 && this.matches[i].player2.toLowerCase().includes(this.filterQuery.toLowerCase()))
          || (this.matches[i].player3 && this.matches[i].player3.toLowerCase().includes(this.filterQuery.toLowerCase()))
          || (this.matches[i].player4 && this.matches[i].player4.toLowerCase().includes(this.filterQuery.toLowerCase()))) {
          if (!filterMatches.includes(this.matches[i])) {
            filterMatches.push(this.matches[i]);
          }
        }
      }
    }

    if (this.titleBox) {
      for (let i = 0; i < this.matches.length; i++) {
        if (this.matches[i].title.toLowerCase().includes(this.filterQuery.toLowerCase())) {
          if (!filterMatches.includes(this.matches[i])) {
            filterMatches.push(this.matches[i]);
          }
        }
      }
    }
    this.matches = filterMatches;
  }

  resetFilter() {
    this.filterQuery = '';
    this.keyBox = true;
    this.nameBox = true;
    this.titleBox = true;
    this.filter();
  }

  createMatch() {
    if (this._userService.getUser()) {
      this._router.navigate(['/matches/create']);
    } else {
      this.customWarningMessage = 'U moet zich eerst aanmelden of registreren voordat u een wedstrijd kan aanmaken!';
    }
  }

  convertToMinutes() {
    for (const match of this.matches) {
      if (match.matchCreated) {
        const eventStartTime = new Date(match.matchCreated);
        const dateNow = new Date();
        let duration = dateNow.valueOf() - eventStartTime.valueOf();
        if (duration < 3600000) {
          duration = Math.floor(duration / (1000 * 60) % 60);
          if (duration !== 0) {
            (<any>match).duration = duration;
          } else {
            (<any>match).duration = '0';
          }
        } else {
          (<any>match).duration = '-1';
        }
      }
    }
  }

  getFontWeight(points1: number, points2: number): string {
    if (points1 > points2) {
      return 'bold';
    }
    return null;
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearcustomWarningMessage() {
    this.customWarningMessage = null;
  }
}
