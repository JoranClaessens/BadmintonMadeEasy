import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';

@Component({
  selector: 'bme-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {
  tournamentId: number;
  title: string;
  selectedMatchType = 'NONE';
  numberOfTeams: number;
  street: string;
  city: string;
  errorMessage: HttpErrorResponse;
  tournamentCreated = false;
  createLocation = false;

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  createTournament() {
    /*this._matchService.createMatch(new BadmintonMatch(this.matchTitle, this.selectedMatchType,
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
        });*/
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearForm() {
    this.title = null;
    this.selectedMatchType = 'NONE';
    this.numberOfTeams = null;
  }
}
