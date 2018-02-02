import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType } from '@angular/http';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/Rx'; 
@Injectable()
export class CustomerService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string) { }
  getCustomerById(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/user/user/' + input.userid + '/' + input.appType, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  createCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createuser', bodyString, options)
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
  getCustomerList(input) {

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/customers/' + input.userId + '/' + input.lastId + '/' + input.appType+ '/' + input.userType, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  searchCustomer(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/searchcustomer', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getDownloadedFile(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/download_customers', bodyString, options)
    .map((res: Response) => res.json())
    .do(data => console.log('All: '))
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
  createSchedule(input) {
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/createscheduler', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getFile(path: string):Observable<Blob>{
    let options = new RequestOptions({responseType: ResponseContentType.Blob});
    
    return this.http.get(this.apiUrl +'/modules/uploads/'+path, options)
            .map((response: Response) => <Blob>response.blob())              
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
getPrintFile(path: string):Observable<Blob>{
  let options = new RequestOptions({responseType: ResponseContentType.Blob});
  
  return this.http.get(this.apiUrl +path, options)
          .map((response: Response) => <Blob>response.blob())              
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
  viewScheduleOrders(input) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.apiUrl + '/getschedules/' + input.userId + '/' + input.appType+ '/' + input.userType + '/' + input.dealerid, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

  updateScheduleOrder(input){
    let bodyString = JSON.stringify(input); // Stringify payload
  let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
  let options = new RequestOptions({ headers: headers });
  return this.http.put(this.apiUrl + '/scheduler', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  deleteScheduledOrder(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changeschedulestatus', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
  ScheduleList(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getallschedules', bodyString, options)
      .map((res: Response) => res.json())
      .do(data => console.log('All: '))
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }
 
}
