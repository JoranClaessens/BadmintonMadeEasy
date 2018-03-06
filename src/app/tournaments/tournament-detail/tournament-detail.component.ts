import { Component, OnInit } from '@angular/core';
import { TournamentPlayer } from '../tournament-player';

@Component({
  selector: 'bme-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.css']
})
export class TournamentDetailComponent implements OnInit {
  numberOfTeams = 16;
  tournamentPlayers: TournamentPlayer[];
  tournamentPlayer = new TournamentPlayer('Joran Claessens', 1, 1);
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

  constructor() { }

  ngOnInit() {
    this.tournamentPlayers = new Array<TournamentPlayer>();
    this.tournamentPlayers.push(new TournamentPlayer('Joran Claessens', 1, 1));
    this.tournamentPlayers.push(new TournamentPlayer('Pol Biesmans', 1, 2));
    this.tournamentPlayers.push(new TournamentPlayer('Pol Biesmans', 2, 1));
    this.test();
  }

  test() {
    if (this.numberOfTeams <= 2) {
      this.rounds = Array(2).fill(1).map((x, i) => i + 1);
      this.round1 = 1;
      this.round2 = 0;
    } else if (this.numberOfTeams <= 4) {
      this.rounds = Array(3).fill(1).map((x, i) => i + 1);
      this.round1 = 2;
      this.round2 = 1;
      this.round3 = 0;
    } else if (this.numberOfTeams <= 8) {
      this.rounds = Array(4).fill(1).map((x, i) => i + 1);
      this.round1 = 4;
      this.round2 = 2;
      this.round3 = 1;
      this.round4 = 0;
    } else if (this.numberOfTeams <= 16) {
      this.rounds = Array(5).fill(1).map((x, i) => i + 1);
      this.round1 = 8;
      this.round2 = 4;
      this.round3 = 2;
      this.round4 = 1;
      this.round5 = 0;
    } else if (this.numberOfTeams <= 32) {
      this.rounds = Array(6).fill(1).map((x, i) => i + 1);
      this.round1 = 16;
      this.round2 = 8;
      this.round3 = 4;
      this.round4 = 2;
      this.round5 = 1;
      this.round6 = 0;
    } else if (this.numberOfTeams <= 64) {
      this.rounds = Array(7).fill(1).map((x, i) => i + 1);
      this.round1 = 32;
      this.round2 = 16;
      this.round3 = 8;
      this.round4 = 4;
      this.round5 = 2;
      this.round6 = 1;
      this.round7 = 0;
    } else if (this.numberOfTeams <= 128) {
      this.rounds = Array(8).fill(1).map((x, i) => i + 1);
      this.round1 = 64;
      this.round2 = 32;
      this.round3 = 16;
      this.round4 = 8;
      this.round5 = 4;
      this.round6 = 2;
      this.round7 = 1;
      this.round8 = 0;
    } else if (this.numberOfTeams <= 256) {
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
    console.log(this.rounds);
    console.log(this.round1);
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
    for (let i = 0; i < this.tournamentPlayers.length; i++) {
      if (round === this.tournamentPlayers[i].round && match === Math.ceil(this.tournamentPlayers[i].position / 2) &&
         position === this.tournamentPlayers[i].position % 2) {
        return this.tournamentPlayers[i].name;
      }
      console.log(this.tournamentPlayers[i].position / 2);
    }
    return null;
  }

  checkLastRound(matchRound: number): boolean {
    if (matchRound === 0) {
      return true;
    }
    return false;
  }
}
