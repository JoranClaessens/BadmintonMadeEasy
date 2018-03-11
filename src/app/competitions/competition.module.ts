import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CompetitionCreateComponent } from './competition-create/competition-create.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { CompetitionService } from './competition.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    CompetitionListComponent,
    CompetitionCreateComponent,
    CompetitionDetailComponent
  ],
  providers: [
    CompetitionService
  ]
})
export class CompetitionModule { }
