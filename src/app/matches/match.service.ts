import { Injectable } from '@angular/core';
import { BadmintonMatch } from './badminton-match';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MatchService {
    private matchUrl = 'http://localhost:8080/api/matches';

    constructor(private _http: HttpClient) { }

    getMatches(): Observable<BadmintonMatch[]> {
        return this._http.get<BadmintonMatch[]>(this.matchUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMatchById(id: number): Observable<BadmintonMatch> {
        return this._http.get<BadmintonMatch>(this.matchUrl + '/' + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createMatch(badmintonMatch: BadmintonMatch, userId: number): Observable<BadmintonMatch> {
        return this._http.post<BadmintonMatch>(this.matchUrl + '/create/' + userId, badmintonMatch)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
