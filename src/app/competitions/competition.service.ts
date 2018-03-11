import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Competition } from './competition';

@Injectable()
export class CompetitionService {
    private competitionUrl = 'http://localhost:8080/api/competitions';

    constructor(private _http: HttpClient) { }

    getCompetitions(): Observable<Competition[]> {
        return this._http.get<Competition[]>(this.competitionUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createCompetition(competition: Competition, userId: number): Observable<Competition> {
        return this._http.post<Competition>(this.competitionUrl + '/create/' + userId, competition)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
