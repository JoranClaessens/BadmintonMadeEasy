import { Component, OnInit } from '@angular/core';
import { TournamentPlayer } from '../tournament-player';
import { MatchService } from '../../matches/match.service';
import { BadmintonMatch } from '../../matches/badminton-match';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { TournamentService } from '../tournament.service';
import { Tournament } from '../tournament';

@Component({
  selector: 'bme-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  showInput = false;
  tournament: Tournament;
  tournamentPlayers: TournamentPlayer[];
  badmintonMatches = new Array<BadmintonMatch>();
  errorMessage: HttpErrorResponse;
  rounds: number[];
  round1: number;
  round2: number;
  round3: number;
  round4: number;
  round5: number;
  round6: number;
  round7: number;
  round8: number;
  round9: number;

  constructor(private _tournamentService: TournamentService, private _matchService: MatchService,
    private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this._route.snapshot.paramMap.get('id');
    this.initialize(id);
  }

  createBracket() {
    if (this.tournament.numberOfTeams <= 2) {
      this.rounds = Array(2).fill(1).map((x, i) => i + 1);
      this.round1 = 1;
      this.round2 = 0;
    } else if (this.tournament.numberOfTeams <= 4) {
      this.rounds = Array(3).fill(1).map((x, i) => i + 1);
      this.round1 = 2;
      this.round2 = 1;
      this.round3 = 0;
    } else if (this.tournament.numberOfTeams <= 8) {
      this.rounds = Array(4).fill(1).map((x, i) => i + 1);
      this.round1 = 4;
      this.round2 = 2;
      this.round3 = 1;
      this.round4 = 0;
    } else if (this.tournament.numberOfTeams <= 16) {
      this.rounds = Array(5).fill(1).map((x, i) => i + 1);
      this.round1 = 8;
      this.round2 = 4;
      this.round3 = 2;
      this.round4 = 1;
      this.round5 = 0;
    } else if (this.tournament.numberOfTeams <= 32) {
      this.rounds = Array(6).fill(1).map((x, i) => i + 1);
      this.round1 = 16;
      this.round2 = 8;
      this.round3 = 4;
      this.round4 = 2;
      this.round5 = 1;
      this.round6 = 0;
    } else if (this.tournament.numberOfTeams <= 64) {
      this.rounds = Array(7).fill(1).map((x, i) => i + 1);
      this.round1 = 32;
      this.round2 = 16;
      this.round3 = 8;
      this.round4 = 4;
      this.round5 = 2;
      this.round6 = 1;
      this.round7 = 0;
    } else if (this.tournament.numberOfTeams <= 128) {
      this.rounds = Array(8).fill(1).map((x, i) => i + 1);
      this.round1 = 64;
      this.round2 = 32;
      this.round3 = 16;
      this.round4 = 8;
      this.round5 = 4;
      this.round6 = 2;
      this.round7 = 1;
      this.round8 = 0;
    } else if (this.tournament.numberOfTeams <= 256) {
      this.rounds = Array(9).fill(1).map((x, i) => i + 1);
      this.round1 = 128;
      this.round2 = 64;
      this.round3 = 32;
      this.round4 = 16;
      this.round5 = 8;
      this.round6 = 4;
      this.round7 = 2;
      this.round8 = 1;
      this.round9 = 0;
    }
  }

  getMatchRounds(round: number): number[] {
    switch (round) {
      case 1: if (!this.checkLastRound(this.round1)) { return Array(this.round1).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 2: if (!this.checkLastRound(this.round2)) { return Array(this.round2).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 3: if (!this.checkLastRound(this.round3)) { return Array(this.round3).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 4: if (!this.checkLastRound(this.round4)) { return Array(this.round4).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 5: if (!this.checkLastRound(this.round5)) { return Array(this.round5).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 6: if (!this.checkLastRound(this.round6)) { return Array(this.round6).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 7: if (!this.checkLastRound(this.round7)) { return Array(this.round7).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 8: if (!this.checkLastRound(this.round8)) { return Array(this.round8).fill(1).map((x, i) => i + 1); } else { return [0]; }
      case 9: if (!this.checkLastRound(this.round9)) { return Array(this.round9).fill(1).map((x, i) => i + 1); } else { return [0]; }
    }
  }

  getPlayer(round: number, match: number, position: number): string {
    for (let i = 0; i < this.tournament.players.length; i++) {
      if (round === this.tournament.players[i].round && match === Math.ceil(this.tournament.players[i].position / 2) &&
        position === this.tournament.players[i].position % 2) {
        return this.tournament.players[i].name;
      }
    }
    return null;
  }

  getMatch(player1: string, player2: string): BadmintonMatch {
    if (this.badmintonMatches.length === this.tournament.matches.length) {
      for (let i = 0; i < this.badmintonMatches.length; i++) {
        if (player1 && player2 && this.badmintonMatches[i].player1 != null && this.badmintonMatches[i].player2 != null) {
          if (this.badmintonMatches[i].player1 === player1 && this.badmintonMatches[i].player2 === player2) {
            return this.badmintonMatches[i];
          }
        }
      }
    }
    return null;
  }

  getGamePoints(match: BadmintonMatch) {
    if (this.badmintonMatches.length === this.tournament.matches.length) {
      if (match) {
        let returnString = '';
        for (let i = 0; i < match.games.length; i++) {
          returnString += match.games[i].pointsTeam1 + '-' + match.games[i].pointsTeam2 + ' ';
        }
        return returnString;
      } else {
        return null;
      }
    }
    return null;
  }

  startMatch(player1: string, player2: string) {
    this._tournamentService.createMatch(new BadmintonMatch(this.tournament.title, this.tournament.type,
      player1, player2, null, null, this.tournament.street, this.tournament.city, null), 1, this.tournament.id)
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

  checkForMatches() {
    for (let j = 0; j < this.rounds.length; j++) {
      const matches = this.getMatchRounds(this.rounds[j]);
      for (let x = 0; x < matches.length; x++) {
        const playerNames = new Array<string>();
        for (let i = 0; i < this.tournament.players.length; i++) {
          if (this.rounds[j] === this.tournament.players[i].round && matches[x] === Math.ceil(this.tournament.players[i].position / 2)) {
            playerNames.push(this.tournament.players[i].name);
          }
        }
        if (playerNames.length === 2) {
          this._matchService.getMatchByPlayerNames(playerNames[0], playerNames[1], this.tournament.id)
            .subscribe(
              badmintonMatch => {
                if (badmintonMatch) {
                  this.badmintonMatches.push(badmintonMatch);
                  if (this.badmintonMatches.length === 1) {
                    this._router.navigate(['/tournaments/1']);
                  }
                }
              },
              error => {
                this.errorMessage = <any>error;
              });
        }
      }
    }
  }

  checkLastRound(matchRound: number): boolean {
    if (matchRound === 0) {
      return true;
    }
    return false;
  }

  scheduleTournament() {
    this.tournament.scheduled = true;
    for (let i = 1; i <= this.getMatchRounds(1).length; i++) {
      if (!this.getPlayer(1, i, 1) && this.getPlayer(1, i, 0)) {
        console.log(Math.ceil(i / 2));
        this.tournament.players.push(new TournamentPlayer(this.getPlayer(1, i, 0), 2, i));
      } else if (this.getPlayer(1, i, 1) && !this.getPlayer(1, i, 0)) {
        this.tournament.players.push(new TournamentPlayer(this.getPlayer(1, i, 1), 2, i));
      }
    }
    this.updateTournament();
  }

  updateTournamentPlayer(newValue: string, round: number, match: number, position: number, newPosition: number) {
    const player = this.getPlayer(round, match, position);
    if (player) {
      for (let i = 0; i < this.tournament.players.length; i++) {
        if (this.tournament.players[i].name === player) {
          if (newValue && newValue !== '') {
            this.tournament.players[i].name = newValue;
            this.updateTournament();
          } else {
            this._tournamentService.deleteTournamentPlayer(this.tournament.players[i])
              .subscribe(
                tournamentPlayer => {
                  if (!tournamentPlayer) {
                    this.tournament.players.splice(i, 1);
                    this.updateTournament();
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
        this.tournament.players.push(new TournamentPlayer(newValue, round, newPosition));
        this.updateTournament();
      }
    }
  }

  updateTournament() {
    this._tournamentService.updateTournament(this.tournament)
      .subscribe(
        tournament => {
          if (tournament) {
            this.initialize(tournament.id);
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  initialize(tournamentId: number) {
    this._tournamentService.getTournamentById(tournamentId)
      .subscribe(
        tournament => {
          this.tournament = tournament;
          this.createBracket();
          this.checkForMatches();
        },
        error => {
          this.errorMessage = <any>error;
        });
  }
}
