import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { ActivatedRoute } from '@angular/router';
import { BadmintonMatch } from '../badminton-match';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bme-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  matchUpdated = false;
  anyChanges = false;
  originalMatch: BadmintonMatch;
  match: BadmintonMatch;
  errorMessage: HttpErrorResponse;

  constructor(private _matchService: MatchService, private _route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this._matchService.getMatchById(id)
      .subscribe(
        match => {
          this.organizeMatches(match);
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  checkForChanges() {
    this.anyChanges = false;
    for (const key in this.match) {
      if (this.match[key] !== this.originalMatch[key] && key !== 'games') {
        console.log(this.match[key]);
        console.log(this.originalMatch[key]);
        this.anyChanges = true;
      }
    }
    for (let i = 0; i < this.match.games.length; i++) {
      for (const key in this.match.games[i]) {
        if (this.match.games[i][key] !== this.originalMatch.games[i][key]) {
          console.log(this.match.games[i][key]);
          console.log(this.originalMatch.games[i][key]);
          this.anyChanges = true;
        }
      }
    }
  }

  updateMatch() {
    this._matchService.updateMatch(this.match)
      .subscribe(
        match => {
          this.matchUpdated = true;
          this.anyChanges = false;
          this.organizeMatches(match);
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  organizeMatches(match: BadmintonMatch) {
    this.originalMatch = null;
    this.match = null;
    this.originalMatch = Object.assign({}, match, this.originalMatch);
    this.match = Object.assign({}, match, this.match);
    this.originalMatch.games = Object.assign([], match.games, this.originalMatch.games);
    this.match.games = Object.assign([], match.games, this.match.games);
    for (let i = 0; i < match.games.length; i++) {
      this.originalMatch.games[i] = Object.assign({}, match.games[i], this.originalMatch.games[i]);
      this.match.games[i] = Object.assign({}, match.games[i], this.match.games[i]);
    }
  }

  clearUpdateMessage() {
    this.matchUpdated = false;
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }
}
