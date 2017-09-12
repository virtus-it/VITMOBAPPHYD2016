﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable()
export class DistributorServiceService {

    constructor(private http: Http, @Inject('API_URL') private apiUrl: string) { }
    getAllDistributors(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers();
       // headers.append('apptype', 'moya');
        headers.append('Content-Type', 'application/json');
        //headers.append('Access-Control-Allow-Origin', '*');
        //headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
        //headers.append('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
       
        

    
      //  let headers = new Headers({'Content-Type': 'application/json',}); // ... Set content type to JSON  res.json()
       

        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/getdistributorbydealerid', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    createPolygonDistributors(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({'Content-Type': 'application/json'});
       // headers.append('apptype', 'moya');// ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/createpolygon', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    updatePolygonDistributors(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/updatepolygon', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getpolygonByDistributor(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/getpolygon', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}