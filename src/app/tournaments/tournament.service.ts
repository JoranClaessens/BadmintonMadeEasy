import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tournament } from './tournament';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TournamentService {
    private tournamentUrl = 'http://localhost:8080/api/tournaments';

    constructor(private _http: HttpClient) { }

    getTournamentById(id: number): Observable<Tournament> {
        return this._http.get<Tournament>(this.tournamentUrl + '/' + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createTournament(tournament: Tournament, userId: number): Observable<Tournament> {
        return this._http.post<Tournament>(this.tournamentUrl + '/create/' + userId, tournament)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
