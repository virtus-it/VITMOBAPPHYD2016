import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../login/authentication.service';
import 'rxjs/add/observable/throw';

@Injectable()

export class FeedbackService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService) { }

  getallFeedback(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getfeed_back', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  openAndCloseStatus(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeissuestatus', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  createReplyToFeedback(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createreplytoissue', bodyString, options)
      .map(res => {
        let response = res.json();
        this.authenticationService.sendRefreshedToken(res);
        if(response.data == 'token malformed'){
          this.authenticationService.logout();
        }
        return res.json();
      })
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
