import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    loggedIn = false;
    constructor(private router: Router, private http: Http, @Inject('API_URL') private apiUrl: string) {
        this.loggedIn = !!localStorage.getItem('currentUser');
    }
    login(username: string, password: string) {
        let bodyString = JSON.stringify({ userName: username, userPwd: password }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/weblogin', bodyString, options)
            .map((res: Response) => {
                this.loggedIn = true;
                return res.json();
            })
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }
    isLoggedIn() {
        return this.loggedIn;
    }
}

// {
//                 // login successful if there's a jwt token in the response
//                 let resData = response.json();
//                 if (resData && resData.data.user) {
//                     // store user details and jwt token in local storage to keep user logged in between page refreshes
//                     localStorage.setItem('currentUser', JSON.stringify(resData.data.user));
//                 }
//             }