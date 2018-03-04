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
          this.match = match;
          this.originalMatch = match;
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  checkForChanges() {
    for (const key in this.match) {
      if (this.match[key] !== this.originalMatch[key]) {
        this.anyChanges = true;
      }
    }
    if (this.match !== this.originalMatch) {
      this.anyChanges = true;
    }
  }

  updateMatch() {
    this._matchService.updateMatch(this.match)
      .subscribe(
        match => {
          this.matchUpdated = true;
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  clearUpdateMessage() {
    this.matchUpdated = false;
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }
}
