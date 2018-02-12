import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { MatchModule } from './matches/match.module';
import { TournamentModule } from './tournaments/tournament.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatchModule,
    TournamentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
