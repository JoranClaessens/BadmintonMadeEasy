import { Component, OnInit } from '@angular/core';
import { BadmintonMatch } from '../badminton-match';
import { MatchService } from '../match.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bme-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
  match: BadmintonMatch;

  matchTitle: string;
  selectedMatchType = 'NONE';
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  errorMessage: HttpErrorResponse;
  matchCreated = false;

  constructor(private _matchService: MatchService) { }

  ngOnInit() {
  }

  createMatch() {
    this._matchService.createMatch(new BadmintonMatch(this.matchTitle, this.selectedMatchType,
      this.player1, this.player2, this.player3, this.player4))
      .subscribe(
        badmintonMatch => {
          if (badmintonMatch) {
            this.matchCreated = true;
            this.clearForm();
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearForm() {
    this.matchTitle = null;
    this.selectedMatchType = 'NONE';
    this.player1 = null;
    this.player2 = null;
    this.player3 = null;
    this.player4 = null;
  }
}
