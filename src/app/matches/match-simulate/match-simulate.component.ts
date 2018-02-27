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
  currentGame: Game;
  errorMessage: HttpErrorResponse;

  constructor(private _matchService: MatchService, private _route: ActivatedRoute) { }

  ngOnInit() {
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

}
