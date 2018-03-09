import { Component, OnInit } from '@angular/core';
import { Tournament } from '../tournament';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';
import { TournamentService } from '../tournament.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {
  loggedIn = false;
  selectedTournamentTab: number;
  userTournamentsCount = 0;
  tournaments: Tournament[];
  errorMessage: HttpErrorResponse;
  customWarningMessage: string;

  constructor(private _userService: UserService, private _tournamentService: TournamentService, private _router: Router) { }

  ngOnInit() {
    if (this._userService.getUser()) {
      this.loggedIn = true;
      this.loadUserTournaments();
    }
    this.loadAllTournaments();
  }

  onTournamentTabChanged() {
    if (this.selectedTournamentTab === 1) {
      this.loadAllTournaments();
    } else {
      this.loadUserTournaments();
    }
  }

  loadAllTournaments() {
    this.selectedTournamentTab = 1;
    this._tournamentService.getTournaments()
      .subscribe(
        tournaments => {
          this.tournaments = tournaments;
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  loadUserTournaments() {
    if (this._userService.getUser()) {
      this._tournamentService.getTournamentsByUser(this._userService.getUser().id)
        .subscribe(
          tournaments => {
            this.tournaments = tournaments;
            this.userTournamentsCount = this.tournaments.length;
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.tournaments = null;
    }
  }

  createTournament() {
    if (this._userService.getUser()) {
      this._router.navigate(['/tournaments/create']);
    } else {
      this.customWarningMessage = 'U moet zich eerst aanmelden of registreren voordat u een toernooi kan aanmaken!';
    }
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearcustomWarningMessage() {
    this.customWarningMessage = null;
  }
}
