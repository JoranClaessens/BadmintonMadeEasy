import { Component, OnInit } from '@angular/core';
import { BadmintonMatch } from '../badminton-match';
import { MatchService } from '../match.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';

@Component({
  selector: 'bme-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
  match: BadmintonMatch;
  matchId: number;
  matchTitle: string;
  selectedMatchType = 'NONE';
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  street: string;
  postalCode: string;
  city: string;
  terrainNumber: string;
  errorMessage: HttpErrorResponse;
  matchCreated = false;
  createLocation = false;

  constructor(private _matchService: MatchService, private _userService: UserService) { }

  ngOnInit() {
  }

  createMatch() {
    this._matchService.createMatch(new BadmintonMatch(this.matchTitle, this.selectedMatchType,
      this.player1, this.player2, this.player3, this.player4, this.street, this.city, this.terrainNumber),
        this._userService.getUser().id)
      .subscribe(
        badmintonMatch => {
          if (badmintonMatch) {
            this.matchId = badmintonMatch.id;
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
