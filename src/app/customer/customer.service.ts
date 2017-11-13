import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomerService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string) { }
  getCustomerById(input) {
    
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + '/user/user/'+input.userid+'/'+input.appType, options)
          .map((res: Response) => res.json())
          .do(data => console.log('All: '))
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
      createCustomer(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/user', bodyString, options)
          .map((res: Response) => res.json())
          .do(data => console.log('All: '))
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
      updateCustomer(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiUrl + '/user', bodyString, options)
          .map((res: Response) => res.json())
          .do(data => console.log('All: '))
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
}
