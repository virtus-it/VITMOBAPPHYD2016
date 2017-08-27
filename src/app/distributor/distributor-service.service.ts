import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class DistributorServiceService {

  constructor(private http: Http,@Inject('API_URL') private apiUrl: string) { }
 getAllDistributors() {
  ///  let bodyString = JSON.stringify(Input); // Stringify payload
        let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options       = new RequestOptions({ headers: headers }); 
        return this.http.get(this.apiUrl +'/getdistributorbydealerid')
            .map((res: Response) => res.json())
             .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
}
