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
    if (this.currentGame.pointsTeam1 - this.currentGame.pointsTeam2 < 2 || this.currentGame.pointsTeam1 < 21) {
      this.currentGame.pointsTeam1++;
      this.updateGame();
    }
    this.match.serviceTeam1 = true;
    this.match.serviceTeam2 = false;
  }

  pointsTeam2More() {
    if (this.currentGame.pointsTeam2 - this.currentGame.pointsTeam1 < 2 || this.currentGame.pointsTeam2 < 21) {
      this.currentGame.pointsTeam2++;
      this.updateGame();
    }
    this.match.serviceTeam1 = false;
    this.match.serviceTeam2 = true;
  }

  pointsTeam1Less() {
    this.currentGame.pointsTeam1--;
    this.updateGame();
  }

  pointsTeam2Less() {
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
    this._matchService.updateMatch(this.match);
  }

  checkGame() {
    if ((this.currentGame.pointsTeam1 > 20 && this.currentGame.pointsTeam1 - this.currentGame.pointsTeam2 >= 2)
      || (this.currentGame.pointsTeam2 > 20 && this.currentGame.pointsTeam2 - this.currentGame.pointsTeam1 >= 2)) {
      this.gameFinished = true;
    } else {
      this.gameFinished = false;
    }
  }
}
