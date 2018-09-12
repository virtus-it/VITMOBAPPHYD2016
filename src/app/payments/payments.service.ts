import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Inject } from '@angular/core';
import { LoaderService } from '../login/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { AuthenticationService } from '../login/authentication.service';



@Injectable()
export class PaymentsService {

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string,private loaderService: LoaderService , private authService: AuthenticationService) { }

  getPayments(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getpaymentstbyuserid', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: ') )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getBillDetails(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getbilldetailsofallcustomer', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: ') )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  getPaymentsByArea(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getpaymentsbyarea', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: ') )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

  }

  changeStatus(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/changepaymentstatus', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: ') )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getAdvanceAmount(input){
    let bodyString = JSON.stringify(input); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON  res.json()
    headers.append('Authorization', 'Bearer ' + this.authService.tokenSession);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.apiUrl + '/getadvanceamount', bodyString, options)
    .map(res => {
      let response = res.json();
      if(response.data == 'token expired') {
        this.authService.logout();
      } 
      else {
        return res.json();
      }
    })
      .do(data => console.log('All: ') )
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }



}
