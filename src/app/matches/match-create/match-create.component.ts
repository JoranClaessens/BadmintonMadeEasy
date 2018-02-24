import { Component, OnInit } from '@angular/core';
import { BadmintonMatch } from '../badminton-match';
import { MatchService } from '../match.service';

@Component({
  selector: 'bme-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
  match: BadmintonMatch;

  selectedMatchType = 'NONE';
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  errorMessage: string;

  constructor(private _matchService: MatchService) { }

  ngOnInit() {
  }

  createMatch() {
    this._matchService.createMatch(new BadmintonMatch(this.selectedMatchType, this.player1, this.player2, this.player3, this.player4))
      .subscribe(
        badmintonMatch => {
          console.log(badmintonMatch);
        },
        error => this.errorMessage = <any>error);
  }

}
