import { Component, OnInit } from '@angular/core';
import { Competition } from '../competition';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../account/user.service';
import { CompetitionService } from '../competition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bme-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {
  loggedIn = false;
  showFilter = false;
  keyBox = true;
  teamBox = true;
  titleBox = true;
  filterQuery: string;
  selectedCompetitionTab: number;
  userCompetitionsCount = 0;
  competitions: Competition[];
  errorMessage: HttpErrorResponse;
  customWarningMessage: string;

  constructor(private _userService: UserService, private _competitionService: CompetitionService, private _router: Router) { }

  ngOnInit() {
    if (this._userService.getUser()) {
      this.loggedIn = true;
      this.loadUserCompetitions();
    }
    this.loadAllCompetitions();
  }

  onCompetitionTabChanged() {
    if (this.selectedCompetitionTab === 1) {
      this.loadAllCompetitions();
    } else {
      this.loadUserCompetitions();
    }
  }

  loadAllCompetitions() {
    this.selectedCompetitionTab = 1;
    this._competitionService.getCompetitions()
      .subscribe(
        competitions => {
          this.competitions = competitions;
          this.checkMatchWins();
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  loadUserCompetitions() {
    if (this._userService.getUser()) {
      this._competitionService.getCompetitionsByUser(this._userService.getUser().id)
        .subscribe(
          competitions => {
            this.competitions = competitions;
            this.userCompetitionsCount = this.competitions.length;
            this.checkMatchWins();
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      this.competitions = null;
    }
  }

  checkMatchWins() {
    for (let i = 0; i < this.competitions.length; i++) {
      let matchesWonTeam1 = 0;
      let matchesWonTeam2 = 0;
      for (let j = 0; j < this.competitions[i].matches.length; j++) {
        if (this.competitions[i].matches[j].matchFinished) {
          let gamesWonTeam1 = 0;
          let gamesWonTeam2 = 0;
          for (let x = 0; x < this.competitions[i].matches[j].games.length; x++) {
            if (this.competitions[i].matches[j].games[x].pointsTeam1 > this.competitions[i].matches[j].games[x].pointsTeam2) {
              gamesWonTeam1++;
            } else {
              gamesWonTeam2++;
            }
          }

          if (gamesWonTeam1 > gamesWonTeam2) {
            matchesWonTeam1++;
          } else {
            matchesWonTeam2++;
          }
        }
      }
      (<any>this.competitions[i]).matchesWonTeam1 = matchesWonTeam1;
      (<any>this.competitions[i]).matchesWonTeam2 = matchesWonTeam2;
    }
  }

  filter() {
    if (this.selectedCompetitionTab === 1) {
      this._competitionService.getCompetitions()
        .subscribe(
          competitions => {
            this.competitions = competitions;
            this.checkMatchWins();
            this.filterInput();
          },
          error => {
            this.errorMessage = <any>error;
          });
    } else {
      if (this._userService.getUser()) {
        this._competitionService.getCompetitionsByUser(this._userService.getUser().id)
          .subscribe(
            competitions => {
              this.competitions = competitions;
              this.checkMatchWins();
              this.filterInput();
            },
            error => {
              this.errorMessage = <any>error;
            });
      } else {
        this.competitions = null;
        this.filterInput();
      }
    }
  }

  filterInput() {
    const filterCompetitions = new Array<Competition>();

    if (this.keyBox) {
      for (let i = 0; i < this.competitions.length; i++) {
        if (this.competitions[i].id === +this.filterQuery) {
          if (!filterCompetitions.includes(this.competitions[i])) {
            filterCompetitions.push(this.competitions[i]);
          }
        }
      }
    }

    if (this.teamBox) {
      for (let i = 0; i < this.competitions.length; i++) {
        if (this.competitions[i].team1.toLowerCase().includes(this.filterQuery.toLowerCase())
          || this.competitions[i].team2.toLowerCase().includes(this.filterQuery.toLowerCase())) {
          if (!filterCompetitions.includes(this.competitions[i])) {
            filterCompetitions.push(this.competitions[i]);
          }
        }
      }
    }

    if (this.titleBox) {
      for (let i = 0; i < this.competitions.length; i++) {
        if (this.competitions[i].title.toLowerCase().includes(this.filterQuery.toLowerCase())) {
          if (!filterCompetitions.includes(this.competitions[i])) {
            filterCompetitions.push(this.competitions[i]);
          }
        }
      }
    }
    this.competitions = filterCompetitions;
  }

  resetFilter() {
    this.filterQuery = '';
    this.keyBox = true;
    this.teamBox = true;
    this.titleBox = true;
    this.filter();
  }

  createCompetition() {
    if (this._userService.getUser()) {
      this._router.navigate(['/competitions/create']);
    } else {
      this.customWarningMessage = 'U moet zich eerst aanmelden of registreren voordat u een competitiepartij kan aanmaken!';
    }
  }

  getFontWeight(points1: number, points2: number): string {
    if (points1 > points2) {
      return 'bold';
    }
    return null;
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearcustomWarningMessage() {
    this.customWarningMessage = null;
  }
}
