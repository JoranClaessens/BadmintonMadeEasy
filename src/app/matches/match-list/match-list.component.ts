import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { BadmintonMatch } from '../badminton-match';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bme-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  // isActive = 'active';
  matches: BadmintonMatch[];
  errorMessage: HttpErrorResponse;

  constructor(private _matchService: MatchService) { }

  ngOnInit() {
    this._matchService.getMatches()
      .subscribe(
        badmintonMatches => {
          this.matches = badmintonMatches;
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  /*changeStyle($event) {
    this.isActive = $event.type === 'mouseover' ? 'active' : 'none';
  }*/

}
