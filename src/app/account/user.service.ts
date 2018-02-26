import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8080/api/users';
    currentUser: User;

    constructor(private _http: HttpClient) { }

    getUser(): User {
        return this.currentUser;
    }

    setUser(user: User) {
        this.currentUser = user;
    }

    getUserByEmail(email: string): Observable<User> {
        console.log(email);
        return this._http.get<User>(this.userUrl + '/email/' + btoa(email))
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    createUser(user: User): Observable<User> {
        return this._http.post<User>(this.userUrl + '/create', user)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    login(email: string, password: string): Observable<User> {
        return this._http.get<User>(this.userUrl + '/login/' + btoa(email) + '/' + password)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}
