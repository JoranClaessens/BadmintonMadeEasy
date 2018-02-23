import { Component, OnInit } from '@angular/core';
import { BadmintonMatch } from '../badminton-match';

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

  constructor() { }

  ngOnInit() {
  }

  createMatch(): void {
    this.match = new BadmintonMatch(this.selectedMatchType, this.player1, this.player2, this.player3, this.player4);
    console.log(this.match);
  }

}
