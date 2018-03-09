import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'bme-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrls: ['./tournament-create.component.css']
})
export class TournamentCreateComponent implements OnInit {
  today = new Date();
  tournamentId: number;
  title: string;
  selectedMatchType = 'NONE';
  startDate: Date;
  endDate: Date;
  numberOfTeams: number;
  street: string;
  city: string;
  errorMessage: HttpErrorResponse;
  tournamentCreated = false;
  createLocation = false;

  constructor(private _tournamentService: TournamentService, private _userService: UserService) { }

  ngOnInit() {
  }

  createTournament() {
    this._tournamentService.createTournament(new Tournament(this.title, this.numberOfTeams, this.selectedMatchType,
      new Date(this.startDate), new Date(this.endDate), this.street, this.city), this._userService.getUser().id)
      .subscribe(
        tournament => {
          if (tournament) {
            this.tournamentId = tournament.id;
            this.tournamentCreated = true;
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
    this.title = null;
    this.selectedMatchType = 'NONE';
    this.numberOfTeams = null;
    this.startDate = null;
    this.endDate = null;
    this.street = null;
    this.city = null;
    this.createLocation = false;
  }
}
