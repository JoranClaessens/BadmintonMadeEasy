import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CompetitionService } from '../competition.service';
import { Competition } from '../competition';
import { UserService } from '../../account/user.service';

@Component({
  selector: 'bme-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css']
})
export class CompetitionCreateComponent implements OnInit {
  competitionId: number;
  title: string;
  team1: string;
  team2: string;
  selectedCompetitionType = 'NONE';
  startDate: Date;
  street: string;
  city: string;
  errorMessage: HttpErrorResponse;
  competitionCreated = false;
  createLocation = false;

  constructor(private _competitionService: CompetitionService, private _userService: UserService) { }

  ngOnInit() {
  }

  createCompetition() {
    this._competitionService.createCompetition(new Competition(this.title, this.selectedCompetitionType, this.team1, this.team2,
      this.startDate, this.street, this.city), this._userService.getUser().id)
      .subscribe(
        competition => {
          if (competition) {
            this.competitionId = competition.id;
            this.competitionCreated = true;
            this.clearForm();
          }
        },
        error => {
          this.errorMessage = <any>error;
        });
  }

  clearErrorMessage() {
    this.errorMessage = null;
  }

  clearForm() {
    this.title = null;
    this.selectedCompetitionType = 'NONE';
    this.team1 = null;
    this.team2 = null;
    this.startDate = null;
    this.street = null;
    this.city = null;
    this.createLocation = false;
  }

}
