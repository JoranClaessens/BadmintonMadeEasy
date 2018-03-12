import { Component, OnInit, OnDestroy } from '@angular/core';
import { Competition } from '../competition';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';
import { CompetitionService } from '../competition.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionPlayer } from '../competition-player';
import { BadmintonMatch } from '../../matches/badminton-match';

@Component({
  selector: 'bme-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent implements OnInit, OnDestroy {
  hasAuthority = false;
  stopPolling = false;
  competition: Competition;
  userCompetitions: Competition[];
  errorMessage: HttpErrorResponse;

  constructor(private _userService: UserService, private _competitionService: CompetitionService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');

    if (this._userService.getUser()) {
      this.checkAuthority(id);
    } else {
      this.initialize(id);
    }
    this.pollCompetition();
  }

  ngOnDestroy() {
    this.stopPolling = true;
  }

  getPlayer(team: string, match: number, position: number): CompetitionPlayer {
    for (let i = 0; i < this.competition.players.length; i++) {
      if (this.competition.players[i].team === team && this.competition.players[i].matchNumber === match &&
        this.competition.players[i].position === position) {
        return this.competition.players[i];
      }
    }
  }

  getMatch(player1team1: CompetitionPlayer, player2team1: CompetitionPlayer,
    player1team2: CompetitionPlayer, player2team2: CompetitionPlayer, type: string): BadmintonMatch {
    if (type === 'SINGLE') {
      for (let i = 0; i < this.competition.matches.length; i++) {
        if (this.competition.matches[i].player1 === player1team1.name &&
          this.competition.matches[i].player2 === player1team2.name) {
          return this.competition.matches[i];
        }
      }
    } else {
      for (let i = 0; i < this.competition.matches.length; i++) {
        if (this.competition.matches[i].player1 === player1team1.name &&
          this.competition.matches[i].player2 === player1team2.name &&
          this.competition.matches[i].player3 === player2team1.name &&
          this.competition.matches[i].player4 === player2team2.name) {
          return this.competition.matches[i];
        }
      }
    }
    return null;
  }

  startMatch(player1team1: CompetitionPlayer, player2team1: CompetitionPlayer,
    player1team2: CompetitionPlayer, player2team2: CompetitionPlayer, type: string) {
    this._competitionService.createMatch(new BadmintonMatch(this.competition.title, type,
      player1team1.name, player1team2.name, player2team1.name, player2team2.name, this.competition.street, this.competition.city, null),
      this._userService.getUser().id, this.competition.id)
      .subscribe(
        badmintonMatch => {
          if (badmintonMatch) {
            this._router.navigate(['/matches/' + badmintonMatch.id]);
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  viewMatch(match: BadmintonMatch) {
    this._router.navigate(['/matches/' + match.id]);
  }

  updateCompetition() {
    this._competitionService.updateCompetition(this.competition)
      .subscribe(
        competition => {
          if (competition) {
            this.initialize(competition.id);
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  updateCompetitionPlayer(newValue: string, team: string, match: number, position: number) {
    const player = this.getPlayer(team, match, position);
    if (player) {
      for (let i = 0; i < this.competition.players.length; i++) {
        if (this.competition.players[i].id === player.id) {
          if (newValue && newValue !== '') {
            this.competition.players[i].name = newValue;
            this.updateCompetition();
          } else {
            this._competitionService.deleteCompetitionPlayer(this.competition.players[i])
              .subscribe(
                competitionPlayer => {
                  if (!competitionPlayer) {
                    this.competition.players.splice(i, 1);
                    this.updateCompetition();
                  }
                },
                error => {
                  this.errorMessage = <any>error;
                });
          }
        }
      }
    } else {
      if (newValue && newValue !== '') {
        this.competition.players.push(new CompetitionPlayer(newValue, match, team, position));
        this.updateCompetition();
      }
    }
  }

  checkAuthority(id: number) {
    this._competitionService.getCompetitionsByUser(this._userService.getUser().id)
      .subscribe(
        competitions => {
          this.userCompetitions = competitions;
          this.initialize(id);
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  pollCompetition() {
    if (!this.stopPolling) {
      setTimeout(() => {
        this._competitionService.getCompetitionById(this.competition.id)
          .subscribe(
            competition => {
              this.competition = competition;
              this.pollCompetition();
            },
            error => {
              this.errorMessage = <any>error;
            });
      }, 3000);
    }
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  initialize(competitionId: number) {
    this._competitionService.getCompetitionById(competitionId)
      .subscribe(
        competition => {
          this.competition = competition;
          if (this.userCompetitions) {
            for (let i = 0; i < this.userCompetitions.length; i++) {
              if (this.userCompetitions[i].id === competition.id) {
                this.hasAuthority = true;
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
}
