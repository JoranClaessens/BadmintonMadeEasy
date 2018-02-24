import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BadmintonMatch } from './badminton-match';
import { Observable } from 'rxjs/Observable';
import { Game } from './game';

@Injectable()
export class GameService {
    private gameUrl = 'http://localhost:8080/api/games';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private _http: HttpClient) { }

    createGame(game: Game): Observable<Game> {
        return this._http.post<Game>(this.gameUrl + '/create', game, this.httpOptions);
    }
}
