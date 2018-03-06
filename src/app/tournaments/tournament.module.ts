import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament-list/tournament-list.component';
import { TournamentCreateComponent } from './tournament-create/tournament-create.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TournamentService } from './tournament.service';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    TournamentListComponent,
    TournamentCreateComponent,
    TournamentDetailComponent
],
  providers: [
    TournamentService
  ]
})
export class TournamentModule { }
