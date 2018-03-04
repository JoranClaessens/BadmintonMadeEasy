import { Component, OnInit } from '@angular/core';
import { BadmintonMatch } from '../badminton-match';
import { Game } from '../game';
import { HttpErrorResponse } from '@angular/common/http';
import { MatchService } from '../match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bme-match-simulate',
  templateUrl: './match-simulate.component.html',
  styleUrls: ['./match-simulate.component.css']
})
export class MatchSimulateComponent implements OnInit {
  courtImage = 'assets/img/badminton-court.jpg';
  match: BadmintonMatch;
  gameFinished = false;
  currentGame: Game;
  errorMessage: HttpErrorResponse;
  serviceTeam1 = false;
  serviceTeam2 = false;

  constructor(private _matchService: MatchService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.serviceTeam1 = true;
    const id = +this._route.snapshot.paramMap.get('id');
    this._matchService.getMatchById(id)
      .subscribe(
        badmintonMatch => {
          this.match = badmintonMatch;
          this.currentGame = badmintonMatch.games[badmintonMatch.games.length - 1];
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  pointsTeam1More() {
    if (this.match.type !== 'MEN_SINGLE' && this.match.type !== 'WOMEN_SINGLE') {
      this.checkDoublePlayerLocations(1);
    }
    this.match.serviceTeam1 = true;
    if (this.match.type === 'MEN_SINGLE' || this.match.type === 'WOMEN_SINGLE') {
      this.checkSinglePlayerLocations();
    }

    if (this.currentGame.pointsTeam1 - this.currentGame.pointsTeam2 < 2 || this.currentGame.pointsTeam1 < 21) {
      this.currentGame.pointsTeam1++;
      this.updateGame();
    }
  }

  pointsTeam2More() {
    if (this.match.type !== 'MEN_SINGLE' && this.match.type !== 'WOMEN_SINGLE') {
      this.checkDoublePlayerLocations(2);
    }
    this.match.serviceTeam1 = false;
    if (this.match.type === 'MEN_SINGLE' || this.match.type === 'WOMEN_SINGLE') {
      this.checkSinglePlayerLocations();
    }

    if (this.currentGame.pointsTeam2 - this.currentGame.pointsTeam1 < 2 || this.currentGame.pointsTeam2 < 21) {
      this.currentGame.pointsTeam2++;
      this.updateGame();
    }
  }

  pointsTeam1Less() {
    this.checkSinglePlayerLocations();
    this.currentGame.pointsTeam1--;
    this.updateGame();
  }

  pointsTeam2Less() {
    this.checkSinglePlayerLocations();
    this.currentGame.pointsTeam2--;
    this.updateGame();
  }

  updateGame() {
    this._matchService.updateGame(this.currentGame)
      .subscribe(
        game => {
          this.checkGame();
        },
        error => {
          this.errorMessage = <any>error;
        });
    this._matchService.updateMatch(this.match)
      .subscribe(
        badmintonMatch => {
          console.log('test');
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  checkGame() {
    if ((this.currentGame.pointsTeam1 > 20 && this.currentGame.pointsTeam1 - this.currentGame.pointsTeam2 >= 2)
      || (this.currentGame.pointsTeam2 > 20 && this.currentGame.pointsTeam2 - this.currentGame.pointsTeam1 >= 2)
      || this.currentGame.pointsTeam1 === 30 || this.currentGame.pointsTeam2 === 30) {
      this.gameFinished = true;
    } else {
      this.gameFinished = false;
    }
  }

  checkSinglePlayerLocations() {
    if ((this.match.serviceTeam1 && this.currentGame.pointsTeam1 % 2 === 0)
      || (!this.match.serviceTeam1 && this.currentGame.pointsTeam2 % 2 === 0)) {
      this.match.player1Left = true;
      this.match.player2Left = true;
    } else {
      this.match.player1Left = false;
      this.match.player2Left = false;
    }
  }

  checkDoublePlayerLocations(id: number) {
    if (id === 1) {
      if (this.match.serviceTeam1) {
        this.match.player1Left = !this.match.player1Left;
      }
    } else {
      if (!this.match.serviceTeam1) {
        this.match.player2Left = !this.match.player2Left;
      }
    }
  }
}
