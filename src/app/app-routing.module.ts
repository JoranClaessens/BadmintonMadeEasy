import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { TournamentListComponent } from './tournaments/tournament-list/tournament-list.component';
import { CompetitionListComponent } from './competitions/competition-list/competition-list.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { AppModule } from './app.module';
import { MatchDetailComponent } from './matches/match-detail/match-detail.component';
import { MatchCreateComponent } from './matches/match-create/match-create.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import { AccountCreateComponent } from './account/account-create/account-create.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'account/login', component: AccountLoginComponent },
  { path: 'account/create', component: AccountCreateComponent },
  { path: 'matches', component: MatchListComponent },
  { path: 'matches/create', component: MatchCreateComponent },
  { path: 'matches/:id', component: MatchDetailComponent },
  { path: 'tournaments', component: TournamentListComponent },
  { path: 'competitions', component: CompetitionListComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
