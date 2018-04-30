import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PromocodeServiceService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string,private loaderService: LoaderService,@Inject('App_URL') private appUrl: string) { }

  createPromoCode(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/offers', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
