import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchService } from '../match.service';
import { BadmintonMatch } from '../badminton-match';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Game } from '../game';
import { UserService } from '../../account/user.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'bme-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.css']
})
export class MatchDetailComponent implements OnInit, OnDestroy {
  courtImage = 'assets/img/badminton-court.jpg';
  hasAuthority = false;
  stopPolling = false;
  userMatches: BadmintonMatch[];
  match: BadmintonMatch;
  currentGame: Game;
  errorMessage: HttpErrorResponse;

  constructor(private _userService: UserService, private _matchService: MatchService,
    private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');

    if (this._userService.getUser()) {
      this.checkAuthority(id);
    } else {
      this.loadMatch(id);
    }
    this.checkGame();
  }

  ngOnDestroy() {
    this.stopPolling = true;
  }

  checkAuthority(id: number) {
    this._matchService.getMatchesByUser(this._userService.getUser().id)
      .subscribe(
        badmintonMatches => {
          this.userMatches = badmintonMatches;
          this.loadMatch(id);
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  loadMatch(id: number) {
    this._matchService.getMatchById(id)
      .subscribe(
        badmintonMatch => {
          this.match = badmintonMatch;
          if (this.userMatches) {
            for (let i = 0; i < this.userMatches.length; i++) {
              if (this.userMatches[i].id === badmintonMatch.id) {
                this.hasAuthority = true;
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  simulateMatch() {
    this._router.navigate(['/matches/simulate/' + this.match.id]);
  }

  editMatch() {
    this._router.navigate(['/matches/edit/' + this.match.id]);
  }

  deleteMatch() {
    this._matchService.deleteMatch(this.match.id)
      .subscribe(
        badmintonmatch => {
          if (!badmintonmatch) {
            this._router.navigate(['/matches']);
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  checkGame() {
    if (!this.stopPolling) {
      setTimeout(() => {
        this._matchService.getMatchById(this.match.id)
          .subscribe(
            badmintonmatch => {
              this.match = badmintonmatch;
              this.checkGame();
            },
            error => {
              this.errorMessage = <any>error;
            });
      }, 1000);
    }
  }

  getFontWeight(points1: number, points2: number): string {
    if (points1 > points2) {
      return 'bold';
    }
    return null;
  }
}
