import { Injectable } from '@angular/core';
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
    getAllArea(input) {
       let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apiUrl + '/getareasbypincode/' + input.userId+'/-1/'+input.appType+'', options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    createDistributor(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/createuser', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    updateDistributor(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiUrl + '/user', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getDistbutorsProducts(userId) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
         let options = new RequestOptions({ headers: headers });
         return this.http.get(this.apiUrl + '/products/' + userId+'', options)
             .map((res: Response) => res.json())
             .do(data => console.log('All: ' + JSON.stringify(data)))
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
     getOrderById(input) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
         let options = new RequestOptions({ headers: headers });
         return this.http.get(this.apiUrl + '/getorderbyid/' + input.appType+'/'+input.orderid+'/'+input.userId+'', options)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
     forwardOrder(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/forwardorder', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    assingOrder(input) {
        let bodyString = JSON.stringify(input); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.apiUrl + '/assignorder', bodyString, options)
            .map((res: Response) => res.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    getAllSuppliers(input) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
         let options = new RequestOptions({ headers: headers });
         return this.http.get(this.apiUrl + '/supplierslist/' + input.loginid+'/'+input.appType+'', options)
             .map((res: Response) => res.json())
             .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
     }
    
}
