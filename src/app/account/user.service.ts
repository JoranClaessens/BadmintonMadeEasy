import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class UserService {
    private userUrl = 'http://localhost:8080/api/users';
    currentUser: User;

    constructor(private _cookieService: CookieService, private _http: HttpClient) { }

    getUser(): User {
        const userId = this._cookieService.get('userId');
        const email = this._cookieService.get('email');

        if (userId && email) {
            const user = new User(email, null);
            user.id = +userId;
            return user;
        }
        return null;
    }

    setUser(user: User) {
        if (user) {
            this._cookieService.set('userId', user.id.toString());
            this._cookieService.set('email', user.email);
        } else {
            this._cookieService.delete('userId');
            this._cookieService.delete('email');
        }
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
