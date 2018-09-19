import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../login/authentication.service';


@Injectable()
export class PromocodeServiceService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private authenticationService: AuthenticationService, private loaderService: LoaderService, @Inject('App_URL') private appUrl: string) { }

  createPromoCode(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authenticationService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/offers', bodyString, options)
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
