import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchListComponent } from './match-list/match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MatchListComponent,
    MatchDetailComponent
]
})
export class MatchModule { }
