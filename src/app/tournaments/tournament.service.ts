import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tournament } from './tournament';
import { Observable } from 'rxjs/Observable';
import { TournamentPlayer } from './tournament-player';
import { BadmintonMatch } from '../matches/badminton-match';

@Injectable()
export class TournamentService {
    private tournamentUrl = 'http://localhost:8080/api/tournaments';

    constructor(private _http: HttpClient) { }

    getTournaments(): Observable<Tournament[]> {
        return this._http.get<Tournament[]>(this.tournamentUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getTournamentById(id: number): Observable<Tournament> {
        return this._http.get<Tournament>(this.tournamentUrl + '/' + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getTournamentsByUser(userId: number): Observable<Tournament[]> {
        return this._http.get<Tournament[]>(this.tournamentUrl + '/user/' + userId)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createTournament(tournament: Tournament, userId: number): Observable<Tournament> {
        return this._http.post<Tournament>(this.tournamentUrl + '/create/' + userId, tournament)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createMatch(badmintonMatch: BadmintonMatch, userId: number, tournamentId: number): Observable<BadmintonMatch> {
        return this._http.post<BadmintonMatch>(this.tournamentUrl + '/matches/' + userId + '/' + tournamentId, badmintonMatch)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateTournament(tournament: Tournament): Observable<Tournament> {
        return this._http.put<Tournament>(this.tournamentUrl, tournament)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteTournamentPlayer(tournamentPlayer: TournamentPlayer): Observable<TournamentPlayer> {
        return this._http.delete<TournamentPlayer>(this.tournamentUrl + '/players/' + tournamentPlayer.id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
