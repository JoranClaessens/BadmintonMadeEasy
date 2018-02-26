import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatchModule } from './matches/match.module';
import { TournamentModule } from './tournaments/tournament.module';
import { CompetitionModule } from './competitions/competition.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { AccountCreateComponent } from './account/account-create/account-create.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatchModule,
    TournamentModule,
    CompetitionModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
