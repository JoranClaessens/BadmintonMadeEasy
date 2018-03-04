import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { RouterModule } from '@angular/router';
import { MatchCreateComponent } from './match-create/match-create.component';
import { MatchService } from './match.service';
import { MatchSimulateComponent } from './match-simulate/match-simulate.component';
import { MatchEditComponent } from './match-edit/match-edit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    MatchListComponent,
    MatchDetailComponent,
    MatchCreateComponent,
    MatchSimulateComponent,
    MatchEditComponent
],
  providers: [
    MatchService
  ]
})
export class MatchModule { }
