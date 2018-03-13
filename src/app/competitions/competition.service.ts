import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Competition } from './competition';
import { CompetitionPlayer } from './competition-player';
import { BadmintonMatch } from '../matches/badminton-match';

@Injectable()
export class CompetitionService {
    private competitionUrl = 'http://localhost:8080/api/competitions';

    constructor(private _http: HttpClient) { }

    getCompetitions(): Observable<Competition[]> {
        return this._http.get<Competition[]>(this.competitionUrl)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCompetitionById(id: number): Observable<Competition> {
        return this._http.get<Competition>(this.competitionUrl + '/' + id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCompetitionsByUser(userId: number): Observable<Competition[]> {
        return this._http.get<Competition[]>(this.competitionUrl + '/user/' + userId)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createCompetition(competition: Competition, userId: number): Observable<Competition> {
        return this._http.post<Competition>(this.competitionUrl + '/create/' + userId, competition)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createMatch(badmintonMatch: BadmintonMatch, userId: number, competitionId: number): Observable<BadmintonMatch> {
        return this._http.post<BadmintonMatch>(this.competitionUrl + '/matches/' + userId + '/' + competitionId, badmintonMatch)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateCompetition(competition: Competition): Observable<Competition> {
        return this._http.put<Competition>(this.competitionUrl, competition)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteCompetition(competitionId: number): Observable<Competition> {
        return this._http.delete<Competition>(this.competitionUrl + '/' + competitionId)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    deleteCompetitionPlayer(competitionPlayer: CompetitionPlayer): Observable<CompetitionPlayer> {
        return this._http.delete<CompetitionPlayer>(this.competitionUrl + '/players/' + competitionPlayer.id)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
