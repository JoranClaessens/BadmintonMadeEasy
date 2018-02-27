import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { BadmintonMatch } from '../badminton-match';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Game } from '../game';

@Component({
  selector: 'bme-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit {
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
